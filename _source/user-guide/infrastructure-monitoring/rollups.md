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

Your metrics data is compacted as it becomes older
in a process known as **data rollups**.

Data rollups help you identify your baseline, spot changes, and focus on larger trends so you don't miss the forest for the trees. Take CPU usage for example, you probably don't need the exact CPU usage at 10 second intervals once a week has passed.
But you would want to see CPU usage steadily creep up at a 1.5% increase per hour over a week.

Your Metrics account offers 18 month data retention, by default. This extended retention is important to help you to establish your baseline and make comparisons over a substantial time frame.


###### On this page
{:.no_toc}

1. toc list
{:toc}


### Rollups explained

Data rollups offer an effective process for compressing metrics without losing the original extremes. Rollups always keep the original max, min, and average values of your metrics so you can graph the data more accurately despite its compression.

When compacting the metrics, Logz.io calculates 4 indicators for each unique data point (UDP):

* Average
* Max
* Min
* Sum

When graphing a data point, you can select either the raw value or the rollup average, max, min, or sum. For example, here are the options for graphing the number of CPU cores per request.

![Select Grafana data point as average/max/min/sum in Logz.io](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/rollups-dp.png)

The method of calculating the rollups is explained in the next section.

### Data granularity over time

When you're investigating incidents, the granularity of the data will vary depending on how much time has passed, as shown in the table below.

| Time since data was first indexed          | Maximum granularity|
|-----------------------|--------------------------------------------|
| Up to 72 hours (3 days)| Raw data (1 second interval between data points, at minimum)|
| 3 - 7 days            | 1 minute rollups             |
| 7 - 30 days           | 10 minute rollups            |
| 30 day or more        | 1 hour rollups               |

As long as you're within 3 days of the incident, you can drill down on the raw data points. As you move past the 3 day mark, you'll be able to drill down on the data at a granularity of 1 minute intervals. Once a week has passed, you'll be able to drill down to a maximum resolution of 10 minute intervals. Once a month or more has passed, the data is at its maximum compaction, and you can drill down on the hourly metrics.

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


