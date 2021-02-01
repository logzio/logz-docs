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

##### Create a monitoring namespace

Your Daemonset will be deployed under the namespace `monitoring`.


```shell
kubectl create namespace monitoring
```



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
-n monitoring
```

##### Deploy the DaemonSet
Run:

```shell
kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-containerd.yaml -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/configmap.yaml
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

You can customize the configuration of your Fluentd container by editing either your DaemonSet or your Configmap.


#### To deploy logzio-k8s

<div class="tasklist">


##### Create a monitoring namespace

Your Daemonset will be deployed under the namespace `monitoring`.


```shell
kubectl create namespace monitoring
```


#####  Store your Logz.io credentials

Save your Logz.io shipping credentials as a Kubernetes secret.


```shell
kubectl create secret generic logzio-logs-secret \
--from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
--from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
-n monitoring
```


{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

##### Configure Fluentd

Download Logz.io's [Containerd Daemonset](https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-containerd.yaml) and open it in your text editor to edit it.

If you wish to make advanced changes in your Fluentd configuration, you can download and edit the [configmap yaml file](https://raw.githubusercontent.com/logzio/logzio-k8s/master/configmap.yaml).


{% include k8s-fluentd.md %}


##### Deploy the DaemonSet

Run:

```shell
kubectl apply -f <<path>>/logzio-daemonset-containerd.yaml -f <<path>>/configmap.yaml
```

Replace `<<path>>` with the paths to your `logzio-daemonset-containerd.yaml` and `configmap.yaml` files.


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
