---
layout: article
title: AKS - Kubernetes Cluster Summary
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/aks-kubernetes_cluster_summary.html 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: View and analyze metrics with AKS Kubernetes Cluster Summary
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze metrics from your AKS Kubernetes Cluster Summary.

| Metric Visualization  | Metric Name          | Description              |
| ---------- | -------------------------------------- | ---------------------------------- |
| Cluster Pod Usage                   | kube_pod_info, kube_node_status_allocatable       | Allocatable pods versus all pods (gauge)    |
| Cluster CPU Usage                   | kube_pod_container_resource_requests, kube_node_status_allocatable   | CPU usage derived from allocatable pods versus all resource requests (gauge)   |
| Cluster Memory Usage                | kube_pod_container_resource_requests, kube_node_status_allocatable                                                                                                                                                                 | Memory usage derived from allocatable pods versus all resource requests (gauge)|
| Cluster Disk Usage                  | node_filesystem_size_bytes, node_filesystem_free_bytes, windows_logical_disk_size_bytes, windows_cs_hostname, windows_logical_disk_free_bytes / node_filesystem_size_bytes, node_filesystem_free_bytes, node_filesystem_size_bytes | Cluster disk usage (gauge)                                                      |
| Cluster Pod Capacity                | kube_node_status_allocatable, kube_node_status_capacity, kube_pod_info                                        | Cluster pod capacity (timeseries)            |
| Cluster CPU Capacity                | kube_node_status_capacity, kube_node_status_allocatable, kube_pod_container_resource_requests                                                                                                                                      | Cluster CPU capacity (tmeseries)                                                   |
| Cluster Mem Capacity                | kube_node_status_allocatable, kube_node_status_capacity, kube_pod_container_resource_requests                                                                                                                                      | Cluster memory capacity (tmeseries)                                                |
| Cluster Disk Capacity               | node_filesystem_size_bytes, windows_logical_disk_size_bytes, windows_cs_hostname / node_filesystem_size_bytes       | Cluster disk capacity (tmeseries)                                                  |
| Number Of Nodes                     | kube_node_info                                                                                                      | Number of nodes (stats)                                                        |
| Nodes Out of Disk                   | kube_node_status_condition              | Nodes out of disk (stats)                                                      |
| Nodes Unavailable                   | kube_node_spec_unschedulable                                                                         | Nodes unavailable (stats)                                                      |
| Deployment Replicas - Up To Date    | kube_deployment_status_replicas_updated                                                                                                                                                                                            | Deployment replicas - up to date (table)                                        |
| Deployment Replicas                 | kube_deployment_status_replicas                                                                                                                                                                                                    | Deployment replicas (stats)                                                    |
| Deployment Replicas - Updated       | kube_deployment_status_replicas_updated                                                                                                                                                                                            | Deployment replicas - updated (stats)                                          |
| Deployment Replicas - Unavailable   | kube_deployment_status_replicas_unavailable                                                                                                                                                                                        | Deployment replicas - unavailable (stats)                                      |
| Pods Running                        | kube_pod_status_phase                                                                                                                                                                                                              | Pods running (stats)                                                           |
| Pods Pending                        | kube_pod_status_phase                                                                                                                                                                                                              | Pods pending (stats)                                                           |
| Pods Failed                         | kube_pod_status_phase                                                                                                                                                                                                              | Pods failed (stats)                                                             |
| Pods Succeeded                      | kube_pod_status_phase                                                                                                                                                                                                              | Pods succeeded (stats)                                                          |
| Pods Unknown                        | kube_pod_status_phase                                                                                                                                                                                                              | Pods unknown (stats)                                                           |
| Containers Running                  | kube_pod_container_status_running                                                                                                                                                                                                  | Containers running (stats)                                                     |
| Containers Waiting                  | kube_pod_container_status_waiting                                                                                                                                                                                                  | Containers waiting (stats)                                                      |
| Containers Terminated               | kube_pod_container_status_terminated                                                                                                                                                                                               | Containers terminated (stats)                                                   |
| Containers Restarts (Per Namespace) | kube_pod_container_status_restarts_total                                                                                                                                                                                           | Containers restarts per namespace (stats)                                      |