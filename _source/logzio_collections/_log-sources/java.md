---
title: Ship Java logs
logo:
  logofile: java.svg
  orientation: vertical
short-description: Add the Logz.io Log4j 2 appender as a dependency to your project to send logs to Logz.io.
data-source: Java code
data-for-product-source: Logs
templates: ["library"]
open-source:
  - title: Logzio Log4j 2 Appender
    github-repo: logzio-log4j2-appender
  - title: Logzio Logback Appender
    github-repo: logzio-logback-appender
contributors:
  - imnotashrimp
shipping-tags:
  - from-your-code
order: 240
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Log4j 2](#log4j-2-config)
* [Logback](#logback-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="log4j-2-config">

#### Configure Log4j 2

The Logz.io Log4j 2 appender sends logs using non-blocking threading, bulks, and HTTPS encryption to port 8071.

This appender uses LogzioSender.
Logs queue in the buffer and are 100% non-blocking.
A background task handles log shipping.
To help manage dependencies, this .jar shades LogzioSender, BigQueue, Gson, and Guava.

**Before you begin, you'll need**:
Log4j 2.7 or higher,
Java 8 or higher

<div class="tasklist">

##### Add the dependency to your project

Add a dependency to your project configuration file (for instance, `pom.xml` in a Maven project). 

```xml
<dependencies>
  <dependency>
    <groupId>io.logz.log4j2</groupId>
    <artifactId>logzio-log4j2-appender</artifactId>
    <version>1.0.15</version>
  </dependency>
</dependencies>
```
The logzio-log4j2-appender artifact can be found in the Maven central repo at https://search.maven.org/artifact/io.logz.log4j2/logzio-log4j2-appender.

##### Configure the appender

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇


```xml
<Appenders>

  <!-- Replace these parameters with your configuration -->
  <LogzioAppender name="Logzio">
    <logzioToken><<LOG-SHIPPING-TOKEN>></logzioToken>
    <logzioUrl>https://<<LISTENER-HOST>>:8071</logzioUrl>
    <logzioType>myAwesomeType</logzioType>
  </LogzioAppender>

</Appenders>

<Loggers>
  <Root level="info">
    <AppenderRef ref="Logzio"/>
  </Root>
</Loggers>
```

<!-- info-box-start:info -->
See the [Log4j documentation](https://logging.apache.org/log4j/2.x/manual/configuration.html) for more information on the Log4j 2 configuration file.
{:.info-box.read}
<!-- info-box-end -->

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| logzioToken | {% include log-shipping/log-shipping-token.md %}  {% include log-shipping/log-shipping-token.html %} Begin with `$` to use an environment variable or system property with the specified name. For example, `$LOGZIO_TOKEN` uses the LOGZIO_TOKEN environment variable. | Required |
| logzioUrl | Listener URL and port. {% include log-shipping/listener-var.html %} | `https://listener.logz.io:8071` |
| logzioType | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. | `java` |
| addHostname | Boolean. Indicates whether to add `hostname` field to logs. This field holds the machine's host name.    Set to `true` to include hostname. Set to `false` to leave it off. If a host name can't be found, this field is not added. | False |
| additionalFields | Adds fields to the JSON message output, formatted as `field1=value1;field2=value2`. Use `$` to inject an environment variable value, such as `field2=$VAR_NAME`. The environment variable should be the only value in the key-value pair. If the environment variable can't be resolved, the field is omitted. | -- |
| bufferDir | Filepath where the appender stores the buffer. | `System.getProperty("java.io.tmpdir")` |
| compressRequests | Boolean. Set to `true` if you're sending gzip-compressed logs. Set to `false` if sending uncompressed logs. | False |
| connectTimeoutMs | Connection timeout during log shipment, in milliseconds. | `10 * 1000` |
| debug | Set to `true` to print debug messages to stdout. | false |
| drainTimeoutSec | How often the appender drains the buffer, in seconds. | `5` |
| fileSystemFullPercentThreshold | Identifies a maximum file system usage, in percent. Set to `-1` to disable. If the file system storage exceeds this threshold, the appender stops buffering and drops all new logs. Buffering resumes if used space drops below the threshold. | `98` |
| socketTimeoutMs | Socket timeout during log shipment, in milliseconds. | `10 * 1000` |


###### Code sample

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LogzioLog4j2Example {
  public static void main(String[] args) {
    Logger logger = LogManager.getLogger(LogzioLog4j2Example.class);

    logger.info("Testing logz.io!");
    logger.warn("Winter is coming");
  }
}
```

</div>

#### Troubleshooting

If you receive an error message regarding a missing appender, try adding the following configuration to the beginning and end of the configuration file:

```xml

<Configuration status="info" packages="io.logz.log4j2">

# Place the configuration from step 2

</Configuration>

```

#### More options

You can optionally add mapped diagnostic context (MDC)
and markers to your logs.

##### MDC

When you add MDC to your logs,
each key-value pair you define is added log lines while the thread is alive.

So this code sample...

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.ThreadContext;

public class LogzioLog4j2Example {
  public static void main(String[] args) {
    Logger logger = LogManager.getLogger(LogzioLog4j2Example.class);
    ThreadContext.put("Key", "Value");
    logger.info("This log will hold the MDC data as well");
  }
}
```

...produces this log output.

```json
{
  "message": "This log will hold the MDC data as well",
  "Key": "Value",
  "Your log message follows": "..."
}
```

##### Markers

Markers are values you can use to tag and enrich log statements.

This code...

```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;

public class LogzioLog4j2Example {
  public static void main(String[] args) {
    Logger logger = LogManager.getLogger(LogzioLog4j2Example.class);
    Marker marker = MarkerManager.getMarker("Fatal");
    logger.error(marker, "This line has a fatal error");
  }
}
```

...produces this log output.

```json
{
  "message": "This line has a fatal error",
  "Marker": "Fatal",
  "Your log message follows": "..."
}
```

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="logback-config">

#### Configure Logback

Logback sends logs to your Logz.io account using non-blocking threading, bulks, and HTTPS encryption to port 8071.

This appender uses BigQueue implementation of persistent queue, so all logs are backed up to a local file system before being sent.
Once you send a log, it will be enqueued in the buffer and 100% non-blocking.
A background task handles the log shipment.
To help manage dependencies, this .jar shades BigQueue, Gson, and Guava.

**Before you begin, you'll need**:
Logback 1.1.7 or higher,
Java 8 or higher

<div class="tasklist">

##### Add the dependency to your project

Add a dependency to your project configuration file

###### Installation from Maven

In the `pom.xml` add the following dependencies:

```xml
<dependencies>
  <dependency>
    <groupId>io.logz.logback</groupId>
    <artifactId>logzio-logback-appender</artifactId>
    <version>v1.0.25</version>
  </dependency>
</dependencies>
```

The logzio-log4j2-appender artifact can be found in the Maven central repo at https://search.maven.org/artifact/io.logz.log4j2/logzio-log4j2-appender.

###### Installation from Gradle

If you use Gradle, add the dependency to your project as follows:

```java
implementation 'io.logz.sender:logzio-java-sender:V1.1.2'
```

##### Configure the appender

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

<!-- info-box-start:info -->
See the [Logback documentation](https://logback.qos.ch/manual/configuration.html) for more information on the Logback configuration file.
{:.info-box.read}
<!-- info-box-end -->

```xml
<configuration>
  <!-- Closes gracefully and finishes the log drain -->
  <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>

  <appender name="LogzioLogbackAppender" class="io.logz.logback.LogzioLogbackAppender">
    <!-- Replace these parameters with your configuration -->
    <token><<LOG-SHIPPING-TOKEN>></token>
    <logzioUrl>https://<<LISTENER-HOST>>:8071</logzioUrl>
    <logzioType>myType</logzioType>

    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
      <level>INFO</level>
    </filter>
  </appender>

  <root level="debug">
    <!-- IMPORTANT: This line is required -->
    <appender-ref ref="LogzioLogbackAppender"/>
  </root>
</configuration>
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| token | Your Logz.io log shipping token securely directs the data to your [Logz.io account](https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping). {% include log-shipping/log-shipping-token.html %} Begin with `$` to use an environment variable or system property with the specified name. For example, `$LOGZIO_TOKEN` uses the LOGZIO_TOKEN environment variable. | Required |
| logzioUrl | Listener URL and port.    {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| logzioType | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. | `java` |
| addHostname | Indicates whether to add `hostname` field to logs. This field holds the machine's host name.    Set to `true` to include hostname. Set to `false` to leave it off. If a host name can't be found, this field is not added. | `false` |
| additionalFields | Adds fields to the JSON message output, formatted as `field1=value1;field2=value2`.    Use `$` to inject an environment variable value, such as `field2=$VAR_NAME`. The environment variable should be the only value in the key-value pair. If the environment variable can't be resolved, the field is omitted. | N/A |
| bufferDir | Filepath where the appender stores the buffer. | `System.getProperty("java.io.tmpdir")` |
| compressRequests | Boolean. Set to `true` if you're sending gzip-compressed logs. Set to `false` if sending uncompressed logs. | `false` |
| connectTimeout  | Connection timeout during log shipment, in milliseconds. | `10 * 1000` |
| debug  | Boolean. Set to `true` to print debug messages to stdout. | `false` |
| drainTimeoutSec   | How often the appender drains the buffer, in seconds. | `5` |
| fileSystemFullPercentThreshold   | Integer. Identifies a maximum file system usage, in percent. Set to `-1` to disable.    If the file system storage exceeds this threshold, the appender stops buffering and drops all new logs. Buffering resumes if used space drops below the threshold. | `98` |
| format   | Set to `json` if the log message is to be sent as JSON, so that each JSON node is a field in Logz.io. Set to `text` to send the log message as plain text. | `text` |
| line   | Boolean. Set to `true` to print the line number of the code that generated this log message. Set to `false` to leave the line number out. | `false` |
| socketTimeout | Socket timeout during log shipment, in milliseconds. | `10 * 1000` |


###### Code sample

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogzioLogbackExample {
  public static void main(String[] args) {
    Logger logger = LoggerFactory.getLogger(LogzioLogbackExample.class);

      logger.info("Testing logz.io!");
      logger.warn("Winter is coming");
  }
}
```

</div>

#### More options

You can optionally add mapped diagnostic context (MDC)
and markers to your logs.

#### MDC

When you add MDC to your logs,
each key-value pair you define is added log lines while the thread is alive.

So this code sample...

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

public class LogzioLogbackExample {
  public static void main(String[] args) {
    Logger logger = LoggerFactory.getLogger(LogzioLogbackExample.class);

    MDC.put("Key", "Value");
    logger.info("This log will hold the MDC data as well");
  }
}
```

...produces this log output.

```json
{
  "message": "This log will hold the MDC data as well",
  "Key": "Value",
  "Your log message follows": "..."
}
```

#### Markers

Markers are values you can use to tag and enrich log statements.

This code...

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;

public class LogzioLogbackExample {

  public static void main(String[] args) {
    Logger logger = LoggerFactory.getLogger(LogzioLogbackExample.class);

    Marker marker = MarkerFactory.getMarker("Fatal");
    logger.error(marker, "This line has a fatal error");
  }
}
```

...produces this log output.

```json
{
  "message": "This line has a fatal error",
  "Marker": "Fatal",
  "Your log message follows": "..."
}
```
  
#### Troubleshooting
  
If the log appender does not ship logs, add `<inMemoryQueue>true</inMemoryQueue>` and `<inMemoryQueueCapacityBytes>-1</inMemoryQueueCapacityBytes>` to the configuration file as follows:
  
```xml
<configuration>
  <!-- Closes gracefully and finishes the log drain -->
  <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>

  <appender name="LogzioLogbackAppender" class="io.logz.logback.LogzioLogbackAppender">
    <!-- Replace these parameters with your configuration -->
    <token><<LOG-SHIPPING-TOKEN>></token>
    <logzioUrl><<LISTENER-HOST>>:8071</logzioUrl>
    <logzioType>myType</logzioType>

    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
      <level>INFO</level>
    </filter>
    <inMemoryQueue>true</inMemoryQueue> 
    <inMemoryQueueCapacityBytes>-1</inMemoryQueueCapacityBytes>
  </appender>

  <root level="debug">
    <!-- IMPORTANT: This line is required -->
    <appender-ref ref="LogzioLogbackAppender"/>
  </root>
</configuration>
```
  

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
