---
layout: article
title: Distributed Tracing table of contents
permalink: /user-guide/distributed-tracing/tracing-highlights
flags:
  logzio-plan: community
sitemap: false
tags:
  - distributed tracing
contributors:
  - yberlinger
---
### Oh, the Traces You'll Go! 

This section includes the following topics: 

* [Why Distributed Tracing?](/user-guide/distributed-tracing/tracing-overview): An overview of Logz.io's Jaeger-powered tracing solution
* [Getting started](/user-guide/distributed-tracing/getting-started-tracing): What you need to decide and set up to use Logz.io Distributed Tracing
    * [Deploying components in your system](/user-guide/distributed-tracing/deploying-components): What you need to install on your end
    * [Kubernetes deployment reference](/user-guide/distributed-tracing/k8s-deployment): A yaml file to deploy the collector/agent for Kubernetes
    * [Instrumenting](/user-guide/distributed-tracing/tracing-instrumentation): Deciding which instrumentation strategy is best for your needs
* [The Distributed Tracing Grand Tour](/user-guide/distributed-tracing/tracing-tour): Log in and get on the trace - 
      Search for traces and spans, and see all the things you came for 
    * [Viewing the trace timeline](/user-guide/distributed-tracing/trace-timeline): Dig into the details of each span
    * [Viewing the trace graph](/user-guide/distributed-tracing/trace-graph): See the sequence of requests within a trace, with spans grouped into node blocks
    * [Viewing the trace statistics ](/user-guide/distributed-tracing/trace-statistics): Focus on the span timing metrics 
    <!--* [Viewing the trace JSON](/user-guide/distributed-tracing/trace-json): Generate the JSON file for the trace, for future reference-->
    * [Comparing traces](/user-guide/distributed-tracing/compare-traces): See where traces differ from each other by comparing node blocks
    * [Viewing trace topology diagrams](/user-guide/distributed-tracing/topology-system_architecture): See the dependencies and structure of your system, as told by your tracing data
* [Correlating logs and traces](/user-guide/distributed-tracing/correlate-traces): Harness Kibana and Jaeger for even more powerful insights. 

