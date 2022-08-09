---
title: Sending traces from instrumented Docker containers using OpenTelemetry
logo:
  logofile: docker-logo.png
  orientation: vertical
data-source: Docker
data-for-product-source: Tracing
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - existing-instrumentation
order: 1380
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Setup](#setup)
* [Troubleshooting](#troubleshooting)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

### Overview

This integration enables you to send traces from your instrumented applications running in Docker. This is achieved by using a dedicated Logz.io OpenTelemetry collector deployed in the same Docker network as your application. This collector configuration can collect traces from:

* OpenTelemetry
* Zipkin
* Jaeger
* OpenCensus 


</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="setup">


**Before you begin, you'll need**:

* An instrumented application running in a Docker network
* An active account with Logz.io
* A name defined for your tracing service


<div class="tasklist">

#### In the same Docker network as your application:

{% include /tracing-shipping/docker.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Run the application

{% include /tracing-shipping/collector-run-note.md %}

Run the application to generate traces.


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="troubleshooting">

{% include /tracing-shipping/otel-troubleshooting.md %}

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->