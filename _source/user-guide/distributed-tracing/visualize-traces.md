---
layout: article
title: Visualize traces in Kibana
permalink: /user-guide/distributed-tracing/visualize-traces
flags:
  logzio-plan: pro
tags:
  - distributed tracing
contributors:
  - yberlinger
---

Kibana is great for creating meaningful visualizations from log data, so why not use Kibana to visualize traces too? 
  
  
## Just a taste: Status code histogram

A status code histogram can help you recognize when many bad requests between services occurred.

To create these visualizations:

1. In Kibana, from the **Visualization** menu, select **_Create new visualization_**.

    ![Creating a new visualization](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/kibana_histogram.png)

2. Select the *Line* visualization type. 
    The X-axis represents the timestamp of the span and the Y-axis shows the number of occurrences of each status code for the account.

    ![Line visualization](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/kibana_line_vis.png)
