---
title: Ship Amazon SNS metrics
logo:
  logofile: aws-sns.svg
  orientation: vertical
data-source: Amazon SNS
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1190
---


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["6xL47YQQhGicghUPvHVwFl"] --> 

{% include metric-shipping/generic-dashboard.html %} 

