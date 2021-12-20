---
title: Installing the Logz.io Jaeger Collector for Distributed Tracing
logo:
  logofile: jaeger.svg
  orientation: vertical
data-source: Jaeger Collector
description: How to deploy a Logz.io Jaeger Collector
sitemap: false
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
## Overview
<!--Deprecated 8March2021: We recommend OpenTelemetry -->

Logz.io's trace exporter for Jaeger allows you to ship distributed traces to Logz.io from different APM (Application Performance Management/Monitoring) agents, including Zipkin.

This topic explains how to install the Logz.io Jaeger Collector. 

For an overview of the process to send traces to Logz.io, see [Getting started with Logz.io Distributed Tracing](https://docs.logz.io/user-guide/distributed-tracing/getting-started-tracing/). 

We recommend that you use the OpenTelemetry collector to gather trace transaction data from your system. 
See [_Ship traces with OpenTelemetry_](https://docs.logz.io/shipping/tracing-sources/opentelemetry) for the procedure to configure and deploy the OpenTelemetry collector. You may consider using the Jaeger Collector as a secondary option, if you experience issues with the OpenTelemetry Collector. 

#### Deploy Jaeger Collector with Logz.io Exporter

The Logz.io integration builds on the Jaeger Collector base image and uses the gRPC plugin framework to enable communication between the Collector and Logz.io.

<div class="tasklist">

##### Create a Docker network
Run the following command to create a Docker network: 

```yaml
docker network create net-logzio
```

To enable communication between the collector and the agent, include the name of the network you create in this step (for example, `net-logzio`) in the config file for each component. 

##### Configure the Logz.io extension
Configure the Logz.io extension with shell variables or environment variables. 

The required ports are described [here. ](https://www.jaegertracing.io/docs/latest/deployment/#collectors) 
You'll need to change to the version page for your deployment. 

```yaml
docker run -e ACCOUNT_TOKEN=<<TRACING-SHIPPING-TOKEN>>  # see parameter list below\
 --network=net-logzio \  ## This is the name of the network you created in step 1 above.
 --name=logzio-collector \ ## In the collector configuration, the --name attribute specifies the <<collector name>> used to run the collector. In this example, the <<collector-name>> is "logzio-collector". 
 -p 14268:14268 \
 -p 9411:9411 \
 -p 14267:14267 \
 -p 14269:14269 \
 -p 14250:14250 \
logzio/logzio-collector:latest
```


The complete list of Logz.io collector parameters is presented below. 
In addition to these parameters, you can also use [Jaeger's collector parameters](https://www.jaegertracing.io/docs/latest/cli/#jaeger-collector-grpc-plugin). 
You'll need to change to the version page for your deployment. 


{% include tracing-shipping/tracing-parameters.md %}
|GRPC_STORAGE_PLUGIN_LOG_LEVEL| The lowest log level to send.  From lowest to highest, log levels are: **trace, debug, info, warn, error**.  Controls logging only for the Jaeger Logz.io Collector.  Does not affect Jaeger components.|DEFAULT: **warn** |
|COLLECTOR_ZIPKIN_HTTP_PORT | If you’re using a Zipkin implementation to create traces, set this optional environment variable to the HTTP port for the Zipkin collector service.| |