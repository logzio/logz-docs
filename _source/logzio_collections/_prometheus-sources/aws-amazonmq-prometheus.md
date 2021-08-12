---
title: Ship Amazon MQ metrics
logo:
  logofile: aws-mq.svg
  orientation: vertical
data-source: Amazon MQ
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

{% include /p8s-shipping/collect-aws-var-metrics.md namespace="AmazonMQ" %}

To install the dashboard press here 
<!-- logzio-inject:install:grafana:dashboards ids=["6xL47YQQhGicghUPvHVwFl"] -->

</div>
<!-- tab:end -->


</div>
