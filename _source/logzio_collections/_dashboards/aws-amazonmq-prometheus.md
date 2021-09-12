---
title: Ship Amazon MQ metrics
logo:
  logofile: aws-mq.svg
  orientation: vertical
data-source: Amazon MQ
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 380
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["1xglfXxBurNsVZIla5zRnS"] --> 

{% include metric-shipping/generic-dashboard.html %} 
