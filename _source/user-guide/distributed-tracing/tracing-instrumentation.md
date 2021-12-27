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

<!--This topic deprecated 22.Sept.2021 -->
Logz.io makes the process of collecting data from the software as easy as possible by taking advantage of community-developed plug-ins for the most commonly used libraries and frameworks. 

There’s a growing trend to do this for every type of library, software system, infrastructure component, such as proxies and service meshes, and even for orchestration systems, such as Kubernetes itself.

Logz.io’s distributed tracing solution is designed to support a variety of popular open source instrumentation libraries, including OpenTracing, Jaeger, OpenTelemetry, and Zipkin.    
  <!--AI when these are integrated:OpenCensus -->

But instrumentation doesn't *have* to be a huge all-or-nothing effort. It's not mandatory to immediately instrument ALL the code in your environment to start benefitting from Distributed Tracing: You can ramp up your instrumentation gradually, by implementing on a service-by-service basis.  


If you hit a wall, we’ll do our best to provide support to help you solve your instrumentation issues. 

## Instrumentation options: Automatic or Manual
Automatic Instrumentation uses an intelligent auto-instrumenting agent which communicates with the software you run to extract tracing data. These agents instrument common application libraries and frameworks. 

A manual instrumentation strategy provides full control of the instrumentation: You can define the boundaries of a trace, and what tags to add to each of the spans.

### Comparison: Automatic vs. manual instrumentation

While both instrumentations may cause performance overhead, the pros and cons of each option are summarized below:

|-----------------+------------+-----------------+----------------|
| Automatic Instrumentation | | Manual Instrumentation |  |
|-----------------|:-----------|:---------------|---------------|
| *Pros*|*Cons*|*Pros*|*Cons*|
|-----------------|-----------|---------------|---------------|
| Does not require code changes |Isn’t always able to instrument everything that needs to be instrumented |DIY instrumentation gives you maximum control over the data being generated  |Time consuming   |
| Captures most hard and repetitive tasks     |Cannot instrument business metrics out of the box: Can only handle technical metrics around usage and performance    |Supports a wider variety of programming languages    |Learning curve to perfect it            |
| Saves time instrumenting your code: Lets you focus on the business     |Often only captures error data in terms of related events or logs within a trace        | Enables you to instrument custom code blocks             | |
|-----------------+------------+-----------------+----------------|
|   |Less flexibility compared to manual instrumentation          |Can include business metrics within the trace, such as events or messages you want to use for monitoring or business observability                 |                |
|-----------------+------------+-----------------+----------------|


## Instrumentation recommendations and resources
We recommend that you first instrument the frameworks that are supported out-of-the-box, before proceeding with manual instrumentation to fine-tune the data. This will make instrumentation much easier and minimize the code you must write.

You can use Jaeger, OpenTelemetry, or Zipkin libraries. Select the one that is best suited for your use case:    <!--AI when these are integrated:OpenCensus -->

* <a href="https://www.jaegertracing.io/docs/latest/client-libraries/#supported-libraries" target="_blank">Jaeger client libraries<i class="fas fa-external-link-alt"></i></a> 
* <a href="https://zipkin.io/pages/tracers_instrumentation" target="_blank">Zipkin libraries <i class="fas fa-external-link-alt"></i></a> 
* <a href="https://opentelemetry.io/docs/" target="_blank">OpenTelemetry <i class="fas fa-external-link-alt"></i></a> 

### Tutorials 
Recommended instrumentation tutorials, by language:

* <a href ="https://github.com/yurishkuro/opentracing-tutorial/tree/master/csharp" target="_blank">C# <i class="fas fa-external-link-alt"></i></a> 
* <a href ="https://github.com/yurishkuro/opentracing-tutorial/tree/master/go" target="_blank">Go <i class="fas fa-external-link-alt"></i></a> 
* <a href ="https://github.com/yurishkuro/opentracing-tutorial/tree/master/java" target="_blank">Java <i class="fas fa-external-link-alt"></i></a> 
* <a href ="https://github.com/yurishkuro/opentracing-tutorial/tree/master/python" target="_blank">Python <i class="fas fa-external-link-alt"></i></a> 
* <a href ="https://github.com/yurishkuro/opentracing-tutorial/tree/master/nodejs" target="_blank">Node.js <i class="fas fa-external-link-alt"></i></a> 


### Auto instrumentation resources
The following open infrastructure projects include built-in auto instrumentation:

* <a href ="https://istio.io/latest/docs/tasks/observability/distributed-tracing/jaeger/" target="_blank">Istio <i class="fas fa-external-link-alt"></i></a> 
* <a href ="https://www.envoyproxy.io/docs/envoy/latest/start/sandboxes/jaeger_tracing" target="_blank">Envoy <i class="fas fa-external-link-alt"></i></a> 
* <a href ="https://docs.traefik.io/observability/tracing/jaeger/" target="_blank">Traefik <i class="fas fa-external-link-alt"></i></a> 
* <a href ="https://vertx-ci.github.io/vertx-4-preview/docs/vertx-opentracing/java/" target="_blank">VertX <i class="fas fa-external-link-alt"></i></a>
* <a href ="https://docs.konghq.com/hub/kong-inc/zipkin/" target="_blank">Kong <i class="fas fa-external-link-alt"></i></a>

### Expand your Instrumentation horizons: Logz.io blogs for inspiration and insights
We have some blog posts that you might be interested in: 

* <a href="https://logz.io/blog/jaeger-tracing-nodejs/" target="_blank"> Instrumenting Node.js for Tracing in Jaeger <i class="fas fa-external-link-alt"></i></a>
* <a href="https://logz.io/blog/go-instrumentation-distributed-tracing-jaeger/"> Beginner’s Guide to Jaeger + OpenTracing Instrumentation for Go <i class="fas fa-external-link-alt"></i></a>
* <a href="https://logz.io/blog/jaeger-instrumentation-introduction/#intro" target="_blank"> Jaeger Essentials: Introduction to Jaeger Instrumentation <i class="fas fa-external-link-alt"></i></a>