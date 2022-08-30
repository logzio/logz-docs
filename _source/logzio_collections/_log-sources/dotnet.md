---
title: Ship .NET logs
logo:
  logofile: dotnet.svg
  orientation: vertical
short-description: Configure a .NET appender in a configuration file or add it directly to the code to send your logs to Logz.io.
data-source: .NET code
data-for-product-source: Logs
templates: ["library"]
open-source:
  - title: logzio-dotnet
    github-repo: logzio-dotnet
contributors:
  - imnotashrimp
  - savidov
  - yberlinger
shipping-tags:
  - from-your-code
order: 230
---

<!-- tabContainer:start -->
<div class="branching-container">

* [log4net](#log4net-config)
* [NLog](#nlog-config)
* [LoggerFactory](#loggerfactory)
* [Serilog](#serilog)
{:.branching-tabs}

<!-- tab:start -->
<div id="log4net-config">

#### Configure log4net

**Before you begin, you'll need**:

* log4net 2.0.8 or higher
* .NET Core SDK version 2.0 or higher
* .NET Framework version 4.6.1 or higher

<div class="tasklist">

##### Add the dependency to your project

If you're on Windows, navigate to your project's folder in the command line, and run this command to install the dependency.

```
Install-Package Logzio.DotNet.Log4net
```

If you're on a Mac or Linux machine, you can install the package using Visual Studio. Select **Project > Add NuGet Packages...**, and then search for `Logzio.DotNet.Log4net`.

##### Configure the appender

You can configure the appender in a configuration file or directly in the code.
Use the samples in the code blocks below as a starting point, and replace them with a configuration that matches your needs. See [log4net documentation 🔗](https://github.com/apache/logging-log4net) to learn more about configuration options.

For a complete list of options, see the configuration parameters below the code blocks.👇

###### Option 1: In a configuration file

```xml
<log4net>
  <appender name="LogzioAppender" type="Logzio.DotNet.Log4net.LogzioAppender, Logzio.DotNet.Log4net">

    <!-- Replace these parameters with your configuration -->
    <token><<LOG-SHIPPING-TOKEN>></token>
    <type>log4net</type>
    <listenerUrl>https://<<LISTENER-HOST>>:8071</listenerUrl>
    <bufferSize>100</bufferSize>
    <bufferTimeout>00:00:05</bufferTimeout>
    <retriesMaxAttempts>3</retriesMaxAttempts>
    <retriesInterval>00:00:02</retriesInterval>
    <gzip>true</gzip>
    <debug>false</debug>
    <jsonKeysCamelCase>false</jsonKeysCamelCase>
    <!--<parseJsonMessage>true</parseJsonMessage>-->
    
  </appender>

  <root>
    <level value="INFO" />
    <appender-ref ref="LogzioAppender" />
  </root>
</log4net>
```

Add a reference to the configuration file in your code, as shown in the example [here](https://github.com/logzio/logzio-dotnet/blob/master/sample-applications/LogzioLog4netSampleApplication/Program.cs).

###### Option 2: In the code

```csharp
var hierarchy = (Hierarchy)LogManager.GetRepository();
var logzioAppender = new LogzioAppender();

// Replace these parameters with your configuration
logzioAppender.AddToken("<<LOG-SHIPPING-TOKEN>>");
logzioAppender.AddType("log4net");
logzioAppender.AddListenerUrl("https://<<LISTENER-HOST>>:8071");
logzioAppender.AddBufferSize(100);
logzioAppender.AddBufferTimeout(TimeSpan.FromSeconds(5));
logzioAppender.AddRetriesMaxAttempts(3);
logzioAppender.AddRetriesInterval(TimeSpan.FromSeconds(2));
logzioAppender.AddDebug(false);
logzioAppender.AddGzip(true);
logzioAppender.JsonKeysCamelCase(false);
// <-- Uncomment and edit this line to enable proxy routing: --> 
// logzioAppender.AddProxyAddress("http://your.proxy.com:port");
// <-- Uncomment this to parse messages as JSON -->  
// logzioAppender.ParseJsonMessage(true);
hierarchy.Root.AddAppender(logzioAppender);
hierarchy.Configured = true;
```

###### Parameters

| Parameter | Description | Default/Required |
|---|---|---|
| token | Your [Logz.io log shipping token](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=logs) securely directs the data to your Logz.io account. {% include log-shipping/log-shipping-token.html %} | Required |
| listenerUrl  | Listener URL and port. {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| type | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. | `log4net` |
| bufferSize | Maximum number of messages the logger will accumulate before sending them all as a bulk. | `100` |
| bufferTimeout | Maximum time to wait for more log lines, as _hh:mm:ss.fff_. | `00:00:05` |
| retriesMaxAttempts | Maximum number of attempts to connect to Logz.io. | `3` |
| retriesInterval | Time to wait between retries, as _hh:mm:ss.fff_. | `00:00:02` |
| gzip | To compress the data before shipping, `true`. Otherwise, `false`. | `false` |
| debug | To print debug messages to the console and trace log, `true`. Otherwise, `false`. | `false`
| parseJsonMessage | To parse your message as JSON format, add this field and set it to `true`. | `false` |
| proxyAddress | Proxy address to route your logs through. | `None` |
| jsonKeysCamelCase | If you have custom fields keys that start with a capital letter and want to see the fields with a capital letter in Logz.io, set this field to true. | `false` |

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
  </customField>
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

**Before you begin, you'll need**:

* NLog 4.5.0 or higher
* .NET Core SDK version 2.0 or higher
* .NET Framework version 4.6.1 or higher


<div class="tasklist">

##### Add the dependency to your project

If you're on Windows, navigate to your project's folder in the command line, and run this command to install the dependency.

```
Install-Package Logzio.DotNet.NLog
```

If you’re on a Mac or Linux machine, you can install the package using Visual Studio. **Select Project > Add NuGet Packages...**, and then search for `Logzio.DotNet.NLog`.

##### Configure the appender

You can configure the appender in a configuration file or directly in the code.
Use the samples in the code blocks below as a starting point, and replace them with a configuration that matches your needs. See [NLog documentation 🔗](https://github.com/NLog/NLog/wiki/Configuration-file) to learn more about configuration options.

For a complete list of options, see the configuration parameters below the code blocks.👇

###### Option 1: In a configuration file

```xml
<nlog>
  <extensions>
    <add assembly="Logzio.DotNet.NLog"/>
  </extensions>
  <targets>

    <!-- Replace these parameters with your configuration -->
    <target name="logzio" type="Logzio"
      token="<<LOG-SHIPPING-TOKEN>>"
      logzioType="nlog"
      listenerUrl="https://<<LISTENER-HOST>>:8071"
      bufferSize="100"
      bufferTimeout="00:00:05"
      retriesMaxAttempts="3"
      retriesInterval="00:00:02"
      debug="false"
      jsonKeysCamelCase="false" 
     >
      <!-- parseJsonMessage="true" -->  <!-- include in previous section -->    

      <contextproperty name="host" layout="${machinename}" />
      <contextproperty name="threadid" layout="${threadid}" />
    </target>
  </targets>
  <rules>
      <logger name="*" minlevel="Info" writeTo="logzio" />
  </rules>
</nlog>
```

###### Option 2: In the code

```csharp
var config = new LoggingConfiguration();

// Replace these parameters with your configuration
var logzioTarget = new LogzioTarget {
  Name = "Logzio",
  Token = "<<LOG-SHIPPING-TOKEN>>",
  LogzioType = "nlog",
  ListenerUrl = "https://<<LISTENER-HOST>>:8071",
  BufferSize = 100,
  BufferTimeout = TimeSpan.Parse("00:00:05"),
  RetriesMaxAttempts = 3,
  RetriesInterval = TimeSpan.Parse("00:00:02"),
  Debug = false,
  JsonKeysCamelCase = false,
  // ParseJsonMessage = true,
  // ProxyAddress = "http://your.proxy.com:port"
};

config.AddRule(LogLevel.Debug, LogLevel.Fatal, logzioTarget);
LogManager.Configuration = config;
```

###### Parameters

| Parameter | Description | Default/Required |
|---|---|---|
| token | Y[Logz.io log shipping token](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=logs) securely directs the data to your Logz.io account. {% include log-shipping/log-shipping-token.html %} | Required |
| listenerUrl  | Listener URL and port. {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| type | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. | `nlog` |
| bufferSize | Maximum number of messages the logger will accumulate before sending them all as a bulk. | `100` |
| bufferTimeout | Maximum time to wait for more log lines, as _hh:mm:ss.fff_. | `00:00:05` |
| retriesMaxAttempts | Maximum number of attempts to connect to Logz.io. | `3` |
| retriesInterval | Time to wait between retries, as _hh:mm:ss.fff_. | `00:00:02` |
| debug | To print debug messages to the console and trace log, `true`. Otherwise, `false`. | `false` |
| parseJsonMessage | To parse your message as JSON format, add this field and set it to `true`. | `false` |
| proxyAddress | Proxy address to route your logs through. | `None` |
| jsonKeysCamelCase | If you have custom fields keys that start with a capital letter and want to see the fields with a capital letter in Logz.io, set this field to true. | `false` |

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

### Include context properties

You can configure the target to include your own custom values when forwarding logs to Logz.io. For example:

```xml
<nlog>
  <variable name="site" value="New Zealand" />
  <variable name="rings" value="one" />
  <target name="logzio" type="Logzio" token="<<LOG-SHIPPING-TOKEN>>">
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

### Json Layout

When using 'JsonLayout' set the name of the attribute to **other than** 'message'. for example:

```xml
<layout type="JsonLayout" includeAllProperties="true">
 <attribute name="msg"  layout="${message}" encode="false"/>
</layout>
```

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="loggerfactory">

#### Configure log4net

**Before you begin, you'll need**:

* log4net 2.0.8 or higher
* .NET Core SDK version 2.0 or higher
* .NET Framework version 4.6.1 or higher


<div class="tasklist">

##### Add the dependency to your project

If you're on Windows, navigate to your project's folder in the command line, and run these commands to install the dependencies.

```
Install-Package Logzio.DotNet.Log4net
```

```
Install-Package Microsoft.Extensions.Logging.Log4Net.AspNetCore
```

If you're on a Mac or Linux machine, you can install the package using Visual Studio. Select **Project > Add NuGet Packages...**, and then search for `Logzio.DotNet.Log4net` and `Microsoft.Extensions.Logging.Log4Net.AspNetCore`.

##### Configure the appender

You can configure the appender in a configuration file or directly in the code.
Use the samples in the code blocks below as a starting point, and replace them with a configuration that matches your needs. See [log4net documentation 🔗](https://github.com/apache/logging-log4net) to learn more about configuration options.

For a complete list of options, see the configuration parameters below the code blocks.👇

###### Option 1: In a configuration file

```xml
<log4net>
  <appender name="LogzioAppender" type="Logzio.DotNet.Log4net.LogzioAppender, Logzio.DotNet.Log4net">

    <!-- Replace these parameters with your configuration -->
    <token><<LOG-SHIPPING-TOKEN>></token>
    <type>log4net</type>
    <listenerUrl>https://<<LISTENER-HOST>>:8071</listenerUrl>
    <bufferSize>100</bufferSize>
    <bufferTimeout>00:00:05</bufferTimeout>
    <retriesMaxAttempts>3</retriesMaxAttempts>
    <retriesInterval>00:00:02</retriesInterval>
    <gzip>true</gzip>
    <debug>false</debug>
    <jsonKeysCamelCase>false</jsonKeysCamelCase>
    <!--<parseJsonMessage>true</parseJsonMessage>-->
    
  </appender>

  <root>
    <level value="INFO" />
    <appender-ref ref="LogzioAppender" />
  </root>
</log4net>
```

###### Option 2: In the code

```csharp
var hierarchy = (Hierarchy)LogManager.GetRepository();
var logzioAppender = new LogzioAppender();

// Replace these parameters with your configuration
logzioAppender.AddToken("<<LOG-SHIPPING-TOKEN>>");
logzioAppender.AddType("log4net");
logzioAppender.AddListenerUrl("https://<<LISTENER-HOST>>:8071");
logzioAppender.AddBufferSize("100");
logzioAppender.AddBufferTimeout("00:00:05");
logzioAppender.AddRetriesMaxAttempts("3");
logzioAppender.AddRetriesInterval("00:00:02");
logzioAppender.AddDebug(false);
logzioAppender.AddGzip(true);
logzioAppender.JsonKeysCamelCase(false);
// <-- Uncomment and edit this line to enable proxy routing: --> 
// logzioAppender.AddProxyAddress("http://your.proxy.com:port");
// <-- Uncomment this to prase messages as Json -->  
// logzioAppender.ParseJsonMessage(true);
hierarchy.Root.AddAppender(logzioAppender);
hierarchy.Configured = true;
```

###### Parameters

| Parameter | Description | Default/Required |
|---|---|---|
| token | [Logz.io log shipping token](https://app.logz.io/#/dashboard/settings/manage-tokens/data-shipping?product=logs) securely directs the data to your Logz.io account. {% include log-shipping/log-shipping-token.html %} | Required |
| listenerUrl  | Listener URL and port. {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| type | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. | `log4net` |
| bufferSize | Maximum number of messages the logger will accumulate before sending them all in bulk. | `100` |
| bufferTimeout | Maximum time to wait for more log lines, as _hh:mm:ss.fff_. | `00:00:05` |
| retriesMaxAttempts | Maximum number of attempts to connect to Logz.io. | `3` |
| retriesInterval | Time to wait between retries, as _hh:mm:ss.fff_. | `00:00:02` |
| gzip | To compress the data before shipping, `true`. Otherwise, `false`. | `false` |
| debug | To print debug messages to the console and trace log, `true`. Otherwise, `false`. | `false`
| parseJsonMessage | To parse your message as JSON format, add this field and set it to `true`. | `false` |
| proxyAddress | Proxy address to route your logs through. | `None` |
| jsonKeysCamelCase | If you have custom fields keys that start with capital letter and want to see the fields with capital letter in Logz.io, set this field to true. | `false` |

###### Code sample

###### ASP.NET Core

Update Startup.cs file in Configure method to include the Log4Net middleware as in the code below.

```csharp
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
    {
        ...
        
        loggerFactory.AddLog4Net();
        
        ...
    } 
```

In the Controller, add Data Member and Constructor, as in the code below.

```csharp
    private readonly ILoggerFactory _loggerFactory;
    
    public ExampleController(ILoggerFactory loggerFactory, ...)
        {
            _loggerFactory = loggerFactory;
            
            ...
        }
```

In the Controller methods:

```csharp
    [Route("<PUT_HERE_YOUR_ROUTE>")]
    public ActionResult ExampleMethod()
    {
        var logger = _loggerFactory.CreateLogger<ExampleController>();
        var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            
        // Replace "App.config" with the config file that holds your log4net configuration
        XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));
            
        logger.LogInformation("Hello");
        logger.LogInformation("Is it me you looking for?");
            
        LogManager.Shutdown();
            
        return Ok();
    }
```

###### .NET Core Desktop Application

```csharp
    using System.IO;
    using System.Reflection;
    using log4net;
    using log4net.Config;
    using Microsoft.Extensions.Logging;

    namespace LoggerFactoryAppender
    {
        class Program
        {
            static void Main(string[] args)
            {
                ILoggerFactory loggerFactory = new LoggerFactory();
                loggerFactory.AddLog4Net();

                var logger = loggerFactory.CreateLogger<Program>();
                var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());

                // Replace "App.config" with the config file that holds your log4net configuration
                XmlConfigurator.Configure(logRepository, new FileInfo("log4net.config"));

                logger.LogInformation("Hello");
                logger.LogInformation("Is it me you looking for?");
                
                LogManager.Shutdown();
            }
        }
    }
```

</div>

### Custom fields

You can add static keys and values to all log messages.
These custom fields must be children of `<appender>`, as shown in the code below.

```xml
<appender name="LogzioAppender" type="Logzio.DotNet.Log4net.LogzioAppender, Logzio.DotNet.Log4net">
  <customField>
    <key>Environment</key>
    <value>Production</value>
  </customField>
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
<div id="serilog">

#### Configure Serilog

Serilog is a structural logging library for Microsoft providing diagnostic logging to files, the console, and elsewhere.
  
<!-- info-box-start:info -->
This integration is based on [Serilog.Sinks.Logz.Io repository](https://github.com/serilog-contrib/Serilog.Sinks.Logz.Io).
{:.info-box.note}
<!-- info-box-end -->
  
  
**Before you begin, you'll need**:

* log4net 2.0.8 or higher
* .NET Core SDK version 2.0 or higher
* .NET Framework version 4.6.1 or higher


<div class="tasklist">

##### Install the Logz.io Serilog sink

Install `Serilog.Sinks.Logz.Io` by running the following command in the Package Manager Console:

```shell
PM> Install-Package Serilog.Sinks.Logz.Io
```
or by using Nuget
##### Configure the sink

Add the following code to the configuration of `Serilog.Settings.Configuration`:

```json
{
  "Serilog": {
    "MinimumLevel": "Warning",
    "WriteTo": [
      {
        "Name": "LogzIoDurableHttp",
        "Args": {
          "requestUri": "<<LISTENER-HOST>>:8071/?type=app&token=<<LOG-SHIPPING-TOKEN>>"
        }
      }
    ]
  }
}
```

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 


</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->
