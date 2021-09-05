---
title: Upload custom metrics as JSON files
logo:
  logofile: json.svg
  orientation: vertical
data-source: JSON Custom Metrics
templates: ["no-template"]
contributors:
  - shalper
shipping-tags:
  - from-your-code
order: 370
---

You can send your application metrics to your Logz.io Infrastructure Monitoring account and create your own dashboards. To do this, you'll need to send your application metrics to Logz.io in JSON format and keep to the following formatting guidelines.


#### NEW BUTTON
123
<!-- logzio-inject:install:grafana:dashboards ids=['1m3Sqx6atnxPd7829LV2W5'] -->

<div class="tasklist">

##### Metrics vs. Dimensions
#### NEW BUTTON
123
<!-- logzio-inject:install:grafana:dashboards ids=['1m3Sqx6atnxPd7829LV2W5'] -->

Our guiding principle is to use key-value pairs to define metrics and their dimensions.

 ```
  {
	"metrics": {
		"my_first_metric.unit": number,
		"my_second_metric.unit": number,
		"my_third_metric.unit": number,
		"my_fourtn_metrlc.unit": number
	},
	"dimensions": {
		"dimension_l": "string",
		"dimension_2": "string",
		"dimension_3": "string",
		"dimension_4": "string"
	}
  }
  ```

What distinguishes a metric from a dimension, you ask?
Metric fields are used strictly for numerical values. You can use any number type, including: long, float, integer, etc.

Dimension fields are always strings. Dimensions are metadata fields that add information about the metrics, such as where the data was sent from, which application part, and its relevance.

The [rollup mechanism]({{site.baseurl}}/user-guide/infrastructure-monitoring/data-rollups.html) only identifies number field types, which is why it's so important to send metrics as number field types and dimensions as strings.


##### How to format metrics

The best way to explain the guidelines is to look at a few examples. This tutorial will walk you through a typical example of how to best format a metric before sending it.

###### Before

This example shows a rather inefficient way of sending metrics. There are several issues here:

1. The data is organized as one metric per document.
2. The metric field is split up into many fields. The name is sent as a field:value pair `"name": "refresh_page.duration"`, and the `value` and measuring `unit` are logged as 2 separate dimensions.

```
{
	"metrics": {
		"name": "refresh_page.duration"
	},
	"dimensions": {
		"environment": "production",
		"version": "12.05.01"
	},
	"unit": "milliseconds",
	"value": 8
}
```

###### After

Rearrange the document to reduce the number of fields. If the metric's `name` and `value` are sent as a key-value pair and the `unit` is appended to the name, they are all collapsed into just one field named `refresh_page.duration.ms`. Here's the result:

```
{
    "metrics": {
        "refresh_page.duration.ms": 8
    },
    "dimensions": {
        "environment": "production",
        "version": "12.05.01"
    }
}
```

Formatting your data in this way will make it easier to query and visualize your metrics. Plus, it has the added advantage of making it possible to stack metrics with the same dimensions in the same document.

##### Stack metrics that share the same dimensions

Metrics that share the same dimensions should be sent together as a single document.

Stacking metrics is important because we want to send _fewer and longer_ documents.
By grouping all possible metrics and dimensions into one document we maximize Elasticsearch's indexing power. In general, the _number_ of documents has a greater impact on Elasticsearch indexing power than document length.

To make this work, you'll need to state the measuring unit in the metric’s name, instead of sending the unit as a dimension.
Here's an example of metric stacking:

```
{
	"metrics": {
		"RefreshPageDur.ms": 8,
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

##### Format the JSON for shipping

Minify the JSON to compact it and separate the objects so there is only one JSON object per line.
Metrics are sent as minified JSON objects with one JSON object per line.

(The examples above show beautified JSON because they are easier to explain. The metrics can't be sent that way.)

You can use any of the following [log shippers](https://app.logz.io/#/dashboard/send-your-data?tag=from-your-code&collection=log-sources) to send your application metrics to Logz.io:

* [.NET code](https://docs.logz.io/shipping/log-sources/dotnet.html)
* [Go code](https://docs.logz.io/shipping/log-sources/go.html)
* [Java code](https://docs.logz.io/shipping/log-sources/java.html)
* [JSON uploads](https://docs.logz.io/shipping/log-sources/json-uploads.html)
* [Node.js code](https://docs.logz.io/shipping/log-sources/nodejs.html)
* [Python code](https://docs.logz.io/shipping/log-sources/python.html)


##### Contact support to request a custom rollups config

Your metrics will require customized compression configurations so they can be effectively retained for long-term storage. This is also known as [**data rollups**](https://docs.logz.io/user-guide/infrastructure-monitoring/data-rollups.html), used to compress the data without losing the original max, min, and average values.

[Email our support](mailto:help@logz.io?subject=Requesting%20a%20custom%20metrics%20rollup%20config) to kick off this process.


Include the following details in your message:

1. Your Logz.io Metrics account ID or [token](/user-guide/accounts/finding-your-metrics-account-token/).
2. At least 5 sample JSONs of your custom metrics.
3. If you are sending multiple metricsets,
add descriptions to clarify which dimensions are associated with each metricset.

Configuring the rollups for your custom metrics is included in your package and we're happy to offer it!

##### What to avoid

* Avoid sending `tag` and `timestamp` fields

  Logz.io automatically adds a timestamp to your documents during the indexing process so there's no need to duplicate it. Logz.io also adds tags so these are field names you'll want to avoid.

  If you insist, you can always send similar functioning fields by modifying their field names. For example, "generated_timestamp", "my_timestamp", or "my_tags" will work.

* Avoid metric analytics and aggregations

  You don’t need to perform any aggregations or fancy pre-slicing-and-dicing on your metrics. It's all taken care of for you. Logz.io runs analytics on your metrics by default, including division by percentiles and by standard deviation, just to name a few.

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
	"metrics": {
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

##### Summary of requirements & best practices

Let's reiterate a few requirements and best-practice recommendations for logging application metrics.

###### Requirements


* Minify the JSON to compress it and place each object on a separate line before shipping the data.

* Use metric fields for numerical values & dimensions for text.

###### Best practices


* State the unit in the metric's name.

* Avoid metric analytics and aggregations.
  Avoid adding a timestamp.
  Avoid the fields `tag` and `tags`.

* Stack metrics that share the same dimensions in the same document to send them more efficiently.

* Keep in mind that arrays are not well-supported.

