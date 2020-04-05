---
layout: article
title: Infrastructure Monitoring
permalink: /user-guide/infrastructure-monitoring/
flags:
  logzio-plan:
tags:
  - metrics
contributors:
  - shalper
---

Monitor your infrastructure metrics to gain a clear picture of the ongoing status of your distributed cloud services at all times. Logz.io Metrics lets your team curate a handy roster of dashboards to oversee continuous deployment, CI/CD pipelines, and prevent outages, manage incidents, and remediate crashes in multi-microservice environments, hybrid infrastructures, and complex tech stacks.

Use Logz.io Metrics to continuously monitor your system’s health and help you maintain system performance, speed, and resiliance. You can configure Logz.io to send your team push notifications when problematic trends first appear, and before they become critical and threaten crashes or system outages.


## Leverage infrastructure metrics

**DevOps engineers:**

* Identify issues before they become critical
* Pinpoint critical production issues and process crashes
* Catch performance degradations earlier
* Isolate the root cause effectively
* Get notified automatically about issues demanding immediate attention
* Report about the system status without any hassle
* Hand off tasks between team members with full transparency and effective knowledge sharing

**Site Reliability Engineers:**

* Monitor baseline to keep systems stable and dependable
* Reduce infrastructure and cloud costs
* Reliably forecast capacity needs
* Develop and implement system-specific processes
* Review capacity planning forecasts


## Grafana and Kibana combined - Correlate metrics with logs

Logz.io Metrics is a Grafana-based infrastructure monitoring platform that integrates seamlessly with the Kibana-based logging platform. Grafana is the leading open-source tool for visualizing numerical data at scale, with powerful graphing capabilities of trends, changes over time, derivatives, and inflection curves.

Navigate seamlessly from your metrics to your logs to save you time and hassle. Whenever your metrics visualizations highlight an issue, you can click the shortcut button **Explore in Kibana** to drill-down on the relevant logs in Kibana. The query will be pre-configured so you’ll automatically view the correlated logs.

The direct pathways between Grafana and Kibana are possible because Logz.io stores both your metrics and logs in ElasticSearch, to enable you to drill-down from metrics visualizations directly to the corresponding logging details in Kibana.


## Monitor complex tech stacks at a glance

Your metrics dashboards cover all of the services and microservices in your hybrid environments in one, central place. Centralized to make your life easier and leave you more time to get the job done.

Metrics dashboards cover the last 48 hours, by default, to give you the most recent activity and actionable information. You can extend the timeframe to see a history of up to 18 months, to gain perspective for comparison and reference and benchmark your goals against past achievements.


## Apt, relevant dashboards out-of-the-box

Logz.io’s Metrics platform is pre-loaded with dozens of dashboards to help you get started immediately and get value without sweating it. Your Metrics account is ready to accept data from many environments, dockers, container systems, queue management systems, and more.

 After configuring Metricsbeat to stream your data to Logz.io, you can select any appropriate dashboard from the list and select the data source. Each dashboard is preconfigured to match the particular data type it is named after and is production-ready without any further customization, and does not require previous expertise. The dashboards are designed by Logz.io specialists and let you get up-and-running in a matter of minutes. Learn how to select your first dashboard.

Once you’re ready to move to the next level, you can duplicate any of the preconfigured dashboards to add your own panels and changes, or create entirely new dashboards of your own. Learn how to add a new dashboard.


## Maintain data integrity over an extended time

Data rollups compress the data without losing the original extremes. The original max. and min. values are kept in addition to the averages so you can graph the data more accurately despite the limitations of its compression.
