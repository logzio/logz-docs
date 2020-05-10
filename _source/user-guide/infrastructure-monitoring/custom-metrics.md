---
layout: article
title: Custom metrics
permalink: /user-guide/infrastructure-monitoring/custom-metrics
flags:
  admin: true
  #logzio-plan: pro
tags:
  - Grafana
contributors:
  - shalper
---

You can send your application metrics to your Logz.io Infrastructure Monitoring account and benefit from all of the advantages of your tried and true dashboards.

To do this, you'll need to send your application metrics to Logz.io in JSON format and stick to the formatting guidelines.

##### Overview
{:.no_toc}

1. toc list
{:toc}

#### JSON format
{:.no_toc}

Our guiding principle is to use key-value pairs to define metrics and their dimensions.
Here's the general template.

  ```
  {
	"metrics": {
		"my_first_metric.unit": number,
		"my_second_metric.unit": number,
		"my_third_metric.unit": number,
		"my_fourtn_metrlc.unit": number
	},
	"dimensions": {
		"dimension_l": "value",
		"dimension_2": "value",
		"dimension_3": "value",
		"dimension_4": "value"
	}
  }
  ```

The reason being that we want to send _fewer and longer_ documents. 
By grouping all possible metrics and dimensions into one document we maximize Elasticsearch's indexing power. In general, the _number_ of documents has a greater impact on Elasticsearch indexing power than document length.

The best way to explain the guidelines is to look at a few examples. So let's get to it.

<div class="tasklist">

##### Single metric with dimensions

In this example, we have one metric per document. We also have a metric field `name`, and its `value` is logged as a dimension.

```
{
    "metric": {
        "name": "refresh_page.duration"
    },
    "dimensions": {
        "environment": "production",
        "version": "12.05.01",
        "unit": "milliseconds",
        "value": 8
    }
}
```

This document should be rearranged so the two fields, `name` and `value` are a key-value pair. The field `unit` is made redundent if we add the units to the metric field name.

Here's the result:

```
{
    "metric": {
        "refresh_page.duration.ms": 8
    },
    "dimensions": {
        "environment": "production",
        "version": "12.05.01"
    }
}
```

The metric is now named `refresh_page.duration.ms`. This makes it easier to query and visualize our metrics. An added advantage is that we can stack metrics with the same dimensions in the same document.

##### Multiple metrics with the same dimensions

Next, let's examine a list of metrics that share the same dimensions.

By stating the measuring unit in the metric’s name, we prevent confusion, eliminate another dimension, and allow metric stacking in the same document. So it’s a win-win.

```
{
	"metric": {
		"RefreshPage.duration.ms": 8,
		"AvgPageLoadDur.ms": 23,
		"ClicksPerSession.count": 461,
		"AvgMemPerOp": 1520000,
		"AvgCPUPerOp": 0.000003
	},
	"dimensions": {
		"SessionID": "f9f5d7ec-a354-5f5a-ae2d-d7f5973d07ad",
		"Host_name": "118.2.45.162",
		"Cluster": "Cluster-3",
		"Environment": "Production",
		"AppName": "Workshop",
		"AppVersion": "12.05.01"
	}
}
```

##### Metrics vs. Dimensions

What distinguishes a metric from a dimension, you ask?
Metric fields are used strictly for numerical values. You can use any number type, including: long, float, integer, etc.

Dimension fields are always strings. This helps to ensure that the rollup mechanism will work properly. It only identifies number field types.

##### What to avoid

* Avoid sending `tag` and `timestamp` fields

  Logz.io automatically adds a timestamp to your documents during the indexing process so there's no need to duplicate it. Logz.io also adds tags so these are field names you'll want to avoid.

* Avoid metric analytics and aggregations

  You don’t need to perform any aggregations or fancy pre-slicing-and-dicing on your metrics. Logz.io takes care of it for you. Logz.io runs analytics on your metrics by default, including division by percentiles and by standard deviation, just to name a few. 
  
  Logz.io also runs aggregations on your metrics, so that every metric you send is automatically captured with its aggregations: Max, Min, Sum, and Avg aggregations.

Here's an example of what to avoid.

```
{
    "Measurement": "Application_test_meter",
    "Tags": {
        "host_name": "10.10.10.10",
        "cluster": "cluster-3",
        "accountID": 12345,
        "version": "14.02.07",
        "loginSessionld": "tl4alb88x",
        "meter": "main_app",
        "mtype": "meter",
        "unit": "count",
        "summarize_function": "sum"
    },
    "Timestamp": "2020-08-20T09:47:33.1611452Z",
    "FieldName": "value",
    "FieldValue": {
        "stats": {
            "count": 2,
            "sum": 10,
            "min": 1,
            "max": 9
        }
    }
}
```

This one takes all the wrong turns. After correcting it so the metric is a key-value pair, removing the aggregations and timestamp, and reclassifying the fields as metrics and dimensions, here's what it should look like:


```
{
	"metric": {
		"Application_test_meter.count": 2
	},
	"dimensions": {
		"host_name": "10.10.10.10",
		"cluster": "cluster-3",
		"accountID": 12345,
		"version": "10.01.02",
		"loginSessionld": "rg4alb88x",
		"meter": "main_app",
		"mtype": "meter"
	}
}
```

##### Best practices

Let's reiterate a few best-practice recommendations for logging application metrics.

* Use metric fields for numerical values & dimensions for text.

* State the unit in the metric's name.

* Avoid metric analytics and aggregations. Avoid adding a timestamp. Avoid the fields `tag` and `tags`.
