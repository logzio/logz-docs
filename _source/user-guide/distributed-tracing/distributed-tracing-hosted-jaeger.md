---
layout: article
title: Distributed Tracing with Jaeger
permalink: /user-guide/distributed-tracing/
flags:
  logzio-plan: community
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger
---
## Yes, you _can_ have it all!

Maximize your value with the Logz.io end-to-end system observability platform and use the best open source as a service solution (OSAAS) for: 

* Log analytics - to debug an individual issue or problem (diagnostics... how do I fix the problem?)

* Infrastructure monitoring - to understand a pattern or trend (measure/monitor... is my service slowing down?)

* Distributed tracing - to identify when and where performance issues or errors are occurring for a specific transaction, and isolate the contributing causes of these issues

## Why go it alone? 

Logz.io Distributed Tracing provides Jaeger as a fully managed service - so modern DevOps teams can use the best cloud-native open source tracing tool - without running it themselves. Gain a system-wide view of your distributed architecture, stay alerted on failed or high latency requests, and quickly drill into end-to-end call sequences of selected requests of intercommunicating microservices. 

Logz.io gives you amazing granularity to look under the hood at how your microservices are interacting and lets you access rich information that you can parlay into improving the time it takes to get things done and investigating - and then troubleshooting - potential microservice timing/firing issues.

## So what _is_ distributed tracing?

Distributed tracing is a method used to profile and monitor applications, especially those built with microservices. Distributed tracing helps you pinpoint where failures occur and what causes poor performance when you analyze the fully mapped trace.

A trace is a snapshot of the lifecycle of a single service or request transaction and maps the execution path the request takes through the system. Each trace is composed of a varying number of spans which must all be executed for the transaction to be successful.  

A span is the primary building block of a distributed trace. Spans represent an individual unit of work done in a distributed system. Each component of the distributed system contributes a span - a named, timed operation representing a piece of the workflow. Spans can (and generally do) contain “References” to other spans, which allows multiple spans to be assembled into one complete trace - a visualization of the life of a request as it moves through various microservices in a distributed systems. The edges between the spans which make up a trace indicate parent/child relationships.

DevOps teams can use distributed tracing to monitor the requests in their system from a high-level, and then dig into specific requests as issues arise.

Each span is defined by its:

* Operation name

* Start and finish timestamps, and span duration 

* Set of key:value span Tags 

  Tags are key:value pairs that enable user-defined span annotations. You can use these tags to query, filter, and understand trace data. 

* Set of key:value span Logs 

* Span context 

Tracing tools visualize and map application requests as they execute across microservices. 

For example: When a service with the unique ID executes within the system, it calls microservices A through E. Each microservice request returns a response.

Microservice A is the edge service at which the transaction execution begins. This service first calls microservice B, and then calls microservice E after microservice B begins to execute.
Microservice B calls microservices C and D.   

Implicit in this example are the responses returned by each microservice.

* placeholder for image>

The microservice calls can be represented by time spans: Each bar in the image below is a span. All of these spans together make up the full trace. 

* placeholder for image>