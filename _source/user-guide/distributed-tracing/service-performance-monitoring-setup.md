---
layout: article
title: Set up your Service Performance Monitoring dashboard
permalink: /user-guide/distributed-tracing/service-performance-monitoring-setup
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Setting up your Service Performance Monitoring dashboard
flags:
  beta: true
  logzio-plan: pro enterprise
tags: 
  - distributed tracing
contributors:
  - hidan
---

Logz.io Service Performance Monitoring dashboard provides an overview of your systems' health by aggregating **Request**, **Error**, and **Duration** (R.E.D) metrics from span data. The dashboard helps you to pinpoint and isolate incidents in your system quickly.

{% include page-info/early-access.md type="Beta" %}


The following guide helps you configure the OpenTelemetry collector to extract metrics from spans generated from your application instrumentation, and send them to Logz.io. Once configured and deployed, the collector accepts the span and processes them through two pipelines:

The first pipeline sends the spans to the Logz.io backend, where you can analyze single traces and focus on slowness and bottlenecks. The second pipeline extracts the metrics from the same spans, aggregates them and sends them to Logz.io’s Prometheus-based account.

<div class="tasklist">


#### Prerequisite for Service Performance Monitoring dashboard

To get started with your very own dashboard, you'll need the following:

* Admin permissions in an active Logz.io Tracing account
* An active Metrics plan with Logz.io (That's connected to your Tracing account, as detailed in the next section)
* An application instrumented with an OpenTelemetry installation

##### Create a Metrics account

To get started with your Service Performance Monitoring dashboard, you'll first need to create a **[Metrics](https://app.logz.io/#/dashboard/metrics)** account.

Navigate to **[Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts)**, scroll down to find the Metrics account plan, and click **Add a Metrics account**. 

The Metrics account name **must** contain the name of the matching Tracing account. For example, if your Tracing account is called `Sock Shop Tracing`, the connected Metrics account can be `SPM Sock Shop Tracing`.

![Tracing and Metrics account overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing-and-metrics-accounts.png)

##### Add Logz.io exporter to your OpenTelemetry collector

To set up your locally hosted OpenTelemetry installation to send traces to Logz.io, add the following parameters to the configuration file of your OpenTelemetry collector:

* Under the `receivers` list:

```yaml
otlp/spanmetrics:
    protocols:
      grpc:
        endpoint: :12345
  prometheus:
    config:
      global:
        external_labels:
          p8s_logzio_name: <<CHOOSE-LABEL-NAME>>
      scrape_configs: 
      - job_name: 'atm'
        scrape_interval: 15s
        static_configs:
        - targets: [ "0.0.0.0:8889" ]
```

* Under the `exporters` list:

```yaml
prometheusremotewrite:
    endpoint: https://<<LISTENER-HOST>>:8053 # Replace with the Logz.io Listener URL for your region, configured to use port 8052 for http traffic, or port 8053 for https traffic. https://docs.logz.io/user-guide/accounts/account-region.html#available-regions
    headers:
      Authorization: Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>> # Replace with your Metrics token https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=metrics
  prometheus:
    endpoint: "localhost:8889"
```

* Under the `processors` list:

```yaml
spanmetrics:
    metrics_exporter: prometheus
    latency_histogram_buckets: [2ms, 6ms, 10ms, 100ms, 250ms, 500ms, 1000ms, 10000ms, 100000ms, 1000000ms] #These are suggested latency buckets. You can configure the latency bucket to fit your data
    # Additional list of dimensions on top of:
    # - service.name
    # - operation
    # - span.kind
    # - status.code
    dimensions:
      # If the span is missing http.method, the processor will insert
      # the http.method dimension with value 'GET'.
      # For example, in the following scenario, http.method is not present in a span and so will be added as a dimension to the metric with value "GET":
      # - promexample_calls{http_method="GET",operation="/Address",service_name="shippingservice", span_kind="SPAN_KIND_SERVER",status_code="STATUS_CODE_UNSET"} 1
      - name: http.method
        default: GET
      # If a default is not provided, the http.status_code dimension will be omitted
      # if the span does not contain http.status_code.
      # For example, consider a scenario with two spans, one span having http.status_code=200 and another missing http.status_code. Two metrics would result with this configuration, one with the http_status_code omitted and the other included:
      # - promexample_calls{http_status_code="200",operation="/Address",service_name="shippingservice", span_kind="SPAN_KIND_SERVER",status_code="STATUS_CODE_UNSET"} 1
      # - promexample_calls{operation="/Address",service_name="shippingservice", span_kind="SPAN_KIND_SERVER",status_code="STATUS_CODE_UNSET"} 1
      - name: http.status_code
```

* Under the `service: pipelines` list:

```yaml
  metrics/spanmetrics:
      # This receiver is just a dummy and never used.
      # Added to pass validation requiring at least one receiver in a pipeline.
      receivers: [otlp/spanmetrics]
      exporters: [prometheus]
```

##### Start the collector


Deploy the integration and send traces from your OpenTelemetry installation to Logz.io. You can choose from the following methods:

* Local host
* Docker 
* Kubernetes

##### Run the application

Run the application to generate traces.

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, then navigate to **[Tracing](https://app.logz.io/#/dashboard/jaeger/) > [Monitor](https://app.logz.io/#/dashboard/jaeger/monitor)** and view your aggregated metrics for your services and operations.



<!--
#### To generate a Service Performance Monitoring dashboard: 
{:.no_toc}  



##### Create a Metrics account

_You must have admin permissions for the Logz.io account to view and edit the **Manage accounts** page._

1. Navigate to **Tracing** > <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage accounts** > **Get my Metrics account**.
3. Choose a name for your account. The new Metrics account name **must contain** your Tracing account name.
4. Pick your preferred number of unique metrics and **Create** the account.
3. Copy the new Metrics account token.

![Account management screen](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/manage-accounts-metrics-creation.png)


##### Install and run the Span Metrics Processor

Logz.io captures end-to-end distributed transactions from your applications and infrastructure with trace spans sent via the Spanmetrics OpenTelemetry collector, which you install inside your environment.

The Span Metrics Processor processes spans on the go, emitting R.E.D metrics at configurable time intervals.

[This link takes you to the OpenTelemetry installation.](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/opentelemetry) 
The information is also available in the **Logz.io Docs**, in [**Ship your data > OpenTelemetry installation**](https://docs.logz.io/shipping/tracing-sources/opentelemetry.html).

To configure your spanmetrics processor, make sure you use your **Metrics** account token, name and region.


```yaml
receivers:
  jaeger:
    protocols:
      grpc:
      thrift_binary:
      thrift_compact:
      thrift_http:
​
  otlp/spanmetrics:
    protocols:
      grpc:
        endpoint: :12345
  otlp:
    protocols:
      grpc:
        endpoint: :4317
  prometheus:
    config:
      global:
        external_labels:
          p8s_logzio_name: # Enter chosen name
      scrape_configs: 
      - job_name: '' # Enter job name
        scrape_interval: 15s
        static_configs:
        - targets: [ "0.0.0.0:8889" ]
​
exporters:
  logzio:
    account_token: " " # Enter your account token
    region: "us" # Enter your region
  prometheusremotewrite:
    endpoint: https://listener-us.logz.io:8053
    headers:
      Authorization: Bearer duwFfWzoOBTUgavSxtAacNWwXbwgPcnx
  prometheus:
    endpoint: "localhost:8889"
  logging:
​
processors:
  batch:
  spanmetrics:
    metrics_exporter: prometheus
    latency_histogram_buckets: [2ms, 6ms, 10ms, 100ms, 250ms, 500ms, 1000ms, 10000ms, 100000ms, 1000000ms]
    # Additional list of dimensions on top of:
    # - service.name
    # - operation
    # - span.kind
    # - status.code
    dimensions:
      # If the span is missing http.method, the processor will insert
      # the http.method dimension with value 'GET'.
      # For example, in the following scenario, http.method is not present in a span and so will be added as a dimension to the metric with value "GET":
      # - promexample_calls{http_method="GET",operation="/Address",service_name="shippingservice", span_kind="SPAN_KIND_SERVER",status_code="STATUS_CODE_UNSET"} 1
      - name: http.method
        default: GET
      # If a default is not provided, the http.status_code dimension will be omitted
      # if the span does not contain http.status_code.
      # For example, consider a scenario with two spans, one span having http.status_code=200 and another missing http.status_code. Two metrics would result with this configuration, one with the http_status_code omitted and the other included:
      # - promexample_calls{http_status_code="200",operation="/Address",service_name="shippingservice", span_kind="SPAN_KIND_SERVER",status_code="STATUS_CODE_UNSET"} 1
      # - promexample_calls{operation="/Address",service_name="shippingservice",span_kind="SPAN_KIND_SERVER", status_code="STATUS_CODE_UNSET"} 1
      - name: http.status_code    
​
extensions:
  pprof:
    endpoint: :1777
  zpages:
    endpoint: :55679
  health_check:
​
service:
  extensions: [health_check, pprof, zpages]
  pipelines:
    traces:
      receivers: [jaeger]
      processors: [spanmetrics,batch]
      exporters: [logzio]
    metrics/spanmetrics:
      # This receiver is just a dummy and never used.
      # Added to pass validation requiring at least one receiver in a pipeline.
      receivers: [otlp/spanmetrics]
      exporters: [prometheus]
    metrics:
      receivers: [otlp,prometheus]
      exporters: [logging,prometheusremotewrite]      
  telemetry:
    logs:
      level: "error"
````

<!--
The OpenTelemetry repository offers configuration examples, such as:

* [Exporter not found](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/spanmetricsprocessor/testdata/config-exporter-not-found.yaml) - Where the configured 'metrics_exporter' within spanprocessor, cannot be found in any pipeline, leading to a config validation error
* [3-pipeline configuration](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/spanmetricsprocessor/testdata/config-3-pipelines.yaml) - When a user wishes to perform further processing of aggregated span metrics prior to exporting (traces -> metrics-proxy-pipeline -> metrics)
* [And more](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/spanmetricsprocessor/testdata)
-->
<!--
##### View your Service Performance Monitoring dashboard

Once you've finished the setup, the new dashboard will be available under your Tracing account. To view it, navigate to the [Tracing account](https://app.logz.io/#/dashboard/jaeger/monitoring), and click on the **Monitoring** tab:

![Service Performance Monitoring dashboard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spm-main-dashboard.png)

The dashboard includes a breakdown of R.E.D data (Requests, Errors and Delay) based on the operations running inside the chosen service.

To learn more about the Service Performance Monitoring dashboard, what it includes and how you can utilize it, **[check out our detailed overview](https://docs.logz.io/user-guide/distributed-tracing/service-performance-monitoring#service-performance-monitoring-dashboard)**.
-->
</div>