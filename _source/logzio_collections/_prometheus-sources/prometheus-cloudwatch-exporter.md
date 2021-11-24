---
title: Ship Prometheus metrics from AWS CloudWatch with the OpenTelemetry Collector
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
data-source: Amazon CloudWatch for Prometheus metrics
data-for-product-source: Metrics
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
templates: ["docker"]
contributors:
  - yotamloe
  - yberlinger
shipping-tags:
  - aws
order: 400
---


This project allows you to collect Prometheus-format metrics from Amazon CloudWatch with the CloudWatch exporter, and ship them to Logz.io using the OpenTelemetry collector.

We simplify the data export and collection for your metrics: You tell us the desired namespaces and regions you want to send your data from and we fetch the most relevant metrics to display in the Logz.io pre-built Infrastructure Monitoring dashboards.


### Overview

{% include /p8s-shipping/cloudwatch-otel-overview.md %}


{% include /p8s-shipping/cloudwatch-otel-beforeyb.md %}


{% include /p8s-shipping/collect-aws-var-metrics-part1.md %}
| AWS_NAMESPACES  | Comma-separated list of namespaces of the metrics you want to collect. You can find a complete list of namespaces at [_AWS Services That Publish CloudWatch Metrics_](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html).   **Note:** This Environment variable is required unless you define the `CUSTOM_CONFIG_PATH` Environment variable | Required |
{% include /p8s-shipping/collect-aws-var-metrics-part2.md %}