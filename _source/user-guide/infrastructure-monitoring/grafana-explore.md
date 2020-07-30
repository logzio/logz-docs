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

Whether you just started sending metrics into your metrics account for the first time, and you want to know if your metrics arrived or not, or you’re a long-time user who wants to examine the structure of your metrics documents in order to create a new monitoring dashboard - Grafana’s Explore mode is the best way to do it.

![screenshot pointing at Explore button]()

To go to Grafana’s Explore, click on the Explore button on the left side bar from any Grafana dashboard screen.

Click the gear **<i class="li li-gear"></i>** in the top menu, then select **Save as > Save** .



Grafana’s Explore mode has two views: Metrics and Logs.

### Metrics View

**Add a screenshot pointing at Metrics view**

The metrics view is a graph panel you can use to explore your data. It's a playground. 
You can try out queries, as you would in any other panel. The key is to use Lucene syntax. 

It can be useful for getting general information about what's going on in your metrics account.

For example, if you'd like to check which Metricbeat modules you currently have, use the following query:

group by the field `event.module`. 


If you're interested in looking up your metricsets, add a group by the field `metricset.name`. , what hosts are shipping metrics into your account (add a group by the field host.name), etc.

| What are you looking for | Group by field |
|---|---|
| Metricbeat modules | `event.module` |
| Metricsets | `metricset.name` |
| Which hosts are shipping metrics | `host.name` |
{:.paramlist}


### Logs View
**Add a screenshot pointing at Logs view**
**For those of you who know Kibana - this is exactly like Kibana, only for your metrics** - Sara can we have a sentence like this? I think It’ll help
The logs view gives you visibility into your metrics account at the log level. You should use it when you want to build or edit a dashboard, or when you want to know how specific metrics logs are structured. To do that, simply query for the desired type of log you wish to investigate using Lucene syntax (no query at all will just return all metrics logs in your account), then click on one of the results to open it in a document view. The document view provides a great understanding to which metrics and dimensions are being sent in the same document, and about the metadata of those metrics (from which host was it sent, what is its metricset, what cluster etc.). You can even get a preview of other values of any specific field, by clicking on the 3 bars icon on the left of the field name.
**Add a screenshot showing a click on the 3 bars**
Split and Synch options
If you want, you can split your Explore mode screen to two different Explore screens, and have both of them with the same view type (both on logs or both on metrics) or have each one showing a different view type.
**Add a screenshot showing the split button and a split screen with logs and metrics views**
You can even use the link option in order to link the time range of the two screens, which will allow you to view your metrics logs both in metrics and logs view, for the same time range.
**Add a screenshot showing the link button and a linked screen with logs and metrics views**




 



