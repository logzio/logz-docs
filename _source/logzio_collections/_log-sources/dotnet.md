---
title: Ship .NET logs
logo:
  logofile: dotnet.svg
  orientation: vertical
short-description: Configure a .NET appender in a configuration file or add it directly to the code to send your logs to Logz.io.
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
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
  - ralongit
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
    	<!-- 
		Required fields 
	-->
	<!-- Your Logz.io log shipping token -->
	<token><<LOG-SHIPPING-TOKEN>></token>
			
	<!-- 
		Optional fields (with their default values) 
	-->
	<!-- The type field will be added to each log message, making it 
	easier for you to differ between different types of logs. -->
    	<type>log4net</type>
	<!-- The URL of the Logz.io listener -->
    	<listenerUrl>https://<<LISTENER-HOST>>:8071</listenerUrl>
        <!--Optional proxy server address:
        proxyAddress = "http://your.proxy.com:port" -->
	<!-- The maximum number of log lines to send in each bulk -->
    	<bufferSize>100</bufferSize>
	<!-- The maximum time to wait for more log lines, in a hh:mm:ss.fff format -->
    	<bufferTimeout>00:00:05</bufferTimeout>
	<!-- If connection to Logz.io API fails, how many times to retry -->
    	<retriesMaxAttempts>3</retriesMaxAttempts>
    	<!-- Time to wait between retries, in a hh:mm:ss.fff format -->
	<retriesInterval>00:00:02</retriesInterval>
	<!-- Set the appender to compress the message before sending it -->
	<gzip>true</gzip>
	<!-- Uncomment this to enable sending logs in Json format -->
	<!--<parseJsonMessage>true</parseJsonMessage>-->
	<!-- Enable the appender's internal debug logger (sent to the console output and trace log) -->
	<debug>false</debug>
	<!-- If you have custom fields keys that start with capital letter and want to see the fields 
	with capital letter in Logz.io, set this field to true. The default is false 
	(first letter will be small letter). -->
	<jsonKeysCamelCase>false</jsonKeysCamelCase>
	<!-- Add trace context (traceId and spanId) to each log. The default is false -->
	<addTraceContext>false</addTraceContext>
    <!-- Use the same static HTTP/s client for sending logs. The default is false -->
	<UseStaticHttpClient>false</addTraceContext>
    
    </appender>
    
    <root>
    	<level value="INFO" />
    	<appender-ref ref="LogzioAppender" />
    </root>
</log4net>
```

Add a reference to the configuration file in your code, as shown in the example [here](https://github.com/logzio/logzio-dotnet/blob/master/sample-applications/LogzioLog4netSampleApplication/Program.cs).
	
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
	

###### Option 2: In the code

```csharp
var hierarchy = (Hierarchy)LogManager.GetRepository();
var logzioAppender = new LogzioAppender();
logzioAppender.AddToken("<<LOG-SHIPPING-TOKEN>>");
logzioAppender.AddListenerUrl("<<LISTENER-HOST>>");
// <-- Uncomment and edit this line to enable proxy routing: --> 
// logzioAppender.AddProxyAddress("http://your.proxy.com:port");
// <-- Uncomment this to enable sending logs in Json format -->  
// logzioAppender.ParseJsonMessage(true);
// <-- Uncomment these lines to enable gzip compression --> 
// logzioAppender.AddGzip(true);
// logzioAppender.ActivateOptions();
// logzioAppender.JsonKeysCamelCase(false);
// logzioAppender.AddTraceContext(false);
logzioAppender.ActivateOptions();
hierarchy.Root.AddAppender(logzioAppender);
hierarchy.Root.Level = Level.All;
hierarchy.Configured = true;
```
	

###### Code sample

```csharp
using log4net;
using log4net.Core;
using log4net.Repository.Hierarchy;
using Logzio.DotNet.Log4net;

namespace dotnet_log4net
{
    class Program
    {
        static void Main(string[] args)
        {
            var hierarchy = (Hierarchy)LogManager.GetRepository();
            var logger = LogManager.GetLogger(typeof(Program));
            var logzioAppender = new LogzioAppender();
            
            logzioAppender.AddToken("<<LOG-SHIPPING-TOKEN>>");
            logzioAppender.AddListenerUrl("https://<<LISTENER-HOST>>:8071");
            // <-- Uncomment and edit this line to enable proxy routing: --> 
            // logzioAppender.AddProxyAddress("http://your.proxy.com:port");
            // <-- Uncomment this to enable sending logs in Json format -->  
            // logzioAppender.ParseJsonMessage(true);
            // <-- Uncomment these lines to enable gzip compression --> 
            // logzioAppender.AddGzip(true);
            // logzioAppender.ActivateOptions();
            // logzioAppender.JsonKeysCamelCase(false)
            // logzioAppender.AddTraceContext(false);
            logzioAppender.ActivateOptions();
            
            hierarchy.Root.AddAppender(logzioAppender);
            hierarchy.Configured = true;
            hierarchy.Root.Level = Level.All;

            logger.Info("Now I don't blame him 'cause he run and hid");
            logger.Info("But the meanest thing he ever did");
            logger.Info("Before he left was he went and named me Sue");

            LogManager.Shutdown();
        }
    }
}
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
| addTraceContext | If want to add trace context to each log, set this field to true. | `false` |


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
  protected override void ExtendValues(LoggingEvent loggingEvent, Dictionary<string, object> values)
  {
    values["logger"] = "MyPrefix." + values["logger"];
    values["myAppClientId"] = new ClientIdProvider().Get();
  }
}
```

Change your configuration to use your new appender name.
For the example above, you'd use `MyAppLogzioAppender`.

### Add trace context

<!-- info-box-start:info -->
The Trace Context feature does not support .NET Standard 1.3.
{:.info-box.note}
<!-- info-box-end -->

If you’re sending traces with OpenTelemetry instrumentation (auto or manual), you can correlate your logs with the trace context. In this way, your logs will have traces data in it: `span id` and `trace id`. To enable this feature, set `<addTraceContext>true</addTraceContext>` in your configuration file or `logzioAppender.AddTraceContext(true);` in your code. For example:

```csharp
using log4net;
using log4net.Core;
using log4net.Repository.Hierarchy;
using Logzio.DotNet.Log4net;

namespace dotnet_log4net
{
    class Program
    {
        static void Main(string[] args)
        {
            var hierarchy = (Hierarchy)LogManager.GetRepository();
            var logger = LogManager.GetLogger(typeof(Program));
            var logzioAppender = new LogzioAppender();
            
            logzioAppender.AddToken("<<LOG-SHIPPING-TOKEN>>");
            logzioAppender.AddListenerUrl("https://<<LISTENER-HOST>>:8071");
            // <-- Uncomment and edit this line to enable proxy routing: --> 
            // logzioAppender.AddProxyAddress("http://your.proxy.com:port");
            // <-- Uncomment this to enable sending logs in Json format -->  
            // logzioAppender.ParseJsonMessage(true);
            // <-- Uncomment these lines to enable gzip compression --> 
            // logzioAppender.AddGzip(true);
            // logzioAppender.ActivateOptions();
            // logzioAppender.JsonKeysCamelCase(false)
            // logzioAppender.UseStaticHttpClient(false);

            logzioAppender.AddTraceContext(true);
            logzioAppender.ActivateOptions();
            
            hierarchy.Root.AddAppender(logzioAppender);
            hierarchy.Configured = true;
            hierarchy.Root.Level = Level.All;

            logger.Info("Now I don't blame him 'cause he run and hid");
            logger.Info("But the meanest thing he ever did");
            logger.Info("Before he left was he went and named me Sue");

            LogManager.Shutdown();
        }
    }
}
```

### Serverless platforms
If you’re using a serverless function, you’ll need to call the appender's flush method at the end of the function run to make sure the logs are sent before the function finishes its execution. You’ll also need to create a static appender in the Startup.cs file so each invocation will use the same appender. The appender should have the `UseStaticHttpClient` flag set to `true`.

###### Azure serverless function code sample
*Startup.cs*
```csharp
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using log4net;
using log4net.Repository.Hierarchy;
using Logzio.DotNet.Log4net;

[assembly: FunctionsStartup(typeof(LogzioLog4NetSampleApplication.Startup))]

namespace LogzioLog4NetSampleApplication
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var hierarchy = (Hierarchy)LogManager.GetRepository();
            var logzioAppender = new LogzioAppender();
            logzioAppender.AddToken("<<LOG-SHIPPING-TOKEN>>");
            logzioAppender.AddListenerUrl("https://<<LISTENER-HOST>>:8071");
            logzioAppender.ActivateOptions();
            logzioAppender.UseStaticHttpClient(true);
            hierarchy.Root.AddAppender(logzioAppender);
            hierarchy.Configured = true;
        }
    }
}

```

*FunctionApp.cs*
```csharp
using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using log4net;
using MicrosoftLogger = Microsoft.Extensions.Logging.ILogger;

namespace LogzioLog4NetSampleApplication
{
    public class TimerTriggerCSharpLog4Net
    {
        
        private static readonly ILog logger = LogManager.GetLogger(typeof(TimerTriggerCSharpLog4Net));

        [FunctionName("TimerTriggerCSharpLog4Net")]
        public void Run([TimerTrigger("*/30 * * * * *")]TimerInfo myTimer, MicrosoftLogger msLog)
        {
            msLog.LogInformation($"Log4Net C# Timer trigger function executed at: {DateTime.Now}");

            logger.Info("Now I don't blame him 'cause he run and hid");
            logger.Info("But the meanest thing he ever did");
            logger.Info("Before he left was he went and named me Sue");
            LogManager.Flush(5000);

            msLog.LogInformation($"Log4Net C# Timer trigger function finished at: {DateTime.Now}");
        }
    }
}
```


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
	<!-- parameters are shown here with their default values. 
	Other than the token, all of the fields are optional and can be safely omitted.            
        -->

	<target name="logzio" type="Logzio"
		token="<<SHIPPING-TOKEN>>"
		logzioType="nlog"
		listenerUrl="<<LISTENER-HOST>>:8071"
                <!--Optional proxy server address:
                proxyAddress = "http://your.proxy.com:port" -->
		bufferSize="100"
		bufferTimeout="00:00:05"
		retriesMaxAttempts="3"
		retriesInterval="00:00:02"
		includeEventProperties="true"
		useGzip="false"
		debug="false"
		jsonKeysCamelCase="false"
		addTraceContext="false"
		<!-- parseJsonMessage="true"-->
        <!-- useStaticHttpClient="false"-->        
        >
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
    Token = "<<SHIPPING-TOKEN>>",
    LogzioType = "nlog",
    ListenerUrl = "<<LISTENER-HOST>>:8071",
    BufferSize = 100,
    BufferTimeout = TimeSpan.Parse("00:00:05"),
    RetriesMaxAttempts = 3,
    RetriesInterval = TimeSpan.Parse("00:00:02"),
    Debug = false,
    JsonKeysCamelCase = false,
    AddTraceContext = false,
    // ParseJsonMessage = true, 
    // ProxyAddress = "http://your.proxy.com:port",
    // UseStaticHttpClient = false, 
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
| addTraceContext | If want to add trace context to each log, set this field to true. | `false` |
| useStaticHttpClient | If want to use the same static HTTP/s client for sending logs, set this field to true. | `false` |

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
  protected override void ExtendValues(LogEventInfo logEvent, Dictionary<string, object> values)
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

### Add trace context

<!-- info-box-start:info -->
The Trace Context feature does not support .NET Standard 1.3.
{:.info-box.note}
<!-- info-box-end -->

If you’re sending traces with OpenTelemetry instrumentation (auto or manual), you can correlate your logs with the trace context. In this way, your logs will have traces data in it: `span id` and `trace id`. To enable this feature, set `addTraceContext="true"` in your configuration file or `AddTraceContext = true` in your code. For example:

```csharp
var config = new LoggingConfiguration();

// Replace these parameters with your configuration
var logzioTarget = new LogzioTarget {
    Name = "Logzio",
    Token = "<<SHIPPING-TOKEN>>",
    LogzioType = "nlog",
    ListenerUrl = "<<LISTENER-HOST>>:8071",
    BufferSize = 100,
    BufferTimeout = TimeSpan.Parse("00:00:05"),
    RetriesMaxAttempts = 3,
    RetriesInterval = TimeSpan.Parse("00:00:02"),
    Debug = false,
    JsonKeysCamelCase = false,
    AddTraceContext = true,
    // ParseJsonMessage = true, 
    // ProxyAddress = "http://your.proxy.com:port"
    
};

config.AddRule(LogLevel.Debug, LogLevel.Fatal, logzioTarget);
LogManager.Configuration = config;
```

##### Serverless platforms
If you’re using a serverless function, you’ll need to call the appender's flush method at the end of the function run to make sure the logs are sent before the function finishes its execution. You’ll also need to create a static appender in the Startup.cs file so each invocation will use the same appender. The appender should have the `UseStaticHttpClient` flag set to `true`.

###### Azure serverless function code sample

*Startup.cs*

```csharp
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Logzio.DotNet.NLog;
using NLog;
using NLog.Config;
using System;

[assembly: FunctionsStartup(typeof(LogzioNLogSampleApplication.Startup))]

namespace LogzioNLogSampleApplication
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var config = new LoggingConfiguration();

            // Replace these parameters with your configuration
            var logzioTarget = new LogzioTarget
            {
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
                AddTraceContext = false,
                UseStaticHttpClient = true, 
                // ParseJsonMessage = true,
                // ProxyAddress = "http://your.proxy.com:port"
            };

            config.AddRule(NLog.LogLevel.Debug, NLog.LogLevel.Fatal, logzioTarget);
            LogManager.Configuration = config;
        }
    }
}
```

*FunctionApp.cs*

```csharp
using System;
using Microsoft.Azure.WebJobs;
using NLog;
using Microsoft.Extensions.Logging;
using MicrosoftLogger = Microsoft.Extensions.Logging.ILogger;

namespace LogzioNLogSampleApplication
{
    public class TimerTriggerCSharpNLog
    {
        private static readonly Logger nLog = LogManager.GetCurrentClassLogger();

        [FunctionName("TimerTriggerCSharpNLog")]
        public void Run([TimerTrigger("*/30 * * * * *")]TimerInfo myTimer, MicrosoftLogger msLog)
        {
            msLog.LogInformation($"NLogzio C# Timer trigger function executed at: {DateTime.Now}");

            nLog.WithProperty("iCanBe", "your long lost pal")
                .WithProperty("iCanCallYou", "Betty, and Betty when you call me")
                .WithProperty("youCanCallMe", "Al")
                .Info("If you'll be my bodyguard");
            // Call Flush method before function trigger finishes
            LogManager.Flush(5000);
        }
    }
}
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
    	<!-- 
		Required fields 
	-->
	<!-- Your Logz.io log shipping token -->
	<token><<LOG-SHIPPING-TOKEN>></token>
			
	<!-- 
		Optional fields (with their default values) 
	-->
	<!-- The type field will be added to each log message, making it 
	easier for you to differ between different types of logs. -->
    	<type>log4net</type>
	<!-- The URL of the Logz.io listener -->
    	<listenerUrl>https://<<LISTENER-HOST>>:8071</listenerUrl>
        <!--Optional proxy server address:
        proxyAddress = "http://your.proxy.com:port" -->
	<!-- The maximum number of log lines to send in each bulk -->
    	<bufferSize>100</bufferSize>
	<!-- The maximum time to wait for more log lines, in a hh:mm:ss.fff format -->
    	<bufferTimeout>00:00:05</bufferTimeout>
	<!-- If connection to Logz.io API fails, how many times to retry -->
    	<retriesMaxAttempts>3</retriesMaxAttempts>
    	<!-- Time to wait between retries, in a hh:mm:ss.fff format -->
	<retriesInterval>00:00:02</retriesInterval>
	<!-- Set the appender to compress the message before sending it -->
	<gzip>true</gzip>
	<!-- Enable the appender's internal debug logger (sent to the console output and trace log) -->
	<debug>false</debug>
        <!-- Set to true if you want json keys in Logz.io to be in camel case. The default is false. -->
        <jsonKeysCamelCase>false</jsonKeysCamelCase>
        <!-- Add trace context (traceId and spanId) to each log. The default is false -->
        <addTraceContext>false</addTraceContext>
        <!-- Use the same static HTTP/s client for sending logs. The default is false -->
	    <useStaticHttpClient>false</useStaticHttpClient>

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
logzioAppender.AddToken("<<LOG-SHIPPING-TOKEN>>");
logzioAppender.AddListenerUrl("<<LISTENER-HOST>>");
// Uncomment and edit this line to enable proxy routing: 
// logzioAppender.AddProxyAddress("http://your.proxy.com:port");
// Uncomment these lines to enable gzip compression 
// logzioAppender.AddGzip(true);
// logzioAppender.ActivateOptions();
// logzioAppender.JsonKeysCamelCase(false);
// logzioAppender.AddTraceContext(false);
// logzioAppender.UseStaticHttpClient(false);
logzioAppender.ActivateOptions();
hierarchy.Root.AddAppender(logzioAppender);
hierarchy.Root.Level = Level.All;
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
| addTraceContext | If want to add trace context to each log, set this field to true. | `false` |
| useStaticHttpClient | If want to use the same static HTTP/s client for sending logs, set this field to true. | `false` |

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
  protected override void ExtendValues(LoggingEvent loggingEvent, Dictionary<string, object> values)
  {
    values["logger"] = "MyPrefix." + values["logger"];
    values["myAppClientId"] = new ClientIdProvider().Get();
  }
}
```

Change your configuration to use your new appender name.
For the example above, you'd use `MyAppLogzioAppender`.

### Add trace context

<!-- info-box-start:info -->
The Trace Context feature does not support .NET Standard 1.3.
{:.info-box.note}
<!-- info-box-end -->

If you’re sending traces with OpenTelemetry instrumentation (auto or manual), you can correlate your logs with the trace context. In this way, your logs will have traces data in it: `span id` and `trace id`. To enable this feature, set `addTraceContext="true"` in your configuration file or `AddTraceContext = true` in your code. For example:

```csharp
var hierarchy = (Hierarchy)LogManager.GetRepository();
var logzioAppender = new LogzioAppender();
logzioAppender.AddToken("<<LOG-SHIPPING-TOKEN>>");
logzioAppender.AddListenerUrl("<<LISTENER-HOST>>");
// Uncomment and edit this line to enable proxy routing: 
// logzioAppender.AddProxyAddress("http://your.proxy.com:port");
// Uncomment these lines to enable gzip compression 
// logzioAppender.AddGzip(true);
// logzioAppender.ActivateOptions();
// logzioAppender.JsonKeysCamelCase(false);
logzioAppender.AddTraceContext(true);
logzioAppender.ActivateOptions();
hierarchy.Root.AddAppender(logzioAppender);
hierarchy.Root.Level = Level.All;
hierarchy.Configured = true;
```

### Serverless platforms
If you’re using a serverless function, you’ll need to call the appender's flush methods at the end of the function run to make sure the logs are sent before the function finishes its execution. You’ll also need to create a static appender in the Startup.cs file so each invocation will use the same appender. 
Make sure 'debug' is set to false if the function is deployed as it might cause permission issues with debug files. 

###### Azure serverless function code sample
*Startup.cs*

```csharp
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using log4net;
using log4net.Config;
using System.IO;
using System.Reflection;
using System;
[assembly: FunctionsStartup(typeof(LogzioLoggerFactorySampleApplication.Startup))]

namespace LogzioLoggerFactorySampleApplication
{
    public class Startup : FunctionsStartup
    {
        public static ILoggerFactory LoggerFactory { get; set; }

        public override void Configure(IFunctionsHostBuilder builder)
        {
            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            string functionAppDirectory = Environment.GetEnvironmentVariable("AzureWebJobsScriptRoot");

            // Configure log4net here
            XmlConfigurator.Configure(logRepository, new FileInfo(Path.Combine(functionAppDirectory, "log4net.config")));

            var loggerFactory = new LoggerFactory();
            loggerFactory.AddLog4Net(Path.Combine(functionAppDirectory, "log4net.config")); // Use the log4net.config in the function app root directory

            LoggerFactory = loggerFactory;
        }
    }
}
```
*FunctionApp.cs*

```csharp
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using log4net;
using System;

namespace LogzioLoggerFactorySampleApplication
{
    public class TimerTriggerCSharpLoggerFactory
    {
        private readonly ILogger _logger = Startup.LoggerFactory.CreateLogger<TimerTriggerCSharpLoggerFactory>();


        [FunctionName("TimerTriggerCSharpLoggerFactory")]
        public void Run([TimerTrigger("*/30 * * * * *")] TimerInfo myTimer)
        {
            _logger.LogInformation($"LoggerFactory C# Timer trigger function executed at: {DateTime.Now}");

            _logger.LogInformation("Hello");
            _logger.LogInformation("Is it me you looking for?");
            
            LogManager.Flush(5000);

            _logger.LogInformation($"LoggerFactory C# Timer trigger function finished at: {DateTime.Now}");

        }
    }
}
```

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="serilog">

#### Configure Serilog
  
<!-- info-box-start:info -->
This integration is based on [Serilog.Sinks.Logz.Io repository](https://github.com/serilog-contrib/Serilog.Sinks.Logz.Io). Refer to this repo for further usage and settings information.
{:.info-box.note}
<!-- info-box-end -->
  
  
**Before you begin, you'll need**:

* .NET Core SDK version 2.0 or higher
* .NET Framework version 4.6.1 or higher


<div class="tasklist">

##### Install the Logz.io Serilog sink

Install `Serilog.Sinks.Logz.Io` using Nuget or by running the following command in the Package Manager Console:

```shell
PM> Install-Package Serilog.Sinks.Logz.Io
```

##### Configure the sink

There are 2 ways to use Serilog:

1. Using a configuration file
2. In the code

###### Using a configuration file

Create `appsettings.json` file and copy the following configuration:

```json
{
  "Serilog": {
    "MinimumLevel": "Warning",
    "WriteTo": [
      {
        "Name": "LogzIoDurableHttp",
        "Args": {
          "requestUri": "https://<<LISTENER-HOST>>:8071/?type=<<TYPE>>&token=<<LOG-SHIPPING-TOKEN>>"
        }
      }
    ]
  }
}
```

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

Replace `<<TYPE>` with the type that you want to assign to your logs. You will use this value to identify these logs in Logz.io.

Add the following code to use the configuration and create logs:

* Using Serilog.Settings.Configuration and Microsoft.Extensions.Configuration.Json packages

```csharp
using System.IO;
using System.Threading;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace Example
{
    class Program
    {
        static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();

            logger.Information("Hello. Is it me you looking for?");
            Thread.Sleep(5000);     // gives the log enough time to be sent to Logz.io
        }
    }
}
```


###### In the code


```csharp
using System.Threading;
using Serilog;
using Serilog.Sinks.Logz.Io;

namespace Example
{
    class Program
    {
        static void Main(string[] args)
        {
            ILogger logger = new LoggerConfiguration()
                .WriteTo.LogzIoDurableHttp(
                    "https://<<LISTENER-HOST>>:8071/?type=<<TYPE>>&token=<<LOG-SHIPPING-TOKEN>>",
                    logzioTextFormatterOptions: new LogzioTextFormatterOptions
                    {
                        BoostProperties = true,
                        LowercaseLevel = true,
                        IncludeMessageTemplate = true,
                        FieldNaming = LogzIoTextFormatterFieldNaming.CamelCase,
                        EventSizeLimitBytes = 261120,
                    })
                .MinimumLevel.Verbose()
                .CreateLogger();

            logger.Information("Hello. Is it me you looking for?");
            Thread.Sleep(5000);     // gives the log enough time to be sent to Logz.io
        }
    }
}
```

#### Serverless platforms
If you’re using a serverless function, you’ll need to create a static appender in the Startup.cs file so each invocation will use the same appender.
In the Serilog integration, you should use the 'WriteTo.LogzIo()' instad of 'WriteTo.LogzIoDurableHttp()' method as it uses in-memory buffering which is best practice for serverless functions. 

###### Azure serverless function code sample

*Startup.cs*
```csharp
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Serilog;
using Serilog.Sinks.Logz.Io;

[assembly: FunctionsStartup(typeof(LogzioSerilogSampleApplication.Startup))]

namespace LogzioSerilogSampleApplication
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var logzioLogger = new LoggerConfiguration()
                .WriteTo.LogzIo("<<LOG-SHIPPING-TOKEN>>", "serilog", dataCenterSubDomain: "listener", useHttps: true)
                .CreateLogger();

            // Assign the logger to the static Log class
            Log.Logger = logzioLogger;
        }
    }
}
```

*FunctionApp.cs*
```csharp
using System;
using Microsoft.Azure.WebJobs;
using Serilog;
using Microsoft.Extensions.Logging;
using MicrosoftLogger = Microsoft.Extensions.Logging.ILogger;
using Serilogger = Serilog.ILogger;
using System.Threading;

namespace LogzioSerilogSampleApplication
{
    public class TimerTriggerCSharpSeriLogzio
    {
        private static readonly Serilogger logzioLogger = Log.Logger;

        [FunctionName("TimerTriggerCSharpSeriLogzio")]
        public void Run([TimerTrigger("*/30 * * * * *")]TimerInfo myTimer, MicrosoftLogger msLog)
        {
            msLog.LogInformation($"Serilog C# Timer trigger function executed at: {DateTime.Now}");
              
            logzioLogger.Information("Hello. Is it me you're looking for?");

            msLog.LogInformation($"Serilog C# Timer trigger function finished at: {DateTime.Now}");
        }
    }
}
```
{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

Replace `<<TYPE>` with the type that you want to assign to your logs. You will use this value to identify these logs in Logz.io.




<!-- tab:end -->


</div>
<!-- tabContainer:end -->
