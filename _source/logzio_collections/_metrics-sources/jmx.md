---
title: Ship JMX metrics
logo:
  logofile: java.svg
  orientation: vertical
shipping-summary:
  data-source: JMX
open-source:
  - title: jmx2logzio
    github-repo: jmx2logzio
contributors:
  - imnotashrimp
  - yyyogev
shipping-tags:
  - platform-service
---

## jmx2logzio

jmx2logzio is a lightweight tool for polling JMX metrics and sending them to Logz.io.

This doc shows you how to set up jmx2logzio.
You have two options here:

* Run as a [Java agent](#as-a-java-agent-config) (to get metrics directly from the MBean platform)
* Run as an [app that connects to a Jolokia agent](#with-a-jolokia-agent-config)

### How are metrics reported?

Metrics reported by jmx2logzio follow this format:

`[SERVICE-NAME].[SERVICE-HOST].[METRIC-NAME]`

<div class="branching-container">

{: .branching-tabs }
  * [As a Java agent](#as-a-java-agent-config)
  * [With a Jolokia agent](#with-a-jolokia-agent-config)

<div id="as-a-java-agent-config">

## jmx2logzio as Java agent setup

In most cases, you can configure jmx2logzio to run as an agent.
In this configuration, jmx2logzio forwards metrics directly to Logz.io.

If your app is running in a Docker container,
consider using [jmx2logzio with Jolokia](#with-a-jolokia-agent-config) instead.

<div class="info-box note">

  The agent uses Slf4j logging framework.
  To get logs from the agent, you'll need to supply a [slf4j binder](https://www.slf4j.org/faq.html#requirements).

</div>

###### Configuration

**You'll need**:
[Maven](https://maven.apache.org/),
[Java 1.8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or higher

{: .tasklist .firstline-headline }
1. Download jmx2logzio

    ```shell
    RELEASE_JAR=$(curl -s https://api.github.com/repos/logzio/jmx2logzio/releases/latest \
      | grep "browser_download_url" | awk '{print substr($2, 2, length($2)-2)}') \
      ; wget -O jmx2logzio-javaagent.jar $RELEASE_JAR
    ```

2. Configure and run jmx2logzio

    You'll find the jmx2logzio jar file in the jmx2logzio/target/ folder.

    Run your Java app,
    adding `-javaagent:path/to/jmx2logzio/jar/file.jar` and configuration arguments to the command.
    Include extra configuration arguments as KEY=VALUE, with a comma between each argument.

    This code block shows a sample command to run jmx2logzio with runtime configuration.
    For a complete list of options, see the configuration parameters below the code block.👇

    ```shell
    java -javaagent:./jmx2logzio-javaagent.jar=LOGZIO_TOKEN=<ACCOUNT-TOKEN>,SERVICE_NAME=myService /path/to/your/app
    ```

    Parameters
    {: .inline-header }

    LOGZIO_TOKEN <span class="required-param"></span>
    : Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/manage-accounts) \\
      {% include log-shipping/replace-vars.html token=true %}

    SERVICE_NAME <span class="required-param"></span>
    : A name you define for the service.
      This is included in the reported metrics.

    LISTENER_URL <span class="default-param">`https://listener.logz.io:8071`</span>
    : Listener URL and port. \\
      {% include log-shipping/replace-vars.html listener=true %}

    SERVICE_HOST
    : Hostname to be included in the reported metrics.
    <span class="default-param">Host machine name</span>

    POLLING_INTERVAL_IN_SEC <span class="default-param">`30`</span>
    : Metrics polling interval, in seconds.

    WHITE_LIST_REGEX <span class="default-param">`.*` (match everything)</span>
    : Only metrics matching this regex will be sent.

    BLACK_LIST_REGEX <span class="default-param">`$a` (match nothing)</span>
    : Metrics matching this regex will not be sent.

    EXTRA_DIMENSIONS
    : A list of key-values separated by `:` that will be added to the dimensions of the collected metrics. \\
      Example: `EXTRA_DIMENSIONS={origin=local:env=java}`

    FROM_DISK <span class="default-param">`true`</span>
    : If `true`, metrics are stored on disk until they're shipped
      (see [If FROM_DISK=true](#agent-if-fromdisk-true)).
      If `false`, metrics persist in memory until they're shipped
      (see [If FROM_DISK=false](#agent-if-fromdisk-false)).

    If FROM_DISK=true
    {: .inline-header #agent-if-fromdisk-true }

    QUEUE_DIR <span class="default-param">`./metrics`</span>
    : Path to store the queue.
      Must be a path to an existing folder.

    FILE_SYSTEM_SPACE_LIMIT <span class="default-param">`98`</span>
    : Threshold percentage of disk space at which to stop queueing.
      If this threshold is reached, all new metrics are dropped until used space drops below the threshold. \\
      Set to `-1` to ignore threshold.

    DISK_SPACE_CHECKS_INTERVAL <span class="default-param">`1000`</span>
    : Time interval, in milliseconds, to check for disk space

    CLEAN_SENT_METRICS_INTERVAL <span class="default-param">`30`</span>
    : Time interval, in seconds, to clean sent metrics from the disk

    If FROM_DISK=false
    {: .inline-header #agent-if-fromdisk-false }

    IN_MEMORY_QUEUE_CAPACITY <span class="default-param">`1024 * 1024 * 100`</span>
    : The amount of memory, in bytes, jmx2logzio can use for the memory queue.
      Set to `-1` for unlimited bytes.

    LOGS_COUNT_LIMIT <span class="default-param">`-1`</span>
    : The number of logs in the memory queue before dropping new logs.
      Default value is `-1` (the sender will not limit the queue by logs count)

</div>

<div id="with-a-jolokia-agent-config">

## jmx2logzio + Jolokia agent setup

If you experience issues such as port conflicts for Docker containers,
you can run a Jolokia agent to act as a go-between for sending metrics from your app to Logz.io.
In this configuration, jmx2logzio forwards metrics to Jolokia,
which sends those metrics to Logz.io.

###### Configuration

**You'll need**:
[Maven](https://maven.apache.org/),
[Java 1.8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or higher

{: .tasklist .firstline-headline }
1. Run the Jolokia agent

    Download the [Jolokia JVM Agent JAR file](http://search.maven.org/remotecontent?filepath=org/jolokia/jolokia-jvm/1.6.0/jolokia-jvm-1.6.0-agent.jar).

    Run your Java app, adding `-javaagent:path/to/jolokia/jar/file.jar` to the command.
    For example:

    ```shell
    java -javaagent:/opt/jolokia/jolokia-jvm-1.6.0-agent.jar /path/to/your/app
    ```

    <div class="info-box note">

      You can specify a custom configuration for Jolokia agent at runtime.
      For more information, see [Jolokia as JVM Agent](https://jolokia.org/reference/html/agents.html#jvm-agent) from Jolokia.

    </div>

2. Download and configure jmx2logzio

    Clone the jmx2logzio GitHub repo.

    ```shell
    git clone https://github.com/logzio/jmx2logzio.git
    ```

    Open jmx2logzio/src/main/resources/application.config in a text editor, and set the parameters below.

    Parameters
    {: .inline-header }

    service.name <span class="required-param"></span>
    : A name you define for the service.
      This is included in the reported metrics.

    service.host <span class="default-param">Host machine name _(if not defined in application.conf)_</span>
    : Hostname to be included in the reported metrics.

    service.poller.white-list-regex <span class="default-param">`.*` _(match everything)_</span>
    : Only metrics matching this regex will be sent.

    service.poller.black-list-regex <span class="default-param">`$a` _(match nothing)_</span>
    : Metrics matching this regex will not be sent.

    service.poller.jolokia.jolokiaFullUrl
    : URL of the remote Jolokia agent you're forwarding metrics to.

    service.poller.metrics-polling-interval-in-seconds <span class="default-param">`30`</span>
    : Metrics polling interval, in seconds.

    extra-dimensions
    : A dictionary of key-values that will be added to the dimensions of the collected metrics.

    logzio-java-sender.url <span class="default-param">`https://listener.logz.io:8071`</span>
    : Listener URL and port. \\
      For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

    logzio-java-sender.token <span class="required-param"></span>
    : Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/manage-accounts)

    logzio-java-sender.from-disk <span class="default-param">`true`</span>
    : If `true`, metrics are stored on disk until they're shipped (see [If from-disk=true](#jolokia-if-fromdisk-true)).
      If `false`, metrics persist in memory until they're shipped (see [If from-disk=false](#jolokia-if-fromdisk-false)).

    If from-disk=true
    {: .inline-header #jolokia-if-fromdisk-true }

    logzio-java-sender.queue-dir <span class="default-param">`metrics`</span>
    : Path to store the queue.
      Must be a path to an existing folder.

    logzio-java-sender.file-system-full-percent-threshold <span class="default-param">`98`</span>
    : Threshold percentage of disk space at which to stop queueing.
      If this threshold is reached, all new metrics are dropped until used space drops below the threshold.
      Set to `-1` to ignore threshold.

    logzio-java-sender.clean-sent-metrics-interval <span class="default-param">`30`</span>
    : Time interval, in seconds, to clean sent metrics from the disk

    logzio-java-sender.disk-space-checks-interval <span class="default-param">`1000`</span>
    : Time interval, in milliseconds, to check for disk space

    If from-disk=false
    {: .inline-header #jolokia-if-fromdisk-false }

    logzio-java-sender.in-memory-queue-capacity <span class="default-param">`1024 * 1024 * 100`</span>
    : The amount of memory, in bytes, jmx2logzio can use for the memory queue.
      Set to `-1` for unlimited bytes.

    logzio-java-sender.log-count-limit <span class="default-param">`-1`</span>
    : The number of logs in the memory queue before dropping new logs.
      Default value is -1 (the sender will not limit the queue by logs count).


3. Build and run jmx2logzio

    `cd` to the jmx2logzio/ folder and build the source:

    ```shell
    mvn clean install
    ```

    Make sure your app is running, and then start jmx2logzio.

    ```shell
    java -jar jmx2logzio.jar
    ```

    You'll find the jmx2logzio jar file in the jmx2logzio/target/ folder.

</div>

</div>