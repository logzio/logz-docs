---
layout: article
title: Infrastructure Monitoring
permalink: /user-guide/infrastructure-monitoring/
flags:
  logzio-plan: pro
tags:
  - metrics
contributors:
  - shalper
---

Gain a clear picture of the metrics for all of your distributed cloud services at all times. A series of dedicated dashboards per environment, docker, container system, and queue management system gives your entire team a centralized view of what’s going on in your infrastructure.

Logz.io metrics continuously monitors your system’s health and helps you maintain system performance, speed, and resiliance. You can configure Logz.io to send your team push notifications when problematic trends first appear, and before they become critical and threaten to break down your systems.

## Leverage infrastructure metrics

**DevOps engineers:**

* Identify issues before they become critical
* Pinpoint pressing production issues
* Isolate the root cause effectively
* Take action with confidence that your changes
* Get notified automatically of issues that demand your immediate attention
* Put together status reports without any hassle
* Hand off tasks between team members with full transparency and effective knowledge sharing

**Infrastructure planners:**

* Forecast capacity requirements
* Capacity planning


## Grafana and Kibana combined 

Logz.io Metrics is a Grafana-based infrastructure monitoring platform that integrates seamlessly with the Kibana-based logging platform. Grafana is the leading open-source tool for visualizing numerical data at scale, with powerful graphing capabilities of trends, changes over time, derivatives, and inflection curves. 

Navigate seamlessly from your metrics to your logs to save you time and hassle. Whenever your metrics visualizations highlight an issue, you can click the shortcut button **Explore in Kibana** to drill-down on the relevant logs in Kibana. The query will be pre-configured so you’ll automatically view the logs from the relevant source and for the relevant timeframe. 

The direct pathways between Grafana and Kibana are possible because Logz.io stores both your metrics and logs in ElasticSearch, to enable you to drill-down from metrics visualizations directly to the corresponding logging details in Kibana. 


## All the metrics at a glance

Your metrics dashboards cover the last 48 hours, by default, to give you the most recent activity and actionable information. You can extend the timeframe to see a history of up to 18 months, to gain perspective for comparison and reference and benchmark your goals against past achievements. 


## Apt, relevant dashboards out-of-the-box 

Logz.io’s Metrics platform is pre-loaded with dozens of dashboards to help you get started immediately and get value without sweating it. After configuring Metricsbeat to stream your data to Logz.io, you can select any appropriate dashboard from the list and select the data source. Each dashboard is preconfigured to match the particular data type it is named after and is production-ready without any further customization, and does not require previous expertise. The dashboards are designed by Logz.io specialists and let you get up-and-running in a matter of minutes. Learn how to select your first dashboard.  

Once you’re ready to move to the next level, you can duplicate any of the preconfigured dashboards to add your own panels and changes, or create entirely new dashboards of your own. Learn how to add a new dashboard.  


## Maintain data integrity over an extended time 

Data rollups compress the data without losing the original extremes. The original max. and min. values are kept in addition to the averages so you can graph the data more accurately despite the limitations of its compression. 
