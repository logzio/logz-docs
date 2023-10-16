---
title: Send AKS metrics with Helm and the OpenTelemetry Collector
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Send AKS metrics with Helm and OpenTelemetry Collector to Logz.io
logo:
  logofile: aks-logo-2.png
  orientation: horizontal
data-source: Azure Kubernetes Service (AKS)
data-for-product-source: Metrics
open-source:
  - title: Logzio-telemetry
    github-repo: logzio-helm/tree/master/charts/logzio-telemetry
templates: ["k8s-daemonset"]
contributors:
  - yotamloe
  - yberlinger
  - refaelmi
shipping-tags:
  - container
  - popular
  - prebuilt-dashboards
order: 390
---
<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Standard configuration Linux](#Standard-configuration-linux)
* [Standard configuration Windows](#Standard-configuration-windows)
* [Customizing Helm chart parameters](#Customizing-helm-chart-parameters)
* [Uninstalling the Chart](#Uninstalling-the-chart)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

####  Overview


**logzio-k8s-telemetry** allows you to ship metrics from your Kubernetes cluster to Logz.io with the OpenTelemetry collector.
For AKS clusters, this chart also allows you to ship Windows node metrics.

This chart is a fork of the [opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector) Helm chart. The main repository for Logz.io helm charts are [logzio-helm](https://github.com/logzio/logzio-helm).
  
It is also dependent on the [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics/tree/master/charts/kube-state-metrics), [prometheus-node-exporter](https://github.com/helm/charts/tree/master/stable/prometheus-node-exporter) and [prometheus-pushgateway](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-pushgateway) charts, which are installed by default. 
  
To disable the dependency during installation, set `kubeStateMetrics.enabled`, `nodeExporter.enabled` or `pushGateway.enabled` to `false`.

For applications that run on Kubernetes, enable the Prometheus scrape feature:

```yaml
prometheus.io/scrape: true
```

###### Sending logs from nodes with taints

If you want to ship logs from any of the nodes that have a taint, make sure that the taint key values are listed in your in your daemonset/deployment configuration as follows:
  
```yaml
tolerations:
- key: 
  operator: 
  value: 
  effect: 
```
  
To determine if a node uses taints as well as to display the taint keys, run:
  
```
kubectl get nodes -o json | jq ".items[]|{name:.metadata.name, taints:.spec.taints}"
```

You need to use `Helm` client with version `v3.9.0` or above.

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["5jMvBtrxQwMo0GuDO13kpb", "5BjRR3NuNQb3XHVPhn3HQ0", "2TRgFib4ICfKsrzS5oJwgC", "1EcVjdr5c6heqbxpd6Zs8X"] -->

{% include metric-shipping/generic-dashboard.html %} 


</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="Standard-configuration-linux">

#### Standard configuration for Linux nodes

<div class="tasklist">
  
##### Add logzio-helm repo to your helm repo list

  ```shell
  helm repo add logzio-helm https://logzio.github.io/logzio-helm
  helm repo update
  ```

##### Deploy the Helm chart

1. Configure the relevant parameters in the following code:

   ```
   helm install --namespace <<YOUR-NAMESPACE>>  \
   --set metrics.enabled=true \
   --set secrets.MetricsToken=<<METRICS-SHIPPING-TOKEN>> \
   --set secrets.ListenerHost="https://<<LISTENER-HOST>>:8053" \
   --set secrets.p8s_logzio_name=<<ENV-TAG>> \
   logzio-k8s-telemetry logzio-helm/logzio-k8s-telemetry
   ```

   * Replace `<<YOUR_NAMESPACE>>` with the required namespace.

   * {% include /metric-shipping/replace-metrics-token.html %}

   * {% include /log-shipping/listener-var.html %}

   * Replace `<<ENV-TAG>>` with the name for the environment's metrics, to easily identify the metrics for each environment.

2. Run the code.

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours.


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["5jMvBtrxQwMo0GuDO13kpb", "5BjRR3NuNQb3XHVPhn3HQ0", "2TRgFib4ICfKsrzS5oJwgC", "1EcVjdr5c6heqbxpd6Zs8X"] -->

{% include metric-shipping/generic-dashboard.html %} 
  
</div>

For troubleshooting this solution, see our [AKS troubleshooting guide](https://docs.logz.io/user-guide/infrastructure-monitoring/troubleshooting/aks-helm-opentelemetry-troubleshooting.html).
  
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="Standard-configuration-windows">

#### Standard configuration for Windows nodes

<div class="tasklist">
  
##### Add logzio-helm repo to your helm repo list

  ```shell
  helm repo add logzio-helm https://logzio.github.io/logzio-helm
  helm repo update
  ```

##### Update your Windows node pool credentials (if needed)
  
To extract and scrape metrics from Windows nodes, you need to install a Windows Exporter service on the node host. To do this, you need to establish a SSH connection to the node by authenticating with a username and password. The `windows-exporter-installer` job performs the installation on each Windows node using the provided Windows credentials. The default username for Windows node pool is `azureuser`.
  
If your Windows node pool does not share the same username and password across the nodes, you will need to run the `windows-exporter-installer` job for each node pool using the relevant credentials. You can change your Windows node pool password in AKS cluster with the following command:


   ```
   az aks update \
   --resource-group $RESOURCE_GROUP \
   --name $CLUSTER_NAME \
   --windows-admin-password $NEW_PW
   ```

   * Replace `RESOURCE_GROUP` with the resource group name.
   * Replace `CLUSTER_NAME` with the cluster name.
   * Replace `NEW_PW` with the password selected for this pool.

##### Deploy the Helm chart

1. Configure the relevant parameters in the following code:

   ```
   helm install --namespace <<YOUR-NAMESPACE>>  \
   --set metrics.enabled=true \
   --set secrets.MetricsToken=<<METRICS-SHIPPING-TOKEN>> \
   --set secrets.ListenerHost="https://<<LISTENER-HOST>>:8053" \
   --set secrets.p8s_logzio_name=<<ENV-TAG>> \
   --set secrets.windowsNodeUsername=<<WINDOWS-NODE-USERNAME>> \
   --set secrets.windowsNodePassword=<<WINDOWS-NODE-PASSWORD>> \
   logzio-k8s-telemetry logzio-helm/logzio-k8s-telemetry
   ```

   * Replace `<<YOUR_NAMESPACE>>` with the required namespace.

   * {% include /metric-shipping/replace-metrics-token.html %}

   * {% include /log-shipping/listener-var.html %}

   * Replace `<<ENV-TAG>>` with the name for the environment's metrics, to easily identify the metrics for each environment.

   * Replace `<WINDOWS-NODE-USERNAME>>` with the username for the Node pool you want the Windows Exporter to be installed on.

   * Replace `<<WINDOWS-NODE-PASSWORD>>` with the password for the Node pool you want the Windows exporter to be installed on.

2. Run the code.

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours.


{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["5jMvBtrxQwMo0GuDO13kpb", "5BjRR3NuNQb3XHVPhn3HQ0", "2TRgFib4ICfKsrzS5oJwgC", "1EcVjdr5c6heqbxpd6Zs8X" ] -->

{% include metric-shipping/generic-dashboard.html %} 
  
</div>

For troubleshooting this solution, see our [AKS troubleshooting guide](https://docs.logz.io/user-guide/infrastructure-monitoring/troubleshooting/aks-helm-opentelemetry-troubleshooting.html).
  
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="Customizing-helm-chart-parameters">

####  Customizing Helm chart parameters

<div class="tasklist">

##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install`

* Edit the `values.yaml`

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

###### Example:

```
helm install logzio-k8s-telemetry logzio-helm/logzio-k8s-telemetry -f my_values.yaml 
```

##### Customize the metrics collected by the Helm chart 

The default configuration uses the Prometheus receiver with the following scrape jobs:

* Cadvisor: Scrapes container metrics
* Kubernetes service endpoints: These jobs scrape metrics from the node exporters, from Kube state metrics, from any other service for which the `prometheus.io/scrape: true` annotaion is set, and from services that expose Prometheus metrics at the `/metrics` endpoint.

To customize your configuration, edit the `config` section in the `values.yaml` file.

</div>

For troubleshooting this solution, see our [AKS troubleshooting guide](https://docs.logz.io/user-guide/infrastructure-monitoring/troubleshooting/aks-helm-opentelemetry-troubleshooting.html).

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="Uninstalling-the-chart">

#### Uninstalling the Chart

The `uninstall` command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `logzio-k8s-telemetry` deployment, use the following command:

```shell
helm uninstall logzio-k8s-telemetry
```

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->