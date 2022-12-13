---
layout: article
title: Visualize traces in OpenSearch Dashboards
permalink: /user-guide/distributed-tracing/visualize-traces
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Visualize your traces with OpenSearch Dashboards
flags:
  logzio-plan: pro
tags:
  - distributed tracing
contributors:
  - yberlinger
---

OpenSearch Dashboards is great for creating meaningful visualizations from log data, so why not use OpenSearch Dashboards to visualize traces too?
  
  
## Just a taste: Status code histogram

A status code histogram can help you recognize when many bad requests between services occurred.

To create these visualizations:

1. In OpenSearch Dashboards, click on the side menu > **Visualization**. Then, select **_Create visualization_**.

<!--    ![Creating a new visualization](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/kibana_histogram.png) -->

2. Select the *Line* visualization type. 
    The X-axis represents the timestamp of the span and the Y-axis shows the number of occurrences of each status code for the account.

    ![Line visualization](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/kibana_line_vis.png)
