---
title: Ship IKS logs
logo:
  logofile: iks.png
  orientation: vertical
data-source: IBM Cloud Kubernetes Service
templates: ["k8s-daemonset"]
open-source:
  - title: logzio-k8s
    github-repo: logzio-k8s
contributors:
  - mirii1994
  - shalper
shipping-tags:
  - container
---

The logzio-k8s image comes pre-configured for Fluentd to gather all logs from the Kubernetes node environment and append the proper metadata to the logs.

A DaemonSet ensures that some or all Kubernetes nodes run a copy of a pod.
This implementation uses a Fluentd DaemonSet to collect Kubernetes logs and send them to Logz.io.
Fluentd is a great option because it is flexible enough and has the right plugins to distribute logs to Logz.io and other third-party apps.

<div class="branching-container">

* [Default configuration <span class="sm ital">(recommended)</span>](#default-config)
* [Custom configuration](#custom-config)
{:.branching-tabs}

<div id="default-config">

For most environments, deploying logzio-k8s with the default configuration is recommended.
If your environment requires a custom configuration, follow the steps for deploying a custom configuration.


#### To deploy logzio-k8s

<div class="tasklist">

##### Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

Replace `<<LOG-SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.

Replace `<<LISTENER-HOST>>` with your region's listener host (for example, `listener.logz.io`).
For more information on finding your account's region,
see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

```shell
kubectl create secret generic logzio-logs-secret \
--from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
--from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
-n kube-system
```

##### Deploy the DaemonSet
Run:

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-containerd.yaml
```

#####  Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs,
see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).




</div>
</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="custom-config">

You can deploy logzio-k8s with a custom configuration by customizing the Fluentd container configuration.
This is done using a ConfigMap that overwrites the default DaemonSet.

#### To deploy logzio-k8s

<div class="tasklist">

#####  Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.

Replace `<<LOG-SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to. 


Replace `<<LISTENER-HOST>>` with your region's listener host (for example, `listener.logz.io`).
For more information on finding your account's region,
see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).

```shell
kubectl create secret generic logzio-logs-secret \
--from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
--from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
-n kube-system
```

##### Configure Fluentd

Download Logz.io's [Containerd Daemonset](https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-containerd.yaml).


Open the file in your text editor and customize the integration environment variables. The available parameters and their defaults are shown below.

###### Parameters

| Parameter | Description | Default |
|---|---|---|
| output_include_time | To append a timestamp to your logs when they're processed, `true`. Otherwise, `false`. | `true` |
| LOGZIO_BUFFER_TYPE | Specifies which plugin to use as the backend. | `file` |
| LOGZIO_BUFFER_PATH | Path of the buffer. | `/var/log/Fluentd-buffers/stackdriver.buffer` |
| LOGZIO_OVERFLOW_ACTION | Controls the behavior when the queue becomes full. | `block` |
| LOGZIO_CHUNK_LIMIT_SIZE | Maximum size of a chunk allowed | `2M` |
| LOGZIO_QUEUE_LIMIT_LENGTH | Maximum length of the output queue. | `6` |
| LOGZIO_FLUSH_INTERVAL | Interval, in seconds, to wait before invoking the next buffer flush. | `5s` |
| LOGZIO_RETRY_MAX_INTERVAL | Maximum interval, in seconds, to wait between retries. | `30s` |
| LOGZIO_FLUSH_THREAD_COUNT | Number of threads to flush the buffer. | `2` |
| LOGZIO_LOG_LEVEL | The log level for this container. | `info` |



##### Deploy the DaemonSet

Run:

```shell
kubectl apply -f /path/to/logzio-daemonset-containerd.yaml
```

#####  Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs,
see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).


### Disabling systemd input

To suppress Fluentd system messages, set the environment variable `FLUENTD_SYSTEMD_CONF` to `disable` in your Kubernetes environment.

### Disabling Prometheus input plugins

By default, the latest images launch `prometheus` plugins to monitor Fluentd.
If you'd like to disable the Prometheus input plugin, set the environment variable `FLUENTD_PROMETHEUS_CONF` to `disable` in your Kubernetes configuration.

</div>
</div>
<!-- tab:end -->
