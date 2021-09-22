---
layout: article
title: Getting started with Logz.io Distributed Tracing
permalink: /user-guide/distributed-tracing/getting-started-tracing
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - yberlinger
---
Get set and get ready: This section describes what you have to do to get set up - before you can use Distributed Tracing in Logz.io.

If you already have Jaeger installed locally, learn how to [Send traces from your Jaeger installation to Logz.io](https://deploy-preview-1368--logz-docs.netlify.app/shipping/tracing-sources/jaeger-collector.html).


#### To set up Distributed Tracing: 
{:.no_toc}  

<div class="tasklist">

##### Get access to Logz.io

1. [Create a free trial account.](https://logz.io/freetrial-choose/)
   ![Sign up](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trial_signup.png)

2. Navigate to the [**Tracing** menu](https://app.logz.io/#/dashboard/jaeger) and activate the account.
   ![Activate tracing](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing_activate.png)
   
<!--Step 2 is not accurate or clear -->

##### Look up your Distributed Tracing token and Region information in Logz.io

###### Tracing token
{% include tracing-shipping/tracing-token.md %}

###### Region information
{% include tracing-shipping/region-code.md %}


##### Set up instrumentation

Logz.io makes the process of collecting data from the software as easy as possible by taking advantage of community-developed plug-ins for the most commonly used libraries and frameworks. 

There’s a growing trend to do this for every type of library, software system, infrastructure component, such as proxies and service meshes, and even for orchestration systems, such as Kubernetes itself.

Logz.io’s distributed tracing solution is designed to support a variety of popular open source instrumentation libraries, including OpenTracing, Jaeger, OpenTelemetry, and Zipkin.    

But instrumentation doesn't *have* to be a huge all-or-nothing effort. It's not mandatory to immediately instrument ALL the code in your environment to start benefitting from Distributed Tracing: You can ramp up your instrumentation gradually, by implementing on a service-by-service basis.  

If you hit a wall, we’ll do our best to provide support to help you solve your instrumentation issues. 

To determine the best instrumentation strategy for your system, start with [**Tracing > Send your traces**](https://app.logz.io/#/dashboard/send-your-data?tag=all&collection=tracing-sources&accountIds=true), and then select the relevant filter in the **Tracing** tab: Either **My code is instrumented** or **My code is not instrumented**. 

This information is available in the **Logz.io Docs**, in [**Send your data > Tracing**](https://docs.logz.io/shipping/#tracing-sources).


##### Install the OpenTelemetry Collector

Logz.io captures end-to-end distributed transactions from your applications and infrastructure with trace spans sent directly to Logz.io via the OpenTelemetry collector, which you install inside your environment.

We recommend that you use the OpenTelemetry collector to gather trace transaction data from your system. With the merging of the OpenTracing and OpenCensus projects, OpenTelemetry is the CNCF standard. We plan to add aggregated tracing metrics capabilities that will only be available via the OpenTelemetry collector.

[Start the OpenTelemetry installation.](https://app.logz.io/#/dashboard/send-your-data/tracing-sources/opentelemetry) 
This information is also available in the **Logz.io Docs**, in [**Ship your data > OpenTelemetry installation**](https://docs.logz.io/shipping/tracing-sources/opentelemetry.html).

If you’re deploying distributed tracing on Kubernetes, we recommend the [Kubernetes deployment reference](https://docs.logz.io/user-guide/user-guide/distributed-tracing/k8s-deployment) topic.

To additional insights, check out our [Guide to OpenTelemetry!](https://logz.io/learn/opentelemetry-guide/)