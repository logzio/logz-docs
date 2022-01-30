---
title: Ship MongoDB Atlas metrics via OpenTelemetry
logo:
  logofile: mongoatlas-logo.png
  orientation: vertical
data-source: MongoDB Atlas
data-for-product-source: Metrics
templates: ["docker"]
contributors:
  - nshishkin
shipping-tags:  
  - prometheus
order: 800
---

MongoDB Atlas is a fully-managed cloud database that handles deploying, managing and healing deployments on its cloud service provider.  

This integration uses OpenTelemetry with a dedicated MongoDB Atlas receiver and a Prometheus exporter to collect the MongoDB Atlas data from your hosts and send it to your Logz.io metrics account using a Logz.io exporter.


#### Deploying the integration

**Before you begin, you'll need**:

* A MongoDB Atlas project
* Private and public keys created for your MongoDB Atlas [organization](https://docs.atlas.mongodb.com/tutorial/configure-api-access/organization/create-one-api-key/) or the [project](https://docs.atlas.mongodb.com/tutorial/configure-api-access/project/create-one-api-key/) to send the data from.
* An active account with Logz.io

<div class="tasklist">

##### Download and configure OpenTelemetry collector

Create a dedicated directory on your host and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/) that is relevant to the operating system of your host.

After downloading the collector, create a configuration file `config.yaml` with the following parameters:

```yaml
receivers:
  jaeger:
    protocols:
      thrift_compact:
        endpoint: "0.0.0.0:6831"
      thrift_binary:
        endpoint: "0.0.0.0:6832"
      grpc:
        endpoint: "0.0.0.0:14250"
      thrift_http:
        endpoint: "0.0.0.0:14268"
  opencensus:
    endpoint: "0.0.0.0:55678"
  otlp:
    protocols:
      grpc:
        endpoint:
      http:
        endpoint:
  zipkin:
    endpoint: "0.0.0.0:9411"
  mongodbatlas:
    public_key: <<YOUR-MONGODB-ATLAS-PUBLIC-KEY>>
    private_key: <<YOUR-MONGODB-ATLAS-PRIVATE-KEY>>
  prometheus:
    config:
      global:
        external_labels:
          p8s_logzio_name: <<METRICS-NAME>>
      scrape_configs:
      - job_name: <<JOB-NAME>>
        scrape_interval: 15s

exporters:
  logzio:
    region:
    account_token: <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>
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
    traces:
      receivers: [opencensus, jaeger, zipkin, otlp]
      processors: [batch]
      exporters: [logging, logzio]
    metrics:
      receivers: [mongodbatlas]
      processors: [batch]
      exporters: [logging, prometheusremotewrite]
```

{% include general-shipping/replace-placeholders-prometheus.html %}
* Replace `<<YOUR-MONGODB-ATLAS-PUBLIC-KEY>>` with the public key to your MongoDB Atlas organization or project.
* Replace `<<YOUR-MONGODB-ATLAS-PRIVATE-KEY>>` with the private key to your MongoDB Atlas organization or project.
* Replace `<<METRICS-NAME>>` with the required name for your metrics.
* Replace `<<JOB-NAME>>` with the required name for your Prometheus job.

##### Start the collector

Run the following command:

```shell
<path/to>/otelcol-contrib --config ./config.yaml
```

* Replace `<path/to>` with the path to the directory where you downloaded the collector.

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
