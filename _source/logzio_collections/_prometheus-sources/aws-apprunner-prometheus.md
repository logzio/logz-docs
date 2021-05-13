---
title: Ship Amazon AppRunner metrics
logo:
  logofile:   #open AI
  orientation: vertical
data-source: Amazon AppRunner
templates: ["docker-metricbeat"]
open-source:
  - title: CloudWatch metrics for Prometheus
    github-repo: logzio-aws-metrics
contributors:
  - doron-bargo
  - yberlinger
shipping-tags:
  - aws
order: 380
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

{% include /p8s-shipping/collect-aws-var-metrics.md namespace="AppRunner" %}


</div>
<!-- tab:end -->


</div>