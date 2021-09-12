---
title: Ship Network ELB metrics
logo:
  logofile: elb-network.svg
  orientation: vertical
data-source: Amazon Network ELB
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1160
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["1fZxVZEb4dIm3fazwjJYda"] --> 

{% include metric-shipping/generic-dashboard.html %} 
