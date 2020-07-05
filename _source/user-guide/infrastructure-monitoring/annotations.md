---
layout: article
title: Annotations
permalink: /user-guide/infrastructure-monitoring/annotations/
flags:
  logzio-plan: community
tags:
  - metrics
contributors:
  - shalper
  - daniel-tk
---

Annotations can mark events on your Metrics dashboards based on data from a logging account. For example, an annotation can indicate when a particular error log or configuration change occured based on logs written to your main logging account.

Annotations offer another way to correlate your metrics with your logs, to help you figure out _why_ things are happening. Annotations are similar to using [Markers]({{site.baseurl}}/user-guide/insights/markers.html) in your logging [Insights]({{site.baseurl}}/user-guide/insights/exploring-insights.html).



#### Configure an annotation

<div class="tasklist">

##### Pick your dashboard

Before you begin, you'll need to make sure you have permissions to edit the dashboard.

If you are using any of the pre-configured dashboards provided by Logz.io, you'll first need to select the option to make it editable. (You can also click the gear **<i class="li li-gear"></i>** in the top menu, then select **Save as > Save**).

##### Add a new annotation

Go to the dashboard's settings:

* Click the gear **<i class="li li-gear"></i>** in the dashboard's top menu (upper right corner).
* Select **Annotations** > **New**.
* The annotation form will appear. Fill in the form, starting with the **General** section.
  1. Give a short **Name**. The name should describe the significance of the event.
  2. Select a logging account as the **Data source**. This is the relevant Kibana account.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/grafana7-annotations.mp4" type="video/mp4" />
</video>

##### Decide which logs should trigger the annotation

Type in a _Kibana_ query in Lucene syntax.

The query determines which logs will be marked as events in your dashboard.
It's best if you double-check your query results in [Kibana Discover](/user-guide/kibana/) to make sure it is specific enough.

Note that the annoation query does not support Grafana variables.

##### Decide how the annotation should appear in the dashboard

If you hover over the annotation in the dashboard, it can show additional information, as set by these fields:

* **Text** - Type in the log field name that is of most interest. The field's value will be shown when hovering over the marker. In the example shown below, the `message` field was selected.

* **Tags** - Type in one or more log field names. The values of the fields will appear as tags when you hover over an annotation in the dashboard.


##### Save the annotation & dashboard

When you're finished, save the annotation.
You'll be able to see it in action. If you are satisfied with it, save the changes to the dashboard (when prompted).


### Example

Here's a good example of when you might find annotations useful. Imagine having a marker indicate every time there is a configuration change in your Kubernetes cluster. This could help to see if a specific configuration change caused problems in the cluster.

After selecting the relevant log account, define a query that will return only Kubernetes configuration change logs.

The query selected for this example is `loglevel:Configuration AND namespace:"kube-system"`.
<br>
In other words, this query says “for this annotation, return only logs that have the field `loglevel` with the value `CONFIGURATION`, and the field `namespace` with the value `kube-system`.

![Add Dashboard Annotation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/annotation-example.png)

When a log is found that answers the query, it will appear as a vertical marker on the dashboard.

When you hover over the marker, it will show the `message` field and the value of the `service` field will appear as a tag.

Here's how this annotation will actually look on a dashboard.

![Add Dashboard Annotation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/grafana-annoation-in-dashboard.png)
