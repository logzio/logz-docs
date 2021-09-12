---
title: Ship Lambda metrics
logo:
  logofile: AWS-Lambda.svg
  orientation: vertical
data-source: Amazon Lambda
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1150
---


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["3unbYe50lDdHkJ4q8zpV7A"] --> 

{% include metric-shipping/generic-dashboard.html %} 


