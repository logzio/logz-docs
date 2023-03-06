---
layout: article
title: Explore your metrics
permalink: /user-guide/infrastructure-monitoring/metrics-explore/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Explore your Metrics
sitemap: false 
noindex: true
flags:
  #admin: true
  logzio-plan: community
tags:
  - Metrics
contributors:
  - daniel-tk
  - shalper
---

**Explore** is where you can explore the data available in your Metrics account.
It's a bit like OpenSearch Dashboards Discover, in that it is optimized for quickly searching the data in preparation for creating dashboards.

Whether you just started sending metrics for the first time, or you want to check that your metrics arrived as expected, Explore mode is the best way to do it.
It's also great if you're a long-time user and want to examine the structure of your metrics documents in order to create a new monitoring dashboard.

To go to Explore, click the **Explore icon <i class="far fa-compass"></i>** in the left menu.



## Metrics view vs. Logs view

Explore mode has a number of views, including various Metrics options and a Logs view.

![Explore view options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafanalogs-select1.png)

![Explore with Metrics and Logs views shown side-by-side](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana-explore732.png)

Which view is better, depends on your goal:

* The Logs view is ideal for exploring the structure of your metrics' documents as preparation for configuring new dashboards. It is unique to Explore.
* The Metrics view options are useful for getting general information about what's going on in your metrics account.

### Metrics View

The Metrics view options offer a playground you can use to explore your data. They show a graph panel where you can experiment with queries. If you've edited a dashboard before, the interface will be familiar.

The Metrics view options are great for learning what Metrics data is in your system. Here are a few examples of what it offers:

* To check which Metricbeat modules you currently have, use a `group by` rule for the field `event.module`.
* To look up your metricsets, use a `group by` rule for the field `metricset.name`.
* To see which hosts are shipping metrics to your account, use a `group by` rule for the field `host.name`.

| What are you looking for | Group by field |
|---|---|
| Metricbeat modules | `event.module` |
| Metricsets | `metricset.name` |
| Which hosts are shipping metrics | `host.name` |

![Explore: Metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana_explore_metrics2.gif)


### Logs View

Explore mode is the equivalent of Open Search Dashboards Discover, only for metrics.

![Explore in Logs view](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana-explore-logs-revamp.png)

The Logs view gives you visibility into your metrics account at the log level.
It can be useful when you want to build or edit a dashboard, or when you want to see how specific metrics logs are structured.

If you want the system to return all the metrics logs in your account, simply leave the query empty. Once you have a better idea of what you are looking for, query for the log type you are after. The key is to use Lucene syntax.

When you're ready to dive into specifics, click one of the results to open the document view. The document view shows you which metrics and dimensions are being sent in the same document, and includes the metadata for those metrics. (For example, typical metadata for the metrics could include the sending host, metricset, cluster, and so on).
![Explore: Logs](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana_explore_logs.gif)

You can click the <i class="fas fa-signal"></i> icon for a top-N analysis of the most common values for the field.

![Top-N analysis in Explore](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana-explore-top-n-distribution.png)


### Split and Sync

You can split your Explore mode screen to work faster and make quick comparisons. You can split the screen to work with two views side-by-side, whether Metrics-Metrics, Logs-Logs, or Logs-Metrics.

To split the screen, click the **<i class="fas fa-columns"></i> Split** button.
If you want to sync both views so they both cover the same time range, click the **<i class="fas fa-link"></i>** button to link the views.

![Sync Explore views](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana-split-sync.gif) 

<!--![Sync Grafana Explore views](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/sync-explore-views.png) shows toggle -->

