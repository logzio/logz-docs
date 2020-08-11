---
layout: article
title: Explore your metrics
permalink: /user-guide/infrastructure-monitoring/grafana-explore/
flags:
  #admin: true
  logzio-plan: community
tags:
  - Grafana
contributors:
  - daniel-tk
  - shalper
---

Grafana Explore is where you can explore the data available in your Metrics account.
It's a bit like Kibana Discover, in that it is optimized for quickly searching the data in preparation for creating dashboards.

Whether you just started sending metrics for the first time, or you want to check that your metrics arrived as expected, Grafana’s Explore mode is the best way to do it.
It's also great if you're a long-time user and want to examine the structure of your metrics documents in order to create a new monitoring dashboard.

To go to Grafana’s Explore, click on the **Explore icon <i class="far fa-compass"></i>** in the left menu.

## Metrics view vs. Logs view

Grafana’s Explore mode has two views: Metrics and Logs.

![Grafana Explore with Metrics and Logs views shown side-by-side](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana-explore.png)

Which view is better, depends on your goal:

* The Logs view is ideal for learning the structure of your logs as preparation for configuring new dashboards. It is unique to Grafana Explore.
* The Metrics view is useful for getting general information about what's going on in your metrics account.

### Metrics View

The metrics view is a playground you can use to explore your data. It's a graph panel where you can experiment with queries. If you've edited a Grafana dashboard before, the interface will be familiar.

The Metrics view is great for learning what Metrics data is in your system. Here are a few examples of what it offers:

* To check which Metricbeat modules you currently have, use a `group by` rule for the field `event.module`.
* To look up your metricsets, use a `group by` rule for the field `metricset.name`.
* To see which hosts are shipping metrics to your account, use a `group by` rule for the field `host.name`.

| What are you looking for | Group by field |
|---|---|
| Metricbeat modules | `event.module` |
| Metricsets | `metricset.name` |
| Which hosts are shipping metrics | `host.name` |

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana-explore.mp4" type="video/mp4" />
</video>



### Logs View

Grafana's Explore mode is the equivalent of Kibana Discover, only for metrics.

![Grafana Explore in Logs view](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/grafana-explore-logs-view.png)

The logs view gives you visibility into your metrics account at the log level.
It can be useful when you want to build or edit a dashboard, or when you want to see how specific metrics logs are structured.

If you want the system to return all the metrics logs in your account, simply leave the query empty. Once you have a better idea of what you are looking for, query for the log type you are after. The key is to use Lucene syntax.

When you're ready to dive into specifics, click on one of the results to open the document view. The document view will show you which metrics and dimensions are being sent in the same document, and includes the metadata for those metrics. (For example, typical metadata for the metrics could include the sending host, metricset, cluster, etc. ).

You can click the <i class="fas fa-signal"></i> icon for a top-N analysis of the most common values for the field.

![Top-N analysis in Grafana Explore](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/top-n-grafana-explore.png)


### Split and Sync

You can split your Explore mode screen to work faster and make quick comparisons. You can split the screen to work with two views side-by-side, whether Metrics-Metrics, Logs-Logs, or Logs-Metrics.

To split the screen, click the **<i class="fas fa-columns"></i> Split** button.
If you want to sync both views so they both cover the same time range, click the **<i class="fas fa-link"></i>** button to link the views.

![Sync Grafana Explore views](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-explore/sync-explore-views.png)