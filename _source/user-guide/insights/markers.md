---
layout: article
title: Markers
permalink: /user-guide/insights/markers.html
flags:
  logzio-plan: community
tags:
  - insights
contributors:
  - imnotashrimp
  - danielberman
  - quintessence
---

To help you understand the context surrounding your insights, you can add markers. Markers reflect significant events that could be potential catalysts for issues, such as new deployments, rollbacks, and specific alerts that may have been triggered.

![Insights marker on the chart]({{site.baseurl}}/images/insights/insights--marker-on-chart.png)

Markers are based on actual log messages coming in to Logz.io. When the conditions of a marker's search query are met, a marker is added to your insights.

###### To add a marker

1. Configure your system to log a specific message that will serve as your marker's trigger. Run a test query in Kibana, and make sure your query returned the expected results.

2. Below the [Insights](https://app.logz.io/#/dashboard/insights) chart, click **Markers**, and then click **<i class="li li-plus"></i> Create marker**

    ![Create a marker]({{site.baseurl}}/images/insights/insights--create-marker.png)

3. Assign a **Marker name**. Then type your **Query string** that you tested in step 1, and click **Create & Plot**.

When the conditions of the marker are met, it will appear in the insights chart as a gray box and a dotted line. You can use this marker to see the relationship between insights and system events.

![Marker close-up]({{site.baseurl}}/images/insights/insights--marker-close-up.png)

Click a marker in the insights chart to view it in Kibana.