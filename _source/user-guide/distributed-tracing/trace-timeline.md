---
layout: article
title: What can I do in the Trace Timeline?
permalink: /user-guide/distributed-tracing/trace-timeline
flags:
  logzio-plan: community
  beta: true
tags:
  - distributed tracing
contributors:
  - yberlinger
---
![Trace timeline view](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace_timeline_view.png)

+ Click a span bar or span name to view its details, including tags, process, and logs information. ![see span bar details](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/span_bar_details.png)

    Expanded details: ![expand span details](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/expand_span_details.png)

+ Click a log marker to see the log details for a specific time. ![see log details](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/span_log_details.png)


+ Use the hairlines at the top of the page to focus on a specific time or request segments during the trace.  ![pick and view a time span](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/pick_time_granularity.png)

+ Expand and Collapse the spans in the **Service & Operation** list and change the size of the span area. ![expand & collapse](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/expand_collapse_list.png)

_**Troubleshooting with the trace timeline**_

The trace timeline can help you find patterns that might indicate potential issues with the system flow.

Patterns to look out for:

- Large time gaps between spans may indicate instrumentation gaps. ![large gaps between spans](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/large_gaps.png)

- A sequence of spans that looks like a staircase may indicate an opportunity for performance improvement by increasing parallelism for the relevant microservices. ![staircase pattern](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/staircase_spans.png)

- When all the spans end at the same time, there may be a connectivity issue that is causing timeouts or errors. ![spans end at same time](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/spans_end_together.png)

