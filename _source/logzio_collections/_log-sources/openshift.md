---
title: Ship Openshift logs
logo:
  logofile: openshift.png
  orientation: vertical
data-source: OpenShift
data-for-product-source: Logs
open-source:
  - title: logzio-openshift
    github-repo: logzio-openshift
contributors:
  - nshishkin
shipping-tags:
  - container
  - popular
order: 10
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Default configuration](#default)
* [Custom configuration](#custom)
{:.branching-tabs}

<!-- tab:start -->
<div id="default">

Deploy this integration to ship logs from your OpenShift cluster to Logz.io. This integration will deploy the default daemonset, which sends only container logs while ignoring all containers with "openshift" namespace.

**Before you begin, you'll need**:

* Working Openshift cluster
* Openshift CLI (oc) installed on your machine

<div class="tasklist">

##### Create monitoring namespace

```shell
oc create namespace monitoring
```

##### Store your Logz.io credentials

```shell
oc create secret generic logzio-logs-secret \
  --from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
  --from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
  -n monitoring
```
{% include log-shipping/log-shipping-token.md %}
{% include log-shipping/listener-var.html %} 

##### Deploy the resources

```shell
oc create -f https://raw.githubusercontent.com/logzio/logzio-openshift/main/resources.yaml \
&& oc adm policy add-scc-to-user privileged -z fluentd \
&& oc delete pod -l k8s-app=fluentd-logzio
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


</div>

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="custom">

Deploy this integration to ship logs from your OpenShift cluster to Logz.io. This integration will deploy the daemonset with your custom configuration.

**Before you begin, you'll need**:

* Working Openshift cluster
* Openshift CLI (oc) installed on your machine

<div class="tasklist">

##### Create monitoring namespace

```shell
oc create namespace monitoring
```

##### Store your Logz.io credentials

```shell
oc create secret generic logzio-logs-secret \
  --from-literal=logzio-log-shipping-token='<<LOG-SHIPPING-TOKEN>>' \
  --from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
  -n monitoring
```
{% include log-shipping/log-shipping-token.md %}
{% include log-shipping/listener-var.html %} 

##### Download the resources file

Download the [resouces file](https://raw.githubusercontent.com/logzio/logzio-openshift/main/resources.yaml) from our repository.

##### Add environment variables to the resources file

In the resources file, go to the Daemonset section and edit the following environment variables:

| Parameter | Description |
|---|---|
| output_include_time | **Default**: `true` <br>  To append a timestamp to your logs when they're processed, `true`. Otherwise, `false`. |
| LOGZIO_BUFFER_TYPE | **Default**: `file` <br>  Specifies which plugin to use as the backend. |
| LOGZIO_BUFFER_PATH | **Default**: `/var/log/Fluentd-buffers/stackdriver.buffer` <br>  Path of the buffer. |
| LOGZIO_OVERFLOW_ACTION | **Default**: `block` <br>  Controls the behavior when the queue becomes full. |
| LOGZIO_CHUNK_LIMIT_SIZE | **Default**: `2M` <br>  Maximum size of a chunk allowed |
| LOGZIO_QUEUE_LIMIT_LENGTH | **Default**: `6` <br>  Maximum length of the output queue. |
| LOGZIO_FLUSH_INTERVAL | **Default**: `5s` <br>  Interval, in seconds, to wait before invoking the next buffer flush. |
| LOGZIO_RETRY_MAX_INTERVAL | **Default**: `30s` <br>  Maximum interval, in seconds, to wait between retries. |
| LOGZIO_FLUSH_THREAD_COUNT | **Default**: `2` <br>  Number of threads to flush the buffer. |
| LOGZIO_LOG_LEVEL | **Default**: `info` <br> The log level for this container. |
| INCLUDE_NAMESPACE | **Default**: `""`(All namespaces) <br> Use if you wish to send logs from specific k8s namespaces, space delimited. Should be in the following format: <br> `kubernetes.var.log.containers.**_<<NAMESPACE-TO-INCLUDE>>_** kubernetes.var.log.containers.**_<<ANOTHER-NAMESPACE>>_**`. |

<!-- info-box-start:info -->
The above variables can be edited directly in the DaemonSet without the Configmap.
{:.info-box.read}
<!-- info-box-end -->

##### Add additional configuration in the Configmap

If you wish to make any further configuration changes, go to the ConfigMap section of the file and make the changes that you need.


##### Deploy the resources

```shell
oc create -f /path/to/your/resources.yaml \
&& oc adm policy add-scc-to-user privileged -z fluentd \
&& oc delete pod -l k8s-app=fluentd-logzio
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


</div>

</div>
<!-- tab:end -->



