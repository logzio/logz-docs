---
title: Ship Kubernetes logs using a Fluentd DaemonSet
logo:
  logofile: k8s-fluentd.svg
  orientation: horizontal
data-source: Fluentd DaemonSet for Kubernetes
templates: ["k8s-daemonset"]
open-source:
  - title: logzio-k8s
    github-repo: logzio-k8s
contributors:
  - mirii1994
  - idohalevi
  - imnotashrimp
  - yyyogev
  - shalper
shipping-tags:
  - container
---



<div class="branching-container">

* [Overview](#overview)
* [Default configuration](#default-config)
* [Custom configuration](#custom-config)
* [Disabling systemd input](#disable)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Fluentd is an open source data collector. This implementation uses a Fluentd DaemonSet to collect Kubernetes logs and send them to Logz.io. The Kubernetes DaemonSet ensures that some or all nodes run a copy of a pod.

The image used in this integration comes pre-configured for Fluentd to gather all logs from the Kubernetes node environment and append the proper metadata to the logs. If you prefer to customize your Fluentd configuration, you can edit it before it's deployed.

The latest version pulls the image from `logzio/logzio-fluentd`. Previous versions pulled the image from `logzio/logzio-k8s`.
{:.info-box.note}

###### K8S version compatibility

This integration supports most versions of K8S.

* **K8S 1.19.3+** - If you're running on K8S 1.19.3+ or later, use the Daemonset that supports a containerd at runtime. It can be customized from `logzio-daemonset-containerd.yaml`.

* If you're running on K8S 1.17 or earlier, you may need to manually change the API version for some components. The API version of `ClusterRole` and `ClusterRoleBinding` in `logzio-daemonset-rbac.yaml` and `logzio-daemonset-containerd.yaml` is `v1`, since `v1beta1` was deprecated as of k8s 1.17.

To make the change in your DaemonSet, look for `apiVersion: rbac.authorization.k8s.io/v1beta1`
apiVersion: rbac.authorization.k8s.io/v1


Customize the Fluentd configuration with the parameters shown below.

The default 
This integration assumes you're running

* The API version of `ClusterRole` and `ClusterRoleBinding` in `logzio-daemonset-rbac.yaml` and `logzio-daemonset-containerd.yaml` is `v1`, since `v1beta1` was deprecated as of k8s 1.17. If you're running on an earlier k8s version, you may need to manually change the API version for those components.


</div>
<!-- tab:end -->
<!-- tab:start -->
<div id="default-config">

## Deploy logzio-k8s with default configuration

For most environments, we recommend using the default configuration.
However, you can deploy a custom configuration if your environment needs it.

#### Deploy Fluentd as a DaemonSet on Kubernetes

<div class="tasklist">


##### Create a monitoring namespace

Your Daemonset will be deployed under the namespace `monitoring`.


```shell
kubectl create namespace monitoring
```


##### Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

```shell
kubectl create secret generic logzio-logs-secret \
  --from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
  --from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
  -n monitoring
```

##### Deploy the DaemonSet

###### For an RBAC cluster:

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-rbac.yaml -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/configmap.yaml
```

###### For a non-RBAC cluster:

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset.yaml -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/configmap.yaml
```

###### For container runtime Containerd:

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-containerd.yaml -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/configmap.yaml
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs,
see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="custom-config">

## Deploy logzio-k8s with custom configuration

You can customize the configuration of your Fluentd container by editing either your DaemonSet or your Configmap.


<div class="tasklist">

##### Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.


```shell
kubectl create secret generic logzio-logs-secret \
  --from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
  --from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
  -n kube-system
```

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %}


##### Configure Fluentd

There are 3 DaemonSet options: [RBAC DaemonSet](https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-rbac.yaml), [non-RBAC DaemonSet](https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset.yaml), [Containerd](https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-containerd.yaml). Download the relevant DaemonSet and open it in your text editor to edit it.

If you wish to make advanced changes in your Fluentd configuration, you can download and edit the [configmap yaml file](https://raw.githubusercontent.com/logzio/logzio-k8s/master/configmap.yaml).


{% include k8s-fluentd.md %}

###### Good to know

* If `FLUENT_FILTER_KUBERNETES_URL` is not specified, the environment variables `KUBERNETES_SERVICE_HOST` and `KUBERNETES_SERVICE_PORT` will be used, as long as both of them are  present. Typically, they are present when running Fluentd in a pod.

* Note that `FLUENT_FILTER_KUBERNETES_URL` does not appear in the default environment variable list in the Daemonset.
If you wish to use this variable, you'll have to add it manually to the Daemonset's environment variables.


##### Deploy the DaemonSet

###### For the RBAC DaemonSet:

```shell
kubectl apply -f /path/to/logzio-daemonset-rbac.yaml -f /path/to/configmap.yaml
```

###### For the non-RBAC DaemonSet:

```shell
kubectl apply -f /path/to/logzio-daemonset.yaml -f /path/to/configmap.yaml
```

###### For container runtime Containerd:

```shell
kubectl apply -f /path/to/logzio-daemonset-containerd.yaml -f /path/to/configmap.yaml
```



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs,
see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="disable">

### Disabling systemd input

To suppress Fluentd system messages, set the `FLUENTD_SYSTEMD_CONF` environment variable to `disable` in your Kubernetes environment.

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->


