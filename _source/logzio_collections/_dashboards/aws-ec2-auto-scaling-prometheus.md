---
title: Ship EC2 Auto Scaling metrics
logo:
  logofile: aws-ec2-auto-scaling.svg
  orientation: vertical
data-source: Amazon EC2 Auto Scaling
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1120
---


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["6mKQNnm4d5aGchBNV1ssyq"] --> 

{% include metric-shipping/generic-dashboard.html %} 

