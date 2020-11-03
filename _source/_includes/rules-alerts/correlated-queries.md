#### Configuring a correlated {{include.name}}
{:.no_toc}

To correlate events, we need to configure 2 search queries, each with its own trigger condition. For the {{include.name}} to trigger, both conditions must be satisfied.

If you opt to join the queries, you must also select aggregation criteria and fields to join. When the queries are joined, the values of the join fields must match for the {{include.name}} to trigger.

This tutorial assumes you are familiar with the process of configuring a [single-query {{include.name}}]({{include.link}}).
It explains what's different when correlating queries.


1. toc list
{:toc}

<div class="tasklist">

##### Name the {{include.name}}

The name should convey the significance of the combined event for both queries together.

For example, "Brute-force attack from malicious address followed by malware download".

##### Add another query

Click **+ Add another query** to add the option to correlate queries.

![Add another query](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/add-another-query.png)

##### Query 1 & Query 2

The form now has 2 sections: Query 1 & Query 2.

There is no significance to their order. If Query 1 and Query 2 are interchanged, the results will be the same.

The following criteria are similar for both the single-query and multi-query {{include.name}}:

* Fill in the free search and filtering criteria as usual.
* If you are only using filters, leave a wildcard **asterisk (*)** in the free search box.
* You have the option to aggregate results for as many as 3 fields. Select **group by** fields from the dropdown list.
* Select the **Accounts to search**.
* You can preview the results in Kibana Discover for each query independently. Click **Preview in Kibana** to open the results for the past 24 hours in another tab.
* If you change your mind, you can delete either of the queries. Click **X Delete query** to return to a single-query form.

![empty alert form with 2 queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/query1and2.png)

##### Joining the queries (_optional_)

If you opt to join the queries, you must first add group by fields that will aggregate results by values. When the queries are joined, the values of the join fields must match for the {{include.name}} to trigger.

* First, select the **group by** fields for each of the queries.
  * You can select as many as 3 fields.
  * The number of group by fields can differ between the queries.
* Group by fields provide criteria for count aggregations.

  As a result, the alert will count the query results returned per value of the group by field. This allows you to join the results by searching for overlapping values that are the same for the join field pairs.
* Select the join pairs you want to enable. You can enable as many as 3 pairs.

  Available join options are automatically determined by the order of your group by fields. The suggestions are ordered pairs of the group by fields.

  Queries can have a different number of group by fields (for example query 1, one group by field, query 2, two group by fields) - the join can still be executed on the min number of fields and this will be a valid alert


![Alert with 2 queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-queries.png)

When joined, the {{include.name}} looks for values that are common to the field pairs selected for joining the queries. This means the {{include.name}} will only trigger if it finds matching values for the join field pairs.

![Add a group by field function for both queries](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-join-queries.png)

Joined fields are indicated by the **link icon <i class="fas fa-link"></i>**.

When the {{include.name}} triggers, the event log will specify the matching values that triggered the {{include.name}} in the field `logzio-alert-join-values`.

For example, if we enable 2 joins: by the fields hostname and then IP address, the field `logzio-alert-join-values` will contain comma-separated pairs, such as `Host1, 247.23.11.58`, `Host2, 44.76.131.4`.


##### Trigger conditions

When an {{include.name}} has 2 queries, you can set a single condition for each of your queries, and a single severity.

As usual, each query can take a different condition for a field of your choice.

![Conditions and severity for correlated {{include.name}}](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-trigger-conditions.png)

The {{include.name}} conditions are evaluated over regular intervals. The time frame for evaluating the conditions is the same for both queries. It can range between a minimum of 5 minutes and a maximum of 24 hours/1 day.

##### Notification description

It's a good idea to add a description that works for both queries and what they capture together. As usual, best practice is to include a playbook that covers the steps needed to investigate and remediate the incident.

##### Default vs. Custom output

You have the option to send notification sample data in **JSON** or **Table** format.

For each query, the sample data included in the notifications may either be automatically selected or customized. This depends on whether the query includes any aggregations, group by fields, max/min conditions, etc. [Learn more](/user-guide/alerts/configure-an-alert.html#output-format)

![Notifications are auto-configured](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/correlated-output-options.png)

* If a query includes an aggregation of some kind, the notification output defaults to the group by/aggregated fields.

  Otherwise, you can select as many as 7 fields to include in the notification, and run regex filters to edit and "clean" them. [Learn more](/user-guide/alerts/configure-an-alert.html#output-format)

* If the queries are joined, they necessarily include group by fields. The notification output will contain a separate table for each query, with sample values that triggered the {{include.name}}.

##### Save it!

Click **Save** at the top of the form to save your {{include.name}}.

##### Working with correlated {{include.name}}s

Correlated {{include.name}}s are indicated by the 2-part condition set, as shown below.

![2 conditions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/2-conditions.png)

When a correlated {{include.name}} triggers, it writes 2 event logs - 1 per query. The event logs will be numbered 1/2 and 2/2, respectively.

To investigate correlated events, it's best to follow this filtering approach:

1. Filter by the alert name or ID. This will return a list of all logs of the triggered {{include.name}} for your search time frame. This list can potentially be quite large.
2. Next, we want to isolate particular incidents. We have several filtering options.

  * We can filter for the matching group by values.
    
    Expand the log to reveal the full list of fields. Hover over the field that begins with `logzio-alert-group-ids` and click **<i class="fas fa-search-plus"></i>** to filter in on its value.

    If you prefer, you can filter by the relevant field, rather than the value, from the top filtering menu.

    ![Filter by group by value](https://dytvr9ot2sszz.cloudfront.net/logz-docs/correlated-alerts/filter-by-logzio-alert-group-ids.png)
  
  * If the queries are joined, we can filter for the matching join values.
    
    Expand the log to reveal the full list of fields. Hover over the field `logzio-alert-join-values` and click **<i class="fas fa-search-plus"></i>** to filter in on its value.
3.  You are now ready to drilldown on the raw logs that triggered {{include.name}}. Click the **Investigate** drilldown link in each event log to open the details of the event.

</div>
