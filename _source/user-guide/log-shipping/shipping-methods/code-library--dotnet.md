---
layout: article
title: .NET data
permalink: /user-guide/log-shipping/shipping-methods/code-library--dotnet.html
shipping-summary:
  data-source: Java code
  appenders:
    - log4net
    - NLog
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [log4net (logs)](#log4net-config)
  * [NLog (logs)](#nlog-config)

<div id="log4net-config">

### Installation in your code

**You'll need:** .NET 4.5.2 or higher

#### Dependency

```
Install-Package Logzio.DotNet.Log4net
```

#### Configuration

For a complete list of all options, see the configuration parameters below the code blocks. 👇

You can configure the appender in a configuration file or directly in the code.

In a configuration file:

```xml
<log4net>
  <appender name="LogzioAppender" type="Logzio.DotNet.Log4net.LogzioAppender, Logzio.DotNet.Log4net">

    <token>{account-token}</token>
    <type>log4net</type>
    <listenerUrl>{listener-url}:8071</listenerUrl>
    <bufferSize>100</bufferSize>
    <bufferTimeout>00:00:05</bufferTimeout>
    <retriesMaxAttempts>3</retriesMaxAttempts>
    <retriesInterval>00:00:02</retriesInterval>
    <debug>false</debug>
  </appender>

  <root>
    <level value="INFO" />
    <appender-ref ref="LogzioAppender" />
  </root>
</log4net>
```

In the code:

```csharp
	var hierarchy = (Hierarchy)LogManager.GetRepository();
	var logzioAppender = new LogzioAppender();
	logzioAppender.AddToken("{account-token}");
	hierarchy.Root.AddAppender(logzioAppender);
	hierarchy.Configured = true;
```

##### Configuration parameters

{: .parameter-list }
token
  : _(Required)_ Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general)

type
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. <br /> <span class="sm bold">Default:</span> `log4net`

listenerUrl
  : Listener URL and port. {% include log-shipping/your-listener-url.html %} <br /> <span class="sm bold">Default:</span> `https://listener.logz.io`

bufferSize
  : Maximum number of messages the logger will accumulate before sending them all as a bulk. <br /> <span class="sm bold">Default:</span> `100`

bufferTimeout
  : Maximum time to wait for more log lines, as _hh:mm:ss.fff_. <br /> <span class="sm bold">Default:</span> `00:00:05`

retriesMaxAttempts
  : Maximum number of attempts to connect to Logz.io. <br /> <span class="sm bold">Default:</span> `3`

retriesInterval
  : Time to wait between retries, as _hh:mm:ss.fff_. <br /> <span class="sm bold">Default:</span> `00:00:02`

debug
  : To print debug messsages to the console and trace log, `true`. Otherwise, `false`. <br /> <span class="sm bold">Default:</span> `false`


### Custom fields

You can add static keys and values to be added to all log messages. These custom fields must be children of `<appender>`:

```xml
<appender name="LogzioAppender" type="Logzio.DotNet.Log4net.LogzioAppender, Logzio.DotNet.Log4net">
  <customField>
    <key>Environment</key>
    <value>Production</value>
  <customField>
  <customField>
    <key>Location</key>
    <value>New Jerseay B1</value>
  </customField>
</appender>
```

### Extending the appender

To change or add fields to your logs, inherit the appender and override the `ExtendValues` method.

```csharp
public class MyAppLogzioAppender : LogzioAppender
{
  protected override void ExtendValues(LoggingEvent loggingEvent, Dictionary<string, string> values)
  {
    values["logger"] = "MyPrefix." + values["logger"];
    values["myAppClientId"] = new ClientIdProvider().Get();
  }
}
```

Change your configuration to use your new appender name. For the example above, you'd use `MyAppLogzioAppender`.

</div>


<div id="nlog-config">

For a complete list of all options, see the configuration parameters below the code blocks. 👇

You can configure the appender in a configuration file or directly in the code.

In a configuration file:

```xml
<nlog>
  <extensions>
    <add assembly="Logzio.DotNet.NLog"/>
  </extensions>
  <targets>
    <target name="logzio" type="Logzio"
      token="{account-token}"
      logzioType="nlog"
      listenerUrl="{listener-url}"
      bufferSize="100"
      bufferTimeout="00:00:05"
      retriesMaxAttempts="3"
      retriesInterval="00:00:02"
      debug="false">
      <contextproperty name="host" layout="${machinename}" />
      <contextproperty name="threadid" layout="${threadid}" />
    </target>
  </targets>
  <rules>
      <logger name="*" minlevel="Info" writeTo="logzio" />
  </rules>
</nlog>
```

In the code:

```csharp
var config = new LoggingConfiguration();
var logzioTarget = new LogzioTarget {
  Token = "{account-token}",
};
config.AddTarget("Logzio", logzioTarget);
config.AddRule(LogLevel.Debug, LogLevel.Fatal, "Logzio", "*");
LogManager.Configuration = config;
```

##### Configuration parameters

{: .parameter-list }
token
  : _(Required)_ Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general)

logzioType
  : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. <br /> <span class="sm bold">Default:</span> `nlog`

listenerUrl
  : Listener URL and port. {% include log-shipping/your-listener-url.html %} <br /> <span class="sm bold">Default:</span> `https://listener.logz.io:8071`

bufferSize
  : Maximum number of messages the logger will accumulate before sending them all as a bulk. <br /> <span class="sm bold">Default:</span> `100`

bufferTimeout
  : Maximum time to wait for more log lines, as _hh:mm:ss.fff_. <br /> <span class="sm bold">Default:</span> `00:00:05`

retriesMaxAttempts
  : Maximum number of attempts to connect to Logz.io. <br /> <span class="sm bold">Default:</span> `3`

retriesInterval
  : Time to wait between retries, as _hh:mm:ss.fff_. <br /> <span class="sm bold">Default:</span> `00:00:02`

debug
  : To print debug messsages to the console and trace log, `true`. Otherwise, `false`. <br /> <span class="sm bold">Default:</span> `false`


### Context properties

You can configure the target to include your own custom values when forwarding to Logz.io. For example:

```xml
<nlog>
  <variable name="site" value="New Zealand" />
  <variable name="rings" value="one" />
  <target name="logzio" type="Logzio" token="{account-token}">
    <contextproperty name="site" layout="${site}" />
    <contextproperty name="rings" layout="${rings}" />
  </target>
</nlog>
```


### Extending the appender

To change or add fields to your logs, inherit the appender and override the `ExtendValues` method.

```csharp
[Target("MyAppLogzio")]
public class MyAppLogzioTarget : LogzioTarget
{
  protected override void ExtendValues(LogEventInfo logEvent, Dictionary<string, string> values)
  {
    values["logger"] = "MyPrefix." + values["logger"];
    values["myAppClientId"] = new ClientIdProvider().Get();
  }
}
```

Change your configuration to use your new target. For the example above, you'd use `MyAppLogzio`.

</div>

</div>
