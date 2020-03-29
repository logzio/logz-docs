---
layout: article
title: Data rollups - data compression and retention
permalink: /user-guide/infrastructure-monitoring/data-rollups.html
flags:
  logzio-plan: pro
tags:
contributors:
  - shalper
---

Logz.io compacts your infrastracture metrics data as it becomes older to optimize visualizations and maximize retention.
This data compaction process is referred to as **data rollups**,
and it's crucial to managing your time-series data at scale.
It also allows your Metrics account to keep your data for 18 months by default.

As it ages, time-series data needs to be less granular to help you focus on the overall picture and larger trends.
You wouldn't want to miss the forest for the trees.

There probably isn't a need to know the exact CPU usage at 10 second intervals after a week has passed.
But you would want to see CPU usage steadily creep up at a 1.5% increase per hour over a week.

Logz.io "rolls up" your metrics data by compacting it gradually at 3 points:
- **First rollup** - Once 3 days (72 hours) have passed since the data was logged, it is compressed. Each data point provides a metric for a 1 minute inverval. At this point, the original raw data is no longer available.
- **Second rollup** - Once a week has passed (7 days = 168 hours) since the raw data was first logged, the data is compressed once more. Each data point provides a metric for a 10 minute inverval.
- **Third rollup** - Once 30 days have passed since the raw data was first logged, the data is compressed once more. Each data point provides a metric for a 1 hour inverval.

The following table summarizes the rollup process. 

| Time passed since data is first-indexed          | Data granularity                           |
|-----------------------|--------------------------------------------|
| Up to 72 hours (3 days)| Raw data (1 second intervals at minimum)  |
| 3 - 7 days            | 1 minute average, max, min, sum            |
| 7 - 30 days           | 10 minute average                          |
| 30 day or more        | 1 hour average                             |


When compacting the data, Logz.io calculates and retains 4 indicators for each metric (or UDP -unique data point):
- Average
- Max
- Min
- Count/Sum
