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
  - idohalevi
  - imnotashrimp
  - yyyogev
  - mirii1994
shipping-tags:
  - container
---

Fluentd is an Open Source data collector that can be used to forward logs to Logz.io.

This implementation uses a Fluentd DaemonSet to collect Kubernetes logs and send them to Logz.io. The Kubernetes DaemonSet ensures that some or all nodes run a copy of a pod.

The logzio-k8s image comes pre-configured for Fluentd to gather all logs from the Kubernetes node environment and append the proper metadata to the logs.

<div class="branching-container">

* [Default configuration <span class="sm ital">(recommended)</span>](#default-config)
* [Custom configuration](#custom-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="default-config">

## Deploy logzio-k8s with default configuration

For most environments, we recommend using the default configuration.
However, you can deploy a custom configuration if your environment needs it.

#### Deploy Fluentd as a DaemonSet on Kubernetes

<div class="tasklist">

##### Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

{% include log-shipping/replace-vars.html token=true %}

{% include log-shipping/replace-vars.html listener=true %}

```shell
kubectl create secret generic logzio-logs-secret \
  --from-literal=logzio-log-shipping-token='<<SHIPPING-TOKEN>>' \
  --from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
  -n kube-system
```

##### Deploy the DaemonSet

For an RBAC cluster:

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-rbac.yaml
```

Or for a non-RBAC cluster:

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset.yaml
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

You can customize the configuration of the Fluentd container.
This is done using a ConfigMap that overwrites the default DaemonSet.

<div class="tasklist">

##### Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

{% include log-shipping/replace-vars.html token=true listener=true %}

```shell
kubectl create secret generic logzio-logs-secret \
  --from-literal=logzio-log-shipping-token='<<SHIPPING-TOKEN>>' \
  --from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
  -n kube-system
```

##### Configure Fluentd

Download either
the [RBAC DaemonSet](https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-rbac.yaml)
or the [non-RBAC DaemonSet](https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset.yaml)
and open the file in your text editor.

Customize the Fluentd configuration with the parameters shown below.
The Fluentd configuration is below the `fluent.conf: |-` line, at the bottom of the file.

###### Parameters

| Parameter | Description |
|---|---|
| output_include_time <span class="default-param">`true`</span> | To append a timestamp to your logs when they're processed, `true`. Otherwise, `false`. |
| buffer_type <span class="default-param">`file`</span> | Specifies which plugin to use as the backend. |
| buffer_path <span class="default-param">`/var/log/Fluentd-buffers/stackdriver.buffer`</span> | Path of the buffer. |
| buffer_queue_full_action <span class="default-param">`block`</span> | Controls the behavior when the queue becomes full. |
| buffer_chunk_limit <span class="default-param">`2M`</span> | Maximum size of a chunk allowed. |
| buffer_queue_limit <span class="default-param">`6`</span> | Maximum length of the output queue. |
| flush_interval <span class="default-param">`5s`</span> | Interval, in seconds, to wait before invoking the next buffer flush. |
| max_retry_wait <span class="default-param">`30s`</span> | Maximum interval, in seconds, to wait between retries. |
| num_threads <span class="default-param">`2`</span> | Number of threads to flush the buffer. |
| INCLUDE_NAMESPACE | <span class="default-param">`""`(All namespaces)</span> | Sends logs from all namespaces by default. To send logs from specific k8s namespaces, specify them in the following format, space delimited: <br> `kubernetes.var.log.containers.**_<<NAMESPACE-TO-INCLUDE>>_** kubernetes.var.log.containers.**_<<ANOTHER-NAMESPACE>>_**`. |
| KUBERNETES_VERIFY_SSL | <span class="default-param"> `true`</span> | validate SSL certificates. |
| FLUENT_FILTER_KUBERNETES_URL | <span class="default-param"> `nil` </span> (doesn't appear in the pre-made damonset) | URL to the API server. Set this to retrieve further kubernetes metadata for logs from kubernetes API server. If not specified, environment variables `KUBERNETES_SERVICE_HOST` and `KUBERNETES_SERVICE_PORT` will be used if both are present which is typically true when running fluentd in a pod. <br> **Please note** that this parameter does NOT appear in the pre-made environment variable list in the Daemonset. If you wish to use & set this variable, you'll have to add it to the Daemonset's environment variables. |
{:.paramlist}

##### Deploy the DaemonSet

For the RBAC DaemonSet:

```shell
kubectl apply -f /path/to/logzio-daemonset-rbac.yaml
```

For the non-RBAC DaemonSet:

```shell
kubectl apply -f /path/to/logzio-daemonset.yaml
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs,
see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->

### Disabling systemd input {#disable-input}

To suppress Fluentd system messages, set the `FLUENTD_SYSTEMD_CONF` environment variable to `disable` in your Kubernetes environment.
