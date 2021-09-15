---
title: Ship Fluent Bit logs with Helm
logo:
  logofile: fluent-bit.svg
  orientation: horizontal
data-source: Fluent Bit over Helm
templates: ["k8s-daemonset"]
open-source:
  - title: logzio-helm
    github-repo: logzio-helm
contributors:
  - yotamloe
  - nshishkin
shipping-tags:
  - container
order: 430
---

# Logzio Fluent Bit Helm chart


You can use this Helm chart to ship Kubernetes logs to Logz.io with Fluent Bit. Helm is a tool for managing packages of pre-configured Kubernetes resources using Charts.

<!-- info-box-start:info -->
This chart is based on the [fluent-bit](https://github.com/fluent/helm-charts/tree/main/charts/fluent-bit) Helm chart.
{:.info-box.note}
<!-- info-box-end -->


#### Standard configuration

<div class="tasklist">

##### Add `logzio-helm` repo
  
```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```


###### Run the Helm deployment code

```shell
helm install  \
--set logzio.token=<<LOG-SHIPPING-TOKEN>> \
--set logzio.listenerHost=<<LISTENER_HOST>> \
--set logzio.logType=<<LOG_TYPE>> \
logzio-fluent-bit logzio-helm/logzio-fluent-bit
```
  
* {% include log-shipping/listener-var.html %}
* {% include log-shipping/log-shipping-token.html %}
* If required, replace `<<LOG_TYPE>>` with the desired name for the log type, the default value is `fluentbit`.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, then open [Logz.io](https://app.logz.io/).

</div>


####  Customizing Helm chart parameters


##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install`

* Edit the `values.yaml`

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

###### Example

```
helm install logzio-fluent-bit logzio-helm/logzio-fluent-bit -f my_values.yaml 
```

To modify fluentbit configuration, edit the `config` section in `values.yaml`.

#### Uninstalling the Chart

The Uninstall command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `logzio-fluent-bit` deployment, use the following command:

```shell
helm uninstall logzio-fluent-bit
```
