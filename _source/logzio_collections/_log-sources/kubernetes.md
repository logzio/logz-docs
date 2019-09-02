---
title: Ship Kubernetes logs
logo:
  logofile: kubernetes.svg
  orientation: vertical
data-source: Kubernetes
open-source:
  - title: logzio-k8s
    github-repo: logzio-k8s
contributors:
  - idohalevi
  - imnotashrimp
  - yyyogev
shipping-tags:
  - container
---

For Kubernetes, a DaemonSet ensures that some or all nodes run a copy of a pod.
This implementation is uses a Fluentd DaemonSet to collect Kubernetes logs.
Fluentd is flexible enough and has the proper plugins to distribute logs to different third parties such as Logz.io.

The logzio-k8s image comes pre-configured for Fluentd to gather all logs from the Kubernetes node environment and append the proper metadata to the logs.

<div class="branching-container">

* [Default configuration <span class="sm ital">(recommended)</span>](#default-config)
* [Custom configuration](#custom-config)
{: .branching-tabs }

<!-- tab:start -->
<div id="default-config">

## Deploy logzio-k8s with default configuration

For most environments, we recommend using the default configuration.
However, you can deploy a [custom configuration](#custom-config) if your environment needs it.

###### To deploy logzio-k8s

1.  Store your Logz.io credentials

    Save your Logz.io shipping credentials as a Kubernetes secret.

    {% include log-shipping/replace-vars.html token=true listener=true %}

    ```shell
    kubectl create secret generic logzio-logs-secret \
      --from-literal=logzio-log-shipping-token='<<ACCOUNT-TOKEN>>' \
      --from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
      -n kube-system
    ```

2.  Deploy the DaemonSet

    For an RBAC cluster:

    ```shell
    kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset-rbac.yaml
    ```

    Or for a non-RBAC cluster:

    ```shell
    kubectl apply -f https://raw.githubusercontent.com/logzio/logzio-k8s/master/logzio-daemonset.yaml
    ```

3.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours,
    and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs,
    see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="custom-config">

## Deploy logzio-k8s with custom configuration

You can customize the configuration of the Fluentd container.
This is done using a ConfigMap that overwrites the default DaemonSet.

###### To deploy logzio-k8s

1.  Store your Logz.io credentials

    Save your Logz.io shipping credentials as a Kubernetes secret.

    {% include log-shipping/replace-vars.html token=true listener=true %}

    ```shell
    kubectl create secret generic logzio-logs-secret \
      --from-literal=logzio-log-shipping-token='<<ACCOUNT-TOKEN>>' \
      --from-literal=logzio-log-listener='https://<<LISTENER-HOST>>:8071' \
      -n kube-system
    ```

2.  Download the ConfigMap

    Download `k8s-fluentd-custom.yaml` from [https://raw.githubusercontent.com/logzio/logzio-k8s/master/k8s-fluentd-custom.yaml]()
    and open the file in your text editor.

3.  Add the Fluentd configuration

    Delete `<<REPLACE_WITH_FLUENT_CONF>>`.
    Paste the contents `fluent.conf`
    from [https://raw.githubusercontent.com/logzio/logzio-k8s/master/conf/fluent.conf]().

    Indent the pasted contents at least 2 spaces past `fluent.conf: |-`.
    {:.info-box.important}

    Customize the Fluentd configuration with these parameters. 👇

    Parameters
    {:.inline-header}

    output_include_time <span class="default-param">`true`</span>
    : To append a timestamp to your logs when they're processed, `true`.
      Otherwise, `false`.

    buffer_type <span class="default-param">`file`</span>
    : Specifies which plugin to use as the backend.

    buffer_path <span class="default-param">`/var/log/Fluentd-buffers/stackdriver.buffer`</span>
    : Path of the buffer.

    buffer_queue_full_action <span class="default-param">`block`</span>
    : Controls the behavior when the queue becomes full.

    buffer_chunk_limit <span class="default-param">`2M`</span>
    : Maximum size of a chunk allowed

    buffer_queue_limit <span class="default-param">`6`</span>
    : Maximum length of the output queue.

    flush_interval <span class="default-param">`5s`</span>
    : Interval, in seconds, to wait before invoking the next buffer flush.

    max_retry_wait <span class="default-param">`30s`</span>
    : Maximum interval, in seconds, to wait between retries.

    num_threads <span class="default-param">`2`</span>
    : Number of threads to flush the buffer.

4.  Deploy the DaemonSet

    ```shell
    kubectl apply -f /path/to/k8s-fluentd-custom.yaml
    ```

5.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours,
    and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs,
    see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.inline-headline}

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->

## Disabling systemd input

To suppress Fluentd system messages, set the `FLUENTD_SYSTEMD_CONF` environment variable to `disable` in your Kubernetes environment.
