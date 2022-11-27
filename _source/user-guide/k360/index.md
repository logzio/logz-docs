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

The platform utilizes Kubernetes' numerous advantages for dev and ops teams, allowing you to monitor application SLOs in a simple, efficient, and actionable manner. Kubernetes 360 offers flexibility and visibility while providing service discovery and load balancing and allowing developer autonomy and business agility.

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

The default deployments view includes a summary of the aveage CPU and memory used in each deployment, with a rundown of pods that require your attention.

![deployments overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/deployment-overview.png)

You can switch your view by clicking on the **Node** button at the top right to view a summary of the nodes inside your chosen cluster.

Click on each deployment or node to get a more information through the **[Quick view]()** menu. 

##### Clusters

Choose which cluster you want to review. The dropdown menu includes all clusters in your Kubernetes account, bundled under their respective accounts.

<!-- ![deployments overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/deployment-overview.png) -->

##### Namespace

Environments with many users, teams, or projects use a namespace to bundle relevant clusters and nodes. This filter allows you to focus on all elements inside a specific namespace.

##### Auto refresh

Your Kubernetes 360 dashboard is set to **auto refresh every 30 seconds** to provide you with the most recent data. Hover over the refresh button to see when was the data last updated.

Click on the button to stop the auto refresh. This allows you to investigate an issue or focus on the current shown state of your Kubernetes environment. Click on the button again to turn auto refresh on.

![autorefresh button](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/autorefresh.png)

##### Change your metrics view

By default, Kubernetes 360 provides an overview of your current environemnt. Use the bottom menu to focus on different metrics according to your monitoring needs:

* **Status** - Understand which pods are running, failing, pending, or which pods succeeded.
* **CPU** - View CPU consumtions by percentage: 0-50%, 50%-80%, 80%-100%, or over 100%.
* **Memory** - Know how much memory each pod uses: 0-50%, 50%-80%, 80%-100%, or over 100%.
* **Restarts** - Get a numeric overview of how many restarts occurred in each pod: 0, 1-10, 11-20, or over 20 restarts.
* **Log Error Rate** - Analyze a percentage of log errors that occurred, and how many pods were effected. [_How do we calculate the error rate?_]()


##### Quick view

Click on a deployment, node, or pod to access the quick view menu. This menu gives more information about the chosen element, allowing you to investigate and understand what's happening in your environment.

![K360 Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/quickview-menu.png)

A node's quick view includes the following details:

* Role - Master or worker.
* Status - Indicates whether that condition is applicable, with possible values **True**, **False**, or **Unknown**.
* Cluster - The cluster to which this node belongs.
* Region - The node's region.
* Namespace - Node's unique namespace.
* Uptime - The number of hours this node has been running.
* CPU - The amount of CPU used.
* Memory - Memory consumption for this node.
* Disk - The amount of disk space taken up by this node.

A pod's quick view includes the following added information:

* Node - To which node this pod belongs.
<!-- * Containers number - ? -->
* Restarts - How many restarts happened in this pod.


In addition, you can use the **Locate** button to focus your view on the specific node or pod you're investigating. 


</div>



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

* Last 15 minutes = 5 error logs out of 50 total logs = 5/50 * 100 = 10%.
* Last 2 hours = 6 error logs out of 800 total logs = 6/800 * 100 = 0.75%.
* Error rate = (10/0.75 * 100) - 100 = 1233.3%.



* Last 15 minutes = 2 error logs out of 100 total logs = 2/100 * 100 = 2%
* Last 2 hours = 2 error logs out of 800 total logs = 2/800 * 100 = 0.25%
* Error rate = (2/0.25 * 100) - 100 = 700%



###### Additional resources

* [Read more](https://logz.io/blog/unified-observability-kubernetes-360/) about Logz.io's Kubernetes 360 platform.