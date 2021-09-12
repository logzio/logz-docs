---
title: Ship AWS Classic ELB metrics
logo:
  logofile: aws-classic-elb.svg
  orientation: vertical
data-source: Amazon Classic ELB
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1090
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["7E8wYXunWaktugT8hjt3hG"] --> 

{% include metric-shipping/generic-dashboard.html %} 

