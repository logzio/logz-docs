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

* Pending list from Dima.

Once everything is up and running, you can view your data on the Kubernetes 360 dashboard.

#### Meet the Kubernetes 360 dashboard

Your Kubernetes 360 dashboard includes an overview of your clusters and pods' current status.

![K360 Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/k8s-overview-nov9.png)

<div class="tasklist">

##### Main dashboard

Kubernetes 360 dashboard provides a quick overview of your current deployments and nodes. 

The default view shows deployments, and you can change it to display all of the nodes inside your system by clicking on the **Nodes** button at the top right of the screen.

Each dot represents a pod inside the cluster. You can change your view to display all of the nodes inside your system. The pods' colors indicate their current status. The index at the bottom of the screen correlates the colors and status.

You can click on the deployments or a specific pod to get more information through the **[Quick view]()** menu. 

##### Clusters

The dropdown menu includes all clusters in your Kubernetes account, bundled under their respective accounts.

##### Namespace

Environments with many users, teams, or projects use a namespace to bundle relevant clusters and nodes. This filter allows you to focus on all elements inside a specific namespace.

##### Auto refresh

Your Kubernetes 360 dashboard is set to auto refresh every 30 seconds to provide you with the most recent data. You can hover over the button to see when the data was last updated. Clicking on the button stops the auto refresh, allowing you to investigate an issue or focus on the current state of your Kubernetes environment. Click on the button again to turn auto-refresh on.

##### Choose your metrics

You can select to focus on different metrics according to your monitoring needs. These metrics are:

* **Status** - Understand which pods are running, failing, pending, or which pods succeeded.
* **CPU** - View CPU consumtions by percentage: 0-50%, 50%-80%, 80%-100%, or over 100%.
* **Memory** - Know how much memory each pod uses: 0-50%, 50%-80%, 80%-100%, or over 100%.
* **Restarts** - Get a numeric overview of how many restarts occurred in each pod: 0, 1-10, 11-20, or over 20 restarts.


##### Quick view

Click on a deployment, node, or pod to access the quick view menu and gain more information about each element.

![K360 Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/k360/quick-view.png)

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


###### Additional resources

* [Read more](https://logz.io/blog/unified-observability-kubernetes-360/) about Logz.io's Kubernetes 360 platform.