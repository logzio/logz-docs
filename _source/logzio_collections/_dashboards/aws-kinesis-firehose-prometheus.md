---
title: Ship Kinesis Data Firehose metrics
logo:
  logofile: Amazon-Kinesis-Data-Firehose.svg
  orientation: vertical
data-source: Amazon Kinesis Data Firehose
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1130
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["5vdakIK9r2YlDY6B9HIrmz"] --> 

{% include metric-shipping/generic-dashboard.html %} 

