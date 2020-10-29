#### Configuring a correlated {{include.name}}
{:.no_toc}

To correlate events, we need to configure 2 search queries, each with its own trigger condition. For the {{include.name}} to trigger, both conditions must be statified in their selected time frames, respectively.

If you opt to join the queries, you must also select aggregation criteria and fields to join. When the queries are joined, the values of the join fields must also match for the {{include.name}} to trigger.

This tutorial assumes you are familiar with the process of configuring a single-query {{include.name}}.
It explains what's different when correlating queries.


1. toc list
{:toc}

<div class="tasklist">

##### Name the {{include.name}}

The name should convey the significance of the combined event for both queries together.

For example, "Brute-force from malicious address followed by malware download".

##### Add another query

Click **+ Add another query** to add Query 2 and the join option.

![Add another query](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/add-another-query.png)

##### Query 1 & Query 2

The form now has 2 sections: Query 1 & Query 2.

There is no significance to their order. If Query 1 and Query 2 are interchanged, the results will be the same.

The following criteria are similar for both the single-query and multi-query {{include.name}}:

* Fill in the free search and filtering criteria as usual.
* You have the option to aggregate results for as many as 3 fields. Select **group by** fields from the dropdown list.
    
  Each group-by function takes all field values and divides them into buckets. The buckets are dynamically built - one per unique field value. The results in each bucket are then counted.

  Order matters. When grouping by multiple fields, the function runs from first to last.
* Select the **Accounts to search**.
* You can preview the results in Kibana Discover for each query independently. Click **Preview in Kibana** to open the results for the past 24 hours in another tab.
* If you change your mind, you can delete either of the queries. Click **X Delete query** to return to a single-query form.

![empty alert form with 2 queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/query1and2.png)

##### Group by fields and joining the queries (_optional_)

If you opt to join the queries, you must also select aggregation criteria and fields to join. When the queries are joined, the values of the join fields must match for the {{include.name}} to trigger.

* First, select the **group by** fields for each of the queries. You can select as many as 3.
* Now that your querie results have group by aggregations defined, you can join them.
* Select the join pairs you want to enable. You can enable as many as 3 pairs.

Available join options are automatically shown. The suggestions are ordered pairs of the group by fields.

![Alert with 2 queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-queries.png)

When joined, the {{include.name}} looks for values that are common to both group by fields. This means the {{include.name}} will only trigger if it finds matching values for the joined field pairs.

![Add a group by field function for both queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-join-queries.png)

Joined fields are indicated by the **link icon <i class="fas fa-link"></i>**.

When the {{include.name}} triggers, the event log will have the field `logzio-alert-join-values` showing the join function.

##### Trigger conditions

When an {{include.name}} has 2 queries, you can set a single condition for each of your queries, and a single severity.

As usual, each query can take a different time frame and a different condition for a selected field.

![Conditions and severity for correlated {{include.name}}](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-trigger-conditions.png)

The {{include.name}} conditions are evaluated over regular intervals. The period for evaluation can range between a minimum of 5 minutes and a maximum of 24 hours/1 day.

##### Notification description

It's a good idea to add a description that works for both queries and what they capture together.

##### Default output for aggregations/join values

* If the {{include.name}} includes any aggregations or group by fields, the notification output defaults to the group by/aggregated fields.

* If the {{include.name}} includes a join function, the output will default to a table that contains all buckets of the shared values in the join fields. For example:

    | Joined value | Q1 | Q2 |
    |---|---|---|
    |value1       |       10  |  15|
    |value2       |       6   |  3 |


Otherwise, you control which data to include. You have the option to send the data
as **JSON** or as a **Table**. [Learn more](/user-guide/alerts/configure-an-alert.html#output-format)

![Notifications are auto-configured](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-output-options.png)

##### Save it!

Click **Save** at the top of the form to save your {{include.name}}.

##### Working with correlated {{include.name}}s

Correlated {{include.name}}s are indicated by the 2-part condition set, as shown below.

![2 conditions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-conditions.png)

When a correlated {{include.name}} triggers, the event is split into 2 logs - 1 per query, each with its own **Investigate** drilldown link. The event logs will be numbered 1/2 and 2/2, respectively.

If the {{include.name}} has a join function, there is also a field `logzio-alert-join-values`, indicating the matching values that fulfilled the join field condition.
In this case, the drilldown process involves another step.

* First, click **<i class="fas fa-search-plus"></i>** to filter in on the field `logzio-alert-join-values`. 
* Next, click **Investigate** on each of the associated event logs, to look into the raw logs for the details that led to the {{include.name}} triggering.

</div>
