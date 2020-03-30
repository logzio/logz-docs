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

Logz.io compacts your infrastracture metrics as they becomes older to optimize your dashboard visualizations and maximize data retention.
This data compaction process is referred to as **data rollups**,
and it's crucial to managing your time-series data at scale.
It also allows your Metrics account to keep your data for 18 months by default.

Averaging out your metrics time-series data as it ages will help you focus on the overall picture and larger trends.
You wouldn't want to miss the forest for the trees. You probably wouldn't want to be burdened with the exact CPU usage at 10 second intervals after a week has passed. But you would want to see CPU usage steadily creep up at a 1.5% increase per hour over a week.


#### Rollups explained

Data rollups is how Logz.io helps you focus on the changes - not the baseline. Data is "rolled up" (aka compacted) incrementally in 3 stages:

* **1st Rollup** - The first rollup occurs 3 days (72 hours) after the raw data is logged. The raw data points are compressed into indicators for 1 minute intervals. At this point, the original raw data is no longer available.

* **2nd rollup** - The second rollup occurs after a week has passed (7 days = 168 hours) since the raw data was first logged. The indicators from the first rollup are compressed once again to provide metrics for 10 minute invervals.

* **3rd rollup** - The third rollup occurs 30 days after the raw data was first logged. The indicators from the second rollup are compressed once again to provide metrics for 1 hour invervals.


| Time since data was first-indexed          | Data granularity|
|-----------------------|--------------------------------------------|
| Up to 72 hours (3 days)| Raw data (1 second intervals at minimum)  |
| 3 - 7 days            | 1 minute average, max, min, sum            |
| 7 - 30 days           | 10 minute average                          |
| 30 day or more        | 1 hour average                             |


When compacting the metrics, Logz.io calculates 4 indicators for each unique data point (UDP):

* Average
* Max
* Min
* Count
