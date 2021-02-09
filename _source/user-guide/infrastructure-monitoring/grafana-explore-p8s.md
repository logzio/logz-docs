---
layout: article
title: Explore your Prometheus metrics
permalink: /user-guide/infrastructure-monitoring/grafana-explore-p8s/
flags:
  #admin: true
  logzio-plan: community
tags:
  - Grafana
contributors:
  - daniel-tk
  - shalper
  - yberlinger
---

Grafana Explore is where you can explore the data available in your Prometheus metrics account.
It's a bit like Kibana Discover, in that it is optimized for quickly searching the data in preparation for creating dashboards.

Whether you just started sending metrics for the first time, or you want to check that your metrics arrived as expected, Grafana’s Explore mode is the best way to do it.
It's also great if you're a long-time user and want to examine the structure of your metrics documents in order to create a new monitoring dashboard.

To go to Grafana’s Explore, click the **Explore icon <i class="far fa-compass"></i>** in the left menu.

<!-- Exposing the metrics in your system - discovering the associated metadata (tags, dimensions, or fields) sent by the services in your environment

-->
## Exploring your metrics

To determine which metrics exist in your metrics account and then discover the associated metadata (tags, dimensions, or fields) sent by the services in your environment, use the Metrics list or an autocomplete query.

- Metrics “Tree”: Use the metrics dropdown to the left of the query bar to get a full picture of all of the metrics sent to your account. 
The metrics are grouped by name. 
For example, Kubernetes metrics start with the word <kube>. 

- Query autocomplete: Use the query autocomplete option to explore the available metrics name suggestions 
For example, if you’re monitoring Kubernetes and looking for a specific pod metric, start typing the word <pod> and see what results come up., then click the desired metric name.

TIP: Be aware that not all metrics from a specific service start with the same word. For instance, the metrics in the <container> are also Kubernetes metrics. It is best to get a general sense of the service metrics’ naming and structure in its documentation.

## Metrics labels

Each metric has its metadata - one or more labels that are attached to it and shed light on the metric. These labels are either being attached and sent automatically with the metric, or can also be attached manually by the sender - depends on the monitored service or application. These labels are useful for creating meaningful visualizations and for gaining insights about the monitored data.  

When choosing a metric to focus on, you can see each metric’s labels (and label values) attached to it below the graph visualization. 
For example, the metric <kube_deployment_status_replicas_available> has the labels <deployment> and <namespace> 

### Split and Sync
<!-- still relevant-->
You can split your Explore mode screen to work faster and make quick comparisons. You can split the screen to work with two views side-by-side, whether Metrics-Metrics, Logs-Logs, or Logs-Metrics.  <!-- what sort of things would you display in the 2 panels, for example?  -->

To split the screen, click the **<i class="fas fa-columns"></i> Split** button.
If you want to sync both views so they both cover the same time range, click the **<i class="fas fa-link"></i>** button to link the views.

![Sync Grafana Explore views](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana-split-sync.gif) 

<!--![Sync Grafana Explore views](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/sync-explore-views.png) shows toggle -->

