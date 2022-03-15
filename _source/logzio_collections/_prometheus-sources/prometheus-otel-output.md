---
title: Ship Prometheus metrics with OpenTelemetry
logo:
  logofile: opentelemetry-icon-color.png
  orientation: vertical
data-source: OTEL for Prometheus metrics
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---


This project lets you configure the OpenTelemetry collector to send your collected Prometheus-format metrics to Logz.io.


#### Configuring OpenTelemetry to send your metrics data to Logz.io

<div class="tasklist">

##### Download and configure OpenTelemetry collector

Create a dedicated directory on your host and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/) that is relevant to the operating system of your host.

After downloading the collector, create a configuration file `config.yaml` with the parameters below.

<!-- info-box-start:info -->
If you already have OpenTelemetry, just add the below parameters to your existing configuration file.
{:.info-box.note}
<!-- info-box-end -->

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:

exporters:
  logging:
  prometheusremotewrite:
    endpoint: https://<<LISTENER-HOST>>:8053
    headers:
      Authorization: Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>

processors:
  batch:

extensions:
  pprof:
    endpoint: :1777
  zpages:
    endpoint: :55679
  health_check:

service:
  extensions: [health_check, pprof, zpages]
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, prometheusremotewrite]
```

{% include general-shipping/replace-placeholders-prometheus.html %}


##### Start the collector

Run the following command:

```shell
<path/to>/otelcol-contrib --config ./config.yaml
```

* Replace `<path/to>` with the path to the directory where you downloaded the collector. If the name of your configuration file is different to `config`, adjust name in the command accordingly.

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>




