---
layout: article
title: Meet Kubernetes 360
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Logz.io intro to Kubernetes 360
permalink: /user-guide/k360/overview.html
flags:
  logzio-plan: community
tags:
  - kubernetes
contributors:
  - hidan
---

Kubernetes 360 is a unified platform combining a true log analytics solution, the best Prometheus metrics monitoring, and the value of distributed tracing powered by Jaeger that enables DevOps teams to monitor applications deployed in Kubernetes environments.

The platform utilizes Kubernetes' numerous advantages for dev and ops teams, allowing you to monitor application SLOs in a simple, efficient, and actionable manner. Kubernetes 360 offers flexibility and visibility while providing service discovery, balancing load, and allowing developer autonomy and business agility.

#### Prerequisites

To get started with Kubernetes 360, make sure you have an active **[Infrastructure Monitoring](https://app.logz.io/#/dashboard/metrics)** account and that your Kubernetes data is [connected to Logz.io](https://app.logz.io/#/dashboard/send-your-data/agent/new).

You can connect your Kubernetes data quickly and easily through Logz.io's **[Telemetry Collector](https://app.logz.io/#/dashboard/send-your-data/agent/new)**.

If you want to send your data [manually](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=prometheus-sources), you'll need to ship your cluster metrics from the following sources:

* Node exporter (should be installed on every node).
* CAdvisor.
* Kube-state-metrics version 2.1 or higher.

And send the following metrics:

|**Metric name**||**Labels**|
|*||p8s_logzio_name `// this is needed for all used grouped metrics`|
|kube_pod_status_phase||pod, uid, node, host_ip, phase, namespace|
|kube_pod_info||pod,namespace,p8s_logzio_name,region|
|container_cpu_usage_seconds_total||pod, region, topology_kubernetes_io_region, container|
|container_memory_working_set_bytes||pod, container, resource|
|kube_pod_container_resource_limits||pod|
|kube_pod_container_info||pod|
|container_network_transmit_bytes_total||pod|
|container_network_receive_bytes_total||pod|
|kube_pod_created||pod|
|kube_pod_owner||pod, owner_kind, owner_name|
|kube_pod_container_status_restarts_total||pod|
|kube_pod_status_reason||pod, reason|
|kube_pod_container_status_waiting_reason||pod, reason|
|||
|node_cpu_seconds_total||instance, mode|
|node_memory_MemAvailable_bytes||instance|
|node_memory_MemTotal_bytes||instance|
|kube_node_role||node,role|
|kube_node_status_condition||node, status, condition|
|kube_node_created||node|
|node_filesystem_avail_bytes||instance|
|node_filesystem_size_bytes||instance|
|kube_node_status_allocatable||resource, resource|
|||
|kube_replicaset_owner||owner_kind, owner_name,replicaset|
|kube_deployment_created||deployment|
|kube_deployment_status_condition||deployment,status|

Once everything is up and running, you can view your data on the Kubernetes 360 dashboard.

#### Meet the Kubernetes 360 dashboard

Your Kubernetes 360 dashboard includes an overview of your clusters and deployments' current status.

![K360 Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/k360-overview.png)

<div class="tasklist">

##### Main dashboard

Kubernetes 360 dashboard provides a quick overview of your current deployments and nodes. 

The default deployments view includes a summary of the average CPU and memory used in each deployment, with a rundown of pods that require your attention.

![deployments overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/deployment-overview.png)

You can switch your view by clicking on the **Node** button at the top right to view a summary of the nodes inside your chosen cluster.

Click on each deployment or node to get more information through the **[Quick view](/user-guide/k360/overview.html#quick-view)** menu. 

##### Clusters

Choose which cluster you want to review. The dropdown menu includes all clusters in your Kubernetes account, bundled under their respective accounts.

<!-- ![deployments overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/deployment-overview.png) -->

##### Namespace

Environments with many users, teams, or projects use a namespace to bundle relevant clusters and nodes. This filter allows you to focus on all elements inside a specific namespace.

##### Auto refresh

Your Kubernetes 360 dashboard is set to **auto refresh every 30 seconds** to provide you with the most recent data. Hover over the refresh button to see when the data was last updated.

Click on the button to stop the auto refresh. This allows you to investigate an issue or focus on your Kubernetes environment's current state. Click on the button again to turn auto refresh on.

![autorefresh button](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/autorefresh.png)

##### Change your metrics view

By default, Kubernetes 360 provides an overview of your current environment. Use the bottom menu to focus on different metrics according to your monitoring needs:

* **Status** - Understand which pods are running, failing, pending, or which pods succeeded.
* **CPU** - View CPU consumtions by percentage: 0-50%, 50%-80%, 80%-100%, or over 100%.
* **Memory** - Know how much memory each pod uses: 0-50%, 50%-80%, 80%-100%, or over 100%.
* **Restarts** - Get a numeric overview of how many restarts occurred in each pod: 0, 1-10, 11-20, or over 20 restarts.
* **Log Error Rate** - Analyze the percentage of log errors that occurred and how many pods were affected. [_How do we calculate the log error rate?_](/user-guide/k360/overview.html#calculating-log-error-rate)


##### Quick view

Click on a deployment, node, or pod to open the quick view menu and get more information about each element. The menu allows you to investigate and understand what’s happening inside your Kubernetes environment by adding more helpful information.

###### Deployment quick view

A **deployment** quick view includes the following fields:

* **Name** - The name of the deployment you're focusing on.
* **Status** - An indicator of the deployment's status. It can be **True**, **False**, or **Unknown**. 
* **Cluster** - The cluster that this deployment is a part of.
* **Region**- Your deployment's region.
* **Namespace** - The deployment's unique namespace.
* **Uptime** - The duration of how long this deployment has been running.
* **CPU** - Amount of CPU used by this deployment. If the CPU is not capped, you'll see an indicator stating that there's **no limit**.
* **Memory** - An average calculation of how much memory this deployment has been using.
* **Disk** - The amount of disk space taken up by this node.

The deployment quick view menu includes the related pods, and you can see their status, the number of containers they’re in, and how much CPU and memory they’re using.

![Quick menu Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/quick-view-open-menu.png)

###### Node quick view

A node quick view menu includes the following fields: 

* **Name** - The name of the node you're focusing on.
* **Role** - Master or worker.
* **Status** - Indicates whether that condition is applicable, with possible values **True**, **False**, or **Unknown**.
* **Cluster** - The cluster to which this node belongs.
* **Region** - The node's region.
* **Uptime** - The number of hours this node has been running.
* **CPU** - A percentile average of how much CPU has been used.
* **Memory** - An average percentage of how much memory was consumed.
* **Disk** - The amount of disk space taken up by this node, and how much is left.

The node quick view menu also includes a list of the pods related to it. The list indicates each pod’s status, the number of containers they’re in, and how much CPU and memory they use.

![Node menu Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/node-quick-view-menu.png)

###### Pod quick view

Click on a pod to access its quick view menu and gain access to this additional information:

* **Name** - The name of the pod you're focusing on. 
* **Status** - Indicates whether that condition is applicable, with possible values **True**, **False**, or **Unknown**.
* **Node** - The node that this pod is a part of.
* **Deployment** - The deployment related to this pod.
* **Cluster** - The cluster in which this pod resided. 
* **Containers number** - Number of containers in which this pod exists.
* **Region** - This pod's region.
* **Namespace** - The pod's unique namespace.
* **Uptime** - The duration of how long this pod has been up and running. 
* **Restarts** - The number of restarts that have happened in this pod since it’s been running.
* **CPU** - A percentile average of how much CPU has been used.
* **Memory** - An average percentage of how much memory was consumed.

![Pod menu Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/pod-quick-view-menu.png)

</div>

##### Investigate through quick view 

Whether you’re viewing a deployment, node, or pod, you can easily investigate the different issues you might encounter. Each quick view menu contains the **View Metrics** button, allowing you to view the relevant information in a Grafana dashboard. This can provide a focused overview of the chosen element, allowing you to pinpoint what happened and when it started quickly.

Node and pod views include the **View Logs** button. Click on it to view the relevant logs in OpenSearch Dashboards. 

You might not see the View Logs button if you’ve manually configured your Kubernetes data. Instead, you can use the following query in OpenSearch Dashboards to view your Kubernetes related logs: For **Node** view, use `kubernetes.host`. For **Pod** view, use `kubernetes.pod_name`.
{:.info-box.note}


In addition, if you dive too deep into the data, you can use the **Locate** button to focus your view on the specific deployment, node, or pod you're investigating.

![quick view more buttons](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/node-dive-deeper.png)

##### Additional information

###### Calculating Log error rate

To calculate percentage error, we take the percentage of errors in the last 15 minutes and the percentage of errors in the last 2 hours:

`Errors in the last 15 minutes <= Amount of errors in the last 2 hours`

For example, if in the last 15 minutes there were 10 log errors out of 200 total logs, it means that there's a total of 5% errors:

`10/200 * 100 = 5%`

And if in the last 2 hours there were 15 log errors out of 800 total logs, the percentage of errors will be 1.8%:

`15/800 * 100 = 1.8%`

So the log error rate you'll see will be 177.7%, based on the following formula:

`(5/1.8 * 100) - 100 = 177.7%`

Additional examples: 

* Last 15 minutes = 5 error logs out of 50 total logs = 5/50 * 100 = 10%
* Last 2 hours = 6 error logs out of 800 total logs = 6/800 * 100 = 0.75%
* Error rate = (10/0.75 * 100) - 100 = 1233.3%

Or:

* Last 15 minutes = 2 error logs out of 100 total logs = 2/100 * 100 = 2%
* Last 2 hours = 2 error logs out of 800 total logs = 2/800 * 100 = 0.25%
* Error rate = (2/0.25 * 100) - 100 = 700%



###### Additional resources

* [Read more](https://logz.io/blog/unified-observability-kubernetes-360/) about Logz.io's Kubernetes 360 platform.