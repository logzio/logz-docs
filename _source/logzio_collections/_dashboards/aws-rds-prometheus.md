---
title: Ship RDS metrics
logo:
  logofile: aws-rds.svg
  orientation: vertical
data-source: Amazon RDS
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1170
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["6o116eUHjEPyrQU06mB4Fy"] --> 

{% include metric-shipping/generic-dashboard.html %} 

