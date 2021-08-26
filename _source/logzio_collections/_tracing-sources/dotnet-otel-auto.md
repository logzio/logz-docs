---
title: Sending traces from .NET applications via auto instrumentation with OpenTelemetry
logo:
  logofile: dotnet.svg
  orientation: vertical
data-source: Automatic .NET instrumentation
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - new-instrumentation
order: 1380
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Local host](#local-host)
* [Docker](#docker)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to enable automatic instrumentation of your .NET application using OpenTelemetry.

### Architecture overview

This integration includes:

* Installing the OpenTelemetry .NET instrumentation packages on your application host
* Installing the OpenTelemetry collector with Logz.io exporter
* Running your .NET application in conjunction with the OpenTelemetry instrumentation

On deployment, the .NET instrumentation automatically captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">


### Setup auto-instrumentation for your locally hosted ASP.NET Core application and send traces to Logz.io

This integration enables you to auto-instrument your ASP.NET Core application and run a locally hosted OpenTelemetry collector to send your traces to Logz.io. 

**Before you begin, you'll need**:

* An ASP.NET Core application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service


<div class="tasklist">


##### Download instrumentation packages

Run the following command from the application directory:

```shell
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol
dotnet add package OpenTelemetry.Instrumentation.AspNetCore
dotnet add package OpenTelemetry.Extensions.Hosting
```

##### Enable instrumentation in the code

Add the following configuration to the beginning of the Startup.cs file:

```cs
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
```

Add the following configuration to the Startup class:

```cs
public void ConfigureServices(IServiceCollection services)
        {

            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            services.AddOpenTelemetryTracing((builder) => builder
                .AddAspNetCoreInstrumentation()
                .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("my-app"))
                .AddOtlpExporter(options =>
                {
                    options.Endpoint = new Uri("http://localhost:55681");
             
                })
            );
        }
```


##### Download and configure OpenTelemetry collector

Create a dedicated directory on the host of your ASP.NET Core application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.33.0) that is relevant to the operating system of your host.


After downloading the collector, create a configuration file `config.yaml` with the following parameters:

{% include /tracing-shipping/collector-config.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Start the collector

Run the following command:

```shell
<path/to>/otelcontribcol_<VERSION-NAME> --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.
* Replace `<VERSION-NAME>` with the version name of the collector applicable to your system, e.g. `otelcontribcol_darwin_amd64`.

##### Run the application

Run the application to generate traces.


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>
</div>

<!-- tab:end -->

<!-- tab:start -->
<div id="docker">


### Setup auto-instrumentation for your ASP.NET Core application using Docker and send traces to Logz.io

This integration enables you to auto-instrument your ASP.NET Core application and run a containerized OpenTelemetry collector to send your traces to Logz.io. If your application also runs in a Docker container, make sure that both the application and collector containers are on the same network.

**Before you begin, you'll need**:

* An ASP.NET Core application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service


<div class="tasklist">


##### Download instrumentation packages

Run the following command from the application directory:

```shell
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol
dotnet add package OpenTelemetry.Instrumentation.AspNetCore
dotnet add package OpenTelemetry.Extensions.Hosting
```

##### Enable instrumentation in the code

Add the following configuration to the beginning of the Startup.cs file:

```cs
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
```

Add the following configuration to the Startup class:

```cs
public void ConfigureServices(IServiceCollection services)
        {

            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

            services.AddOpenTelemetryTracing((builder) => builder
                .AddAspNetCoreInstrumentation()
                .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("my-app"))
                .AddOtlpExporter(options =>
                {
                    options.Endpoint = new Uri("http://localhost:55681");
             
                })
            );
        }
```


{% include /tracing-shipping/docker-collector.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Run the application

Run the application to generate traces.


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
