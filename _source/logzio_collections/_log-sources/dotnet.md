---
title: Ship .NET logs
logo:
  logofile: dotnet.svg
  orientation: vertical
data-source: .NET code
open-source:
  - title: logzio-dotnet
    github-repo: logzio-dotnet
contributors:
  - imnotashrimp
shipping-tags:
  - from-your-code
---

<!-- tabContainer:start -->
<div class="branching-container">

* [log4net](#log4net-config)
* [NLog](#nlog-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="log4net-config">

#### Configure log4net

**You'll need**:
log4net 2.0.8 or higher

<div class="tasklist">

##### Add the dependency to your project

If you're on Windows, navigate to your project's folder in the command line, and run this command to install the dependency.

```
Install-Package Logzio.DotNet.Log4net
```

If you're on a Mac or Linux machine, you can install the package using Visual Studio. Select **Project > Add NuGet Packages...**, and then search for `Logzio.DotNet.Log4net`.

##### Configure the appender

You can configure the appender in a configuration file or directly in the code.
Use the samples in the code blocks below as a starting point, and replace them with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code blocks.👇

  See the [log4net documentation](https://github.com/NLog/NLog/wiki/Configuration-file) for more information on the log4net configuration file.
  {:.info-box.read}

_Option 1: In a configuration file_

```xml
<log4net>
  <appender name="LogzioAppender" type="Logzio.DotNet.Log4net.LogzioAppender, Logzio.DotNet.Log4net">

    <!-- Replace these parameters with your configuration -->
    <token><<SHIPPING-TOKEN>></token>
    <type>log4net</type>
    <listenerUrl><<LISTENER-HOST>>:8071</listenerUrl>
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

_Option 2: In the code_

```csharp
var hierarchy = (Hierarchy)LogManager.GetRepository();
var logzioAppender = new LogzioAppender();

// Replace these parameters with your configuration
logzioAppender.AddToken("<<SHIPPING-TOKEN>>");
logzioAppender.AddType("log4net");
logzioAppender.AddListenerUrl("<<LISTENER-HOST>>:8071");
logzioAppender.AddBufferSize("100");
logzioAppender.AddBufferTimeout("00:00:05");
logzioAppender.AddRetriesMaxAttempts("3");
logzioAppender.AddRetriesInterval("00:00:02");
logzioAppender.AddDebug("false");

hierarchy.Root.AddAppender(logzioAppender);
hierarchy.Configured = true;
```

###### Parameters

token <span class="required-param"></span>
: Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). \\
  {% include log-shipping/replace-vars.html token=true %}

listenerUrl <span class="default-param">`https://listener.logz.io:8071`</span>
: Listener URL and port. \\
  {% include log-shipping/replace-vars.html listener=true %}

type <span class="default-param">`log4net`</span>
: The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
  Used by Logz.io for consistent parsing. Can't contain spaces.

bufferSize <span class="default-param">`100`</span>
: Maximum number of messages the logger will accumulate before sending them all as a bulk.

bufferTimeout <span class="default-param">`00:00:05`</span>
: Maximum time to wait for more log lines, as _hh:mm:ss.fff_.

retriesMaxAttempts <span class="default-param">`3`</span>
: Maximum number of attempts to connect to Logz.io.

retriesInterval <span class="default-param">`00:00:02`</span>
: Time to wait between retries, as _hh:mm:ss.fff_.

debug <span class="default-param">`false`</span>
: To print debug messsages to the console and trace log, `true`. Otherwise, `false`.

###### Code sample

```csharp
using System.IO;
using log4net;
using log4net.Config;
using System.Reflection;

namespace dotnet_log4net
{
  class Program
  {
    static void Main(string[] args)
    {
      var logger = LogManager.GetLogger(typeof(Program));
      var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());

      // Replace "App.config" with the config file that holds your log4net configuration
      XmlConfigurator.Configure(logRepository, new FileInfo("App.config"));

      logger.Info("Now I don't blame him 'cause he run and hid");
      logger.Info("But the meanest thing he ever did");
      logger.Info("Before he left was he went and named me Sue");

      LogManager.Shutdown();
    }
  }
}
```

</div>

### Custom fields

You can add static keys and values to be added to all log messages.
These custom fields must be children of `<appender>`, as shown here.

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

Change your configuration to use your new appender name.
For the example above, you'd use `MyAppLogzioAppender`.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="nlog-config">

#### Configure NLog

**You'll need**:
NLog 4.5.0 or higher

<div class="tasklist">

##### Add the dependency to your project

If you're on Windows, navigate to your project's folder in the command line, and run this command to install the dependency.

```
Install-Package Logzio.DotNet.NLog
```

If you’re on a Mac or Linux machine, you can install the package using Visual Studio. **Select Project > Add NuGet Packages...**, and then search for `Logzio.DotNet.NLog`.

##### Configure the appender

You can configure the appender in a configuration file or directly in the code.
Use the samples in the code blocks below as a starting point, and replace them with a configuration that matches your needs.

For a complete list of options, see the configuration parameters below the code blocks.👇

  See the [NLog documentation](https://github.com/NLog/NLog/wiki/Configuration-file) for more information on the NLog configuration file.
  {:.info-box.read}

_Option 1: In a configuration file_

```xml
<nlog>
  <extensions>
    <add assembly="Logzio.DotNet.NLog"/>
  </extensions>
  <targets>

    <!-- Replace these parameters with your configuration -->
    <target name="logzio" type="Logzio"
      token="<<SHIPPING-TOKEN>>"
      logzioType="nlog"
      listenerUrl="<<LISTENER-HOST>>:8071"
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

_Option 2: In the code_

```csharp
var config = new LoggingConfiguration();

// Replace these parameters with your configuration
var logzioTarget = new LogzioTarget {
  Token = "<<SHIPPING-TOKEN>>",
  LogzioType = "nlog",
  ListenerUrl = "<<LISTENER-HOST>>:8071",
  BufferSize = "100",
  BufferTimeout = "00:00:05",
  RetriesMaxAttempts = "3",
  RetriesInterval = "00:00:02",
  Debug = "false",
};

config.AddTarget("Logzio", logzioTarget);
config.AddRule(LogLevel.Debug, LogLevel.Fatal, "Logzio", "*");
LogManager.Configuration = config;
```

###### Parameters

token <span class="required-param"></span>
: Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). \\
  {% include log-shipping/replace-vars.html token=true %}

listenerUrl <span class="default-param">`https://listener.logz.io:8071`</span>
: Listener URL and port. \\
  {% include log-shipping/replace-vars.html listener=true %}

logzioType <span class="default-param">`nlog`</span>
: The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
  Used by Logz.io for consistent parsing. Can't contain spaces.

bufferSize <span class="default-param">`100`</span>
: Maximum number of messages the logger will accumulate before sending them all as a bulk.

bufferTimeout <span class="default-param">`00:00:05`</span>
: Maximum time to wait for more log lines, as _hh:mm:ss.fff_.

retriesMaxAttempts <span class="default-param">`3`</span>
: Maximum number of attempts to connect to Logz.io.

retriesInterval <span class="default-param">`00:00:02`</span>
: Time to wait between retries, as _hh:mm:ss.fff_.

debug <span class="default-param">`false`</span>
: To print debug messsages to the console and trace log, `true`. Otherwise, `false`.

###### Code sample

```csharp
using System;
using System.IO;
using Logzio.DotNet.NLog;
using NLog;
using NLog.Config;
using NLog.Fluent;

namespace LogzioNLogSampleApplication
{
  public class Program
  {
    static void Main(string[] args)
    {
      var logger = LogManager.GetCurrentClassLogger();

      logger.Info()
        .Message("If you'll be my bodyguard")
        .Property("iCanBe", "your long lost pal")
        .Property("iCanCallYou", "Betty, and Betty when you call me")
        .Property("youCanCallMe", "Al")
        .Write();

      LogManager.Shutdown();
    }
  }
}
```

### Context properties

You can configure the target to include your own custom values when forwarding to Logz.io. For example:

```xml
<nlog>
  <variable name="site" value="New Zealand" />
  <variable name="rings" value="one" />
  <target name="logzio" type="Logzio" token="<<SHIPPING-TOKEN>>">
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
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
