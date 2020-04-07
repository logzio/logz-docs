---
layout: article
title: Data rollups - data compression and retention
permalink: /user-guide/infrastructure-monitoring/data-rollups.html
flags:
  logzio-plan:
tags:
contributors:
  - shalper
---

Your metrics data is compacted as it becomes older in a process known as **data rollups**. This data compaction process is crucial to managing your time-series data at scale. It also offers the best value by maximizing retention - 18 months by default!

Data rollups is how Logz.io helps you focus on the changes - not the baseline.


#### Data granularity decreases over time

Rollups optimize your visualizations by helping you focus on the
overall picture and larger trends so you don't miss the forest for the trees.

Take CPU usage for example, you probably don't need the exact CPU usage at
10 second intervals after a week has passed.
But you would want to see CPU usage steadily creep up at a 1.5% increase per hour over a week.

| Time since data was first-indexed          | Maximum granularity|
|-----------------------|--------------------------------------------|
| Up to 72 hours (3 days)| Raw data (1 second interval between data points, at minimum)|
| 3 - 7 days            | 1 minute rollups             |
| 7 - 30 days           | 10 minute rollups            |
| 30 day or more        | 1 hour rollups               |

In other words, when you're investigating new incidents, within 3 days of their occurrence, you can drill down on the raw data points. As you move past the 3 day mark, you'll be able to drill down on the data at a granularity of 1 minute intervals. Once a week has passed, you'll be able to drill down to a maximum resolution of data point per 10 minute interval. Once a month or more has passed, the data is at its maximum compaction, allowing a maximum granularity of data point per 1 hour timeblock.


#### Data point rollups

When compacting the metrics, Logz.io calculates 4 indicators for each unique data point (UDP):

* Average
* Max
* Min
* Count
