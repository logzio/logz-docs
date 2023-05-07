---
layout: article
title: Markers
permalink: /user-guide/insights/markers.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Learn how to add and use Logz.io markers
sitemap: false
noindex: true
flags:
  logzio-plan: community
tags:
  - insights
contributors:
  - imnotashrimp
  - danielberman
  - quintessence
---


You can add markers to help you understand the context surrounding your insights. Markers reflect significant events that could be potential catalysts for issues, such as [new deployments](/user-guide/logs/exceptions-deployments.html), rollbacks, and specific alerts that may have been triggered.

![Insights marker on the chart](https://dytvr9ot2sszz.cloudfront.net/logz-docs/insights/insights--marker-on-chart.png)

Markers are based on actual log messages coming into Logz.io. When a marker’s search query conditions are met, a marker is added to your insights.

#### To add a marker

<div class="tasklist">

##### Configure your log message

Configure your system to log a specific message that will serve as your marker's trigger.

Run a test query in OpenSearch Dashboards, and make sure your query returned the expected results.

##### Create the marker

Below the [Insights](https://app.logz.io/#/dashboard/insights) chart, click **Markers**, and then click **<i class="li li-plus"></i> Create marker**

![Create a marker](https://dytvr9ot2sszz.cloudfront.net/logz-docs/insights/insights--create-marker.png)

Assign a **Marker name**. Then type your **Query string** that you tested in step 1, and click **Create & Plot**.

</div>

When the conditions of the marker are met, it will appear in the insights chart as a gray box and a dotted line. You can use this marker to see the relationship between insights and system events.

![Marker close-up](https://dytvr9ot2sszz.cloudfront.net/logz-docs/insights/insights--marker-close-up.png)

Click a marker in the insights chart to view it in OpenSearch Dashboards.