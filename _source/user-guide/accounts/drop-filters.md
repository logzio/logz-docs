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

Drop filters offer a quick way to "drop" some logs before they're indexed.
Once you've enabled drop filters, logs are evaluated for whole string matches in the fields you set.
Logs that match your filter's settings won't be indexed.

You can turn each drop filter off and on,
making it ideal for logs that you need at some times but not always.

![Drop filters list]({{site.baseurl}}/images/drop-filters/drop-filters-list.png)

To get to drop filters,
select [**<i class="li li-gear"></i> > Tools > Drop filters**](https://app.logz.io/#/dashboard/tools/drop-filters)
from the top menu.

You can add up to 10 drop filters.
{:.info-box.note}

## How much data can I filter?

You can filter up to your plan's daily volume, times 2.

For instance:
If you have 50 GB daily volume,
you can index 50 GB and filter 100 GB per day.
So you could ship 150 GB of logs in a day,
as long as you're filtering 100 of those GB
and keeping your index within your 50 GB limits.

Your account needs to have enough space
to accommodate logs
when you deactivate a drop filter.
If you expect to go over your daily limit,
please contact <a class="intercom-launch" href="mailto:help@logz.io">the Support team or your account manager</a>.
{:.info-box.important}

Drop filters are a great way to help manage your account volume.
However, we recommend using drop filters for logs that are sometimes needed
and not shipping logs that are never needed.

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

* **Restored logs still pass through drop filters.** \\
  If you're restoring archives,
  those logs will still be dropped
  if they meet any drop filter's conditions.
  When restoring,
  always make sure logs you need won't be filtered.

###### To set up a drop filter

To get started,
click **<i class="li li-plus"></i> Add drop filter**
to open the _New drop filter_ form.

![New drop filter form]({{site.baseurl}}/images/drop-filters/new-drop-filter.png)

1.  Choose a log type

    If you choose a **Log type**,
    only logs of that type will be dropped.

    To include all log types, leave **Log type** blank.

2.  Add fields to filter

    Add up to 3 **Field**-**Value** pairs to filter.
    Each pair must be an exact match.
    Drop filters are case sensitive.

    An example
    {:.inline-header}

    Logs from a Docker container might contain this field-value pair:

    ```json
    { "docker.container.name": "system-logs" }
    ```

    Those logs will be filtered
    only if we set **Field** to `docker.container.name`
    and **Value** to `system-logs`.

    If we set **Value** to anything else—such as `system`—those logs
    won't be filtered.

3.  Confirm and save

    Before saving, it's important to know that all logs that meet
    your filter criteria will be dropped.

    If you have [Archiving]({{site.baseurl}}/user-guide/archive-and-restore/configure-archiving.html) enabled,
    your logs will be archived before they're dropped.

    Select the confirmation check box,
    and then click **Apply the filter**.
{:.tasklist.firstline-headline}
