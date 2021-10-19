---
layout: article
title: Telegraf for Prometheus metrics
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/telegraf-prometheus.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## Telegraf for Prometheus metrics

This dashboard provides an interface to view and analyze your system metrics exported by Telegraf in Prometheus format.


| Metric visualization | Description                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU utilization      | The average amount of CPU time spent in system mode, per second, over the last minute (in seconds) by instance.                                                                  |
| Memory utilization   | Total amount of memory in the system and the amount of free memory left on the system.                                                                                           |
| Disk utilization     | Total file system size in bytes and the free space on the file system.                                                                                                           |
| Uptime               | System time in seconds since epoch and the node boot time, in unixtime.                                                                                                          |
| Number of cores      | Count of the average amount of CPU time spent in system mode, per second, over the last minute (in seconds) by instance.                                                         |
| Used memory          | The difference between the total memory and the free memory of the node.                                                                                                         |
| Total memory         | Total node memory.                                                                                                                                                               |
| Used disk space      | The difference between the total disk space and the free disk space on the node.                                                                                                 |
| Total disk space     | Total disk space on the node.                                                                                                                                                    |
| CPU load             | The average amount of CPU time spent in system mode, per second, over the last minute (in seconds) including the indicators of the run queue (1, 5 and 15 minutes load average). |
| Network in / out     | The average network traffic received and transmitted.                                                                                                                            |
| Disk read write      | The total number of bytes written successfully versus the total number of bytes read successfully.                                                                               |
| Processes status     | The number of processes blocked waiting for I/O to complete versus the number of processes in runnable state.                                                                    |                                                                                                                                         |