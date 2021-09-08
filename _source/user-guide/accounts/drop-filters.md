---
layout: article
title: Drop filters
permalink: /user-guide/accounts/drop-filters/
flags:
  admin: true
  logzio-plan: pro
tags:
  - drop-filters
contributors:
  - danielberman
  - imnotashrimp
---

Drop filters offer a great way to filter out logs from an account to help manage your account volume and lower costs.

Drop filters evaluate logs for field:value exact matches. Incoming logs that match your account's active drop filters will not be indexed and will not appear in your Kibana account. Dropped logs are not searchable, cannot trigger alerts, and will not appear in dashboards, reports, or anything else. However, dropped logs will be archived if you are archiving logs.

You can turn drop filters on and off, as often as you like, making them ideal for logs that are only needed sometimes.

In general, drop filters are recommended for logs that are needed infrequently, while logs that are never needed should not be shipped at all.


![Drop filters list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/drop-filters/drop-filters-list.png)

To get to drop filters,
select [**Logs > Manage Data > Drop filters**](https://app.logz.io/#/dashboard/tools/drop-filters)
from the navigation menu.



## How much data can I filter?

* You can use Drop filters to drop as much as twice your plan's daily volume.
  In other words, drop filters can drop up to 200% of your daily volume.

  _For instance_:
  If you have 50 GB daily volume,
  you can index 50 GB and filter 100 GB per day.

* You can add up to 10 drop filters.

## Deactivating drop filters

Your account needs to have enough space
to accommodate logs
when you deactivate a drop filter.
If you expect to go over your daily limit,
please contact <a class="intercom-launch" href="mailto:help@logz.io">the Support team or your account manager</a>.

## Some important notes on drop filtering {#some-important-notes}

* **Dropped logs can't be searched in Kibana and they can't trigger alerts.** \\
  All incoming logs are compared to your drop filters.
  Logs that meet your filter criteria are dropped,
  meaning they won't be parsed and indexed.

* **Dropped logs are still archived.** \\
  If you have [archiving]({{site.baseurl}}/user-guide/archive-and-restore/configure-archiving.html) enabled,
  your logs will be archived before they're dropped.
  This means that you can restore from your archives,
  even if the logs didn't originally make it to Kibana.

* **Restored logs pass through drop filters.** \\
  If you're restoring logs from an archive,
  turn off drop filters if you want them to be indexed in your Kibana account.
  When restoring,
  always make sure that the logs you need are not filtered out using drop filters.

#### To set up a drop filter

To get started,
click **<i class="li li-plus"></i> Add drop filter**
to open the _New drop filter_ form.

![New drop filter form](https://dytvr9ot2sszz.cloudfront.net/logz-docs/drop-filters/new-drop-filter.png)

<div class="tasklist">

##### Choose a log type

If you choose a **Log type**,
only logs of that type are dropped.

To include all log types, leave **Log type** blank.

##### Add fields to filter

Add up to 3 **Field**:**Value** pairs to filter.
Each pair must be an exact match.
Drop filters are case sensitive.

###### An example

Logs from a Docker container might contain this field-value pair:

```json
{ "docker.container.name": "system-logs" }
```

Those logs are only filtered
if we set **Field** to `docker.container.name`
and **Value** to `system-logs`.

If we set **Value** to anything else—such as `system`—those logs
are not filtered.

##### Confirm and save

Before saving, it's important to know that all the logs that meet
your filter criteria will be dropped.

If you have [Archiving]({{site.baseurl}}/user-guide/archive-and-restore/configure-archiving.html) enabled,
your logs will be archived before they're dropped.

Select the confirmation check box,
and then click **Apply the filter**.

</div>
