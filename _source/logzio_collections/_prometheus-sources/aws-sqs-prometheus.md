---
title: Ship SQS metrics
logo:
  logofile: aws-sqs.svg
  orientation: vertical
data-source: Amazon SQS
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
order: 1200
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

{% include /p8s-shipping/collect-aws-var-metrics.md namespace="SQS" %}

#### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours.


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["6NHoqQxc5PDJYibyT4cfPB"] --> 

{% include metric-shipping/generic-dashboard.html %} 

</div>
<!-- tab:end -->


</div>
