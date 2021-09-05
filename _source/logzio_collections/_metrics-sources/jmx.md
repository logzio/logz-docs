---
title: Ship JMX metrics
logo:
  logofile: java.svg
  orientation: vertical
data-source: JMX
templates: ["no-template", "no-template"]
open-source:
  - title: jmx2logzio
    github-repo: jmx2logzio
contributors:
  - imnotashrimp
  - yyyogev
shipping-tags:
  - platform-service
---

<!-- tabContainer:start -->
<div class="branching-container">
#### NEW BUTTON
123
<!-- logzio-inject:install:grafana:dashboards ids=["1m3Sqx6atnxPd7829LV2W5"] -->

* [Overview](#overview)
* [As a Java agent](#as-a-java-agent-config)
* [With a Jolokia agent](#with-a-jolokia-agent-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

jmx2logzio is a lightweight tool for polling JMX metrics and sending them to Logz.io.

This doc shows you how to set up jmx2logzio.
You have two options here:

* Run as a Java agent (to get metrics directly from the MBean platform)
* Run as an app that connects to a Jolokia agent

## How are metrics reported?

Metrics are reported as
`[SERVICE-NAME].[SERVICE-HOST].[METRIC-NAME]`.


</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="as-a-java-agent-config">


## Set up jmx2logzio as a Java agent

In most cases, you can configure jmx2logzio to run as an agent.
In this configuration, jmx2logzio sends metrics to Logz.io at user-defined intervals.

<!-- info-box-start:info -->
The agent uses SLF4J logging framework.
To get logs from the agent, you'll need to supply an [SLF4J binder](https://www.slf4j.org/faq.html#requirements).
{:.info-box.note}
<!-- info-box-end -->

#### Configuration

**Before you begin, you'll need**:
[Java 1.8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or higher

<div class="tasklist">

##### Download jmx2logzio

Download jmx2logzio.jar to your current folder.
You'll use this in step 2.

```shell
RELEASE_JAR=$(curl -s https://api.github.com/repos/logzio/jmx2logzio/releases/latest \
  | grep "browser_download_url" | awk '{print substr($2, 2, length($2)-2)}') \
  ; wget -O jmx2logzio-javaagent.jar $RELEASE_JAR
```

##### Configure and run jmx2logzio

Run your Java app,
adding `-javaagent:path/to/jmx2logzio/jar/file.jar` and configuration arguments to the command.
Include extra configuration arguments as KEY=VALUE, with a comma between each argument.

This code block shows a sample command to run jmx2logzio with runtime configuration.
For a complete list of options, see the configuration parameters below the code block.👇

```shell
java -javaagent:./jmx2logzio-javaagent.jar=LOGZIO_TOKEN=<<METRICS-SHIPPING-TOKEN>>,SERVICE_NAME=myService /path/to/your/app
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| LOGZIO_TOKEN | Your Metrics account token. {% include metric-shipping/replace-metrics-token.html %} | Required |
| SERVICE_NAME | A name you define for the service. This is included in the reported metrics. | Required |
| LISTENER_URL | Listener URL and port. {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| SERVICE_HOST  | Hostname to be included in the reported metrics. | Host machine name |
| POLLING_INTERVAL_IN_SEC  | Metrics polling interval, in seconds. | `30` |
| WHITE_LIST_REGEX | Only metrics matching this regex will be sent. | `.*` (match everything) |
| BLACK_LIST_REGEX | Metrics matching this regex will not be sent. | `$a` (match nothing) |
| EXTRA_DIMENSIONS | A list of key-values separated by `:` that will be added to the dimensions of the collected metrics.    Example: `EXTRA_DIMENSIONS={origin=local:env=java}` | N/A |
| FROM_DISK | If `true`, metrics are stored on disk until they're shipped (see [If FROM_DISK=true](#agent-if-fromdisk-true)). If `false`, metrics persist in memory until they're shipped (see [If FROM_DISK=false](#agent-if-fromdisk-false)). | `true` |

###### If FROM_DISK=true

| Parameter | Description | Default |
|---|---|---|
| FILE_SYSTEM_SPACE_LIMIT  | Threshold percentage of disk space at which to stop queueing. If this threshold is reached, all new metrics are dropped until used space drops below the threshold.    Set to `-1` to ignore threshold. | `98` |
| DISK_SPACE_CHECKS_INTERVAL  | Time interval, in milliseconds, to check for disk space. | `1000` |
| CLEAN_SENT_METRICS_INTERVAL  | Time interval, in seconds, to clean sent metrics from the disk. | `30` |

###### If FROM_DISK=false

| Parameter | Description | Default |
|---|---|---|
| IN_MEMORY_QUEUE_CAPACITY | The amount of memory, in bytes, jmx2logzio can use for the memory queue. Set to `-1` for unlimited bytes. | `1024 * 1024 * 100` |
| LOGS_COUNT_LIMIT | The number of logs in the memory queue before dropping new logs. Default value is `-1` (the sender will not limit the queue by logs count). | `-1` |

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/kibana).

</div>

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="with-a-jolokia-agent-config">

## Set up jmx2logzio with a Jolokia agent

If you want to poll metrics from a remote source, you can use Jolokia agent + Jmx2logzio.
In this configuration, Jolokia exposes the metrics through an API, which jmx2logzio reads and sends to Logz.io.
In this case, jmx2logzio can [run as a docker]( #jmx2logzio-in-a-docker).

#### Configuration

**Before you begin, you'll need**:
[Java 1.8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or higher

<div class="tasklist">

##### Run the Jolokia agent

Download the [Jolokia JVM Agent JAR file](http://search.maven.org/remotecontent?filepath=org/jolokia/jolokia-jvm/1.6.0/jolokia-jvm-1.6.0-agent.jar).

Run your Java app, adding `-javaagent:path/to/jolokia/jar/file.jar` to the command.
For example:

```shell
java -javaagent:/opt/jolokia/jolokia-jvm-1.6.0-agent.jar /path/to/your/app
```


<!-- info-box-start:info -->
You can specify a custom configuration for Jolokia agent at runtime.
For more information, see [Jolokia as JVM Agent](https://jolokia.org/reference/html/agents.html#jvm-agent) from Jolokia.
{:.info-box.note}
<!-- info-box-end -->

##### Download and configure jmx2logzio

```shell
RELEASE_JAR=$(curl -s https://api.github.com/repos/logzio/jmx2logzio/releases/latest \
  | grep "browser_download_url" | awk '{print substr($2, 2, length($2)-2)}') \
  ; wget -O jmx2logzio-javaagent.jar $RELEASE_JAR
```

Create a configuration file specifying the parameters below.
For help, see our [example configuration file](https://raw.githubusercontent.com/logzio/jmx2logzio/master/config.conf).

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| service.name  | A name you define for the service. This is included in the reported metrics. | Required |
| service.host | Hostname to be included in the reported metrics. | Host machine name (if not defined in application.conf) |
| service.poller.white-list-regex | Only metrics matching this regex will be sent. | `.*` (match everything) |
| service.poller.black-list-regex  | Metrics matching this regex will not be sent. | `$a` (match nothing) |
| service.poller.jolokia.jolokiaFullUrl | URL of the remote Jolokia agent you're forwarding metrics to. | N/A |
| service.poller.metrics-polling-interval-in-seconds | Metrics polling interval, in seconds. | `30` |
| extra-dimensions | A dictionary of key-values that will be added to the dimensions of the collected metrics. | N/A |
| logzio-java-sender.url | Listener URL and port.    For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). | `https://listener.logz.io:8071` |
| logzio-java-sender.token | {% include metric-shipping/replace-metrics-token.html %} | Required |
| logzio-java-sender.from-disk  | If `true`, metrics are stored on disk until they're shipped (see [If from-disk=true](#jolokia-if-fromdisk-true)). If `false`, metrics persist in memory until they're shipped (see [If from-disk=false](#jolokia-if-fromdisk-false)). | `true` |

###### If from-disk=true

| Parameter | Description | Default |
|---|---|---|
| logzio-java-sender.file-system-full-percent-threshold  | Threshold percentage of disk space at which to stop queueing. If this threshold is reached, all new metrics are dropped until used space drops below the threshold. Set to `-1` to ignore threshold. | `98` |
| logzio-java-sender.clean-sent-metrics-interval | Time interval, in seconds, to clean sent metrics from the disk. | `30` |
| logzio-java-sender.disk-space-checks-interval  | Time interval, in milliseconds, to check for disk space. | `1000` |

###### If from-disk=false

| Parameter | Description | Default |
|---|---|---|
| logzio-java-sender.in-memory-queue-capacity | The amount of memory, in bytes, jmx2logzio can use for the memory queue. Set to `-1` for unlimited bytes. | `1024 * 1024 * 100` |
| logzio-java-sender.log-count-limit | The number of logs in the memory queue before dropping new logs. Default value is -1 (the sender will not limit the queue by logs count). | `-1` |


##### Run jmx2logzio

Make sure your app is running with the Jolokia agent, and then start jmx2logzio.

You can launch jmx2logzio.jar as a standalone jar or in a Docker container.

As a jar:

```shell
java -jar jmx2logzio.jar config.conf
```

In a container:

```shell
docker pull logzio/jmx2logzio
docker run -v $(pwd)/config.conf:/application.conf logzio/jmx2logzio
```

##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/metrics/).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->