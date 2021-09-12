---
title: Ship Elastic Block Store metrics
logo:
  logofile: aws-ebs.svg
  orientation: vertical
data-source: Amazon EBS
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1110
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["oYL72KJN6lUQ1ysBc70gx"] --> 

{% include metric-shipping/generic-dashboard.html %} 

