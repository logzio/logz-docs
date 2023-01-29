---
layout: article
title: AKS - Kubernetes pods
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/aks-kubernetes-pods.html 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: View and analyze metrics with Amazon Auto Scaling
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze metrics from your AKS Kubernetes pods.

| Metric visualization                        | Metric name                                                                                                                                                                                                                    | Description                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Number Of Pods Per Namespace                | kube_pod_info                                                                                                                                                                                                                  | Number of pods per namespace (timeseries)                |
| Number Of Pods Per Namespace                | kube_pod_info                                                                                                                                                                                                                  | Number of pods per namespace (stats)                     |
| Pods Status Per Namespace                   | kube_pod_status_phase{p8s_logzio_name                                                                                                                                                                                          | Pods status per namespace (timeseries)                   |
| Container Restarts By Pod Per Container     | kube_pod_container_status_restarts_total                                                                                                                                                                                       | Container Restarts by Pod per container (timeseries)     |
| Top Pods Memory Usage Per Container         | kube_pod_container_info, windows_container_memory_usage_commit_bytes, container_memory_working_set_bytes                                                                                                                       | Top pods memory usage per container (timeseries)         |
| Top Pods CPU Usage Per Container            | container_cpu_usage_seconds_total, kube_pod_container_info, windows_container_cpu_usage_seconds_total                                                                                                                          | Top pods CPU usage per container (time series)           |
| Top Pods Network I/O Pressure Per Container | container_network_receive_bytes_total, container_network_transmit_bytes_total, kube_pod_container_info, windows_container_network_receive_bytes_total, kube_pod_container_info, windows_container_network_transmit_bytes_total | Top pods network I/O pressure per container (timeseries) |
