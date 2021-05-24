---
title: Send Kubernetes metrics with Helm and the OpenTelemetry Collector
logo:
  logofile: k8s-helm.svg
  orientation: horizontal
data-source: Kubernetes over Helm with OpenTelemetry
open-source:
  - title: Logzio-otel-k8s-metrics
    github-repo: logzio-helm/tree/master/charts/opentelemetry
templates: ["k8s-daemonset"]
contributors:
  - yotamloe
  - yberlinger
shipping-tags:
  - container
  - popular
order: 390
---


##  Overview


**logzio-otel-k8s-metrics** allows you to ship metrics from your Kubernetes cluster to Logz.io with the OpenTelemetry collector.

<!-- info-box-start:info -->
This chart is a fork of the [opentelemtry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector) Helm chart. 
It is also dependent on the [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics/tree/master/charts/kube-state-metrics), [prometheus-node-exporter](https://github.com/helm/charts/tree/master/stable/prometheus-node-exporter) and [prometheus-pushgateway](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-pushgateway) charts, which are installed by default. 
To disable the dependency during installation, set `kubeStateMetrics.enabled`, `nodeExporter.enabled` or `pushGateway.enabled` to `false`.
{:.info-box.note}
<!-- info-box-end -->

#### Standard configuration

<div class="tasklist">
  
##### Add logzio-helm repo to your helm repo list

```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```
##### Deploy the Helm chart

To deploy the Helm chart, enter the relevant parameters for the placeholders and run the code. 

###### Configure the parameters in the code

Replace the Logz-io `<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping) of the metrics account to which you want to send your data.


Replace `<<LISTENER-HOST>>` with your region’s listener host (for example, `https://listener.logz.io:8053`). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

Replace `<<ENV-TAG>>` with the name for the environment's metrics, to easily identify the metrics for each environment.

###### Run the Helm deployment code

```
helm install  \
--set secrets.MetricsToken=<<PROMETHEUS-METRICS-SHIPPING-TOKEN>> \
--set secrets.ListenerHost=<<LISTENER-HOST>> \
--set secrets.p8s_logzio_name=<<ENV-TAG>> \
logzio-otel-k8s-metrics logzio-helm/logzio-otel-k8s-metrics
```

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>

####  Customizing Helm chart parameters

<div class="tasklist">

##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install`

* Edit the `values.yaml`

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

###### Example:

```
helm install logzio-otel-k8s-metrics logzio-helm/logzio-otel-k8s-metrics -f my_values.yaml 
```

##### Customize the metrics collected by the Helm chart 

The default configuration uses the Prometheus receiver with the following scrape jobs:

* Cadvisor: Scrapes container metrics
* Kubernetes service endpoints: These jobs scrape metrics from the node exporters, from Kube state metrics, from any other service for which the `prometheus.io/scrape: true` annotaion is set, and from services that expose Prometheus metrics at the `/metrics` endpoint.

To customize your configuration, edit the `config` section in the `values.yaml` file.

</div>

#### Uninstalling the Chart

The uninstall command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `logzio-otel-k8s-metrics` deployment, use the following command:

```shell
helm uninstall logzio-otel-k8s-metrics
```

