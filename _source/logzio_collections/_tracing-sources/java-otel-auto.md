---
title: Sending traces from Java applications via auto instrumentation with OpenTelemetry
logo:
  logofile: java.svg
  orientation: vertical
data-source: Automatic Java instrumentation
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

Deploy this integration to enable automatic instrumentation of your Java application using OpenTelemetry.

### Architecture overview

This integration includes:

* Downloading the OpenTelemetry Java agent to your application host
* Installing the OpenTelemetry collector with Logz.io exporter
* Establishing communication between the agent and collector

On deployment, the Java agent automatically captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">


### Setup auto-instrumentation for your locally hosted Java application and send traces to Logz.io

**Before you begin, you'll need**:

* A Java application without instrumentation
* An active account with Logz.io
* A name defined for your tracing service


<div class="tasklist">


##### Download Java agent

Download the latest version of the [OpenTelemetry Java agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent-all.jar) to the host of your Java application.

##### Download and configure OpenTelemetry collector

Create a dedicated directory on the host of your Java application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.33.0) that is relevant to the operating system of your host.

After downloading the collector, create a configuration file `config.yaml` with the following parameters:

{% include /tracing-shipping/collector-config.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Start the collector

Run the following command:

```shell
<path/to>/otelcontribcol_<VERSION-NAME> --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.
* Replace `<VERSION-NAME>` with the version name of the collector applicable to your system, e.g. `otelcontribcol_darwin_amd64`.

##### Attach the agent to the collector and run it

Run the following command from the directory of your Java application:

```shell
java -javaagent:<path/to>/opentelemetry-javaagent-all.jar \
     -Dotel.traces.exporter=otlp \
     -Dotel.metrics.exporter=none \
     -Dotel.resource.attributes=service.name=<YOUR-SERVICE-NAME> \
     -Dotel.exporter.otlp.endpoint=http://localhost:<<PORT> \
     -jar target/*.jar
```

* Replace `<path/to>` with the path to the directory where you downloaded the agent.
* Replace `<YOUR-SERVICE-NAME>` with the name of your tracing service defined earlier.
* {% include /tracing-shipping/tracing-ports.md %}



##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="docker">


### Setup auto-instrumentation for your Java application using Docker and send traces to Logz.io

This integration enables you to auto-instrument your Java application and run a containerized OpenTelemetry collector to send your traces to Logz.io. If your application also runs in a Docker container, make sure that both the application and collector containers are on the same network.

**Before you begin, you'll need**:

* A Java application without instrumentation
* An active account with Logz.io
* A name defined for your tracing service


<div class="tasklist">


##### Download Java agent

Download the latest version of the [OpenTelemetry Java agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent-all.jar) to the host of your Java application.


{% include /tracing-shipping/docker.md %}

{% include /tracing-shipping/replace-tracing-token.html %}



##### Attach the agent to the collector and run it

Run the following command from the directory of your Java application:

```shell
java -javaagent:<path/to>/opentelemetry-javaagent-all.jar \
     -Dotel.traces.exporter=otlp \
     -Dotel.metrics.exporter=none \
     -Dotel.resource.attributes=service.name=<YOUR-SERVICE-NAME> \
     -Dotel.exporter.otlp.endpoint=http://localhost:<<PORT>> \
     -jar target/*.jar
```

* Replace `<path/to>` with the path to the directory where you downloaded the agent.
* Replace `<YOUR-SERVICE-NAME>` with the name of your tracing service defined earlier.
* * {% include /tracing-shipping/tracing-ports.md %}


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
