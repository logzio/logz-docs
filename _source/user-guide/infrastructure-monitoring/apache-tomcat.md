---
layout: article
title: Apache Tomcat
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/apache-tomcat.html 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: View and analyze metrics with Apache Tomcat
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze metrics from your Apache Tomcat services.

| Metric visualization        | Metric name                                                                                                           | Description                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Requests Rate    | tomcat\_connector\_request\_count                                                                                     | Requests received by a connector.                           |
| Network Tx/Rx Rate          | tomcat\_connector\_bytes\_sent, tomcat\_connector\_bytes\_received                                                    | Connector bytes sent and received.                          |
| Processing Time Rate        | tomcat\_connector\_processing\_time                                                                                   | Connector processing time.                                  |
| Average Processing Time     | tomcat\_connector\_processing\_time                                                                                   | Connector processing time versus connector max time.        |
| Max Time                    | tomcat\_connector\_max\_time                                                                                          | Connector max time.                                         |
| Threads                     | tomcat\_connector\_current\_threads\_busy, tomcat\_connector\_current\_thread\_count, tomcat\_connector\_max\_threads | Connector busy, current and max threads.                    |
| Idle Threads Percentage     | tomcat\_connector\_current\_thread\_count, tomcat\_connector\_current\_threads\_busy                                  | Connector current thread count versus current threads busy. |
| Heap Memory Used            | tomcat\_jvm\_memorypool\_used                                                                                         | JVM memory pool used.                                       |
| Heap Memory Utilization     | tomcat\_jvm\_memorypool\_used, tomcat\_jvm\_memorypool\_max                                                           | JVM memory pool used versus the JVM memory pool max.        |
| Non-Heap Memory Used | tomcat\_jvm\_memorypool\_used                                                                                         | Used JVM memory pool.                                       |
| Non-Heap Memory Utilization | tomcat\_jvm\_memorypool\_used, tomcat\_jvm\_memorypool\_max                                                           | Used JVM memory pool versus max JVM memory pool.            |
| Error Count                 | tomcat\_connector\_error\_count                                                                                       | Connector error count.                                      |