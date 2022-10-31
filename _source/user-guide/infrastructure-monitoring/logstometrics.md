---
layout: article
title: Logs to metrics
permalink: /user-guide/infrastructure-monitoring/logstometrics.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Turn your logs into insightful metrics dashboards
flags:
  logzio-plan: community
tags:
contributors:
  - hidan
---

Create graphs and dashboards directly from your log files.

Logs to Metrics utilizes the full power of PromQL, letting you visualize numeric-based data inside your logs, including latency, request time, volumes of data sent, and more.

By converting log data into metrics, you get a visual representation of your logs which you can monitor in real-time without paying for growing data volumes.

###### On this page
{:.no_toc}

* toc list
{:toc}


#### Which types of metrics can you create?

With Logs to metrics, you can create the following types of metrics:

|**Metric**|**Type**|**Example query**|
|----------|--------|-----------------|
|Count|Counter|`rate(metric_name_count{foo=”bar”}[5m])`|
|Sum|Gauge|`sum(metric_name_field_sum{}) by (foo)`|
|Average|Gauge|`avg(metric_name_field_avg{}) by (foo)`|
|Minimum|Gauge|`min(metric_name_field_min{}) by (foo)`|
|Maximum|Gauge|`max(metric_name_field_max{}) by (foo)`|


#### Configure Logs to metrics


<div class="tasklist">


##### Name the metric
{:.no_toc}

Give your metric a meaningful name. You can use letters, numbers, and underscore.


##### Apply filters
{:.no_toc}

Choose the **Filters** you want to use to create your metrics. All filters are accepted, including: is, is not, is one of, is not one of, exists, and does not exist.

You can also use the **Group by** option to bundle up to 6 fields together. This optional ability adds dimension to measure metrics per unique values of the chosen fields.


##### Choose aggregations
{:.no_toc}

Next, choose how you would like to aggregate your data; by log count, fields, or both. Once you select your aggregation, you can preview how these aggregations will appear in your dashboard.

##### Add a description (optional)
{:.no_toc}

The description is visible on the main Logs to metrics page. We recommend making your description helpful so both you and your team members will be able to understand what’s their purpose.


##### Apply labels (optional)
{:.no_toc}

Labels are static values that you can add to your metrics. Adding labels can be helpful for filtering. For example, you can use labels to create filtered visualizations and dashboards.

##### Select Metric account
{:.no_toc}

Use the dropdown to select which Metrics account will store the metrics output. The metrics are saved in 1-minute granularity and downsampled later for best performance. Retention is based on the settings of the chosen metrics account.

Click **Save** to create your Logs to metrics. 

</div>

#### View your metrics

After saving your Logs to metrics, you'll be able to view and manage it on the main [Logs 2 metrics](https://app.logz.io/#/dashboard/logs-to-metrics/definitions) screen. 

![Logs to metrics main page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/logs2metrics/logstometrics-main.png)

Toggle the button to disable/enable the different metrics. In addition, you can hover over the relevant metric to view additional abilities, including:

* Explore in metrics - view the dashboard in Grafana.
* Edit - Edit the existing metric.
* Delete - Delete the metric. This can't be undone. 
* Duplicate - You can duplicate an existing metric by clicking on the menu <i class="li li-ellipsis-v"></i> and choosing Duplicate. 


### Additional information

Logs to metrics require the following:

* You can only use field filters. Lucene's free text is not supported.
* The values are case-sensitive. Make sure you’re using the correct values.
* The Group by option can group up to 6 fields.
