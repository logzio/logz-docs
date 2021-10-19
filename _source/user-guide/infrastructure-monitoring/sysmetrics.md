---
layout: article
title: System metrics over Telegraf
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/sysmetrics.html 
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

## Redis

This dashboard provides an interface to view and analyze system metrics from your machine collected by Telegraf.

| Metric visualization                                       | Description                                                                                  |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| CPU utilization                                   | The percentage of time that the CPU is idle.                                                 |
| Memory Utilization                                | The percentage of memory currently in use.                                                   |
| Disk utilization                                  | Used space on the disks / total space                                                        |
| Uptime                                            | System uptime                                                                                |
| Number of cores                                   | CPU core number                                                                              |
| Used memory                                       | How much memory is currently used                                                            |
| Total memory                                      | Total memory                                                                                 |
| Used disk space                                   | Disk spaced used capacity                                                                    |
| Total disk space                                  | Disk space total capacity                                                                    |
| CPU load                                          | Number of cpus including the indicators of the run queue (1, 5 and 15 minutes load average). |
| Disk Bytes In/Out                                 | The number of bytes read from and written to the disks.                                      |
| Network Bytes In/Out                              | The number of bytes sent and received by the network interface.                              |
| Processes Status (Not Available In Windows) | Processes blocked, stopped, idle, running, sleeping, unknown and zombie processes.           |