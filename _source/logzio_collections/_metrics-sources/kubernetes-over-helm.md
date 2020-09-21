---
title: Ship Kubernetes metrics over HELM
logo:
  logofile: helm-icon-color.png
  orientation: vertical
data-source: Kubernetes over Helm
templates: ["no-template","no-template"]
open-source:
  - title: Helm Metrics Collector
    github-repo: logzio-helm
contributors:
  - mirii1994
  - ronish31
  - shalper
shipping-tags:
  - container
---
Helm is a tool for managing packages of pre-configured Kubernetes resources, known as Charts.
Logzio-k8s-metrics allows you to ship metrics from your Kubernetes cluster.
You can either deploy this Daemonset with the standard configuration, or with autodiscover configuration. For further information about Metricbeat's autodiscover please see [Autodiscover documentation](https://www.elastic.co/guide/en/beats/metricbeat/7.9/configuration-autodiscover.html).
*Note*: This integration supports Autodiscover with Metricbeat version 7.6+ and defaults to Metricbeat 7.9.1.

**Before you begin, you'll need**:

* [Helm CLI](https://helm.sh/docs/intro/install/) installed
* [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) installed
* To allow outgoing traffic to destination port 5015
* Kubelet read-only-port 10255 enabled. Kubelet read-only-port 10255 is enabled by default on some cluster versions. If it isn’t enabled, follow Kubernetes’s instructions for enabling 10255 as a read-only-port in Kubelet’s config file


<div class="branching-container">
* [Automated deployment _recommended_](#automated-config)
* [Manual deployment](#manual-config)
* [Parameters](#configurations)
* [Uninstall](#uninstall)
{:.branching-tabs}

<div id="automated-config">

#### Automated deployment

This is the simplest method for deployment but it doesn't offer advanced configuration options. The chart will be deployed according to the listed parameter defaults.

<div class="tasklist">

##### Run the automated deployment script

```shell
bash <(curl -s https://raw.githubusercontent.com/logzio/logzio-helm/master/quickstart-metrics.sh)
```

##### Add the configuration

Follow through the system's prompts and provide the requested parameters.

| Prompt | Answer |
|---|---|
| Logz.io metrics shipping token <span class="required-param"></span> | {% include metric-shipping/replace-metrics-token.html %} |
| Logz.io region (Default: `Blank (US East)`) | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you’re shipping the logs to) and API URL. You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. |
| Cluster name (Default: `detected by the script`) | Name of the Kubernetes cluster in which you are deploying. |
| Standard or autodiscover deployment (Default: `standard`) | To deploy with [configuration templates](https://www.elastic.co/guide/en/beats/metricbeat/current/configuration-autodiscover.html) answer 'autodiscover'. |

{% include metric-shipping/open-dashboard.html title="Kubernetes" %}


</div>
<!-- tab:end -->
</div>

<div id="manual-config">

#### Manual deployment

This method of deployment gives you greater control over the configuration.

<div class="tasklist">

##### Add your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

* {% include metric-shipping/replace-metrics-token.html %}

* Replace `<<LISTENER-HOST>>` with your region’s listener host (for example, `listener.logz.io`). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

```shell
kubectl --namespace=kube-system create secret generic logzio-metrics-secret \
  --from-literal=logzio-metrics-shipping-token=<<SHIPPING-TOKEN>> \
  --from-literal=logzio-metrics-listener-host=<<LISTENER-HOST>>
```

##### Store your cluster details

Run the command below to save your cluster details as a Kubernetes secret. The command has placeholders that you'll need to replace with your own cluster information.

```shell
kubectl --namespace=kube-system create secret generic cluster-details \
--from-literal=kube-state-metrics-namespace=<<KUBE-STATE-METRICS-NAMESPACE>> \
--from-literal=kube-state-metrics-port=<<KUBE-STATE-METRICS-PORT>> \
--from-literal=cluster-name=<<CLUSTER-NAME>>
```

Replace the following placeholders in the command before running it:

* `<<KUBE-STATE-METRICS-NAMESPACE>>`
* `<<KUBE-STATE-METRICS-PORT>>`
* `<<CLUSTER-NAME>>`


##### Add the logzio-k8s-metrics repo to your helm repo list

```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm/metricbeat
```

##### Deploy

You have three options for deployment:

* [Standard configuration](#standard-config)
* [Autodiscover configuration](#autodiscover-config)
* [Custom configuration](#custom-config)



###### Deploy with standard configuration {#standard-config}

```shell
helm install --namespace=kube-system logzio-k8s-metrics logzio-helm/logzio-k8s-metrics
```

###### Deploy with Autodiscover configuration: {#autodiscover-config}

This Daemonset's default autodiscover configuration is [hints based](https://www.elastic.co/guide/en/beats/metricbeat/current/configuration-autodiscover-hints.html):

```shell
helm install --namespace=kube-system \
--set configType='autodiscover' \
logzio-k8s-metrics logzio-helm/logzio-k8s-metrics
```

For more information about Autodiscover, see [Kubernetes configuration](https://www.elastic.co/guide/en/beats/metricbeat/current/configuration-autodiscover.html#_kubernetes) and [autodiscover's appenders](https://www.elastic.co/guide/en/beats/metricbeat/current/configuration-autodiscover-advanced.html).

###### Deploy with custom configuration: {#custom-config}

```shell
helm install --namespace=kube-system \
--set configType='auto-custom' \
--set-file metricbeatConfig.autoCustomConfig=/path/to/your/config.yaml \
logzio-k8s-metrics logzio-helm/logzio-k8s-metrics
```

If you're using a custom config, please make sure that you're using a valid `.yaml` file in the following structure:

```
metricbeat.yml: |-
  metricbeat.config.modules:
    path: ${path.config}/modules.d/*.yml
    reload.enabled: false
  metricbeat.autodiscover:
    # your autodiscover config
    # ...

  processors:
    - add_cloud_metadata: ~
  fields:
    logzio_codec: json
    token: ${LOGZIO_METRICS_SHIPPING_TOKEN}
    cluster: ${CLUSTER_NAME}
    type: metricbeat
  fields_under_root: true
  ignore_older: 3hr
  output:
    logstash:
      hosts: ["${LOGZIO_METRICS_LISTENER_HOST}:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/SectigoRSADomainValidationSecureServerCA.crt']
```

{% include metric-shipping/open-dashboard.html title="Kubernetes" %}

</div>
</div>
<div id="configurations">

### To override values in a chart

When you don't want the default values, you can override them in the chart by using the `--set` flag and passing the configuration from the command line.

Specify each parameter argument in the format `--set key=value[,key=value]` immediately after the command `helm install`. For example, to set the `imageTag` and `terminationGracePeriodSeconds` values, run:

```shell
helm install --namespace=kube-system logzio-k8s-metrics logzio-helm/logzio-k8s-metrics \
  --set=imageTag=7.7.0,terminationGracePeriodSeconds=30
```

#### Configuration options

| Parameter | Description | Default |
|---|---|---|
| `image` | The Metricbeat Docker image. | `"docker.elastic.co/beats/metricbeat"` |
| `imageTag` | The Metricbeat Docker image tag. | `"7.9.1"` |
| `nameOverride` | Overrides the Chart name for resources. | `""` |
| `fullnameOverride` | Overrides the full name of the resources. | `"metricbeat"` |
| `apiVersions.ConfigMap` | API version of `configmap.yaml`. | `v1` |
| `apiVersions.Deployment` | API version of `deployment.yaml.` | `apps/v1` |
| `apiVersions.DaemonSet` | API version of `daemonset.yaml`. | `apps/v1` |
| `apiVersions.ServiceAccount` | API version of `serviceaccount.yaml`. | `v1` |
| `apiVersions.ClusterRole` | API version of `clusterrole.yaml`. | `rbac.authorization.k8s.io/v1beta1` |
| `apiVersions.ClusterRoleBinding` | API version of `clusterrolebinding.yaml`. | `rbac.authorization.k8s.io/v1beta1` |
| `shippingProtocol` | Shipping protocol. | `http` |
| `shippingPort` | Shipping port. | `10255` |
| `serviceAccount.create` | Specifies whether a service account should be created. | `true` |
| `serviceAccount.name` | Name of the service account. | `metricbeat` |
| `podSecurityContext` | Configurable [securityContext](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for Metricbeat DaemonSet and Deployment pod execution environment. | `{}` |
| `resources` | Sets the resources for both your Metricbeat DaemonSet and Deployment. | `{}` |
| `clusterRoleRules` | Configurable [cluster role rules](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole) that Metricbeat uses to access Kubernetes resources. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `managedServiceAccount` | Set to `true` to enable the option to manage the serviceAccount by the Helm chart. Otherwise, set to `false` to manage your own service account and related roles. | `true` |
| `secretMounts` | Mounts a secret as a file inside both your Metricbeat DaemonSet and Deployment. You can use it to mount certificates and other secrets. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `terminationGracePeriod` | In case of pod shutdown, the waiting period in seconds before killing the Metricbeat pod process. | `30` |
| `hostPathRoot` | Fully-qualified [hostPath](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath) that will be used to persist Metricbeat registry data. | `/var/lib` |
| `logzioCert` | Logzio public SSL certificate. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `metricbeatConfig` | Metricbeat configuration. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.extraVolumeMounts` | Templatable string of additional `volumeMounts` to be passed to the DaemonSet. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.extraVolumes` | Templatable string of additional `volumes` to be passed to the DaemonSet. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.metricbeatConfig` | Adds config files for your Metricbeat Daemonset from `/usr/share/metricbeat`. For example `metricbeat.yml`. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.securityContext` | Configurable [securityContext](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for Metricbeat DaemonSet pod execution environment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.resources` | Sets the resources for your Metricbeat deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.secretMounts` | Mounts a secret as a file inside the DaemonSet. You can use it to mount certificates and other secrets. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.sslVerificationMode` | Sets the SSL verification mode for Metricbeat. | `"none"` |
| `deployment.extraVolumeMounts` | Templatable string of additional volumeMounts to be passed to the deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.extraVolumes` | Templatable string of additional `volumes` to be passed to the deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.metricbeatConfig` | Adds config files for your Metricbeat deployment from `/usr/share/metricbeat`. For example `metricbeat.yml`.  | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.securityContext` | Configurable [securityContext](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for your Metricbeat deployment pod execution environment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.resources` | Sets the resources for your Metricbeat deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.secretMounts` | Mounts a secret as a file in the deployment. You can use it to mount certificates and other secrets. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `namespace` | Chart's namespace | `kube-system` |


</div>

<div id="uninstall">

#### To uninstall the chart

To uninstall the chart, run the following command to remove all k8s components associated with the Chart and delete the release.
For example, to uninstall the `logzio-k8s-metrics` deployment, run:

```shell
helm uninstall --namespace=kube-system logzio-k8s-metrics
```


</div>
</div>

