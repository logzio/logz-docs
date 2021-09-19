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

##### Set up instrumentation
Determine the best instrumentation strategy for your system, starting with [Ship data > Tracing](https://deploy-preview-1368--logz-docs.netlify.app/shipping/#tracing-sources), and select the relevant filter for the **Tracing** tab: **My code is instrumented** or **My code is not instrumented**. 



##### Look up your Distributed Tracing token and Region information in Logz.io

###### Tracing token
{% include tracing-shipping/tracing-token.md %}

###### Region information
{% include tracing-shipping/region-code.md %}


##### Deploy tracing components
Decide on your tracing source, make deployment decisions, and decide whether or not to use an agent to send tracing data to Logz.io.
<a href="/user-guide/distributed-tracing/deploying-components.html" target ="_blank"> Read more about deploying tracing components.</a>

If you’re deploying distributed tracing on Kubernetes, we recommend the [Kubernetes deployment reference](https://docs.logz.io/user-guide/user-guide/distributed-tracing/k8s-deployment) topic.

<!--  removed blog link     <a href="https://logz.io/blog/jaeger-kubernetes-best-practices/" target ="_blank">A Guide to Deploying Jaeger on Kubernetes in Production. </a>   -->








