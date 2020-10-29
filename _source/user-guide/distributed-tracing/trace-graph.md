---
layout: article
title: What can I do in the Trace Graph?
permalink: /user-guide/distributed-tracing/trace-graph
flags:
  logzio-plan: community
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger
---
The trace graph shows you the sequence of calls, with spans grouped into node blocks. You can display  the graph color-coded by services, durations, or by span times. 
Hover over a span in the graph to see its details. 

![trace graph key](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace_graph-key.png)

- Click **?** to view the graph legend.
- Click the options to see the trace graph colored by:
    - Service - default view
    - Total time - total trace time
    - Self time - call duration

The default for Trace Graph mode is Service, which displays the services in the trace. ![service graph - service](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace_graph1.png)

You can: 
* Search for services ![service graph - search services](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace_graph2_srch-service.png)

* Highlight the service nodes by the span duration ![service graph total time](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace_graph3-time.png)

Highlight by the request duration for the span ![Service graph self time](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace_graph4-self-time.png)

