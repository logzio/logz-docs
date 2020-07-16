---
layout: article
title: Highlights of Logz.io Metrics
permalink: /user-guide/infrastructure-monitoring/metrics-logzio
flags:
  logzio-plan: community
tags:
  - metrics
contributors:
  - shalper
---

Logz.io Metrics will help you monitor the health of your systems and catch issues BEFORE your customers notice.
Here's how Logz.io Metrics will get you there.

Logz.io Metrics is a Grafana-based infrastructure monitoring platform that integrates seamlessly with the Kibana-based logging platform. Grafana is the leading open-source tool for visualizing numerical data at scale, with powerful graphing capabilities of trends, changes over time, derivatives, and inflection curves.


### Easily correlate metrics with logs

Investigate your logs to identify the root cause of any issues highlighted in your Metrics.

In Logz.io, you can navigate seamlessly from your metrics to your logs and save time and hassle. Whenever your metrics visualizations highlight an issue, you can click the shortcut button **Explore in Kibana** to drill-down on the relevant logs in Kibana. The reason you can drill-down directly from your Metrics graphs to the corresponding logs, is that Logz.io stores both your metrics and logs in ElasticSearch.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana-videos/exploreinkibana.mp4" type="video/mp4" />
</video>

You'll see the link in many of the graph panels in your pre-configured dashboards provided by Logz.io. You can also add similar drill-down links to any of your own dashboards too. See [how]({{site.baseurl}}/user-guide/infrastructure-monitoring/explore-in-kibana-drilldown-links).


### Monitor complex tech stacks at a glance

Your metrics dashboards cover all of the services and microservices in your hybrid environments in one, central place. Centralized to make your life easier and leave you more time to get the job done.

Metrics dashboards can give you the most recent activity and actionable information or provide an extended view of up to 18 months for additional perspective and reference. 
That way you can benchmark your goals against past achievements.


### Launch with pre-built dashboards

Logz.io’s Metrics platform is pre-loaded with dozens of dashboards to help you hit the ground running and get started immediately. Your Metrics account is ready to accept data from many environments, dockers, container systems, queue management systems, and more.

 After configuring Metricsbeat to stream your data to Logz.io, you can select any appropriate dashboard from the list and select the data source. Each dashboard is preconfigured to match the particular data type it is named after and is production-ready without any further customization, and does not require previous expertise. The dashboards are designed by Logz.io specialists and let you get up-and-running in a matter of minutes. [Learn how to select your first dashboard]({{site.baseurl}}/user-guide/infrastructure-monitoring/getting-started).

Once you’re ready to move to the next level, you can duplicate any of the preconfigured dashboards to add your own panels and changes, or create entirely new dashboards of your own. [Learn how to add a new dashboard]({{site.baseurl}}/user-guide/infrastructure-monitoring/configure-grafana-drilldown-links.html).

### Maintain data integrity over an extended time

Your Lgoz.io Metrics account offers 18 month retention by default, to keep your data long enough to establish your baseline and make comparisons over a substantial time frame. 

Data rollups compress the data without losing the original extremes. 
The original max. and min. values are kept in addition to the averages 
so you can graph the data more accurately despite its compression.
