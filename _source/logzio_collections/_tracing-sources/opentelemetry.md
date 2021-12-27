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

* An application instrumented with an OpenTelemetry installation
* An active account with Logz.io


<div class="tasklist">

##### Add Logz.io exporter to your OpenTelemetry collector

Add the following parameters to the configuration file of your OpenTelemetry collector:

* Under the `exporters` list

```yaml
  logzio:
    account_token: <<TRACING-SHIPPING-TOKEN>>
    #region: "<<LOGZIO_ACCOUNT_REGION_CODE>>" - (Optional): Your logz.io account region code. Defaults to "us". Required only if your logz.io region is different than US East. https://docs.logz.io/user-guide/accounts/account-region.html#available-regions
```

* Under the `service` list:

```yaml
  extensions: [health_check, pprof, zpages]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [logzio]
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
  logzio:
    account_token: "<<TRACING-SHIPPING-TOKEN>>"
    #region: "<<LOGZIO_ACCOUNT_REGION_CODE>>" - (Optional): Your logz.io account region code. Defaults to "us". Required only if your logz.io region is different than US East. https://docs.logz.io/user-guide/accounts/account-region.html#available-regions

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
      exporters: [logzio]
```

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

* An application instrumented with an OpenTelemetry installation
* An active account with Logz.io


<div class="tasklist">


{% include /tracing-shipping/docker.md %}

{% include /tracing-shipping/replace-tracing-token.html %}

##### Run the application

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
This chart is a fork of the [opentelemtry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector) Helm chart.
{:.info-box.note}
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
`<<LOGZIO_ACCOUNT_REGION_CODE>>` - (Optional): Your logz.io account region code. Defaults to "us". Required only if your logz.io region is different than US East. https://docs.logz.io/user-guide/accounts/account-region.html#available-regions

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


</div>
<!-- tabContainer:end -->
