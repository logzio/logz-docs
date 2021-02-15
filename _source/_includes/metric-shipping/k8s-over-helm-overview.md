## Overview

Helm is a tool for managing packages of pre-configured Kubernetes resources, known as Charts.

You can ship metrics from your Kubernetes cluster using Logzio-k8s-metrics.

This Daemonset can be deployed using a standard configuration or [Metricbeat autodiscover](https://www.elastic.co/guide/en/beats/metricbeat/7.9/configuration-autodiscover.html), for even more powerful automation.


**Before you begin, you'll need**:

* [Helm CLI](https://helm.sh/docs/intro/install/) installed
* [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) installed
* [Metricbeat 7.6](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-installation.html) or higher for Autodiscover support. This integration defaults to Metricbeat 7.9.1.
* To allow outgoing traffic to destination port 5015
* Kubelet read-only-port 10255 enabled. Kubelet read-only-port 10255 is enabled by default on some cluster versions. If it isn’t enabled, follow Kubernetes’s instructions for enabling 10255 as a read-only-port in Kubelet’s config file

<!-- info-box-start:info -->
Helm 2 will reach [EOL on November 2020](https://helm.sh/blog/2019-10-22-helm-2150-released/#:~:text=6%20months%20after%20Helm%203's,Helm%202%20will%20formally%20end). This document follows the command syntax recommended for Helm 3, but the Chart will work with both Helm 2 and Helm 3.
{:.info-box.note}
<!-- info-box-end -->
