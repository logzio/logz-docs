---
layout: article
title: Correlating Distributed Tracing and logs
permalink: /user-guide/distributed-tracing/correlate_logs_and_traces
flags:
  logzio-plan: community
tags:
  - distributed tracing
contributors:
  - yberlinger
---
Harness the power of Kibana and your logs for more context and insights with Logz.io Distributed Tracing.

<miniTOC> What can I do with my trace and span data in Kibana?

## Visualizing traces in Kibana
Kibana is great for creating meaningful visualizations from log data, so why not use Kibana to visualize traces too? 

We’ve put together examples of visualizations over distributed tracing telemetry that we think you’ll find helpful. 


### Just a taste: Status code histogram

A status code histogram can help you recognize when many bad requests between services occurred.

To create these visualizations:

1. In Kibana., from the **Visualization** menu, select **_Create new visualization_**.
    ![Creating a new visualization](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/kibana_histogram.png)

2. Select the *Line* visualization type. 
    The X-axis represents the timestamp of the span and the Y-axis shows the number of occurrences of each status code for the account.
    ![Line visualization](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/kibana_line_vis.png)

## Telemetry correlation

If you’re using Logz.io for both Log Analytics and Distributed Tracing, you can correlate logs with their corresponding traces and spans.

To search for the logs related to a specific trace or the request transaction which generated the trace, you’ll need to enrich your logs with the trace ID and span ID. These log fields will let you drill down via a link that opens the specific trace in Jaeger from within Kibana Discover, or within a Kibana Dashboard.

Enriching logs with trace ID and span ID must be performed before or during the data collection process, and before sending the data to Logz.io.

The enrichment process depends on the language and log type: You will have to [configure your deployment](/user-guide/distributed-tracing/deploying-components)  to perform these actions _before_ the data is ingested into Logz.io, because retroactive correlation is not available.  

Contact [support]() for additional information on enriching your logs. 

### Correlating Logs and Traces

1. Once the trace ID is part of the log attributes, open the Kibana left menu, and select **Management**.
    ![text](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/log_trace1.png)
2. To manage log index patterns, click **Index pattern** and go to your default index pattern settings.
    ![text](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/log_trace2.png)
3. Search for the trace ID field you want to correlate with your logs and select **Edit**. In this example, the field name is **traceID**.
    ![text](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/log_trace3.png)
4. Change the **Format** to **URL** and enable **Open in a new tab**.
    ![text](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/log_trace4.png)
5. Using your main account, insert the following template in the **URL template** field of the Jaeger user interface (UI), and **Save field**. 
    `https://app.logz.io/#/dashboard/jaeger/trace/{{value}}`

Each traceID attribute functions as a drill down link that leads you to the correlated trace view in Jaeger. 
![text](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/log_trace5.png)