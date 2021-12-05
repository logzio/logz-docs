---
layout: article
title: Manage account usage
permalink: /user-guide/accounts/manage-account-usage.html
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - account-utilization
contributors:
  - boofinka
  - gregoryloucas
  - imnotashrimp
  - yberlinger
---

If your account is nearing its daily quota,
Logz.io sends an email alert to account administrators.
That's fine for most situations,
but what if you want to be more proactive in managing your accounts?

For this, you have _account utilization metrics_ (which saves log size and other metadata)
and drop filters (which allow you to stop ingestion of some logs).

## What are account utilization metrics? {#what-are-account-utilization-metrics}

Account utilization metrics capture a snapshot
of your account usage in regular increments—every 10, 30, or 60 minutes—depending on your settings.
Logz.io starts logging your usage after your account reaches 10 MB in size.
You can find these logs in Kibana
when you filter for the `logzio_account_utilization` log type.

| Field name | Description |
|---|---|
| account_id | Logz.io account ID |
| account_name | Name of this account |
| expected_utilization_EOD | Expected utilization by the end of the day, in percent |
| expected_volume_in_GB_EOD | The expected utilization by the end of the day, in GB |
| grace_capacity | The overage configured on the account, in percent. For instance, `120%` means that you have an overage allowance of 20% of your plan volume. |
| number_of_fields| The total number of fields in the current index |
| plan_retention_in_days| The number of days data is kept in the account until it is deleted|
| plan_volume_in_GB | Data allocated to this account, in GB |
| utilization | Current utilization, in percent |
| volume_in_GB | Current utilization, in GB |

### Account utilization metrics for flexible accounts

The following fields are used for flexible volume accounts. 

| Field name | Description |
|---|---|
|is_flexible| Indicates whether the account is fixed or flexible (Boolean)|
|cap_volume| Optional maximum data volume for the account, in GB. This value can be 0: That is, the account has unlimited access to shared volume.|
|expected_volume_in_GB_EOD| An estimate of how much data the account will be used by the end of the day, in GB. The estimation is based on how much data was sent until the current hour. |
|reserved_volume| Volume guaranteed for the account per calendar day, in GB. This value can be 0: That is, no reserved volume is configured for the account. |
|used_from_shareable| The amount of data used from the shareable volume, in GB|

For flexible accounts, the current utilization is the sum of the reserved volume and the data used from the shareable volume:   `volume_in_GB = reserved_volume  +  used_from_shareable`

In your logs, you might see something like this: ![Flexible volume metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/flex_utilizn_metrix.png) 

### What happens when I save log size? {#what-happens-when-i-save-log-size}

When you enable saving log size,
a new field is added to incoming logs.
This new field is called `LogSize`,
and it contains the size of the log line in bytes, taken as a single string.

Kibana doesn't recognize `LogSize` as a number right away.
You can fix this by clicking <i class="fas fa-sync-alt"></i> (refresh mapping) for `LogSize` in Kibana.
You'll need to do this for each account where you enabled `LogSize`.

### Enabling account utilization metrics and log size

![Sub account settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/utilization--save-account-utilization-metrics.png)

Account utilization metrics and log size are set per individual account.
You can find these settings
on the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page
below **Advanced options**.
This page is available
only from your main account—you won't be able to make this change from a sub account.

Even though you need to be an account admin to enable this setting,
everyone who has access to your Logz.io account
can see the resulting logs.
{:.info-box.note}

### Visualizing utilization with an ELK app

We offer a preconfigured dashboard
for account utilization metrics.
You can find this dashboard
in the [ELK Apps](https://app.logz.io/#/dashboard/apps)
by searching for "data volume dashboard".

![Data Volume Dashboard ELK app](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/utilization--elk-apps-data-volume-dashboard.png)

If you recently enabled account utilization metrics,
you may need to wait up to 60 minutes
before this data shows up in Kibana.

## Managing ingestion with drop filters

We recommend shipping only the logs you need
so that you don't end up paying for unnecessary data retention.

However, if you're sending logs that you'll need only sometimes
(such as debug logs),
you can set up a drop filter.

Logs caught by [drop filters]({{site.baseurl}}/user-guide/accounts/drop-filters/) aren't ingested,
so they won't count against your plan limits.
However, the volume of logs you can filter is based on your plan's quota.
For more information, see [Some important notes on drop filtering]({{site.baseurl}}/user-guide/accounts/drop-filters/#some-important-notes).
<!-- This number varies from one account to the next,
so please <a class="intercom-launch" href="mailto:help@logz.io">contact the Support team</a>
for more information on your drop filter limits. -->

Dropped logs will never arrive at your Logz.io account,
so they can't be searched or trigger alerts.
Always confirm you're dropping the right logs when you apply a new filter.
{:.info-box.important}
