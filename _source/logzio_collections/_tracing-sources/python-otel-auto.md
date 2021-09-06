---
title: Sending traces from Python applications via auto instrumentation with OpenTelemetry
logo:
  logofile: python.svg
  orientation: vertical
data-source: Automatic Python instrumentation
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - new-instrumentation
order: 1380
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Local host](#local-host)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to enable automatic instrumentation of your Python application using OpenTelemetry.

### Architecture overview

This integration includes:

* Installing the OpenTelemetry Python instrumentation packages on your application host
* Installing the OpenTelemetry collector with Logz.io exporter
* Running your Python application in conjunction with the OpenTelemetry instrumentation

On deployment, the Python instrumentation automatically captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">


### Setup auto-instrumentation for your locally hosted Python application and send traces to Logz.io

**Before you begin, you'll need**:

* A Python application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service


<div class="tasklist">

{% include /tracing-shipping/python-steps.md %}


##### Download and configure OpenTelemetry collector

Create a dedicated directory on the host of your Python application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.33.0) that is relevant to the operating system of your host.

After downloading the collector, create a configuration file `config.yaml` with the parameters below.

* {% include /tracing-shipping/replace-tracing-token.md %}

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

##### Run the OpenTelemetry instrumentation in conjunction with your Python application

Run the following command from the directory of your Python application script:

```shell
opentelemetry-instrument python3 <YOUR-APPLICATION-SCRIPT>.py
```

Replace `<YOUR-APPLICATION-SCRIPT>` with the name of your Python application script.

##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
