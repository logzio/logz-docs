This section contains some guidelines for handling errors that you may encounter when trying to collect Kubermetes metrics.

## Problem: Permanent error - context deadline exceeded

The following error appears:

```shell
Permanent error: Post \"https://<<LISTENER-HOST>>:8053\": context deadline exceeded
```

This means the post request timeout, which may be caused by:

* A connectivity issue.
* A service exposing the metrics needing more time to send the response to the OpenTelemetry collector.


### Possible cause - Incorrect listener and/or token

You may be using incorrect listener and/or token.

#### Suggested remedy

Check that the listener and token of your account are correct. You can view them in the [manage accounts section](https://app.logz.io/#/dashboard/settings/manage-accounts).


### Possible cause - Incorrect username and/or password for Windows nodes

You may be using incorrect username and/or password for Windows nodes.

#### Suggested remedy

Ensure the username and password to Windows nodes are correct.

### Possible cause - The version of the helm chart is not up to date

The helm chart version that you are using may have expired.

#### Suggested remedy

Update the helm chart by running:

```shell
helm repo update
```

### Possible cause - The timeout in prometheusremotewrite exporter

The `timeout` setting in the `prometheusremotewrite` exporter is too short.

#### Suggested remedy

Increase the `timeout` setting in the `prometheusremotewrite` exporter.

For example, if our timeout setting is `5s`:

```yaml
endpoint: ${LISTENER_URL}
      timeout: 5s
      external_labels:
        p8s_logzio_name: ${P8S_LOGZIO_NAME}
      headers:
        Authorization: "Bearer ${METRICS_TOKEN}"

```

You can increase it to `20s`:

```yaml
endpoint: ${LISTENER_URL}
      timeout: 20s
      external_labels:
        p8s_logzio_name: ${P8S_LOGZIO_NAME}
      headers:
        Authorization: "Bearer ${METRICS_TOKEN}"

```

## Problem: Permanent error - log state shows as waiting

The log shows the following:

```yaml
State: Waiting
Reason: CrashLoopBackOff
Last State: Terminated
Reason: OOMKilled
Exit Code: 137
```


### Possible cause 

Insufficient memory allocated to the pod.

#### Suggested remedy

In `values.yaml`, increase the memory of the `standaloneCollector` resources by approximately `100Mi`.

For example, if you are using `512Mi`:

```yaml
standaloneCollector:
  enabled: true

  containerLogs:
    enabled: false

  resources:
    limits:
      cpu: 256m
      memory: 512Mi
```

You can increase it to `612Mi`:

```yaml
standaloneCollector:
  enabled: true

  containerLogs:
    enabled: false

  resources:
    limits:
      cpu: 256m
      memory: 612Mi
```

You also need to make sure that the `scrape_interval` and `scrape_timeout` are set to `30s`:

```yaml
scrape_interval: 30s
scrape_timeout: 30s
```

In addition, for applications that run on Kubernetes, enable the Prometheus scrape feature:

```yaml
prometheus.io/scrape: true
```
