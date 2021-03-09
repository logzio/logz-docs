---
title: Ship k8s logs with Helm via Filebeat
logo:
  logofile: k8s-helm.svg
  orientation: horizontal
data-source: Kubernetes over Helm
templates: ["k8s-daemonset"]
open-source:
  - title: logzio-helm
    github-repo: logzio-helm
contributors:
  - mirii1994
  - shalper
shipping-tags:
  - container
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Standard configuration](#standard-config)
* [Autodiscover](#custom-config)
* [Configurations & Defaults](#configurations)
* [Multiline logs](#multiline)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

###### Overview

You can use a Helm chart to ship k8s logs to Logz.io via Filebeat.

Helm is a tool for managing packages of pre-configured Kubernetes resources using Charts.
Logzio-k8s-logs allows you to ship logs from your Kubernetes cluster to Logz.io.
You can either deploy this Daemonset with the standard Filebeat configuration or with Filebeat Autodiscover. (Learn more about [Filebeat Autodiscover](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover.html) from Elastic.)

Filebeat's basic configuration tends to split longer, multiline logs into multiple logs - 1 log per line. See the relevant tab for details and options for controlling this setting.

<!-- info-box-start:info -->
Helm 2 reached [EOL on November 2020](https://helm.sh/blog/2019-10-22-helm-2150-released/#:~:text=6%20months%20after%20Helm%203's,Helm%202%20will%20formally%20end). This document follows the command syntax recommended for Helm 3, but the Chart will work with both Helm 2 and Helm 3.
{:.info-box.note}
<!-- info-box-end -->

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="standard-config">

#### Standard configuration

**Before you begin, you'll need**:

* [Helm CLI](https://helm.sh/docs/intro/install/) installed
* Outgoing traffic to destination port 5015 allowed

<div class="tasklist">

##### Add logzio-k8s-logs repo to your helm repo list

```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm/filebeat
```

##### Deploy

Replace `<<LOG-SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.

Replace `<<LISTENER-REGION>>` with your region’s code (for example, `eu`). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

Replace `<<CLUSTER-NAME>>` with your cluster's name.

```shell
helm install --namespace=kube-system \
--set secrets.logzioShippingToken='<<LOG-SHIPPING-TOKEN>>' \
--set secrets.logzioRegion='<<LISTENER-REGION>>' \
--set secrets.clusterName='<<CLUSTER-NAME>>' \
logzio-k8s-logs logzio-helm/logzio-k8s-logs
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/).

</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="custom-config">

#### Autodiscover configuration

Autodiscover allows you to adapt settings as changes happen. By defining configuration templates, the autodiscover subsystem can monitor services as they start running.



<div class="tasklist">

##### Add logzio-k8s-logs repo to your helm repo list

```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm/filebeat
```

##### Deploy

In the following commands, make the following changes:

* Replace `<<LOG-SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.

* Replace `<<LISTENER-REGION>>` with your region’s code (for example, `eu`). For more information on finding your account’s region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

* Replace `<<CLUSTER-NAME>>` with your cluster's name.

This Daemonset's default autodiscover configuration is [hints based](https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover-hints.html). If you wish to deploy it use:

```shell
helm install --namespace=kube-system \
--set configType='autodiscover' \
--set secrets.logzioShippingToken='<<LOG-SHIPPING-TOKEN>>' \
--set secrets.logzioRegion='<<LISTENER-REGION>>' \
--set secrets.clusterName='<<CLUSTER-NAME>>' \
logzio-k8s-logs logzio-helm/logzio-k8s-logs
```

If you have a custom configuration, deploy with:

```shell
helm install --namespace=kube-system \
--set configType='auto-custom' \
--set secrets.logzioShippingToken='<<LOG-SHIPPING-TOKEN>>' \
--set secrets.logzioRegion='<<LISTENER-REGION>>' \
--set secrets.clusterName='<<CLUSTER-NAME>>' \
--set-file filebeatConfig.autoCustomConfig=/path/to/your/config.yaml \
logzio-k8s-logs logzio-helm/logzio-k8s-logs
```

If you're using a custom config, please make sure that you're using a `.yaml` file with the following structure:

```
filebeat.yml: |-
  filebeat.autodiscover:
  #....
    # your autodiscover config
    # ...
  processors:
    - add_cloud_metadata: ~
  fields:
    logzio_codec: ${LOGZIO_CODEC}
    token: ${LOGZIO_LOGS_SHIPPING_TOKEN}
    cluster: ${CLUSTER_NAME}
    type: ${LOGZIO_TYPE}
  fields_under_root: ${FIELDS_UNDER_ROOT}
  ignore_older: ${IGNORE_OLDER}
  output:
    logstash:
      hosts: ["${LOGZIO_LOGS_LISTENER_HOST}:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/SectigoRSADomainValidationSecureServerCA.crt']
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs,
see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

#### Uninstalling the Chart

The command removes all the k8s components associated with the chart and deletes the release.  
To uninstall the `logzio-k8s-logs` deployment:

```shell
helm uninstall --namespace=kube-system logzio-k8s-logs
```


</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="configurations">

### Changing a default

If you wish to change the default values, specify each parameter using the `--set key=value` argument to `helm install`. For example,

```shell
helm install --namespace=kube-system logzio-k8s-logs logzio-helm/logzio-k8s-logs \
  --set imageTag=7.7.0 \
  --set terminationGracePeriodSeconds=30
```


#### Configurations & defaults

| Parameter | Description | Default |
|---|---|---|
| `image` | The Filebeat docker image. | `docker.elastic.co/beats/filebeat` |
| `imageTag` | The Filebeat docker image tag. | `7.8.1` |
| `nameOverride` | Overrides the Chart name for resources. | `""` |
| `fullnameOverride` | Overrides the full name of the resources. | `filebeat` |
| `apiVersions.configMap` | ConfigMap API version. | `v1` |
| `apiVersions.daemonset` | Daemonset API version. | `apps/v1` |
| `apiVersions.clusterRoleBinding` | ClusterRoleBinding API version. | `rbac.authorization.k8s.io/v1` |
| `apiVersions.clusterRole` | ClusterRole API version. | `rbac.authorization.k8s.io/v1` |
| `apiVersions.serviceAccount` | ServiceAccount API version. | `v1` |
| `apiVersions.secret` | Secret API version. | `v1` |
| `namespace` | Chart's namespace. | `kube-system` |
| `managedServiceAccount` | Specifies whether the serviceAccount should be managed by this Helm Chart. Set this to `false` to manage your own service account and related roles. | `true` |
| `clusterRoleRules` | Configurable [cluster role rules](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole) that Filebeat uses to access Kubernetes resources. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/filebeat/values.yaml) |
| `logzioCert` | Logzio public SSL certificate. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/filebeat/values.yaml) |
| `configType` | Specifies which configuration to use for Filebeat. Set to `autodiscover` to use autodiscover. | `standard` |
| `filebeatConfig.standardConfig` | Standard Filebeat configuration, using `filebeat.input`. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/filebeat/values.yaml) |
| `filebeatConfig.autodiscoverConfig` | Autodiscover Filebeat configuration, using `filebeat.autodiscover`. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/filebeat/values.yaml) |
| `filebeatConfig.autoCustomConfig` | Autodiscover Filebeat custom configuration, using `filebeat.autodiscover`. Required when you're using your customized autodiscover config | {} |
| `serviceAccount.create` | Specifies whether a service account should be created. | `true` |
| `serviceAccount.name` | Name of the service account. | `filebeat` |
| `terminationGracePeriod` | Termination period (in seconds) to wait before killing Filebeat pod process on pod shutdown. | `30` |
| `hostNetwork` | Controls whether the pod may use the node network namespace. | `true` |
| `dnsPolicy` | Specifies pod-specific DNS policies. | `ClusterFirstWithHostNet` |
| `daemonset.ignoreOlder` | Logs older than this will be ignored. | `3h` |
| `daemonset.logzioCodec` | Set to `json` if shipping JSON logs. Otherwise, set to `plain`. | `json` |
| `daemonset.logzioType` | The log type you'll use with this Daemonset. This is shown in your logs under the `type` field in Kibana. Logz.io applies parsing based on type. | `filebeat` |
| `daemonset.fieldsUnderRoot` | If this option is set to true, the custom fields are stored as top-level fields in the output document instead of being grouped under a `fields` sub-dictionary. | `"true"` |
| `daemonset.securityContext` | Configurable [securityContext](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) for Filebeat DaemonSet pod execution environment. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/filebeat/values.yaml) |
| `daemonset.resources` | Sets the resources for Filebeat Daemonset. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/filebeat/values.yaml) |
| `daemonset.volumes` | Templatable string of additional `volumes` to be passed to the DaemonSet. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/filebeat/values.yaml) |
| `daemonset.volumeMounts` | Templatable string of additional `volumeMounts` to be passed to the DaemonSet. | See [values.yaml](https://github.com/logzio/logzio-helm/blob/master/filebeat/values.yaml) |
| `daemonset.tolerations` | Set [tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) for all DaemonSet pods. | `{}` |
| `secrets.logzioShippingToken`| Secret with your logzio shipping token. | `""` |
| `secrets.logzioRegion`| Secret with your [logzio region](https://docs.logz.io/user-guide/accounts/account-region.html). Defaults to US East. | `" "` |
| `secrets.clusterName`| Secret with your cluster name. | `""` |


</div>
<!-- tab:end -->



<!-- tab:start -->
<div id="multiline">

{% include /log-shipping/multiline-logs-filebeat.md %}

</div>
<!-- tab:end -->
</div>
<!-- tabContainer:end -->