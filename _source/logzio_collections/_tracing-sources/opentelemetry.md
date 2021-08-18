---
title: Installing the OpenTelemetry Collector for Distributed Tracing
logo:
  logofile: opentelemetry-icon-color.png
  orientation: vertical
data-source: Using OpenTelemetry to send tracing data
description: How to deploy an OpenTelemetry Collector for traces to Logz.io
open-source:
  - title: Logz.io-OpenTelemetry trace exporter
    github-repo: opentelemetry-collector-contrib
contributors:
  - yyyogev
  - yberlinger
  - doron-bargo
shipping-tags:
  - existing-instrumentation
order: 330
---
## Overview

Logz.io's trace exporter for OpenTelemetry allows you to ship distributed traces to Logz.io from different APM (Application Performance Management/Monitoring) agents, such as Jaeger, Zipkin, and so on.

This topic explains how to install the OpenTelemetry Collector using a Docker network, but if you prefer Kubernetes, see the [Logz.io Kubernetes deployment reference](https://docs.logz.io/user-guide/distributed-tracing/k8s-deployment).  

###### Related information
+ For an overview of the process to send traces to Logz.io, see [Getting started with Logz.io Distributed Tracing](https://docs.logz.io/user-guide/distributed-tracing/getting-started-tracing). 
+ To learn more about tracing instrumentation, see [Setting up instrumentation and ingesting traces.](https://docs.logz.io/user-guide/distributed-tracing/tracing-instrumentation)

### OpenTelemetry components

The OpenTelemetry Collector pipeline has the following main components: 

* **Receivers** are used to gather data from your environment (pull-based) or receive it from external sources (push-based). Your system must have at least one receiver configured. Receivers are typically HTTP/gRPC endpoints or daemon-like processes. 
* **Processors** are used at various stages of your pipeline to pre-process data before exporting it.  Processors may be used to modify attributes or sample the data. This component is used to ensure that your data successfully makes it through a pipeline.  
* **Exporters** are used to send data to your designated tracing (or metrics, or logging) backends/destinations. Your system must have at least one exporter configured to move data from collector to backend.

OpenTelemetry also includes extensions for additional functionality, such as diagnostics and health checks for components contributed by the community, such as the Logz.io exporter, as well as a dedicated collector.

#### Deploy OpenTelemetry Collector with Logz.io Exporter

<div class="tasklist">

##### Create a Docker network
Run the following command to create a Docker network: 

```yaml
docker network create net-logzio
```

To enable communication between the collector and the agent, include the name of the network you create in this step (for example, `net-logzio`) in the config file for each component. 

##### Pull the opentelemetry-collector-contrib image

```yaml
docker pull otel/opentelemetry-collector-contrib:0.17.0
```

##### Create a config file to mount to the container

The config file must include the required components for the OpenTelemetry Collector - receivers, processors, exporters, services and optional extensions.
You can use [this config file](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/master/exporter/logzioexporter/example/config.yaml) as a starting point, with the Logz.io exporter parameters, below.


{% include tracing-shipping/tracing-parameters.md %}
| CUSTOM_LISTENER_ADDRESS | Custom traces endpoint, for dev. This optional parameter overrides the region parameter.  You can find your Listener Address in the [Available regions](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions) table.| |



##### Save the file as `config.yaml`

##### Deploy the OpenTelemetry collector and mount the config file you saved.

```yaml
docker run -p 7276:7276 -p 8888:8888 -p 9943:9943 -p 55679:55679 -p 55680:55680 -p 9411:9411 \
    -v config.yaml:/etc/otel-collector-config.yaml:ro \
    --name logzio-collector otel/opentelemetry-collector-contrib:0.17.0 \  ## In the collector configuration, the --name attribute specifies the <<collector name>> used to run the collector. In this example, the <<collector-name>> is "logzio-collector"
        --config /etc/otel-collector-config.yaml
```

##### Run a working example (Optional)
For a complete working example, you can run [this docker compose file](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/docker-compose.yaml) for the [Logz.io Hotrod demo application](https://docs.logz.io/user-guide/distributed-tracing/trace-hotrod-demo).

  1. Download the docker compose file.

  2. Edit the Account Token and the other necessary parameters, according to the parameters listed in step 3, above.
  3. Run `docker-compose up`. 
  4. Head to [http://0.0.0.0:8080/](http://0.0.0.0:8080/) to trigger the event that will generate and send traces to your Logz.io account.

##### Check the Distributed Tracing tab for your traces

Give your traces some time to get from your system to ours, then check the Distributed Tracing tab in Logz.io to see the traces in the Jaeger UI.


