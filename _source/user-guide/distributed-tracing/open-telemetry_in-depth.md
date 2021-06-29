---
layout: article
title: OpenTelemetry Collector in depth
permalink: /user-guide/distributed-tracing/open-telemetry_in-depth
flags:
  logzio-plan: pro 
tags:
  - distributed tracing
contributors:
  - afishler
  - yberlinger
---

New to OpenTelemetry? This topic will help you get started. 

## What is OpenTelemetry

[OpenTelemetry](http://opentelemetry.io) is a set of APIs, SDKs, tooling, and integrations that are designed for the creation and management of telemetry data such as traces, metrics, and logs. The project provides a vendor-agnostic implementation that can be configured to send telemetry data to Logz.io. It supports a variety of popular open-source projects including Jaeger and Prometheus that are provided by Logz.io as managed services.

~At this time (March 2021)~ 
_< these next2 paragraphs mean the same thing >_  ==> 

OpenTelemetry can be used to send Distributed Tracing telemetry, and includes the ability to instrument applications in several major languages. Additionally, the OpenTelemetry Collector can be deployed as a main component to collect and export trace data to the Logz.io backend.

OpenTelemetry offers configurable options to generate, transmit, collect, process, and export telemetry data: 
+ A set of instrumentation libraries per language
+ Support for both automatic and manual instrumentation
+ A single collector binary that can be deployed in a variety of ways. 


## Why (should you use) OpenTelemetry? 

Telemetry data is needed to power observability products. Traditionally, telemetry data has been provided by either open-source projects or commercial vendors. With a lack of standardization, the net result is the lack of data portability and the burden on the user to maintain instrumentation.

The OpenTelemetry project solves these problems by providing a single, vendor-agnostic solution. The project has broad industry support and adoption from cloud providers, vendors and end users. OpenTelemetry offers a path forward no matter where you are on your observability journey.

## The OpenTelemetry Collector

The OpenTelemetry Collector offers a vendor-agnostic solution for receiving, processing and exporting your telemetry data.

Because the OpenTelemetry collector can support open-source observability data formats (for example, Jaeger, Prometheus, Fluent Bit, and so on), there is no need to run, operate, and maintain multiple agents/collectors from different vendors/products.

The OpenTelemetry Collector can be easily configured to send data to the Logz.io backend, which makes it an effective default destination for export of telemetry date from your instrumentation stack.

The OpenTelemetry Collector provides stability and performance under varying loads and configurations and ability to configure flexible customizations -- without requiring modification of the core code.

_< image placeholder - let's sketch what you have in mind >_

## Configuring the OpenTelemetry Collector

The OpenTelemetry Collector includes components that need to be configured to respond to the following considerations, and then enabled via **pipelines**: 
+ **Receivers**: Is it better to use a push or pull method to get data into the collector?
+ **Processors**: How should received data be handled?
+ **Exporters**: Where should the received data be sent and is it better to use a push or pull method for data export? 

_< AI: The list above does not explain what each component does. Also - need to explain what a pipeline is and why the user needs one?  A diagram that describes and maps the modules of the pipeline??  Need tp explain what an extension is >_

Multiple instances of components and pipelines can be defined in a YAML configuration file. 

**Extensions** provide capabilities that can be added to the OpenTelemetry Collector, but do not require direct access to telemetry data, thus they are not part of pipelines.

### Receiver overview

Logz.io supports different open source configurations to get data into the Logz.io Distributed Tracing product.

While Jaeger is the default format for receiving trace data from Jaeger instrumentations, it also supports the Zipkin format: Thus, Logz.io can also support the import of trace data from your legacy Zipkin instrumented applications.

_< AI: what is this code snippet, and what is the user supposed to do with it? >_

```yaml
receivers:
   zipkin:
      endpoint: :9411
   jaeger:
      protocols:
        thrift_http:

```

### Exporter overview

To ensure that your trace data arrives via the Logz.io exporter to reach Logz.io Distributed Tracing, you'll need to obtain the [following Logz.io credentials](https://docs.logz.io/user-guide/distributed-tracing/getting-started-tracing/%20%20%20#look-up-your-distributed-tracing-token-and-region-information-in-logzio):

+ `account_token`: This is the [Distributed Tracing account token](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=tracing) for the specific account you want to send traces to.
+ `region`: The region for your account, which can be found either by checking [**Settings > General settings**](https://app.logz.io/#/dashboard/settings/general) or by checking the [Available regions table](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions). The default for this parameter is `us`, for the US East.

_< AI: what is this code snippet, and what is the user supposed to do with it? >_

```yaml
exporters:
   logzio:
      account_token: "<<TRACING-SHIPPING-TOKEN>>"
      region: us

```
### Extension overview

Many extensions come with default settings: Simply specifying the name of the extension is usually enough to configure it.

We recommend that you use the following extensions:

+ Health check: Enables an HTTP url that can be probed to check the status of the the OpenTelemetry Collector
+ Zpages: Enables an extension that serves zPages, an HTTP endpoint that provides live data for debugging different components that were properly instrumented for such  _!!comment: what does this mean?_

Information for advanced configuration of extensions is available [here](https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/README.md)


_< AI: what is this code snippet, and what is the user supposed to do with it? >_


```yaml
extensions:
  health_check:
  zpages:
  pprof:


```

### Processors

Processors are used at various stages of a pipeline. Generally, a processor pre-processes data before it is exported (for example, to modify attributes or sample) or helps ensure that data makes it through a pipeline successfully (for example, in a batch/retry process).

By default, no processors are enabled. Depending on the data source, it may be recommended that multiple processors be enabled. Processors must be enabled for every data source: Not all processors support all data sources. 

It is important to note that the order of processors matters. The order in each section below is the best practice. Refer to the individual processor documentation for more information.

1. **memory_limiter**: The memory limiter processor is used to prevent out of memory situations on the collector. We recommend that you read the [GitHub documentation](https://github.com/open-telemetry/opentelemetry-collector/blob/caadbbc476cc13ba87503b8ae7a1a8a50d5b22c4/processor/memorylimiter/README.md).

2. **probabilistic_sampler**: Configure this processor to sample out traces by percentage to reduce total volume. [See the OpenTelemetry Collector GitHub repo](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/probabilisticsamplerprocessor) for detailed information on this processor. For more advanced sampling strategies you can look at the [OpenTelemetry contributor repository](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor) for tail-based sampling.
3. **Batch**: The batch processor accepts spans and places them into batches. Batching helps better compress the data and reduce the number of outgoing connections required to transmit the data. This processor supports both size and time based batching. See the full [OpenTelemetry GitHub documentation](https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md) for more information on this processor.

###### Additional recommended processors

4. **Kubernetes Processor** (k8sprocessor): Available in the contributor repository. A well supported processor that automatically adds k8s metadata to spans. See the [full documentation](https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/processor/k8sprocessor) for more details.
5. **Span Metrics**: Developed by Logz.io, this processor aggregates **Request**, **Error**, and **Duration** (**R.E.D.**) metrics from span data. When located correctly in the processor order - that is, before any sampling processor - this processor can aggregate all span data, regardless of the spans that are actually exported to the Logz.io backend. 


## Configuration examples

An actual configuration should match your environment

```yaml
processors:
  memory_limiter:
    ballast_size_mib: 2000
    check_interval: 1s
    limit_mib: 4000
    spike_limit_mib: 800
  batch:
    send_batch_size: 10000
    timeout: 5s
  probabilistic_sampler:
    hash_seed: 22
    sampling_percentage: 1
  k8s_tagger:
    passthrough: true
```
