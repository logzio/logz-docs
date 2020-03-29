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

Logz.io compacts your infrastracture metrics data as it becomes older to optimize visualization and retention.
This data compaction process is referred to as **data rollups**,
and it's crucial to managing your time-series data at scale.

As it ages, time-series data is needed at increasingly less granularity in order to help you focus on the overall picture and larger trends.
You wouldn't want to miss the forest for the trees.
There really isn't a need to know the exact CPU usage at 10 second intervals after a week has passed.
But you would want to see CPU usage steadily creep up at a 1.5% increase per hour.

Instead, your Logz.io Metrics account offers 18 months of retention by default.

Data compaction is known as **data rollups**. Through this process, Logz.io keeps 4 indicators for each UDP (unique data point):
- Average
- Max
- Min
- Sum


| Time elapsed          | Data granularity                           |
|-----------------------|--------------------------------------------|
| Up to 72 hours (3 days)| Raw data (1 second intervals at minimum)  |
| 3 - 7 days            | 1 minute average, max, min, sum            |
| 7 - 30 days           | 10 minute average                          |
| 30 day or more        | 1 hour average                             |
