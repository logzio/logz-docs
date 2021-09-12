---
title: Ship S3 metrics
logo:
  logofile: aws-s3.svg
  orientation: vertical
data-source: Amazon S3
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 410
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["3Yu0XLdMnhJXGQNzsLmNdr"] --> 

{% include metric-shipping/generic-dashboard.html %} 

