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

Mark events on your Metrics dashboards in response to specific logs in your main logging account.

Annotations offer another way to correlate your metrics with your logs, to help you figure out _why_ things are happening. Annotations are similar to using [Markers]({{site.baseurl}}/user-guide/insights/markers.html) in your logging [Insights]({{site.baseurl}}/user-guide/insights/exploring-insights.html).

When you add Annotations to a dashboard, they will apply to any relevant visualizations by default. You can add multiple annotations to a dashboard and toggle them on and off to get the right view.

#### Configure an annotation

<div class="tasklist">

##### Pick your dashboard

Before you begin, you'll need to make sure you have permissions to edit the dashboard.

If you are using any of the pre-configured dashboards provided by Logz.io, you'll need to duplicate it first.
(They are read-only, by default.)

Click the gear **<i class="li li-gear"></i>** in the top menu, then select **Save as > Save** .
If you don't rename the dashboard, it will have the same name as the original dashboard, with **Copy** appended at the end.

  <video autoplay loop>
    <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/copy-dashboard2.mp4" type="video/mp4" />
  </video>

##### Add a new annotation

Go to the dashboard's settings:

* Click <i class="fas fa-cog"></i> in the dashboard toolbar (upper right corner).
* Select **Annotations** > **New**.

![Add Dashboard Annotation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/annotation-example.png)

Fill in the form, starting with the **General** section.

* Give a short **Name**. The name should describe the significance of the event.
* Select a logging account as the **Data source**. This is the relevant Kibana account.

##### Define the query

The query determines which logs will be marked as events in your dashboard. It is a typical Lucene query. Be sure to make the query specific enough to select only for logs that indicate the event you want to capture.

##### Set significant fields

Decide which fields from the logs returned by the query, will be shown. the critical information from the log that will be shown when hovering over the marker. t the appearence of the annotation

![Add Dashboard Annotation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/annotation-example.png)


Next, fill in the query options.

* For the **Data source**, select your Metrics account. (You can look it up [here](https://app.logz.io/#/dashboard/settings/manage-accounts).)
* We recommend setting **Refresh** to automatically occur **On Dashboard Load**.
* The **Query** field is where things get really fun. Your query object should start with `{"find": "terms"}`
  and contain a field from your Elasticsearch index.

![Variable query options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/variable-config--query-options.png)

  Your query can reference another Grafana variable.
  In this example, `$cluster` references another variable.

  ```json
  {"find": "terms", "field": "kubernetes.node.name", "query": "cluster:$cluster"}
  ```
  Otherwise, the query can be set to a specific field. For example:

  ```json
  {"find": "terms", "field": "host.name"}
  ```

##### Configure the remaining options and save

The remaining options can be set
to whatever makes the most sense for your metrics.

When you're finished, scroll to the bottom of the page and click **Update**.


##### Example

Here's a good example of when you might find annotations useful. Imagine having a marker indicate every time there is a configuration change in your Kubernetes cluster. This could help to see if a specific configuration change caused problems in the cluster.

After selecting the relevant log account, define a query that will return only Kubernetes configuration change logs. 

The query selected for this example is `loglevel:Configuration AND namespace:"kube-system"`. In other words, this query looks for logs that have 2 field:value pairs.

When a log is found that answers the query, it will appear as a vertical marker on the dashboard. When you hover over the marker, it will show the `message` field. (The `message` field is specified under `Text`). The value of the `service` field will appear as a tag.




 (in a free translation, the query says “for this annotation return only logs which has the field ’loglevel’ with the value ‘CONFIGURATION’, and the field ‘namespace’ with the value ‘kube-system’).
For these logs we chose to present the content of their ‘message’ field (under the ‘Text’ box) and content of their ‘service’ field (as a tag, under the ‘Tags’) box.
Now let us see how does this annotation actually looks like de facto:   


