---
title: Ship EC2 metrics
logo:
  logofile: aws-ec2.svg
  orientation: vertical
data-source: Amazon EC2
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
  - popular
order: 540
---


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["2azzEuyTA0To2Hm1iLmFeO"] --> 

{% include metric-shipping/generic-dashboard.html %} 


