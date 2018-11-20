---
layout: article
title: Monitor account usage
permalink: /user-guide/accounts/monitor-account-usage.html
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - account-utilization
contributors:
  - boofinka
---

If your account is nearing its daily quota, Logz.io sends an email alert to account administrators.
This is fine for most situations, but what if you want to be more proactive in managing your accounts?
For this, we have _account utilization metrics_ and the ability to save log size with each log.

## What are account utilization metrics and log size?

Account utilization metrics capture a snapshot of your account usage in regular increments—every 10, 30, or 60 minutes—depending on your settings.
Logz.io starts logging your usage after your account reaches 10 MB in size.
You can find these logs in Kibana when you filter for the `logzio_account_utilization` log type.

## What happens when I save log size?

When you enable saving log size, a new field is attached to each log that Logz.io receives.
This new field is called `LogSize`, and it contains the size of the log line in bytes or kilobytes.

Kibana doesn't recognize `LogSize` as a number right away.
You can fix this by clicking <i class="fas fa-sync-alt"></i> (refresh mapping) for `LogSize` in Kibana.
You'll need to do this for each account where you enabled `LogSize`.

## Enabling account utilization metrics and log size

![Sub account settings]({{site.baseurl}}/images/accounts/utilization--save-account-utilization-metrics.png)

Account utilization metrics and log size are set per individual account.
You can find these settings on the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page below **Advanced options**.
This page is available only from your main account—you won't be able to make this change from a sub account.

<div class="info-box note">
  Even though you need to be an account admin to enable this setting, everyone who has access to your Logz.io account is able to see the resulting logs.
</div>

### Visualizing utilization with an ELK app

We offer a preconfigured dashboard for account utilization metrics.
You can find this dashboard in the [ELK Apps](https://app.logz.io/#/dashboard/apps) by searching for "data volume dashboard".

![Data Volume Dashboard ELK app]({{site.baseurl}}/images/accounts/utilization--elk-apps-data-volume-dashboard.png)

If you recently enabled account utilization metrics, you may need to wait up to 60 minutes before this data shows up in Kibana.