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
  - yotamloe
  - imnotashrimp
  - yberlinger
shipping-tags:
  - aws
order: 1070
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#Overview)
* [Configure CloudWatch metrics](#Procedure)
{:.branching-tabs}


<!-- tab:start -->
<div id="Overview">


{% include /p8s-shipping/cloudwatch-otel-overview.md %}


</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="Procedure">

{% include /p8s-shipping/cloudwatch-otel-beforeyb.md %}

{% include /p8s-shipping/collect-aws-var-metrics.md namespace="Application ELB" %}

<!-- logzio-inject:install:grafana:dashboards ids=["4Tk1cgkBEnyrOjTuhKILto"] -->


</div>
<!-- tab:end -->


</div>
