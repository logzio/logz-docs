---
title: Ship .NET diagnostic metrics with Helm
logo:
  logofile: dotnet-logo.png
  orientation: horizontal
data-source: .NET over Helm
data-for-product-source: Metrics
templates: ["k8s-daemonset"]
open-source:
  - title: logzio-helm
    github-repo: logzio-helm
contributors:
  - nshishkin
shipping-tags:
  - container
order: 430
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Setup](#setup)
* [Troubleshooting](#troubleshooting)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Helm is a tool for managing packages of pre-configured Kubernetes resources using Charts. This integration allows you to collect and ship diagnostic metrics of your .NET application in Kubernetes to Logz.io, using dotnet-monitor and OpenTelemetry. logzio-dotnet-monitor runs as a sidecar in the same pod as the .NET application.

###### Sending metrics from nodes with taints

If you want to ship metrics from any of the nodes that have a taint, make sure that the taint key values are listed in your in your daemonset/deployment configuration as follows:
  
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

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="setup">

#### Standard configuration

<div class="tasklist">

##### Select the namespace

This integration will be deployed in the namespace you set in values.yaml. The default namespace for this integration is logzio-dotnet-monitor.

To select a different namespace, run:

```shell
kubectl create namespace <<NAMESPACE>>
```

* Replace `<<NAMESPACE>>` with the name of your namespace.


##### Add `logzio-helm` repo
  
```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```


###### Run the Helm deployment code

```shell
helm install -n <<NAMESPACE>> \
--set secrets.logzioURL='<<LISTENER-HOST>>:8053' \
--set secrets.logzioToken='<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>' \
--set-file dotnetAppContainers='<<DOTNET_APP_CONTAINERS_FILE>>' \
logzio-dotnet-monitor logzio-helm/logzio-dotnet-monitor
```

* Replace `<<NAMESPACE>>` with the namespace you selected for this integration. The default value is `default`.
{% include log-shipping/listener-var.html %} {% include log-shipping/log-shipping-token.html %}
* Replace `<<DOTNET_APP_CONTAINERS_FILE>>` with your .NET application containers file. Make sure your main .NET application container has the following volumeMount:

```yaml
volumeMounts:
  - mountPath: /tmp
    name: diagnostics
```


##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, then open [Logz.io](https://app.logz.io/). You can search for your metrics in Logz.io by searching `{job="dotnet-monitor-collector"}`

</div>


####  Customizing Helm chart parameters


##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install` or `--set-file key=value[,key=value]`

* Edit the `values.yaml`

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

##### Customization parameters

| Parameter | Description | Default |
|---|---|---|
| `nameOverride` | Overrides the Chart name for resources. | `""` |
| `fullnameOverride` | Overrides the full name of the resources. | `""` |
| `apiVersions.deployment` | Deployment API version. | `apps/v1` |
| `apiVersions.configmap` | Configmap API version. | `v1` |
| `apiVersions.secret` | Secret API version. | `v1` |
| `namespace` | Chart's namespace. | `logzio-dotnet-monitor` |
| `replicaCount` | The number of replicated pods, the deployment creates. | `1` |
| `labels` | Pod's labels. | `{}` |
| `annotations` | Pod's annotations. | `{}` |
| `customSpecs` | Custom spec fields to add to the deployment. | `{}` |
| `dotnetAppContainers` | List of your .NET application containers to add to the pod. | `[]` |
| `logzioDotnetMonitor.name` | The name of the container that collects and ships diagnostic metrics of your .NET application to Logz.io (sidecar) | `logzio-dotnet-monitor` |
| `logzioDotnetMonitor.image.name` | Name of the image that is going to run in `logzioDotnetMonitor.name` container | `logzio/logzio-dotnet-monitor` |
| `logzioDotnetMonitor.image.tag` | The tag of the image that is going to run in `logzioDotnetMonitor.name` container | `latest` |
| `logzioDotnetMonitor.ports` | List of ports the `logzioDotnetMonitor.name` container exposes | `52325` |
| `tolerations` | List of tolerations to applied to the pod. | `[]` | 
| `customVolumes` | List of custom volumes to add to deployment. | `[]` |
| `customResources` | Custom resources to add to helm chart deployment (make sure to separate each resource with `---`). | `{}` |
| `secrets.logzioURL` | Secret with your Logz.io listener url. | `https://listener.logz.io:8053` |
| `secrets.logzioToken` | Secret with your Logz.io metrics shipping token. | `""` |
| `configMap.dotnetMonitor` | The dotnet-monitor configuration. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/charts/dotnet-monitor/values.yaml). |
| `configMap.opentelemetry` | The opentelemetry configuration. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/charts/dotnet-monitor/values.yaml). |


* To get additional information about dotnet-monitor configuration, click [here](https://github.com/dotnet/dotnet-monitor/blob/main/documentation/configuration.md#metrics-configuration).
* To see well-known providers and their counters, click [here](https://docs.microsoft.com/en-us/dotnet/core/diagnostics/available-counters).

#### Uninstalling the Chart

The Uninstall command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `dotnet-monitor-collector` deployment, use the following command:

```shell
helm uninstall dotnet-monitor-collector
```



</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="troubleshooting">


This section contains some guidelines for handling errors that you may encounter when trying to collect metrics from a .NET application in Kubernetes.

## Problem: No metrics received

No metrics are observed in your Logz.io account.

### Possible cause - Incorrect token and/or listener URL

Your Logz.io token and/or listener URL may be incorrect.

#### Suggested remedy

1. Navigate to  **[Manage tokens](https://app.logz.io/#/dashboard/settings/manage-tokens/shared) > [Data shipping tokens - Metrics](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=metrics)** and verify your account's metrics token and listener URL.

2. Check in the integration code whether the token and listener URL are specified correctly.

### Possible cause - Shipper connectivity failure

Your host/server may not be connected to your Logz.io listener.


#### Suggested remedy

Verify connectivity of your Logz.io listener as follows.

* For Linux and Mac servers, use `telnet`:

  ```shell
  telnet listener.logz.io <<PORT>>
  ```


* For Windows servers running Windows 8/Server 2012 and later, use the following command in PowerShell:

  ```shell
  Test-NetConnection listener.logz.io -Port <<PORT>>
  ```

  Replace `<<PORT>>` with the appropriate port nummber. For HTTPS communication use port 8053. For HTTP communication use port 8052.


### Possible cause - Incorrect listener endpoint

Your Logz.io listener may not be using the correct endpoint.

#### Suggested remedy

Change the endpoint of your listener from `https://<<LISTENER-HOST>>:<<PORT>>` to `http://<<LISTENER-HOST>>:<<PORT>>` or from `http://<<LISTENER-HOST>>:<<PORT>>` to `https://<<LISTENER-HOST>>:<<PORT>>`


{% include log-shipping/listener-var.html %} 


### Possible cause - Pod is not running

One of your Kubernetes pods may not be running.

#### Suggested remedy

Check if a required pod is runing by using the following command:

```shell
kubectl -n <<NAMESPACE>> get pods
```

Replace `<<NAMESPACE>>` with the name of the namespace for the required pod.

### Possible cause - Pod is not running

The `dotnet monitor`pod may not be running.

#### Suggested remedy

Check the logs of the pod that was created for dotnet monitor.

If the logs do not appear, check the pod's configuration by running:

```shell
dotnet monitor config show
```

If the configuration is correct, <a class="intercom-launch" href="mailto:help@logz.io">contact the Support team</a>.



</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
