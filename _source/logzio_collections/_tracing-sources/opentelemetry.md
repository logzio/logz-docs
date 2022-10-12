---
title: Send traces from your OpenTelemetry installation to Logz.io 
logo:
  logofile: opentelemetry-icon-color.png
  orientation: vertical
data-source: OpenTelemetry installation
data-for-product-source: Tracing
description: Send traces from your OpenTelemetry installation to Logz.io 
contributors:
  - yyyogev
  - yberlinger
  - doron-bargo
  - nshishkin
shipping-tags:
  - existing-instrumentation
order: 330
---
<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Local host](#local-host)
* [Docker](#docker)
* [Kubernetes](#kubernetes)
* [Troubleshooting](#troubleshooting)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to send traces from your OpenTelemetry installation to Logz.io.

### Architecture overview

This integration includes:

* Configuring the OpenTelemetry collector to receive traces from your OpenTelemetry installation and send them to Logz.io

On deployment, your OpenTelemetry instrumentation captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">



### Set up your locally hosted OpenTelemetry installation to send traces to Logz.io

**Before you begin, you'll need**:

* An active account with Logz.io

<!-- info-box-start:info -->
This integration uses OpenTelemetry Collector Contrib, not the OpenTelemetry Collector Core.
{:.info-box.note}
<!-- info-box-end -->


<div class="tasklist">

##### Download and configure OpenTelemetry collector

Create a dedicated directory on the host of your application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.59.0) that is relevant to the operating system of your host.

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



exporters:
  logzio/traces:
    account_token: <<TRACING-SHIPPING-TOKEN>>
    region: <<LOGZIO_ACCOUNT_REGION_CODE>>
    
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
      receivers: [jaeger]
      processors: [batch]
      exporters: [logzio/traces]

```

{% include /tracing-shipping/replace-tracing-token.html %}

If you already have an OpenTelemetry installation, add the following parameters to the configuration file of your existing OpenTelemetry collector:

* Under the `exporters` list

```yaml
  logzio/traces:
    account_token: <<TRACING-SHIPPING-TOKEN>>
    region: <<LOGZIO_ACCOUNT_REGION_CODE>>
```

* Under the `service` list:

```yaml
  extensions: [health_check, pprof, zpages]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [logzio/traces]
```

{% include /tracing-shipping/replace-tracing-token.html %}

An example configuration file looks as follows:

```yaml
receivers:  
  otlp:
    protocols:
      grpc:
      http:

exporters:
  logzio/traces:
    account_token: "<<TRACING-SHIPPING-TOKEN>>"
    region: "<<LOGZIO_ACCOUNT_REGION_CODE>>"

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
      receivers: [otlp]
      processors: [batch]
      exporters: [logzio/traces]
```

##### Instrument the application

If your application is not yet instrumented, instrument the code as described in our [tracing documents](https://docs.logz.io/shipping/#tracing-sources).


##### Start the collector

Run the following command:

```shell
<path/to>/otelcontribcol_<VERSION-NAME> --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.
* Replace `<VERSION-NAME>` with the version name of the collector applicable to your system, e.g. `otelcontribcol_darwin_amd64`.

##### Run the application

Run the application to generate traces.


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="docker">


### Set up your OpenTelemetry installation using containerized collector to send traces to Logz.io

**Before you begin, you'll need**:

* An active account with Logz.io


<div class="tasklist">

##### Instrument the application

If your application is not yet instrumented, instrument the code as described in our [tracing documents](https://docs.logz.io/shipping/#tracing-sources).


{% include /tracing-shipping/docker.md %}

{% include /tracing-shipping/replace-tracing-token.html %}

##### Run the application

{% include /tracing-shipping/collector-run-note.md %}


Run the application to generate traces.


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="kubernetes">

### Overview

You can use a Helm chart to ship Traces to Logz.io via the OpenTelemetry collector. The Helm tool is used to manage packages of pre-configured Kubernetes resources that use charts.

**logzio-otel-traces** allows you to ship traces from your Kubernetes cluster to Logz.io with the OpenTelemetry collector.

<!-- info-box-start:info -->
This chart is a fork of the [opentelemtry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector) Helm chart. The main repository for Logz.io helm charts are [logzio-helm](https://github.com/logzio/logzio-helm).
{:.info-box.note}
<!-- info-box-end -->

<!-- info-box-start:info -->
This integration uses OpenTelemetry Collector Contrib, not the OpenTelemetry Collector Core.
{:.info-box.important}
<!-- info-box-end -->

#### Standard configuration

<div class="tasklist">

##### Deploy the Helm chart
 
Add `logzio-helm` repo as follows:
 
```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```

##### Run the Helm deployment code

```
helm install  \
--set config.exporters.logzio.region=<<LOGZIO_ACCOUNT_REGION_CODE>> \
--set config.exporters.logzio.account_token=<<TRACING-SHIPPING-TOKEN>> \
logzio-otel-traces logzio-helm/logzio-otel-traces
```

{% include /tracing-shipping/replace-tracing-token.html %}
`<<LOGZIO_ACCOUNT_REGION_CODE>>` - Your Logz.io account region code. [Available regions](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions).

##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, then open [Logz.io](https://app.logz.io/).

</div>

####  Customizing Helm chart parameters

##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install`.

* Edit the `values.yaml`.

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

###### Example

```
helm install logzio-otel-traces logzio-helm/logzio-otel-traces -f my_values.yaml 
```

#### Uninstalling the Chart

The uninstall command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `logzio-otel-traces` deployment, use the following command:

```shell
helm uninstall logzio-otel-traces
```

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="troubleshooting">

{% include /tracing-shipping/otel-troubleshooting.md %}

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
