---
layout: article
title: AKS - Kubernetes nodes
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/aks-kubernetes-nodes.html 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: View and analyze metrics with Amazon Auto Scaling
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze metrics from your AKS Kubernetes nodes.

| Metric visualization          | Metric name                                                                                                                                                                                                                                                      | Description                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Uptime                        | node_time_seconds                                                                                                                                                                                                                                                | Node uptime in seconds (stats)                       |
| Cores                         | machine_cpu_cores                                                                                                                                                                                                                                                | Machine CPU cores per node (stats)                   |
| CPU Usage                     | node_cpu_seconds_total, kubernetes_node, windows_cpu_time_total, windows_cs_hostname                                                                                                                                                                             | CPU usage gauge                                      |
| Memory Usage                  | node_memory_MemTotal_bytes, node_memory_MemFree_bytes, nnode_memory_MemTotal_bytes, windows_os_physical_memory_free_bytes, windows_cs_hostname, nwindows_cs_physical_memory_bytes, windows_cs_hostname                                                           | Memory usage gauge                                   |
| Total Memory                  | node_memory_MemTotal_bytes, kubernetes_node, nwindows_cs_physical_memory_bytes, windows_cs_hostname                                                                                                                                                              | Total memory (stats)                                 |
| Total Disk Space              | node_filesystem_size_bytes, kubernetes_node, windows_logical_disk_size_bytes, windows_cs_hostname                                                                                                                                                                | Total Disk Space (stats)                             |
| CPU Usage (Stacked)           | node_cpu_seconds_total, node_cpu_seconds_total, node_cpu_seconds_total, node_cpu_seconds_total, node_cpu_seconds_total, node_cpu_seconds_total, node_cpu_seconds_total, windows_cpu_time_total, windows_cs_hostname, windows_cpu_time_total, windows_cs_hostname | CPU usage stacked (stats)                            |
| Memory Usage (Stacked)        | node_memory_MemTotal_bytes, kubernetes_node, node_memory_MemFree_bytes, windows_cs_physical_memory_bytes, windows_cs_hostname, windows_os_physical_memory_free_bytes, windows_cs_hostname                                                                        | Stacked memory usage (timeseries)                    |
| Network Rx/Tx                 | node_network_receive_bytes_total, kubernetes_node, node_network_transmit_bytes_total, windows_net_bytes_received_total, windows_cs_hostname, windows_net_bytes_sent_total                                                                                        | Network bytes received and transmitted (time series) |
| Disk IO Time                  | node_disk_io_time_seconds_total, kubernetes_node, windows_logical_disk_read_seconds_total, windows_cs_hostname, windows_logical_disk_write_seconds_total, windows_cs_hostname                                                                                    | Disk IO Time (timeseries)                            |
| Filesystem Usage (Stacked)    | node_filesystem_size_bytes, kubernetes_node, node_filesystem_free_bytes, node_filesystem_avail_bytes, windows_logical_disk_size_bytes, windows_cs_hostname, windows_logical_disk_free_bytes, windows_logical_disk_free_bytes                                     | Filesystem usage stacked (timeseries)                |
| Top Pods CPU Usage By Node    | container_cpu_usage_seconds_total, kubernetes_io_hostname, kube_pod_container_resource_requests                                                                                                                                                                  | Top pods CPU usage by node (gauge)                   |
| Top Pods Memory Usage By Node | container_memory_working_set_bytes, kube_pod_container_resource_requests                                                                                                                                                                                         | Top pods memory usage by node (gauge) |
