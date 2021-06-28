---
layout: article
title: OpenTelemetry in depth
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

The OpenTelemetry Collector offers a vendor-agnostic implementation to receive, process, and export telemetry data. It removes the need to run, operate, and maintain multiple agents/collectors from different vendors/products in order to support open-source observability data formats (for example, Jaeger, Prometheus, Fluent Bit, and so on). It can easily be configured to send data to the Logz.io backend. The Collector is the default location that instrumentation libraries export their telemetry data to.

Some of the OpenTelemetry Collector objectives are stability and performance under varying loads and configurations, and flexible customization without touching the core code.

_< image placeholder - let's sketch what you have in mind >_

## Configuring the OpenTelemetry Collector

The OpenTelemetry Collector includes components that need to be configured, and then enabled via pipelines: 
+ Receivers: Is it better to use a push or pull method to get data into the collector?
+ Processors: How should received data be handled?
+ Exporters: Where should the received data be sent and is it better to use a push or pull method for data export? 

_< AI: what is a pipeline and what and why does user need one? >_

Multiple instances of components and pipelines can be defined via a YAML configuration. 

Extensions provide capabilities that can be added to the Collector, but  do not require direct access to telemetry data , thus they are not part of pipelines.

### Receiver overview


### Exporter overview


### Extension overview

###### Extensions


Advanced extension configuration is available [here](https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/README.md)

 + health_check:
 + zpages:
 + pprof:

### Processors

###### Recommended processors

## Configuration examples

The configuation should much your environment

```
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
