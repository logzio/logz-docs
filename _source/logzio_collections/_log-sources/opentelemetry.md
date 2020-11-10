---
title: Ship traces with OpenTelemetry to Logz.io
logo:
  logofile: cisco-meraki-logo.png
  orientation: horizontal
data-source: Jaeger, Zipkin, OpenCensus, OpenTelemetry
description: How to deploy an OpenTelemetry Collector for traces to logz.io
open-source:
  - title: Logz.io-OpenTelemetry trace exporter
    github-repo: https://github.com/open-telemetry/opentelemetry-collector-contrib
contributors:
  - yyyogev
shipping-tags:
  - traces
---

Logz.io's trace exporter for OpenTelemetry allows you to ship distributed traces to Logz.io from different APM agents, such as Jaeger, Zipkin, and so on.


#### How it works

The OpenTelemetry Collector pipeline has the following main components: 
* Receivers
* Processors 
* Exporters. 

OpenTelemetry also includes extentions for additional functionality such as diagnostics and health checks. OpenTelemetry has a dedicated collector for contributed components, such as the Logz.io exporter.

#### Deploy OpenTelemetry Collector with Logz.io Exporter

1. Pull the latest opentelemetry-collector-contrib image:
```
docker pull otel/opentelemetry-collector-contrib:latest
```

2. Create a config file to mount to the container. The config file must include the required components for the OpenTelemetry Collector - receivers, processors, exporters, services and optional extensions.
You can use [this config file](https://github.com/open-telemetry/opentelemetry-collector-contrib/exporter/logzioexporter/example/config.yaml) as a starting point, with the following logzio exporter parameters:

* `account_token` (Required): The Logz.io account token for your tracing account.
* `region` (Optional): Your logz.io account [region code](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions). Defaults to `us`. Required only if your logz.io region is different than US.
* `custom_listener_address` (Optional): Custom traces endpoint, for dev. This will override the region parameter.

Save the file as `config.yaml`

3. Deploy the OpenTelemetry collector and mount the config file you saved.

```
docker run -p 7276:7276 -p 8888:8888 -p 9943:9943 -p 55679:55679 -p 55680:55680 -p 9411:9411 \
    -v config.yaml:/etc/otel-collector-config.yaml:ro \
    --name otelcontribcol otel/opentelemetry-collector-contrib:0.5.0 \
        --config /etc/otel-collector-config.yaml
```

For a complete working example, you can run [this docker-compose file](https://docs.logz.io/shipping-config-samples/docker-compose.yaml). Download the file, edit the Account Token and the other necessary parameters, run `docker-compse up` and head to http://0.0.0.0:8080/ to trigger event that will generate and send traces to your logz.io account.

##### Check Jaeger for your traces

Give your traces some time to get from your system to ours,
and then open your Jaeger UI.
