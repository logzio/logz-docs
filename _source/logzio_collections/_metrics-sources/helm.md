---
title: Ship Kubernetes metrics with HELM
logo:
  logofile: helm-icon-color.png
  orientation: vertical
data-source: Helm
templates: ["no-template","no-template"]
open-source:
  - title: Helm Metrics Collector
    github-repo: logzio-helm
contributors:
  - mirii1994
  - shalper
  - moshekruger
shipping-tags:
  - container
---
Helm is a tool for managing packages of pre-configured Kubernetes resources, known as Charts.
Logzio-k8s-metrics allows you to ship metrics from your Kubernetes cluster.

**Before you begin, you'll need**:

* [Helm CLI](https://helm.sh/docs/intro/install/) installed,
[kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) installed, and allow outgoing traffic to destination port 5015,
* Kubelet read-only-port 10255 enabled. Kubelet read-only-port 10255 is enabled by default on some cluster versions. If it isn’t enabled, follow Kubernetes’s instructions for enabling 10255 as a read-only-port in Kubelet’s config file


<div class="branching-container">
* [Default configuration _recommended_](#default-config)
* [Custom configuration](#custom-config)
* [Advanced options](#configurations)
{:.branching-tabs}

<div id="default-config">

#### Automatic deployment

This is the simplest method of deployment but it doesn't offer advanced configuration options.

<div class="tasklist">

##### Run the automated deployment script

```shell
bash <(curl -s https://raw.githubusercontent.com/logzio/logzio-helm/master/quickstart-metrics.sh)
```

##### Add the configuration

Follow through the system's prompts and provide the requested parameters.

| Prompt | Answer |
|---|---|
| Logz.io metrics shipping token (Required) | The [token](https://app.logz.io/#/dashboard/settings/manage-accounts) of the account you want to ship to. |
| Logz.io region (Default: `Blank (US East)`) | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you’re shipping the logs to) and API URL. You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. |
| Cluster name (Default: `detected by the script` | Name of the Kubernetes cluster in which you are deploying. |

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/).


### To uninstall the Chart

Run the following command to remove all k8s components associated with the Chart and delete the release.
For example, to uninstall the `logzio-k8s-metrics` deployment, run:

```shell
helm uninstall --namespace=kube-system logzio-k8s-metrics
```

</div>
<!-- tab:end -->
</div>

<div id="custom-config">

#### Manual deployment

This method of deployment gives you greater control over the configuration.

<div class="tasklist">

##### Add your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

Replace `<<SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/manage-accounts) of the account you want to ship to.

Replace `<<LISTENER-HOST>>` with your region’s listener host (for example, `listener.logz.io`). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

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

```shell
helm install --namespace=kube-system logzio-k8s-metrics logzio-helm/logzio-k8s-metrics
```

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/).

### To uninstall the Chart

Run the following command to remove all k8s components associated with the Chart and delete the release.
For example, to uninstall the `logzio-k8s-metrics` deployment, run:

```shell
helm uninstall --namespace=kube-system logzio-k8s-metrics
```

</div>
</div>

<div id="configurations">

If you want to change the default values, specify each parameter argument in the format `--set key=value[,key=value]` immediately after the command `helm install`. For example, to set the `imageTag` and `terminationGracePeriodSeconds`, run:

```shell
helm install --namespace=kube-system logzio-k8s-metrics logzio-helm/logzio-k8s-metrics \
  --set=imageTag=7.7.0,terminationGracePeriodSeconds=30
```

#### Configuration options

| Parameter | Description | Default |
|---|---|---|
| `image` | The Metricbeat Docker image. | `"docker.elastic.co/beats/metricbeat"` |
| `imageTag` | The Metricbeat Docker image tag. | `"7.3.2"` |
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
| `resources` | Allows you to set the resources for both Metricbeat DaemonSet and Deployment. | `{}` |
| `clusterRoleRules` | Configurable [cluster role rules](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole) that Metricbeat uses to access Kubernetes resources. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml)..... |
| `managedServiceAccount` | Specifies whether the serviceAccount should be managed by this helm Chart. Set this to false to manage your own service account and related roles. | `true` |
| `secretMounts` | Allows you to easily mount a secret as a file inside DaemonSet and Deployment. Useful for mounting certificates and other secrets. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `terminationGracePeriod` | Termination period (in seconds) to wait before killing Metricbeat pod process on pod shutdown. | `30` |
| `hostPathRoot` | Fully-qualified [hostPath](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath) that will be used to persist Metricbeat registry data. | `/var/lib` |
| `logzioCert` | Logzio public SSL certificate. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `metricbeatConfig` | Metricbeat configuration. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.extraVolumeMounts` | Templatable string of additional `volumeMounts` to be passed to the DaemonSet. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.extraVolumes` | Templatable string of additional `volumes` to be passed to the DaemonSet. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.metricbeatConfig` | Allows you to add any config files in `/usr/share/metricbeat` such as `metricbeat.yml` for Metricbeat Daemonset. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.securityContext` | Configurable [securityContext](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for Metricbeat DaemonSet pod execution environment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.resources` | Allows you to set the resources for Metricbeat Deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `daemonset.secretMounts` | Allows you to easily mount a secret as a file inside the DaemonSet. Useful for mounting certificates and other secrets. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.extraVolumeMounts` | Templatable string of additional volumeMounts to be passed to the Deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.extraVolumes` | Templatable string of additional `volumes` to be passed to the Deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.metricbeatConfig` | Allows you to add any config files in `/usr/share/metricbeat` such as `metricbeat.yml` for Metricbeat Deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.securityContext` | Configurable [securityContext](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for Metricbeat Deployment pod execution environment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.resources` | Allows you to set the resources for Metricbeat Deployment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `deployment.secretMounts` | Allows you to easily mount a secret as a file inside the Deployment Useful for mounting certificates and other secrets. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/metricbeat/values.yaml). |
| `namespace` | Chart's namespace | `kube-system` |


</div>
</div>
