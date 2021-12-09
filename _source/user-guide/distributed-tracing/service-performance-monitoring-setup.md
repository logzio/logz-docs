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

Logz.io Service Performance Monitoring dashboard provides an overview of your systems' health by aggregating Request, Error and Duration (R.E.D) metrics from span data. The dashboard helps you to pinpoint and isolate incidents in your system quickly.

{% include page-info/early-access.md type="Beta" %}

#### To generate a Service Performance Monitoring dashboard: 
{:.no_toc}  

<div class="tasklist">

##### Create a Metrics account

_You must have admin permissions for the Logz.io account to view and edit the **Manage accounts** page._

1. From the **Tracing** menu, go to <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage accounts**
2. Scroll down to find the Metrics plan and click  **Get my Metrics account**
3. Choose a name for your account. Note that your Metrics account name **must contain** your Tracing account name
4. Pick your preferred number of unique metrics and click **Create**
3. Find the new Metrics account, and copy the token

![Account management screen](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/manage-accounts-metrics-creation.png)


##### Install and run the Span Metrics Processor

Logz.io captures end-to-end distributed transactions from your applications and infrastructure with trace spans sent via the Spanmetrics OpenTelemetry collector, which you install inside your environment.

The Span Metrics Processor processes spans on the go, emitting R.E.D metrics at configurable time intervals.

[This link takes you to the OpenTelemetry installation.](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/opentelemetry) 
The information is also available in the **Logz.io Docs**, in [**Ship your data > OpenTelemetry installation**](https://docs.logz.io/shipping/tracing-sources/opentelemetry.html).

To configure your spanmetrics processor, make sure you use your **Metrics** account token, name and region.

<!--

```yaml
receivers:
    otlp/spanmetrics:
      protocols:
        grpc:
          endpoint: "0.0.0.0:12345"
    opencensus:
    zipkin:
      endpoint: :9411
    jaeger:
      protocols:
        thrift_http:
        grpc:
    prometheus:
      config:
        global:
          external_labels:
            p8s_logzio_name: YOUR-ACCOUNT-NAME # Replace with your account name
        scrape_configs: 
        - job_name: 'name' # give the job a name
          scrape_interval: 15s
          static_configs:
          - targets: [ "0.0.0.0:8889" ]
  exporters:
    logzio:
      account_token: "${LOGZIO_TRACE_TOKEN}" #Replace with your Tracing account token
      region: "us"    # Replace with the 2-letter code for your region from the Logz.io Regions and Listener hosts table or from your Account settings page
    prometheusremotewrite:
      endpoint: https://listener.logz.io:8053
      headers:
        Authorization: Bearer ${LOGZIO_METRICS_TOKEN}
    prometheus:
      endpoint: "localhost:8889"
    logging:
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
        # - promexample_calls{http_method="GET",operation="/Address",
        # service_name="shippingservice",span_kind="SPAN_KIND_SERVER",status_code="STATUS_CODE_UNSET"} 1
        - name: http.method
          default: GET
        # If a default is not provided, the http.status_code dimension will be omitted
        # if the span does not contain http.status_code.
        # For example, consider a scenario with two spans, one span having http.status_code=200 and another missing http.status_code. Two metrics would result with this configuration, one with the http_status_code omitted and the other included:
        # - promexample_calls{http_status_code="200",operation="/Address",
        # service_name="shippingservice",span_kind="SPAN_KIND_SERVER",status_code="STATUS_CODE_UNSET"} 1
        # - promexample_calls{operation="/Address",
        # service_name="shippingservice",span_kind="SPAN_KIND_SERVER",status_code="STATUS_CODE_UNSET"} 1
        - name: http.status_code
  extensions:
    pprof:
      endpoint: :1777
    zpages:
      endpoint: :55679
    health_check:
  service:
    extensions: [health_check, pprof]
    pipelines:
      traces:
        receivers: [opencensus, jaeger, zipkin]
        processors: [spanmetrics,batch]
        exporters: [logzio]
      metrics/spanmetrics:
        # This receiver is just a dummy and never used.
        # Added to pass validation requiring at least one receiver in a pipeline.
        receivers: [otlp/spanmetrics]
        exporters: [prometheus]
      metrics:
        receivers: [prometheus]
        exporters: [logging,prometheusremotewrite]
```
-->

The OpenTelemetry repository offers configuration examples, such as:

* [Exporter not found](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/spanmetricsprocessor/testdata/config-exporter-not-found.yaml) - Where the configured 'metrics_exporter' within spanprocessor, cannot be found in any pipeline, leading to a config validation error
* [3-pipeline configuration](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/spanmetricsprocessor/testdata/config-3-pipelines.yaml) - When a user wishes to perform further processing of aggregated span metrics prior to exporting (traces -> metrics-proxy-pipeline -> metrics)
* [And more](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/spanmetricsprocessor/testdata)


##### View your Service Performance Monitoring dashboard

Once you've finished the setup, the new dashboard will be available under your Tracing account. To view it, navigate to the [Tracing account](https://app.logz.io/#/dashboard/jaeger/monitoring), and click on the **Monitoring** tab:

![Service Performance Monitoring dashboard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spm-main-dashboard.png)

The dashboard includes a breakdown of R.E.D data (Requests, Errors and Delay) based on the operations running inside the chosen service.

To learn more about the Service Performance Monitoring dashboard, what it includes and how you can utilize it, **[check out our detailed overview](https://docs.logz.io/user-guide/distributed-tracing/service-performance-monitoring#service-performance-monitoring-dashboard)**.

</div>