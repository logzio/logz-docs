---
layout: article
title: Ship Java logs
logo:
  logofile: java.svg
  orientation: vertical
vertical-logo: true
shipping-summary:
  data-source: Java code
  appenders:
    - Log4j 2
    - Logback
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [Log4j 2](#log4j2-config)
  * [Logback](#logback-config)

<div id="log4j2-config">

## Log4j 2 setup

The Logz.io Log4j 2 appender sends logs using non-blocking threading, bulks, and HTTPS encryption to port 8071.

This appender uses LogzioSender.
Logs queue in the buffer and are 100% non-blocking.
A background task handles log shipping.
To help manage dependencies, this .jar shades LogzioSender, BigQueue, Gson, and Guava.

**You'll need:** Log4j 2.7 or higher, Java 8 or higher


### Add the dependency to your project

Add a dependency to your project configuration file (for instance, `pom.xml` in a Maven project).

```xml
<dependencies>
  <dependency>
    <groupId>io.logz.log4j2</groupId>
    <artifactId>logzio-log4j2-appender</artifactId>
    <version>1.0.10</version>
  </dependency>
</dependencies>
```

### Configure Log4j

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

<div class="info-box read">
  See the [Log4j documentation](https://logging.apache.org/log4j/2.x/manual/configuration.html) for more information on the Log4j 2 configuration file.
</div>

```xml
<Appenders>

  <!-- Replace these parameters with your configuration -->
  <LogzioAppender name="Logzio">
    <logzioToken>{ACCOUNT-TOKEN}</logzioToken>
    <logzioUrl>https://{LISTENER-URL}:8071</logzioUrl>
    <logzioType>myAwesomeType</logzioType>
  </LogzioAppender>

</Appenders>

<Loggers>
  <Root level="info">
    <AppenderRef ref="Logzio"/>
  </Root>
</Loggers>
```

##### Parameters

{: .parameter-list }
logzioToken <span class="required-param"></span>
  : Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). <br />
    {%- include log-shipping/replace-vars.html token=true %} <br />
    Begin with `$` to use an environment variable or system property with the specified name.
    For example, `$LOGZIO_TOKEN` uses the LOGZIO_TOKEN environment variable.

addHostname
  : Boolean. Indicates whether to add `hostname` field to logs. This field holds the machine's host name. <br />
    Set to `true` to include hostname.
    Set to `false` to leave it off.
    If a host name can't be found, this field is not added. <br />
    <span class="default-param">`false`</span>

additionalFields
  : Adds fields to the JSON message output, formatted as `field1=value1;field2=value2`. <br />
    Use `$` to inject an environment variable value, such as `field2=$VAR_NAME`.
    The environment variable should be the only value in the key-value pair.
    If the environment variable can't be resolved, the field is omitted.

bufferDir
  : Filepath where the appender stores the buffer <br />
    <span class="default-param">`System.getProperty("java.io.tmpdir")`</span>

compressRequests
  : Boolean. Set to `true` if you're sending gzip-compressed logs.
    Set to `false` if sending uncompressed logs. <br />
    <span class="default-param">`false`</span>

connectTimeoutMs
  : Connection timeout during log shipment, in milliseconds. <br />
    <span class="default-param">`10 * 1000`</span>

debug
  : Set to `true` to print debug messages to stdout. <br />
    <span class="default-param">`false`</span>

drainTimeoutSec
  : How often the appender drains the buffer, in seconds. <br />
    <span class="default-param">`5`</span>

fileSystemFullPercentThreshold
  : Identifies a maximum file system usage, in percent. Set to `-1` to disable. <br />
    If the file system storage exceeds this threshold, the appender stops buffering and drops all new logs.
    Buffering resumes if used space drops below the threshold. <br />
    <span class="default-param">`98`</span>

logzioType
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
    Used by Logz.io for consistent parsing.
    Can't contain spaces. <br />
    <span class="default-param">`java`</span>

logzioUrl
  : Listener URL and port. <br />
    {%- include log-shipping/replace-vars.html listener=true %} <br />
    <span class="default-param">`https://listener.logz.io:8071`</span>

socketTimeoutMs
  : Socket timeout during log shipment, in milliseconds. <br />
    <span class="default-param">`10 * 1000`</span>


##### Code sample

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

### MDC

You can add mapped diagnostic context (MDC) to your logs.
Each key-value pair you define is added to every log line while the thread is alive.

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


### Markers

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


<div id="logback-config">

## Logback setup

Logback sends logs to your Logz.io account using non-blocking threading, bulks, and HTTPS encryption to port 8071.

This appender uses BigQueue implementation of persistent queue, so all logs are backed up to a local file system before being sent.
Once you send a log, it will be enqueued in the buffer and 100% non-blocking.
A background task handles the log shipment.
To help manage dependencies, this .jar shades BigQueue, Gson, and Guava.

**You'll need:** Logback 1.1.7 or higher, Java 8 or higher

### Add the dependency to your project

Add a dependency to your project configuration file (for instance, `pom.xml` in a Maven project).

```xml
<dependencies>
  <dependency>
    <groupId>io.logz.logback</groupId>
    <artifactId>logzio-logback-appender</artifactId>
    <version>1.0.20</version>
  </dependency>
</dependencies>
```

### Configure Logback

Use the samples in the code block below as a starting point, and replace the sample with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code block.👇

<div class="info-box read">
  See the [Logback documentation](https://logback.qos.ch/manual/configuration.html) for more information on the Logback configuration file.
</div>

```xml
<configuration>
  <!-- Closes gracefully and finishes the log drain -->
  <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>

  <appender name="LogzioLogbackAppender" class="io.logz.logback.LogzioLogbackAppender">
    <!-- Replace these parameters with your configuration -->
    <token>{ACCOUNT-TOKEN}</token>
    <logzioUrl>{LISTENER-URL}:8071</logzioUrl>
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

##### Parameters

{: .parameter-list }
token <span class="required-param"></span>
  : Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). <br />
    {% include log-shipping/replace-vars.html token=true %} <br />
    Begin with `$` to use an environment variable or system property with the specified name.
    For example, `$LOGZIO_TOKEN` uses the LOGZIO_TOKEN environment variable.

addHostname
  : Indicates whether to add `hostname` field to logs.
    This field holds the machine's host name. <br />
    Set to `true` to include hostname.
    Set to `false` to leave it off.
    If a host name can't be found, this field is not added. <br />
    <span class="default-param">`false`</span>

additionalFields
  : Adds fields to the JSON message output, formatted as `field1=value1;field2=value2`. <br />
    Use `$` to inject an environment variable value, such as `field2=$VAR_NAME`.
    The environment variable should be the only value in the key-value pair.
    If the environment variable can't be resolved, the field is omitted.

bufferDir
  : Filepath where the appender stores the buffer. <br />
    <span class="default-param">`System.getProperty("java.io.tmpdir")`</span>

compressRequests
  : Boolean. Set to `true` if you're sending gzip-compressed logs.
    Set to `false` if sending uncompressed logs. <br />
    <span class="default-param">`false`</span>

connectTimeout
  : Connection timeout during log shipment, in milliseconds. <br />
    <span class="default-param">`10 * 1000`</span>

debug
  : Boolean. Set to `true` to print debug messages to stdout. <br />
    <span class="default-param">`false`</span>

drainTimeoutSec
  : How often the appender drains the buffer, in seconds. <br />
    <span class="default-param">`5`</span>

fileSystemFullPercentThreshold
  : Integer. Identifies a maximum file system usage, in percent.
    Set to `-1` to disable. <br />
    If the file system storage exceeds this threshold, the appender stops buffering and drops all new logs.
    Buffering resumes if used space drops below the threshold. <br />
    <span class="default-param">`98`</span>

format
  : Set to `json` if the log message is to be sent as JSON, so that each JSON node is a field in Logz.io.
    Set to `text` to send the log message as plain text. <br />
    <span class="default-param">`text`</span>

line
  : Boolean. Set to `true` to print the line number of the code that generated this log message.
    Set to `false` to leave the line number out. <br />
    <span class="default-param">`false`</span>

logzioType
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
    Used by Logz.io for consistent parsing.
    Can't contain spaces. <br />
    <span class="default-param">`java`</span>

logzioUrl
  : Listener URL and port. <br />
    {%- include log-shipping/replace-vars.html listener=true %} <br />
    <span class="default-param">`https://listener.logz.io:8071`</span>

socketTimeout
  : Socket timeout during log shipment, in milliseconds. <br />
    <span class="default-param">`10 * 1000`</span>


##### Code sample

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

### MDC

You can add mapped diagnostic context (MDC) to your logs.
Each key-value pair you define is added to every log line while the thread is alive.

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

### Markers

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

</div>
</div>