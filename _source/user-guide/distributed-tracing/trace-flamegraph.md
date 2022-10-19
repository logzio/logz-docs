---
layout: article
title: What can I do in the Trace Flamegraph?
permalink: /user-guide/distributed-tracing/trace-flamegraph
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - hidan
---

This view lets you visualize a distributed request trace. Flamegraph group services together, providing a high-level summary of execution time. Each horizontal bar represents a service, color-coded and time-stamped according to how long it took to complete the operation.

![Flamegraph overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/flamegraph-overview.png)


When applying the Trace Flamegraph view, you get an overview of the relationships between service calls, errors, and latency data inside the different services. As a result, you can pinpoint, analyze and attend to services that require your attention.

To apply the Trace Flamegraph view for your traces, open a trace and select the relevant view on the top right menu:

![Apply flamegraph view](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace-flamegraph.png)
