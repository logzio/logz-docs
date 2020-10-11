---
layout: article
title: Configure an alert
permalink: /user-guide/alerts/configure-an-alert.html
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
  - imnotashrimp
---

You can set up Logz.io log alerts to automatically get notified about issues that demand attention.

Community plans can have only a limited number of alerts enabled at once. See the official [pricing page](https://logz.io/pricing/) for details.
{:.info-box.note}

#### To configure an alert

<div class="tasklist">

##### Name the alert

Give your alert a meaningful name. When your alert triggers, its name is used as the email subject or notification heading.

##### Search components

Next, set the search components. They determine which logs to look for and in which account.

![Alert group by settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alert-search-component.png)

###### Query and filters

You can use any combination of filters and a search query. Note the following:

* Use a Lucene search query.
  * You have the option to use wildcards.
  * Kibana Query Language (KQL) is not supported.

* All Kibana Filters are accepted, including: **is, is not, is one of, is not one of, exists, does not exist**.


Once you're done refining your search query and filters,
click **Preview in Kibana** to review the returned logs
and make sure you get the expected results.


###### Group-by (order matters!)

You have the option to apply **group by** operators to up to 3 fields. If you use this option, the alert will return the aggregated results.

The order of group-by fields matters. Results are grouped in the order in which the group-by fields are added. (The fields are shown from first to last from Left-To-Right.)

For example, the following will group results by continent, then country, then city:

![Alert group by settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts--group-by.png)

That's because the results are aggregated in the following order:

1. geoip.continent_code
2. geoip.country_name
3. geoip.city_name

If we had reversed the order (city, then country, then continent),
it would likely have generated unintended results.

###### Accounts to search

Next, select the **Accounts to search**. An account is the equivalent of an Elasticsearch index.

* If you select **All accounts**, the alert will query the logs in all the accounts it has access to. It will automatically include any accounts added in the future.

* You can select specific accounts. Select **Just these accounts** and add the relevant accounts from the dropdown list.

##### Set threshold and severity levels

![Alert trigger thresholds](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts--trigger-settings.png)

Set your threshold and severity levels in the _Trigger if..._ section.

Click **Add a threshold** to set up to 5 threshold levels,
each with its own severity tag.

##### _(Optional)_ Set notification details

###### Description and tags

![Alert description and tags](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/description-and-tags.png)

The **Description** is visible on the _Alert definitions_ page.
It's also included with emails and Slack messages when the alert is triggered.
We recommend making your description helpful to recipients,
like telling them how to fix the issues that led to the alert.

The **Tags** are useful for filtering the _Alert definitions_ page.

###### Who to send it to

![Recipients and suppress notifications](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/recipients-and-suppress.png)

If you want to send notifications or emails when the alert is triggered,
choose notification endpoints.
This isn't required, though—triggered alerts are still logged and searchable in Kibana.

Choose the endpoints or email addresses to notify under _Who to send it to_.
If you need help adding a new endpoint,
see [_Notification endpoints_]({{site.baseurl}}/user-guide/integrations/endpoints.html).

To limit how often recipients are notified,
choose a time period to suppress notifications.

When notifications are suppressed,
Logz.io will continue to log triggered alerts without sending notifications.
You can search triggered alert logs at any time.
{:.info-box.note}

###### Output format

Recipients will receive the notification with sample data,
so you'll need to choose whether to send the data
as **JSON** or in a **Table**.

![Output table](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/output-json-custom-fields.png)

If you're sending a sample JSON,
you can include **All fields** or **Custom fields**.
If you're sending a table with sample data,
you can include up to 7 fields.

For custom fields,
click **<i class="li li-plus"></i> Add a field** to add the field to your output.
You can optionally sort by one field or filter the samples with a regular expression.

If you added any groups or used an aggregated trigger condition
(minimum, maximum, average, or sum),
the output will include only the grouped or aggregated fields.
To change these fields,
you'll need to first change your **Group by** or **Trigger if...** settings.
{:.info-box.note}

##### Save it!

Click **Save** to save your alert.
If the thresholds are passed and the alert is triggered,
Logz.io will log the alert and send the configured notifications.

</div>
