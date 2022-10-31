---
layout: article
title: Kubernetes 360
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Logz.io intro to Kubernetes 360
permalink: /user-guide/kibana/k360/overview.html
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

To get started with Kubernetes 360:

* Create/open your Logz.io **[Infrastructure Monitoring](https://app.logz.io/#/dashboard/metrics)** account.
* **[Connect your Kubernetes data](https://app.logz.io/#/dashboard/send-your-data/agent/new)** to your Infrastracture Monitoring account.

You can connect your Kubernetes data through Logz.io's **[Telemetry Collector](https://app.logz.io/#/dashboard/send-your-data/agent/new)**, or you can send your data [manually](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=prometheus-sources). If you choose to send your Kubernetes data manually, make sure you ship your cluster metrics from the following sources:

* Node exporter (should be installed on every node)
* CAdvisor
* Kube-state-metrics version 2.1 or higher

Once everything is up and running, you can view your data on the Kubernetes 360 dashboard.

#### Meet the Kubernetes 360 dashboard

Your Kubernetes 360 dashboard includes an overview of your clusters and pods' current status.

![K360 Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/k360-main-numbers.png)

<div class="tasklist">

##### Main dashboard

The default view shows all the nodes inside the chosen cluster, and each dot represents a pod inside the node. The pods are color-coded to indicate their current status.

You can click on the nodes or specific pods to gain more information about each one through the **[Quick view]()** menu. 

##### Clusters

The dropdown menu includes all of the clusters inside your Kubernetes, divided according to the account's name.

##### Auto refresh

Your Kubernetes 360 dashboard is set to auto-refresh every few seconds to provide you with the most recent data. If you want to investigate an issue, you can disable the auto-refresh by clicking on the button. To re-enable the auto-refresh feature, click on the button Click on the button again to re-enable auto-refresh.

##### Filters

Kubernetes 360 default view is by nodes inside the chosen cluster. Use the filters to change your view to be by Deployments to get a broader overview of your Kubernetes current status.

##### Legend view

The default view in Kubernetes 360 is nodes' status.

You can select a different view according to your monitoring needs by clicking on one of the options available in the bottom menu:

* **Status** - Get an overview of the pods' current status: running, failed, pending, or succeeded.
* **CPU** - A percentage overview of how much CPU each pod is using: 0-50%, 50%-80%, 80%-100%, or over 100%.
* **Memory** - A percentage overview of how much memory each pod is using: 0-50%, 50%-80%, 80%-100%, or over 100%.
* **Restarts** - A numeric overview of how many restarts occurred in each pod: 0, 1-10, 11-20, or over 20 restarts.


##### Quick view

Click on a node or a pod to access the quick view menu. This menu provides more information that can be helpful when monitoring and troubleshooting.

![K360 Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/quick-view.png)

A node's quick view includes the following information:

* Role - Master or worker
* Status - True ?
* Cluster - Which cluster this node exists in
* Region - Region
* Namespace - ?
* Uptime - How long this node has been up and running
* CPU - How much CPU this node has used
* Memory - How much memory this node has used
* Disk - How much disk space this node is taking

A pod's quick view includes the following added information:

* Node - Which node this pod belongs to
* Containers number - ?
* Restarts - How many restarts happened in this pod


In addition, you can use the **Locate** button to focus your view on the specific node or pod you're investigating. 


</div>


###### Additional resources

* [Read more](https://logz.io/blog/unified-observability-kubernetes-360/) about Logz.io's Kubernetes 360 platform.