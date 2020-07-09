---
layout: article
title: Data rollups
permalink: /user-guide/infrastructure-monitoring/data-rollups.html
flags:
  logzio-plan:
tags:
contributors:
  - shalper
---

Your metrics data is compacted as it becomes older in a process known as **data rollups**. This data compaction process is crucial to managing your time-series data at scale. It also offers the best value by maximizing retention - 18 months by default!

Data rollups is how Logz.io helps you focus on the changes - not the baseline.


### Data granularity decreases over time

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

When you're investigating incidents, the granularity of the data will vary depending on how much time has passed. As long as you're within 3 days of the incident, you can drill down on the raw data points. As you move past the 3 day mark, you'll be able to drill down on the data at a granularity of 1 minute intervals. Once a week has passed, you'll be able to drill down to a maximum resolution of 10 minute intervals. Once a month or more has passed, the data is at its maximum compaction, and you can drill down on the hourly metrics. 

### Available data points

When compacting the metrics, Logz.io calculates 4 indicators for each unique data point (UDP):

* Average
* Max
* Min
* Count


### Default rollups

The following is a list of rollup configs that are pre-configured and available by default:

* Aws (Major services and namespaces, including EC2, S3, RDS, SQS)
* Azure (Major Azure sevices)
* Consul
* Docker
* Elasticsearch
* Etcd
* Jolokia
* Kubernetes
* Mongodb
* MySQL
* Nginx
* PHP_FPM
* Postgresql
* Prometheus
* Redis
* System
* vSphere
* Windows

### Requesting a custom rollups config

Configuring the rollups for your custom metrics is included in your package and we're happy to offer it!


To kick off this process, <a href="mailto:help@logz.io?subject=Requesting a custom metrics rollup config &body= Hi! I'd like to send custom metrics. Here's my info: 1. Logz.io Metrics account ID or token. 2. 5 sample JSONs 3. Dimensions associated with each Metricset.">email Support</a> to request a custom rollups config.

Include the following details in your message:

1. Your Logz.io Metrics account ID or [token](/user-guide/accounts/finding-your-metrics-account-token/).
2. At least 5 sample JSONs of your custom metrics.
3. If you are sending multiple metricsets,
add descriptions to clarify which dimensions are associated with each metricset.


