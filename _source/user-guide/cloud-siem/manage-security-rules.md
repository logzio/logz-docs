---
layout: article
title: Manage security rules
permalink: /user-guide/cloud-siem/manage-security-rules.html
flags:
  logzio-plan: pro
tags:
  - security-analytics
  - security-rules
contributors:
  - shalper
  - imnotashrimp
  - danielberman
---

Security rules help you connect the dots between your data sources and events that could indicate a security threat or breach.
Your Cloud SIEM account comes preconfigured
with security rules for different attack types
and security use cases.

You can create new security rules to supplement the built-in rules.
You can also update any preconfigured rule at any time, including adding a notification endpoint (like email or Slack) or changing trigger thresholds.


#### To configure an rule

<div class="tasklist">

##### Name the rule

Give your rule a meaningful name. When your rule triggers, its name is used as the email subject or notification heading.

##### Search components

Next, set the search components. This determines which logs to look for and in which accounts.

![rule group by settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/configure-security-rule.png)

###### Query and filters

You can use any combination of filters and a search query. Note the following:

* Use a Lucene search query.
  * You have the option to use wildcards.
  * Kibana Query Language (KQL) is not supported.

* All Kibana Filters are accepted, including: **is, is not, is one of, is not one of, exists, does not exist**.

Once you're done refining your search query and filters, you can
click **Preview in Kibana** to open Kibana Discover in another tab. It can help to review the returned logs and make sure you get the expected results.

###### Group-by (order matters!)

You have the option to apply **group by** operators to up to 3 fields. If you use this option, the rule will return the aggregated results.

The order of group-by fields matters. Results are grouped in the order in which the group-by fields are added. (The fields are shown from first to last from Left-To-Right.)

For example, the following will group results by continent, then country, then city:

![Ordered group by field functions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/ordered-group-by.png)

If we reverse the order (city, then country, then continent),
it will likely generate unintended results.

###### Accounts to search

Next, select the **Accounts to search**. An account is the equivalent of an Elasticsearch index.

* If you select **All accounts**, the rule will query the logs in all the accounts it has access to. It will automatically include any accounts added in the future.

* You can select specific accounts. Select **Just these accounts** and add the relevant accounts from the dropdown list.

##### Set threshold and severity levels

Set your threshold and severity levels.

In the _Trigger if..._ section, click **Add a threshold** to set as many as 5 threshold conditions, each with its own severity tag.

![rule trigger thresholds](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts--trigger-settings.png)

##### _(Optional)_ Set notification details

###### Description and tags

![Rule description and tags](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/description-and-tags.png)

The **Description** will be included in any emails, Slack messages, and other notifications when the rule is triggered.
We recommend making your description helpful to recipients,
like telling them how to fix the issues that led to the rule.

The **Tags** are useful for filtering the _Rule definitions_ page.

###### Who to send it to

![Recipients and suppress notifications](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/recipients-and-suppress.png)

If you want to send notifications or emails when the rule is triggered,
choose notification endpoints.
This isn't required, though—triggered rules are still logged and searchable in Kibana.

Choose the endpoints or email addresses to notify under _Who to send it to_.
If you need help adding a new endpoint,
see [_Notification endpoints_]({{site.baseurl}}/user-guide/integrations/endpoints.html).

To limit how often recipients are notified,
choose a time period to suppress notifications.

When notifications are suppressed,
Logz.io will continue to log triggered rules without sending notifications.
You can search triggered rule logs at any time.
{:.info-box.note}

###### Output format

When triggered, the rule will send out a notification with sample data.

If the rule includes any aggregation or group by rule, the notification output defaults to the group by/aggregated fields.

Otherwise, you control the data format. It can be either **JSON** or a **Table**.

  * If you select JSON, you can choose to send all fields or select fields.
  * If you select a table, you can send as many as 7 fields.

![Output table](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/output-json-custom-fields.png)

To be selective about the output, click **<i class="li li-plus"></i> Add a field** and select a field from the dropdown list. If you want, you can also add a sorting rule.

###### Using REGEX filters

You can "clean" the data in the notification using REGEX filters. If you add a REGEX filter, it will select for the data you want to include in the rule output.

There is no danger that a REGEX filter will disrupt the notification.

* If the REGEX matches the relevant data, you will see only the desired results.
* If the REGEX _does not_ match, the filter will be disregarded and the rule output will include the full content of the field.

##### Save it!

Click **Save** to save your rule.
Whenever the thresholds are met, the rule will trigger,
and Logz.io will log the security event, and send out a notification, if configured.

</div>













#### To create a new security rule

![Query bar in the Research page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/security-analytics--research-query-bar.png)

##### Set your query in Kibana

In the [Research](https://app.logz.io/#/dashboard/security/research) page,
type a query in the query bar, and press Enter.
Review the results in the histogram and the document table,
and make sure your query returned the expected results.

Click **Create Rule** (to the right of the query bar).
The _Create a New Rule_ page is shown.

Continue with [To configure a security rule](#to-configure-a-security-rule).

#### To configure a security rule {#to-configure-a-security-rule}

![Configure security rule](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/security-analytics--configure-correlation-rule.png)

<div class="tasklist">

##### Name and tag the rule

Type a **Name** and a detailed **Description**.

Add **Tags** to help categorize this rule.

##### _(Optional)_ Edit the search settings

If you need to, change your **Query**.

If you use an invalid query,
the rule will be automatically disabled.
Run your query in Kibana so you can be sure you're getting the expected results.
{:.info-box.important}

##### _(Optional)_ Edit group by settings

![Security rule group by settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/security-analytics--correlation-rule-group-by.png)

Click **Add group by** to add up to 3 groups.

In the **Select Field** list,
choose a field to group by.

To limit the available fields,
choose a log type from the **Filter by type** list.
To show fields for all log types, choose **Clear filter**.

##### Set threshold and severity levels

Set your threshold and severity levels in the **Trigger** section.

![Security rule trigger settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/security-analytics--correlation-rule-trigger-settings.png)

##### _(Optional)_ Set recipients

If you want to receive notifications or emails when the rule is triggered,
choose an endpoint.
If you don’t choose an endpoint, events will still be logged:

Choose the endpoints or email addresses to notify.
If you need help adding a new endpoint,
see [_Notification endpoints_]({{site.baseurl}}/user-guide/integrations/endpoints.html).

Choose a time period to suppress notifications.

Click **Save** to save your rule.

If the threshold is passed and the rule is triggered, Logz.io logs the event and sends the configured notifications.

</div>