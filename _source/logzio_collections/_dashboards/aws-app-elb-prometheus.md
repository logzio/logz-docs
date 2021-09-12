---
title: Ship Application ELB metrics
logo:
  logofile: aws-app-elb.svg
  orientation: vertical
data-source: Amazon App ELB
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 1070
---

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["3cuUvpk2dVliiHrryDDPH7"] --> 

{% include metric-shipping/generic-dashboard.html %} 

