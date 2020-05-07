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

To do this, you'll need to customize your application to sent the metrics in JSON format and adhere to the following principle: 

* Send _fewer and longer_ documents
  This is becuase the number of documents has a greater impact on Elasticsearch indexing power than document length.
* Group all possible metrics and dimensions into one document

* Use key-value pairs to define metrics and their dimensions.
  Here's our generic template.

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


The best way to explain this idea is to look at a few examples. So let's get to it.

#### JSON format examples

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

This document should be rearranged so the metric and its value are a key-value pair. This will make it easier to query and visualize and will also allow us to stack several metrics with the same dimensions in the same document. Here's the result:

```
{
    "metric": {
        "refresh_page.duration": 8
    },
    "dimensions": {
        "environment": "production",
        "version": "12.05.01",
        "unit": "milliseconds"
    }
}
```

##### Multiple metrics with the same dimensions

Next, let's examine a list of metrics that share the same dimensions.

```
{
    "metric": {
        "AvgPageLoadDur.ms": 23,
				"ClicksPerSession.count": 461
				"AvgMemPerOp":1520000,
				"AvgCPUPerOp": 0.000003,
				"refresh_page.duration": 8
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

##### Enabling rollups on your custom metrics

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

