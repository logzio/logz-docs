---
title: Ship Route53 metrics
logo:
  logofile: Amazon-Route-53.svg
  orientation: vertical
data-source: Amazon Route 53
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1185
---


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["Tnb9WjjHnI3COgp08Wsin"] --> 

{% include metric-shipping/generic-dashboard.html %} 


