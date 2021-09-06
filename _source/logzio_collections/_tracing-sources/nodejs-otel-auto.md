---
title: Sending traces from Node.js applications via auto instrumentation with OpenTelemetry
logo:
  logofile: nodejs.svg
  orientation: vertical
data-source: Automatic Node.js instrumentation
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - new-instrumentation
order: 1380
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Local host](#local-host)
* [Docker](#docker)
{:.branching-tabs} 

<!-- tab:start -->
<div id="overview">

Deploy this integration to enable automatic instrumentation of your Node.js application using OpenTelemetry. 

### Architecture overview

This integration includes:

* Installing the OpenTelemetry Node.js instrumentation packages on your application host
* Installing the OpenTelemetry collector with Logz.io exporter
* Running your Node.js application in conjunction with the OpenTelemetry instrumentation

On deployment, the Node.js instrumentation automatically captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">


### Setup auto-instrumentation for your locally hosted Node.js application and send traces to Logz.io

**Before you begin, you'll need**:

* A Node.js application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service


<div class="tasklist">


{% include tracing-shipping/node-steps.md %}


##### Download and configure OpenTelemetry collector

Create a dedicated directory on the host of your Node.js application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.33.0) that is relevant to the operating system of your host.


After downloading the collector, create a configuration file `config.yaml` with the following parameters:

{% include /tracing-shipping/collector-config.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Start the collector

Run the following command from the directory of your application file:

```shell
<path/to>/otelcontribcol_<VERSION-NAME> --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.
* Replace `<VERSION-NAME>` with the version name of the collector applicable to your system, e.g. `otelcontribcol_darwin_amd64`.

##### Run the application

Run the application to generate traces:

```shell
node --require './tracer.js' <YOUR-APPLICATION-FILE-NAME>.js
```


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="docker">


### Setup auto-instrumentation for your Node.js application using Docker and send traces to Logz.io

This integration enables you to auto-instrument your Node.js application and run a containerized OpenTelemetry collector to send your traces to Logz.io. If your application also runs in a Docker container, make sure that both the application and collector containers are on the same network.

**Before you begin, you'll need**:

* A Node.js application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service


<div class="tasklist">


{% include tracing-shipping/node-steps.md %}


{% include tracing-shipping/docker.md %}
{% include /tracing-shipping/replace-tracing-token.html %}


##### Run the application

Run the application to generate traces:

```shell
node --require './tracer.js' <YOUR-APPLICATION-FILE-NAME>.js
```


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
