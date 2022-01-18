---
layout: article
title: Nginx
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/nginx.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze metrics from your Nginx services.

| Metric visualization          | Metric name                                                   | Description                                                                                        |
| ----------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Number Of Active Clients      | nginx\_active                                                 | Number of active nginx clients.                                                                    |
| Connections Attempts Rate     | nginx\_accepts                                                | Rate of connection attempts to nginx clients.                                                      |
| Dropped Connections Rate      | nginx\_accepts, nginx\_handled                                | Rate of connection attempts to nginx clients versus the number of handled connections.             |
| Total Requests                | nginx\_requests                                               | Total number of requests to nginx clients.                                                         |
| Connection Status Rates | nginx\_accepts, nginx\_handled                                | Status rates of accepted and handled connections.                                                  |
| Requests Rate | nginx\_requests                                               | Rate of requests made to nginx clients.                                                            |
| Connections State Rate        | nginx\_waiting, nginx\_writing, nginx\_reading                | Waiting, writing and reading connections to nginx clients.                                         |
| Memory Utilization            | mem\_used\_percent                                            | Used memory in percentage                                                                          |
| Memory Usage | mem\_total, mem\_used                                         | Memory used versus memory total                                                                    |
| CPU Utilization | cpu\_usage\_idle                                              | CPU usage                                                                                          |
| CPU Load                      | system\_n\_cpus, system\_load1, system\_load5, system\_load15 | Number of cpus including the indicators of the run queue (1, 5 and 15 minutes load average). |
| Disk Utilization              | disk\_used, disk\_total                                       | Disk space used versus the total disk space.                                                       |
| Network Traffic Rate          | net\_bytes\_recv, net\_bytes\_sent                            | Rate of network traffic received and sent.                                                         |