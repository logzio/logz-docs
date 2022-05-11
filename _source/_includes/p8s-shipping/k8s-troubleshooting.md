This section contains some guidelines for handling errors that you may encounter when trying to collect Kubermetes metrics.

## Problem: Permanent error - context deadline exceeded

The following error appears:

```shell
Permanent error: Post \"https://<<LISTENER-HOST>>:8053\": context deadline exceeded
meaning that the post request timeout.
```

### Possible cause - Connectivity issue

Connectivity issue may be causing this issue.

#### Suggested remedy

Check your shipper's connectivity as follows.

For macOS and Linux, use telnet to make sure your log shipper can connect to Logz.io listeners.

As of macOS High Sierra (10.13),
telnet is not installed by default.
You can install telnet with Homebrew
by running `brew install telnet`.
{:.info-box.note}

Run this command from the environment you're shipping from, after adding the appropriate port number:

```shell
telnet listener.logz.io {port-number}
```
For Windows servers running Windows 8/Server 2012 and later, run the following command in PowerShell:


```shell
Test-NetConnection listener.logz.io -Port {port-number}
```

The port numbers are 8052 and 8053.

### Possible cause - Service exposing the metrics need more time

A service exposing the metrics may need more time to send the response to the OpenTelemetry collector.

#### Suggested remedy

Increase the OpenTelemetry collector timeout as follows.

??????????

### Possible cause - Incorrect listener and/or token

You may be using incorrect listener and/or token.

#### Suggested remedy

Check that the listener and token of your account are correct. You can view them in the [Manage tokens section](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=metrics).


## Problem: Windows nodes error

???????????

### Possible cause - Incorrect username and/or password for Windows nodes

You may be using incorrect username and/or password for Windows nodes.

#### Suggested remedy

Ensure the username and password to Windows nodes are correct.

## Problem: Invalid helm chart version

### Possible cause - The version of the helm chart is not up to date

The helm chart version that you are using may have expired.

#### Suggested remedy

Update the helm chart by running:

```shell
helm repo update
```

## Problem: The prometheusremotewrite exporter timeout

?????


### Possible cause - The timeout in prometheusremotewrite exporter too short

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

