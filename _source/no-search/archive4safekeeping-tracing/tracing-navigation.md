---
layout: article
title: Parent
permalink: /user-guide/distributed-tracing/navigation
flags:
  logzio-plan: community
  beta: true
sitemap: false
tags:
  - distributed tracing
contributors:
  - yberlinger   
---

This section includes the following topics: 

* [Why Distributed Tracing?](/user-guide/distributed-tracing/getting-started-tracing/): An overview of Logz.io's Jaeger-powered tracing solution
* [Getting started](/user-guide/distributed-tracing/getting-started-tracing): What you need to decide and set up to use Logz.io Distributed Tracing
    * [Deploying components in your system](/user-guide/distributed-tracing/deploying-components): What you need to install on your end
    * [Kubernetes deployment reference](/user-guide/distributed-tracing/k8s-deployment)
    * [Instrumenting](/user-guide/distributed-tracing/tracing-instrumentation): Deciding which instrumentation strategy is best for your needs
* [The Distributed Tracing Grand Tour](/user-guide/distributed-tracing/tracing-tour): Log in and get on the trace
    * [Viewing the trace timeline](/user-guide/distributed-tracing/trace-timeline): Dig into the details of each span
    * [Viewing the trace graph](/user-guide/distributed-tracing/trace-graph): See the sequence of requests within a trace, with spans grouped into node blocks
    * [Viewing the trace statistics ](/user-guide/distributed-tracing/trace-statistics): Focus on the span timing metrics 
    <!-- * [Viewing the trace JSON](/user-guide/distributed-tracing/trace-json): Generate the JSON file for the trace, for future reference -->
    * [Comparing traces](/user-guide/distributed-tracing/compare-traces): See where traces differ from each other, by comparing node blocks
    * [Viewing trace topology diagrams](/user-guide/distributed-tracing/topology-system_architecture): See the dependencies and structure of your system, as told by the service request trace stories
* [Correlating logs and traces](/user-guide/distributed-tracing/correlate-traces): Harness Open Search Dashboards and Jaeger for even more powerful insights. 