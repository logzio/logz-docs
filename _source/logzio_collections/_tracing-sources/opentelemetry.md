---
title: Send traces from your OpenTelemetry installation to Logz.io 
logo:
  logofile: opentelemetry-icon-color.png
  orientation: vertical
data-source: OpenTelemetry installation
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


### Setup your locally hosted OpenTelemetry installation to send traces to Logz.io

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
      receivers: [jaeger]
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

</div>
<!-- tabContainer:end -->