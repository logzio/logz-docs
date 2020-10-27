---
layout: article
title: Correlate queries
permalink: /user-guide/alerts/correlated-alert/
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
---

Some security situations are best captured by correlating events. These events may be simultaneous or occur in sequence.

For example, an email attachment followed by a malware infection, or privilege elevation followed by a configuration change, or a bruteforce attack followed by a successful login. These are all examples where correlating events identify high severity security events more strongly compared with the discrete events alone.

#### Configuring a correlated alert
{:.no_toc}

To correlate logs, we need to configure 2 search queries, select an aggregation criteria, and join the queries.
This tutorial assumes you are familiar with the process of configuring a single-query alert.
It explains what's different when correlating queries.

1. toc list
{:toc}

<div class="tasklist">

##### Name the alert

The name should convey the significance of the combined security event for both queries together.

For example, "Brute-force from malicious address followed by malware download".

##### Add another query

Click **+ Add another query** to add Query 2 and the join option.

![Add another query](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/add-another-query.png)

##### Query 1 & Query 2

The form now has 2 sections: Query 1 & Query 2.

There is no significance to their order. If Query 1 and Query 2 are interchanged, the results will be the same.

The following criteria are similar for both the single-query and multi-query alert:

* Fill in the free search and filtering criteria as usual.
* Select the **Accounts to search**.
* You can preview the results in Kibana Discover for each query independently. Click **Preview in Kibana** to open the results for the past 24 hours in another tab.
* If you change your mind, you can delete either of the queries. Click **X Delete query** to return to a single-query form.

![empty alert form with 2 queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/query1and2.png)

##### Group by fields (_required_)

To correlate the logs found by multiple queries, we'll need to run a join function on the aggregated results. The first step is to aggregate results using **group by** rules.

Select at least 1 **group by** field for each of the queries.

Each group-by function takes all field values and divides them into buckets. The buckets are dynamically built - one per unique field value. The results in each bucket are then counted.

Order matters. When grouping by multiple fields, the function runs from first to last.

![Alert with 2 queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-queries.png)

##### Join the queries (_strongly recommended_)

Now that your queries have group by aggregation rules defined, you can join the queries.

Joining allows you to run the alert on the intersection between two queries. (It's like an SQL Inner Join function that looks for values that are common to both fields.)

Available join options are automatically shown. The suggestions are ordered pairs of the group by fields.

Select the pairs you want to enable. You can join as many as 3 group by fields.

![Add a group by field function for both queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-join-queries.png)

Joined fields are indicated by the **link icon <i class="fas fa-link"></i>**.

When the alert triggers, the event log will have the field `logzio-alert-join-values` showing the join function.


##### Trigger conditions

When the alert has 2 queries, you can set a single condition for each of your queries, and a single severity level.

![Conditions and severity for correlated alerts](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-trigger-conditions.png)

The alert conditions are evaluated over regular intervals. The period for evaluation can range between a minimum of 5 minutes and a maximum of 24 hours/1 day.

##### Notification output

It's a good idea to add a description that works for both queries and the event they capture together.

The notification will be a log count of the results, aggregated by the values of the group by fields.

You have the option to send the data
as **JSON** or as a **Table**.

![Notifications are auto-configured](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-output-options.png)

##### Save it!

Click **Save** at the top of the form to save your alert.

##### Working with correlated alerts

Correlated alerts are indicated by the 2-part condition sets, as shown below.

![Add another query](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-conditions.png)

When a correlated alert triggers, the event will be split into 2 logs - 1 per query. The alert log will be numbered as 1/2 and 2/2, respectively.

You can click **Investigate** on each of the associated event log, to look into the details that led to the alert triggering.

![Investigate correlated events](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-event-logs.png)

</div>
