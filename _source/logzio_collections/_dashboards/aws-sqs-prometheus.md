---
title: Ship SQS metrics
logo:
  logofile: aws-sqs.svg
  orientation: vertical
data-source: Amazon SQS
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1200
---


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["6NHoqQxc5PDJYibyT4cfPB"] --> 

{% include metric-shipping/generic-dashboard.html %} 
