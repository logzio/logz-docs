---
title: Ship traces with OpenTelemetry
logo:
  logofile: opentelemetry-icon-color.png
  orientation: vertical
data-source: OpenTelemetry
description: How to deploy an OpenTelemetry Collector for traces to Logz.io
open-source:
  - title: Logz.io-OpenTelemetry trace exporter
    github-repo: https://github.com/open-telemetry/opentelemetry-collector-contrib
contributors:
  - yyyogev
  - yberlinger
  - doron-bargo
shipping-tags:
  - traces
---

Logz.io's trace exporter for OpenTelemetry allows you to ship distributed traces to Logz.io from different APM (Application Performance Management/Monitoring) agents, such as Jaeger, Zipkin, and so on.

The OpenTelemetry Collector pipeline has the following main components: 

* Receivers are used to gather data from your environment (pull-based) or receive it from external sources (push-based). Your system must have at least one receiver configured. Receivers are typically HTTP/gRPC endpoints or daemon-like processes. 

* Processors are used at various stages of your pipeline to pre-process data before exporting it.  Processors may be used to modify attributes or sample the data. This component is used to ensure that your data successfully makes it through a pipeline.  <!-- how do you control what processors do? -->
* Exporters are used to send data to your designated tracing (or metrics, or logging) backends/destinations. Your system must have at least one exporter configured to move data from collector to backend.

OpenTelemetry also includes extensions for additional functionality, such as diagnostics and health checks, as well as a dedicated collector for components contributed by the community, such as the Logz.io exporter.

#### Deploy OpenTelemetry Collector with Logz.io Exporter

<div class="tasklist">

##### Pull the latest opentelemetry-collector-contrib image:

```
docker pull otel/opentelemetry-collector-contrib:latest
```

##### Create a config file to mount to the container. 
The config file must include the required components for the OpenTelemetry Collector - receivers, processors, exporters, services and optional extensions.
You can use <a href ="https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/master/exporter/logzioexporter/example/config.yaml" target = "_blank"> this config file <i class="fas fa-external-link-alt"></i></a> as a starting point, with the Logz.io exporter parameters, below.

###### Parameters

| Parameter | Description |
|---|---|
| ACCOUNT_TOKEN <span class="required-param"></span> | The Logz.io token for your Distributed Tracing account. Required when you use the collector to ship traces to Logz.io. <br>Replace `<ACCOUNT_TOKEN>` with the token of the Distributed Tracing account you want to send data to <br><a href ="/user-guide/accounts/finding-your-tracing-account-token" target="_blank">How do I look up my Distributed Tracing account token?</a> |
| REGION <span class="default-param">_Blank (US East)_</span> |  Your two-letter Logz.io account region code. Defaults to US, required only if your Logz.io region is different than US. You can find your region code in the <a href = "https://docs.logz.io/user-guide/accounts/account-region.html#available-regions" target = "_blank">  Available regions <i class="fas fa-external-link-alt"></i></a> table. |
| CUSTOM_LISTENER_ADDRESS | Custom traces endpoint, for dev. This optional parameter overrides the region parameter. <br> You can find your Listener Address in the <a href = "https://docs.logz.io/user-guide/accounts/account-region.html#available-regions" target = "_blank">  Available regions <i class="fas fa-external-link-alt"></i></a> table.|
{:.paramlist}


##### Save the file as `config.yaml`.

##### Deploy the OpenTelemetry collector and mount the config file you saved.

```yaml
docker run -p 7276:7276 -p 8888:8888 -p 9943:9943 -p 55679:55679 -p 55680:55680 -p 9411:9411 \
    -v config.yaml:/etc/otel-collector-config.yaml:ro \
    --name otelcontribcol otel/opentelemetry-collector-contrib:0.5.0 \
        --config /etc/otel-collector-config.yaml
```

##### Run a working example.
For a complete working example, you can run <a href ="https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/docker-compose.yaml" target = "_blank"> this docker compose file <i class="fas fa-external-link-alt"></i>.</a>

  1. Download the docker compose file.
  2. Edit the Account Token and the other necessary parameters, according to the parameters listed in step 2, above.
  3. Run `docker-compose up`. 
  4. Head to [http://0.0.0.0:8080/](http://0.0.0.0:8080/) to trigger the event that will generate and send traces to your logz.io account.

##### Check Jaeger for your traces.

Give your traces some time to get from your system to ours,
and then open your Jaeger UI.

To learn more about tracing instrumentation, see <a href ="/user-guide/distributed-tracing/tracing-instrumentation#instrumentation-recommendations-and-resources" target = "_blank"> Instrumentation recommendations and resources <i class="fas fa-external-link-alt"></i>.</a>

