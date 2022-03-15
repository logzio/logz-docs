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

##### Download OpenTelemetry collector
  
<!-- info-box-start:info -->
If you already have OpenTelemetry, proceed to the next step.
{:.info-box.note}
<!-- info-box-end -->

Create a dedicated directory on your host and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/) that is relevant to the operating system of your host.

After downloading the collector, create a configuration file `config.yaml`.

##### Configure the receivers
  
Open the configuration file and make sure that it contains the receivers required for your source. For example, if you are sending otlp data, the receivers will be as follows:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:
```

##### Configure the exporters

In the same configuration file, add the followinf to the `exporters` section:
  
```yaml  
exporters:
  logging:
  prometheusremotewrite:
    endpoint: https://<<LISTENER-HOST>>:8053
    headers:
      Authorization: Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>
```
  
{% include general-shipping/replace-placeholders-prometheus.html %}

##### Configure the service pipeline
  
In the `service` section of the configuration file, add the following configuration
  
```yaml
service:
  pipelines:
    metrics:
      receivers: <<YOUR-RECEIVER>>
      exporters: [prometheusremotewrite]
```
* Replace `<<YOUR_RECEIVER>>` with the name of your receiver, for example `[otlp]` for the otlp receiver.



##### Start the collector

Run the following command:

```shell
<path/to>/otelcol-contrib --config ./config.yaml
```

* Replace `<path/to>` with the path to the directory where you downloaded the collector. If the name of your configuration file is different to `config`, adjust name in the command accordingly.

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>




