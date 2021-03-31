---
title: Making the easy switch from your local Jaeger installation to Logz.io Distributed Tracing
logo:
  logofile: jaeger.svg
  orientation: vertical
data-source: Logz.io Jaeger Collector
description: Transitioning from local Jaeger installations to Logz.io Distributed Tracing
open-source:
  - title: jaeger-logzio
    github-repo: jaeger-logzio
contributors:
  - yyyogev
  - yberlinger
  - doron-bargo
shipping-tags:
  - traces
---
## Introduction

Logz.io recommends that you use OpenTelemetry to gather trace transaction data from your system. Because of its versatility, OpenTelemetry has been widely adopted as the industry standard: OpenTelemetry can be equipped with many additional functionalities, one of which is collecting aggregated trace data. Beyond that, [OpenTelemetry](https://github.com/open-telemetry) is set to be the best production-ready solution going forward.

However, if you already have Jaeger deployed in your local environment, to quickly move from your local Jaeger installation to Logz.io,  the simplest solution is to replace the Jaeger collector with the Logz.io version of the Jaeger collector. The Logz.io collector makes sure that your tracing data and spans are sent to the Logz.io backend instead of to the local Jaeger installation. 

Over time, should you decide to change to the OpenTelemetry collector, please feel free to explore the topic [_Ship traces with OpenTelemetry_](https://docs.logz.io/shipping/tracing-sources/opentelemetry) for the procedure to configure and deploy the OpenTelemetry collector. You can always return to the Jaeger Collector as a secondary option if you experience issues with the OpenTelemetry Collector. 

This topic explains how to install the Logz.io Jaeger Collector. 

For an overview of the process to send traces to Logz.io, see [Getting started with Logz.io Distributed Tracing](https://docs.logz.io/user-guide/distributed-tracing/getting-started-tracing/). 


#### Deploy Jaeger Collector with Logz.io Exporter

The Logz.io integration builds on the Jaeger Collector base image and uses the gRPC plugin framework to enable communication between the Collector and Logz.io.

All you need to do is replace the base image with the Logz.io image and include the relevant Logz.io parameters.

<div class="tasklist">

##### Replace the base image with the Logz.io image
Run the following command to download the [Logz.io Jaeger collector image](https://hub.docker.com/r/logzio/jaeger-logzio-collector): 

```yaml
docker pull logzio/jaeger-logzio-collector
```

##### Configure the Logz.io image with the required parameters

Update the Logz.io extension with the relevant shell or environment variables. 
The required ports are described [here](https://www.jaegertracing.io/docs/latest/deployment/#collectors), and the complete list of Logz.io collector parameters is presented below. 

In addition to these parameters, you can also use [Jaeger's collector parameters](https://www.jaegertracing.io/docs/latest/cli/#jaeger-collector-grpc-plugin). 
You'll need to change to the version page for your deployment. 


{% include tracing-shipping/tracing-parameters.md %}
|GRPC_STORAGE_PLUGIN_LOG_LEVEL| The lowest log level to send.  From lowest to highest, log levels are: **trace, debug, info, warn, error**.  Controls logging only for the Jaeger Logz.io Collector.  Does not affect Jaeger components.|DEFAULT: **warn** |
|COLLECTOR_ZIPKIN_HTTP_PORT | If you’re using a Zipkin implementation to create traces, set this optional environment variable to the HTTP port for the Zipkin collector service.| |
