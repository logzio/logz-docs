---
layout: article
title: What can I do in the Trace Timeline?
permalink: /user-guide/distributed-tracing/trace-timeline
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Trace timeline overview and abilities
flags:
  logzio-plan: pro enterprise
tags:
  - distributed tracing
contributors:
  - yberlinger
  - hidan
---
Start here and dig in: 
![basic timeline](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/timeline1.png)

In the timeline, each horizontal bar is a span with a unique ID. The services are color-coded to help you identify and track the services involved. The duration of each span is indicated and the relative duration is represented by the length of the span’s horizontal bar. A red error icon in the Services & Operations tree indicates that the span was tagged as an error. 

* View the spans included in the space, color-coded by service, nested by operation.
* Expand and collapse the spans within the trace.
* Click a span to view its details, including tags and process information.


Spans also include tags and multiple logs, depending on how you set up your instrumentation. The tags and process sections indicate span context.   In the example below, the SQL span attached the SQL query to the span’s tags. The spanID is located in the lower right corner. 
    ![Expanded span](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/span_expand.png)

Use the hairlines at the top of the page to focus on specific time segments during the trace.
    ![Hairlines to focus](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/dist_tr-timeline-hairs.png)

Click a log marker to see the log details for a specific time. 
    ![see log details](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/span_log_details.png)

Expand and Collapse the spans in the **Service & Operation** list and change the size of the span area. 
    ![expand & collapse](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/expand_collapse_list.png)

### Troubleshooting with the trace timeline

The trace timeline can help you find patterns that might indicate potential issues with the system flow.

Patterns to look out for:

- Large time gaps between spans may indicate instrumentation gaps. ![large gaps between spans](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/large_gaps.png)

- A sequence of spans that looks like a staircase may indicate an opportunity for performance improvement by increasing parallelism for the relevant microservices. ![staircase pattern](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/staircase_spans.png)

- When all the spans end at the same time, there may be a connectivity issue that is causing timeouts or errors. ![spans end at same time](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spans_end_together.png)


### Trace Flamegraph

A Trace Flamegraph is a visualization of a distributed request trace that can help identify issues and bottlenecks at a glance. Each horizontal bar represents a service, color-coded and time-stamped according to how long it took to complete the operation.

![Flamegraph overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/flamegraph-overview.png)

Unlike the Trace Timeline, which presents the services in the order of when each one ran, **Trace Flamegraph** bundles services together to provide a high-level summary of how long it took them to execute.

When applying the Trace Flamegraph view, you get an overview of the relationships between service calls, errors, and latency data inside the different services. As a result, you can pinpoint, analyze and attend to services that require your attention.

To apply the Trace Flamegraph view for your traces, open a trace and select the relevant view on the top right menu:

![Apply flamegraph view](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace-flamegraph.png)
