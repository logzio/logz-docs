---
layout: article
title: Getting started with Service Performance Monitoring
permalink: /user-guide/distributed-tracing/service-performance-monitoring
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Getting started with Logz.io Service Performance Monitoring feature
flags:
  beta: true
  logzio-plan: pro enterprise
tags: 
  - distributed tracing
contributors:
  - hidan
---

Logz.io has joined forces with the open-source community to help users quickly identify issues, spikes and anomalies in their services and operations.

Service Performance Monitoring enhances [Jaeger](https://www.jaegertracing.io/), a distributed tracing platform, and OpenTelemetry, to provide a high-level monitoring dashboard. The data aggregates Request, Error and Duration (R.E.D) metrics from span data, pointing and isolating incidents in your systems.

<p class="info-box note">This feature is in Beta. If you encounter any issues, please contact the [Logz.io Support team](mailto:help@logz.io).</p>

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

Here is a configuration example. Make sure you include your account name, region and token.

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
        - job_name: 'atm'
          scrape_interval: 15s
          static_configs:
          - targets: [ "0.0.0.0:8889" ]
  exporters:
    logzio:
      account_token: "${LOGZIO_TRACES_TOKEN}"
      region: "us"    # Replace with the 2-letter code for your region from the Logz.io Regions and Listener hosts table or from your Account settings page - as in step 3 above. 
    prometheusremotewrite:
      endpoint: https://listener.logz.io:8053
      headers:
        Authorization: Bearer ${LOGZIO_METRICS_TOKEN}
    prometheus:
      endpoint: "localhost:8889"
      namespace: "atm"
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

Additional configuration examples can be found in the [OpenTelemetry repository](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/spanmetricsprocessor/testdata).



##### View your Service Performance Monitoring dashboard

To view your dashboard, navigate to your [Tracing account](https://app.logz.io/#/dashboard/jaeger/monitoring), and click on the **Monitoring** tab.

![Service Performance Monitoring dashboard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/service-performance-monitoring-screen.png)

</div>