---
title: Ship Kubernetes logs
logo:
  logofile: kubernetes.svg
  orientation: vertical
shipping-summary:
  data-source: Kubernetes
open-source:
  - title: logzio-k8s
    github-repo: logzio-k8s
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Kubernetes
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - container
---

<div class="branching-container">

{: .branching-tabs }
  * [Non-RBAC configuration](#non-rbac-config)
  * [RBAC configuration](#rbac-config)

<div id="non-rbac-config">

## Non-RBAC setup

For Kubernetes, a DaemonSet ensures that some or all nodes run a copy of a pod.
This implementation is uses a Fluentd DaemonSet to collect Kubernetes logs.
Fluentd is flexible enough and has the proper plugins to distribute logs to different third parties such as Logz.io.

The logzio-k8s image comes pre-configured for Fluentd to gather all logs from the Kubernetes node environment and append the proper metadata to the logs.

{: .tasklist .firstline-headline }
1. Build your DaemonSet configuration

    Paste the sample configuration file below into a local YAML file that you'll use to deploy the DaemonSet.

    For a complete list of options, see the environment variables below the code block.👇

    ```yaml
    apiVersion: extensions/v1beta1
    kind: DaemonSet
    metadata:
      name: fluentd-logzio
      namespace: kube-system
      labels:
        k8s-app: fluentd-logzio
        version: v1
        kubernetes.io/cluster-service: "true"
    spec:
      template:
        metadata:
          labels:
            k8s-app: fluentd-logzio
            version: v1
            kubernetes.io/cluster-service: "true"
        spec:
          tolerations:
          - key: node-role.kubernetes.io/master
            effect: NoSchedule
          containers:
          - name: fluentd
            image: logzio/logzio-k8s:latest
            env:
              - name:  LOGZIO_TOKEN
                value: <ACCOUNT-TOKEN>
              - name:  LOGZIO_URL
                value: https://<LISTENER-URL>:8071
            resources:
              limits:
                memory: 200Mi
              requests:
                cpu: 100m
                memory: 200Mi
            volumeMounts:
            - name: varlog
              mountPath: /var/log
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
          terminationGracePeriodSeconds: 30
          volumes:
          - name: varlog
            hostPath:
              path: /var/log
          - name: varlibdockercontainers
            hostPath:
              path: /var/lib/docker/containers
    ```

    Environment variables
    {: .inline-header }

    LOGZIO_TOKEN <span class="required-param"></span>
    : Your Logz.io account token.
      {% include log-shipping/replace-vars.html token=true %}
      <!-- logzio-inject:account-token -->

    LOGZIO_URL <span class="required-param"></span>
    : Logz.io listener URL to ship the logs to.
      {% include log-shipping/replace-vars.html listener=true %}

    FLUENTD_SYSTEMD_CONF <span class="default-param">Enabled</span>
    : If you don't setup systemd in the container, Fluentd ships `Systemd::JournalError` log messages.
      To suppress these message, set to `disable`.

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
    : Maximum size of a chunk allowed.

    buffer_queue_limit <span class="default-param">`6`</span>
    : Maximum length of the output queue.

    flush_interval <span class="default-param">`5s`</span>
    : Time to wait before invoking the next buffer flush, in seconds.

    max_retry_wait <span class="default-param">`30s`</span>
    : Maximum time to wait between retries, in seconds.

    num_threads <span class="default-param">`2`</span>
    : Number of threads to flush the buffer.

2. Deploy the DaemonSet

    Run this command to deploy the DaemonSet you created in step 1.

    ```shell
    kubectl create -f /path/to/daemonset/yaml/file
    ```

3. Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="rbac-config">

## RBAC setup

For Kubernetes, a DaemonSet ensures that some or all nodes run a copy of a pod.
This implementation is uses a Fluentd DaemonSet to collect Kubernetes logs.
Fluentd is flexible enough and has the proper plugins to distribute logs to different third parties such as Logz.io.

The logzio-k8s image comes pre-configured for Fluentd to gather all logs from the Kubernetes node environment and append the proper metadata to the logs.

{: .tasklist .firstline-headline }
1. Build your DaemonSet configuration

    Paste the sample configuration file below into a local YAML file that you'll use to deploy the DaemonSet.

    For a complete list of options, see the environment variables below the code block.👇

    ```yaml
    ---
    apiVersion: v1
    kind: ServiceAccount
    metadata:
      name: fluentd
      namespace: kube-system
    ---
    apiVersion: rbac.authorization.k8s.io/v1beta1
    kind: ClusterRole
    metadata:
      name: fluentd
      namespace: kube-system
    rules:
    - apiGroups:
      - ""
      resources:
      - pods
      - namespaces
      verbs:
      - get
      - list
      - watch
    ---
    kind: ClusterRoleBinding
    apiVersion: rbac.authorization.k8s.io/v1beta1
    metadata:
      name: fluentd
    roleRef:
      kind: ClusterRole
      name: fluentd
      apiGroup: rbac.authorization.k8s.io
    subjects:
    - kind: ServiceAccount
      name: fluentd
      namespace: kube-system
    ---
    apiVersion: extensions/v1beta1
    kind: DaemonSet
    metadata:
      name: fluentd-logzio
      namespace: kube-system
      labels:
        k8s-app: fluentd-logzio
        version: v1
        kubernetes.io/cluster-service: "true"
    spec:
      template:
        metadata:
          labels:
            k8s-app: fluentd-logzio
            version: v1
            kubernetes.io/cluster-service: "true"
        spec:
          serviceAccount: fluentd
          serviceAccountName: fluentd
          tolerations:
          - key: node-role.kubernetes.io/master
            effect: NoSchedule
          containers:
          - name: fluentd
            image: logzio/logzio-k8s:latest
            env:
              - name:  LOGZIO_TOKEN
                value: <ACCOUNT-TOKEN>
              - name:  LOGZIO_URL
                value: https://<LISTENER-URL>:8071
            resources:
              limits:
                memory: 200Mi
              requests:
                cpu: 100m
                memory: 200Mi
            volumeMounts:
            - name: varlog
              mountPath: /var/log
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
          terminationGracePeriodSeconds: 30
          volumes:
          - name: varlog
            hostPath:
              path: /var/log
          - name: varlibdockercontainers
            hostPath:
              path: /var/lib/docker/containers
    ```

    Environment variables
    {: .inline-header }

    LOGZIO_TOKEN <span class="required-param"></span>
    : Your Logz.io account token.
      {% include log-shipping/replace-vars.html token=true %}
      <!-- logzio-inject:account-token -->

    LOGZIO_URL <span class="required-param"></span>
    : Logz.io listener URL to ship the logs to.
      {% include log-shipping/replace-vars.html listener=true %}

    FLUENTD_SYSTEMD_CONF <span class="default-param">Enabled</span>
    : If you don't setup systemd in the container, Fluentd ships `Systemd::JournalError` log messages.
      To suppress these message, set to `disable`.

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
    : Maximum size of a chunk allowed.

    buffer_queue_limit <span class="default-param">`6`</span>
    : Maximum length of the output queue.

    flush_interval <span class="default-param">`5s`</span>
    : Time to wait before invoking the next buffer flush, in seconds.

    max_retry_wait <span class="default-param">`30s`</span>
    : Maximum time to wait between retries, in seconds.

    num_threads <span class="default-param">`2`</span>
    : Number of threads to flush the buffer.

2. Deploy the DaemonSet

    Run this command to deploy the DaemonSet you created in step 1.

    ```shell
    kubectl create -f /path/to/daemonset/yaml/file
    ```

3. Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>

