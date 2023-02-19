---
layout: article
title: AKS - Kubernetes Cluster Components
permalink: /user-guide/infrastructure-monitoring/metrics-dashboards/aks-kubernetes-cluster-components.html 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: View and analyze metrics with AKS - Kubernetes Cluster Components
flags:
  logzio-plan: pro
tags:
  - metrics integrations
contributors:
  - nshishkin
---

This dashboard provides an interface to view and analyze metrics from your AKS Kubernetes Cluster Components.

| Metric Visualization | Metric Name | Description |
|----------------------|-------------|-------------|
| Cluster Nodes | kube_node_info | Sum of cluster nodes (stats)  |
| Cluster Nodes | kube_node_info | Sum of cluster nodes (text) |
| Cluster Active Namespaces | kube_pod_info | Sum of active namespace (stata)  |
| Cluster Active Namespaces | kube_namespace_labels | Sum of active namespace (text) |
| Nodes Condition | kube_node_status_condition | Nodes condition (timeseries) |
| Total Deployment Utilization | kube_deployment_status_replicas_available, kube_deployment_status_replicas | Total deployment utilization (gauge) |
| Total Deployments Replicas | kube_deployment_status_replicas | Total deployments replicas (stats) |
| Total Deployments Replicas Available | kube_deployment_status_replicas_available | Total deployments replicas available (stats) |
| Total Deployments Replicas Unavailable | kube_deployment_status_replicas_unavailable | Total deployments replicas unavailable (stats) |
| Running Containers | kube_pod_container_status_running | Running containers (stats) |
| Ready Containers | kube_pod_container_status_ready | Ready containers (stats) |
| Waiting Containers | kube_pod_container_status_waiting | Waiting containers (stats) |
| Terminated Containers | kube_pod_container_status_terminated | Terminated containers (stats) |
| Running Containers | kube_pod_container_status_running | Graphic representation of running containers |
| Non-Running Containers | kube_pod_container_status_waiting, kube_pod_container_status_terminated | Graphic representation of waiting and terminated containers |
| Running Pods | kube_pod_status_phase  | Running pods (stats) |
| Pending Pods | kube_pod_status_phase | Pending pods (stats) |
| Failed Pods | kube_pod_status_phase | Failed pods (stats) |
| Unknown Pods | kube_pod_status_phase | Unknown pods (stats) |
| Running pods | kube_pod_status_phase | Graphic representation of running pods |
| Non-running pods | kube_pod_status_phase | Graphic representation of non-running pods |
