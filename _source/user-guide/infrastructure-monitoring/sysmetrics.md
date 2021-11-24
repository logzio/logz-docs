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


This dashboard provides an interface to view and analyze system metrics from your machine collected by Telegraf.

| Metric visualization | Metric name | Description                                                                                                                                                                                                                                |
| ---------------------| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU utilization                                   | cpu_usage_idle | The percentage of time that the CPU is idle.                                                 |
| Memory Utilization                                | cpu_usage_idle | The percentage of memory currently in use.                                                   |
| Disk utilization                                  | disk_used, disk_total | Used space on the disks / total space                                                        |
| Uptime                                            | system_uptime | System uptime                                                                                |
| Number of cores                                   | system_n_cpus | CPU core number                                                                              |
| Used memory                                       | mem_used | How much memory is currently used                                                            |
| Total memory                                      | mem_total | Total memory                                                                                 |
| Used disk space                                   | disk_used | Disk spaced used capacity                                                                    |
| Total disk space                                  | disk_total | Disk space total capacity                                                                    |
| CPU load                                          | system_n_cpus, system_load1, system_load5, system_load15 | Number of cpus including the indicators of the run queue (1, 5 and 15 minutes load average). |
| Disk Bytes Read/Write                                 | net_bytes_sent, net_bytes_recv | The number of bytes read from and written to the disks.                                      |
| Network Bytes In/Out                              | net_bytes_sent, net_bytes_recv | The number of bytes sent and received by the network interface.                              |
| Processes Status (Not Available In Windows) | processes_blocked, processes_stopped, processes_idle, processes_running, processes_sleeping, processes_unknown, processes_zombies | Processes blocked, stopped, idle, running, sleeping, unknown and zombie processes.           |
