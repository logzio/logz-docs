---
layout: article
title: Exploring insights
permalink: /user-guide/insights/exploring-insights.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Learn how to explore Logz.io insights
sitemap: false 
noindex: true
flags:
  logzio-plan: community
tags:
  - insights
contributors:
  - danielberman
  - imnotashrimp
---

The insights chart at the top of the page shows a 7-day summary of all the different identified insights.
Both Application Insights and Cognitive Insights are included in the chart.

<video autoplay loop>
  <source src="{{site.baseurl}}/videos/insights/insights--chart-interaction.mp4" type="video/mp4" />
</video>

Below the graph is the insights list, which shows the insights identified by Logz.io.
By default, the list shows only new insights identified.
You can toggle the **Only new** switch to see older events.

#### Working with the chart

* To zoom in and out on the chart,
  use the timeline handles below the chart.
  Drag your mouse over the chart to zoom in.
* To show or hide an insight,
  click the insight in the legend to the left of the chart.
* To see information at a point in time,
  hover over a line in the chart.

#### Working with insights

When you click on an entry in the insight list, it will expand to show you details like a description and Stack Overflow links.

![Insight details](https://dytvr9ot2sszz.cloudfront.net/logz-docs/insights/insights--insight-details.png)

* To create an alert or optimizer,
  select **Create an Alert/Optimizer** from the insight's menu (<i class="li li-ellipsis-v"></i>).
* You can change the status, assignee, or severity level
  by clicking on the intended item.
  If you change the assignee,
  you can include a message to let the recipient know why they're being assigned an insight.
* To edit an insight's title, description, or reference links,
  select **Edit** from the insight's menu (<i class="li li-ellipsis-v"></i>).
* To see the log entries that triggered the insight,
  click **View in OpenSearch Dashboards**.