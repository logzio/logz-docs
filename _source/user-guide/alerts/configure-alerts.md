---
layout: article
title: Configure an alert
permalink: /user-guide/alerts/configure-an-alert.html
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - imnotashrimp
---

When you set out to create an alert,
you'll need to start with a query.
If you haven't formed your query yet,
we recommend starting off in Kibana
so you can see the results of the query in real time.

Otherwise, if you already have a query and filters,
you can create a blank alert
from the top menu (**Alerts & Events > New alert**)
or from the _Alert definitions_ page

Community plans have a maximum of 50 alerts.
{:.info-box.note}

#### To create an alert in Kibana

![Kibana 7 search bar]({{site.baseurl}}/images/kibana/kibana-7-search-bar.png)

Refine your search query and filters,
and review the returned logs
to make sure you got the expected results.

Alerts support Lucene query language only.
You won't be able to create an alert
from a search written in Kibana Query Language (KQL).
{:.info-box.important}

Once you're happy with your alert,
click **Create alert** (above the query bar).
You're taken to the _New alert_ page.

Continue with [To configure an alert](#to-configure-an-alert).

#### To configure an alert {#to-configure-an-alert}

<div class="tasklist">

##### Name the alert

Give your alert a meaningful name.

If your alert is triggered,
the name is used as the email subject or Slack heading.
A helpful name gives the quick need-to-know-now information
and doesn't use unnecessary words.

##### Edit the search settings

###### Query and filters

![Alert query and filters]({{site.baseurl}}/images/alerts/query-and-filters.png)

If you need to change your alert query and filters,
do that now.

Your query is an important source of information
when you're investigating a triggered alert.
Shorten your query by using filters whenever you can.

If you use an invalid query,
the alert will be automatically disabled.
To make sure it's valid,
test your query in Kibana.
{:.info-box.important}

###### Group by

![Alert group by settings]({{site.baseurl}}/images/alerts/alerts--group-by.png)

Moving down, you'll come to the **Group by** setting next.

With _Group by_, you can choose up to 3 fields to group.
The alert will return the aggregated results for each group.

Careful, though: The order of these fields matters.
Results are grouped by
the leftmost field, then the center field, then the right field.
In other words, the image above groups results by
continent, then country, then city.
If we had reversed the order (city, then country, then continent),
it would likely generate unintended results.

###### Accounts to search

![Accounts to search setting]({{site.baseurl}}/images/alerts/accounts-to-search.png)

Next you'll choose the _Accounts to search_.

If you choose **All accounts**,
this alert will query the logs in all the accounts it has access to.
This will include future accounts.

To limit the alert to a set list of accounts,
click **Just these accounts**,
and add the accounts you want.
This list is always limited to your selection,
so you'll need to manually update the list if you need it to change.

##### Set threshold and severity levels

![Alert trigger thresholds]({{site.baseurl}}/images/alerts/alerts--trigger-settings.png)

Set your threshold and severity levels in the _Trigger if..._ section.

Click **Add a threshold** to set up to 5 threshold levels,
each with its own severity tag.

##### _(Optional)_ Set notification details

###### Description and tags

![Alert description and tags]({{site.baseurl}}/images/alerts/description-and-tags.png)

The **Description** is visible on the _Alert definitions_ page.
It's also included with emails and Slack messages when the alert is triggered.
We recommend making your description helpful to recipients,
like telling them how to fix the issues that led to the alert.

The **Tags** are useful for filtering the _Alert definitions_ page.

###### Who to send it to

![Recipients and suppress notifications]({{site.baseurl}}/images/alerts/recipients-and-suppress.png)

If you want to send notifications or emails when the alert is triggered,
choose notification endpoints.
This isn't required, though—triggered alerts are still logged and searchable in Kibana.

Choose the endpoints or email addresses to notify under _Who to send it to_.
If you need help adding a new endpoint,
see [_Notification endpoints_]({{site.baseurl}}/user-guide/integrations/endpoints.html).

Choose a time period to suppress notifications.

When notifications are suppressed,
Logz.io will continue to log triggered alerts without sending notifications.
You can search triggered alert logs at any time.
{:.info-box.note}

###### Output format

![Output table]({{site.baseurl}}/images/alerts/output-table.png)

You can choose to send **All fields** in JSON format,
or **Custom fields** as a table or JSON.

If you added any groups or used an aggregated trigger condition
(minimum, maximum, average, or sum),
the output will use only grouped or aggregated fields.
To change these fields, you'll need to change your **Group by** or **Trigger if...** settings.
{:.info-box.note}

If you choose a table,
click **<i class="li li-plus"></i> Add a field** to add a column to the table.
You can optionally sort each field or filter the output with a regular expression.

##### Save it!

Click **Save** to save your alert.
If the thresholds are passed and the alert is triggered,
Logz.io will log the alert and send the configured notifications.

</div>
