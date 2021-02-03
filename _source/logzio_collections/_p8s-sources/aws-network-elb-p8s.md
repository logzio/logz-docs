---
title: Ship Network ELB metrics
logo:
  logofile: elb-network.svg
  orientation: vertical
data-source: Amazon Network ELB
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logz-aws-metrics
contributors:
  - yotamloe
  - imnotashrimp
  - yberlinger
shipping-tags:
  - aws
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

{% include /p8s-shipping/collect-aws-var-metrics.md namespace="Network ELB" %}


</div>
<!-- tab:end -->


</div>
