---
title: Ship Lambda metrics
logo:
  logofile: AWS-Lambda.svg
  orientation: vertical
data-source: Amazon Lambda
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
order: 1150
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#Overview)
* [Configure CloudWatch metrics](#Procedure)
{:.branching-tabs}


<!-- tab:start -->
<div id="Overview">


{% include /p8s-shipping/cloudwatch-otel-overview.md %}

<!-- info-box-start:info -->
At the moment, our AWS Lambda-based integrations do not support working with test events to send demo logs. This option will be available soon.
{:.info-box.note}
<!-- info-box-end -->


</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="Procedure">

{% include /p8s-shipping/cloudwatch-otel-beforeyb.md %}

{% include /p8s-shipping/collect-aws-var-metrics.md namespace="Lambda" %}


</div>
<!-- tab:end -->


</div>
