---
title: Ship AWS DynamoDB metrics
logo:
  logofile: aws-dynamodb.svg
  orientation: vertical
data-source: Amazon DynamoDB
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1100
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["4nriUUJ1MCqnV5DbwN4A4K"] --> 

{% include metric-shipping/generic-dashboard.html %} 

