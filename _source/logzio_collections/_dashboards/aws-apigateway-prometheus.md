---
title: Ship AWS Api Gateway metrics
logo:
  logofile: aws-api-gateway.svg
  orientation: vertical
data-source: Amazon API Gateway
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1060
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["2PcQBDV6WKJMHg3wjVHm2X"] --> 

{% include metric-shipping/generic-dashboard.html %} 

