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

Community plans have a limit on the number of alerts that may be enabled. See the official [pricing page](https://logz.io/pricing/) for details.
{:.info-box.note}

#### Configuring an alert

<div class="tasklist">

##### Name the alert

Give your alert a meaningful name. When your alert triggers, its name is used as the email subject or notification heading.

##### Search components

Next, set the search components. This determines which logs to look for and in which accounts.

If you intend to create a correlated alert with 2 queries, see the [this guide](/user-guide/alerts/correlated-alert/).


![Alert group by settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alert-search-component.png)

###### Query and filters

You can use any combination of filters and a search query. Note the following:

* Use a Lucene search query.
  * You have the option to use wildcards.
  * Kibana Query Language (KQL) is not supported.

* All filters are accepted, including: **is, is not, is one of, is not one of, exists, does not exist**.


Once you're done refining your search query and filters, you can
click **Preview in Kibana** to open Kibana Discover in another tab. It can help to review the returned logs and make sure you get the expected results.

###### Group-by (order matters!)

You have the option to apply **group by** operators to up to 3 fields. If you use this option, the alert will return the aggregated results.

The order of group-by fields matters. Results are grouped in the order in which the group-by fields are added. (The fields are shown from first to last from Left-To-Right.)

For example, the following will group results by continent, then country, then city:

![Ordered group by field functions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/ordered-group-by.png)

If we reverse the order (city, then country, then continent),
it will likely generate unintended results.

###### Accounts to search

Next, select the **Accounts to search**. An account is the equivalent of an Elasticsearch index.

* If you select **All accounts**, the alert will query the logs in all the accounts it has access to. It will automatically include any accounts added in the future.

* You can select specific accounts. Select **Just these accounts** and add the relevant accounts from the dropdown list.

##### Set threshold and severity levels

Set your threshold and severity levels.

In the _Trigger if..._ section, click **Add a threshold** to set as many as 5 threshold conditions, each with its own severity tag.

![Alert trigger thresholds](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts--trigger-settings.png)

##### _(Optional)_ Set notification details

###### Description and tags

![Alert description and tags](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/description-and-tags.png)

The **Description** is visible on the _Alert definitions_ page.
It's also included with emails and Slack messages when the alert is triggered.
We recommend making your description helpful to recipients,
like telling them how to fix the issues that led to the alert.

The **Tags** are useful for filtering. They can be used to create filtered visualizations and dashboards or to filter the _Alert definitions_ page.

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

###### Output format & content

When triggered, the alert will send out a notification with sample data.

Sample data can be sent in either **JSON** or **Table** formats. Toggle the button to select your preferred format.

If the alert includes any aggregation or group by field, the notification output will send the aggregated results by default.

To be selective about the output, click **<i class="li li-plus"></i> Add a field** and select a field from the dropdown list. If you want, you can also add a sorting rule and a regex filter. [Learn more about regex filters for alert notifications](/user-guide/alerts/regex-filters.html)

  * If you select the JSON format, you can send the full log (with all fields) or select as many as 7 fields.
  * If you select a table, you can send as many as 7 fields.

![Output table](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/output-json-custom-fields.png)

##### Save it!

Click **Save** to save your alert.
If the thresholds are passed and the alert is triggered,
Logz.io will log the alert and send the configured notifications.

</div>
