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
  - shalper
  - daniel-tk
---

Grafana's Explore mode is 
Whether you just started sending metrics for the first time, or you want to check that your metrics arrived as expected, or you’re a long-time user and want to examine the structure of your metrics documents in order to create a new monitoring dashboard - Grafana’s Explore mode is the best way to do it.


To go to Grafana’s Explore, click on the **Explore icon <i class="far fa-compass"></i>** on the left side menu.

![screenshot pointing at Explore button]()

Grafana’s Explore mode has two views: Metrics and Logs.

### Metrics View

**Add a screenshot pointing at Metrics view**

The metrics view is a playground you can use to explore your data. It's a graph panel where you can try out queries, as you would with any other panel. The key is to use Lucene syntax.

It can be useful for getting general information about what's going on in your metrics account.

For example, if you'd like to check which Metricbeat modules you currently have, use a group by the field `event.module`. 


If you're interested in looking up your metricsets, add a group by the field `metricset.name`. , what hosts are shipping metrics into your account (add a group by the field host.name), etc.

| What are you looking for | Group by field |
|---|---|
| Metricbeat modules | `event.module` |
| Metricsets | `metricset.name` |
| Which hosts are shipping metrics | `host.name` |
{:.paramlist}


### Logs View

**Add a screenshot pointing at Logs view**

For those of you who know Kibana Discover- this is exactly like Kibana, only for your metrics.

The logs view gives you visibility into your metrics account at the log level.
It can be useful when you want to build or edit a dashboard, or when you want to know how specific metrics logs are structured. 

If you want the system to return all the metrics logs in your account, simply leave the query empty.

Once you have a better idea of what you are looking for, query for the log type you are after. The key is to use Lucene syntax.

Then click on one of the results to open it in a document view. The document view will show you which metrics and dimensions are being sent in the same document and includes the metadata for those metrics (for example, the sending host, metricset, cluster, etc. for the metrics). 

You can click the <i class="fas fa-signal"></i> icon for a top-N analysis of the most common values for the field.

![Top-N analysis in Grafana Explore](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/top-n-grafana-explore.png)


Split and Synch options
If you want, you can split your Explore mode screen to two different Explore screens, and have both of them with the same view type (both on logs or both on metrics) or have each one showing a different view type.
**Add a screenshot showing the split button and a split screen with logs and metrics views**
You can even use the link option in order to link the time range of the two screens, which will allow you to view your metrics logs both in metrics and logs view, for the same time range.
**Add a screenshot showing the link button and a linked screen with logs and metrics views**
