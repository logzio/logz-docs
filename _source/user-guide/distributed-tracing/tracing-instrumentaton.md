---
layout: article
title: Setting up instrumentation and ingesting traces
permalink: /user-guide/distributed-tracing/tracing-instrumentation
flags:
  logzio-plan: community
tags:
  - distributed tracing
contributors:
  - yberlinger
---
Logz.io makes the process of collecting data from the software as easy as possible, by taking advantage of community-developed plug-ins for the most commonly used libraries and frameworks. 

There’s a growing trend to do this for every type of library, software system, infrastructure component, such as proxies and service meshes, and even for orchestration systems, such as Kubernetes itself.

Logz.io’s distributed tracing solution is designed to support a variety of popular open source instrumentation libraries, including OpenTracing, Jaeger, and Zipkin.

If you hit a wall, we’ll do our best to provide support to help you solve your instrumentation issues. 

## Instrumentation options: Automatic or Manual
Automatic Instrumentation uses an intelligent auto-instrumenting agent which communicates with the software you run to extract tracing data. These agents instrument common application libraries and frameworks. 

A manual instrumentation strategy provides full control of the instrumentation: You can decide when to start and stop a trace, and what tags to add to each of the spans.

### Comparison: Automatic vs. manual instrumentation

![Automatic vs. manual instrumentation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/compare_instrumentation.png)

## Instrumentation recommendations and resources
We recommend that you first instrument the frameworks that are supported out-of-the-box, before proceeding with manual instrumentation to fine-tune the data. This will make instrumentation much easier and minimize the code you must write.

You can use Jaeger or Zipkin libraries. Select the one that is best suited for your use case:  

* Jaeger client libraries: [https://www.jaegertracing.io/docs/latest/client-libraries/#supported-librarieshttps://www.jaegertracing.io/docs/1.17/client-libraries/#supported-libraries](https://www.jaegertracing.io/docs/latest/client-libraries/#supported-librarieshttps://www.jaegertracing.io/docs/1.17/client-libraries/#supported-libraries)
* Zipkin libraries: [https://zipkin.io/pages/tracers_instrumentation](https://zipkin.io/pages/tracers_instrumentation)

### Tutorials 
Recommended instrumentation tutorials, by language:

* [C#](https://github.com/yurishkuro/opentracing-tutorial/tree/master/csharp)
* [Go](https://github.com/yurishkuro/opentracing-tutorial/tree/master/go)
* [Java](https://github.com/yurishkuro/opentracing-tutorial/tree/master/java)
* [Python](https://github.com/yurishkuro/opentracing-tutorial/tree/master/python)
* [Node.js](https://github.com/yurishkuro/opentracing-tutorial/tree/master/nodejs)

### Auto instrumentation resources
The following open infrastructure projects include built-in auto instrumentation:

* [Istio](https://istio.io/latest/docs/tasks/observability/distributed-tracing/jaeger/)
* [Envoy](https://www.envoyproxy.io/docs/envoy/latest/start/sandboxes/jaeger_tracing)
* [Grafana](https://grafana.com/docs/grafana/latest/administration/configuration/)
* [Traefik](https://docs.traefik.io/observability/tracing/jaeger/)
* [VertX](https://vertx-ci.github.io/vertx-4-preview/docs/vertx-opentracing/java/)
* [Kong](https://docs.konghq.com/hub/kong-inc/zipkin/) 
