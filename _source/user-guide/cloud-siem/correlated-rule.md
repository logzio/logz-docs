---
layout: article
title: Correlate queries
permalink: /user-guide/siem/security-correlated-queries/
flags:
  logzio-plan: enterprise
tags:
  - alerts
  - rules
  - kibana alerts
contributors:
  - shalper
---

Some security situations are best captured by correlating events. These events may be simultaneous or occur in sequence.

Correlated events are instrumental for reducing false-positives. By defining a more specific use case that contains 2 scenarios, the trigger can be more sensitive and reduce unwanted noise.

For example, an email attachment followed by a malware infection, or privilege elevation followed by a configuration change, or a brute force attack followed by a successful login. These are all examples where correlating events identify high severity security events more strongly compared with the discrete events alone.

#### Configuring a correlated rule
{:.no_toc}

To correlate events, we need to configure 2 search queries, each with its own trigger condition. For the rule to trigger, both conditions must be statified in their selected time frames, respectively.

If you opt to join the queries, you must also select aggregation criteria and fields to join. When the queries are joined, the values of the join fields must also match for the rule to trigger.

This tutorial assumes you are familiar with the process of configuring a single-query rule.
It explains what's different when correlating queries.

1. toc list
{:toc}

<div class="tasklist">

##### Name the rule

The name should convey the significance of the combined security event for both queries together.

For example, "Brute-force from malicious address followed by malware download".

##### Add another query

Click **+ Add another query** to add Query 2 and the join option.

![Add another query](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/add-another-query.png)

##### Query 1 & Query 2

The form now has 2 sections: Query 1 & Query 2.

There is no significance to their order. If Query 1 and Query 2 are interchanged, the results will be the same.

The following criteria are similar for both the single-query and multi-query rule:

* Fill in the free search and filtering criteria as usual.
* You have the option to aggregate results for as many as 3 fields. Select **group by** fields from the dropdown list.
    
  Each group-by function takes all field values and divides them into buckets. The buckets are dynamically built - one per unique field value. The results in each bucket are then counted.

  Order matters. When grouping by multiple fields, the function runs from first to last.
* Select the **Accounts to search**.
* You can preview the results in Kibana Discover for each query independently. Click **Preview in Kibana** to open the results for the past 24 hours in another tab.
* If you change your mind, you can delete either of the queries. Click **X Delete query** to return to a single-query form.

![empty rule form with 2 queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/query1and2.png)


##### Group by fields and joining the queries (_optional_)

If you want to join the queries, you will need to join one or more **group by fields**.

First, select the **group by** fields for each of the queries. You can select as many as 3.
Now that your queries have group by aggregation rules defined, you can join them.

Select the join pairs you want to enable. You can enable as many as 3 pairs.

Available join options are automatically shown. The suggestions are ordered pairs of the group by fields.

![Rule with 2 queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-queries.png)

When joined, the rule looks for values that are common to both group by fields. This means the rule will only trigger if the joint conditions are met.

![Add a group by field function for both queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-join-queries.png)

Joined fields are indicated by the **link icon <i class="fas fa-link"></i>**.

When the rule triggers, the field `logzio-alert-join-values` in the event log will show the matching values that resulted in a correlation.

##### Trigger conditions

When a rule has 2 queries, you can set a single condition for each of your queries, and a single severity.
As usual, each query can take a different time frame and a different condition for a selected field.

![Conditions and severity for correlated rules](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-trigger-conditions.png)

The rule conditions are evaluated over regular intervals. The period for evaluation can range between a minimum of 5 minutes and a maximum of 24 hours/1 day.

##### Notification output

It's a good idea to add a description that works for both queries and the event they capture together.

If the alert includes any aggregations or group by rules, the notification output defaults to the group by/aggregated fields. Otherwise, you control which data to include.

You have the option to send the data
as **JSON** or as a **Table**. [Learn more](/user-guide/cloud-siem/manage-security-rules.html#output-format)

![Notifications are auto-configured](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-output-options.png)

##### Save it!

Click **Save** at the top of the form to save your rule.

##### Working with correlated rules

Correlated rules are indicated by the 2-part condition sets, as shown below.

![Add another query](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-conditions.png)

When a correlated rule triggers, the event is split into 2 logs - 1 per query, each with its own **Investigate** drilldown link. The rule logs will be numbered 1/2 and 2/2, respectively.

If the rule has a join function, there is also a field `logzio-alert-join-values`, indicating the matching values that fulfilled the join field condition.
In this case, the drilldown process involves another step. 

* First, click **<i class="fas fa-search-plus"></i>** to filter in on the field `logzio-alert-join-values`. 
* Next, click **Investigate** on each of the associated event logs, to look into the raw logs for the details that led to the rule triggering.

![Investigate correlated events](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-event-logs.png)

</div>
