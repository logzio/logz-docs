---
title: Sending traces from C# application
logo:
  logofile: dotnet.svg
  orientation: vertical
data-source: dotnet
description: How to send traces from C# application
open-source:
  - title: 
    github-repo: jaeger-logzio
contributors:
  - yyyogev
  - yberlinger
shipping-tags:
  - from-your-code
  - traces
---

# OpenTracing Instrumentation for C\#

This article describes how to automatically extract Traces from your C# based app with OpenTracing instrumentation.

## OpenTracing and Jaeger

OpenTracing is an API standard of instrumentation for distributed tracing.
Jaeger is one implementation of that standard and our most recommended practice for C#. It has a set of libraries and tools to provide open source implementation 
for distributed tracing.

## OpenTracing for C\#

### Requirements
Add the following packages to your solution:

* OpenTracing.Contrib.NetCore

* OpenTracing

* Jaeger

### Implementation

You can either instrument Jaeger to collect traces from you app automatically or manually construct traces in your code that will be collected (or both).
<!-- tabContainer:start -->
<div class="branching-container">

* [Auto instrumentation](#tab1)
* [From your code](#tab2)
{:.branching-tabs}

<!-- tab:start -->
<div id="tab1">

Add to you `Stratup.cs` file the following code snippet:
Replace `<<JAEGER_AGENT_HOST>>` with the host address of your Jaeger agent, use `localhost` if it's on the same machine. 
For K8S deployment, use `Environment.GetEnvironmentVariable(Jaeger.Configuration.JaegerAgentHost)` and make sure your app deployment contain the env variables below.


```csharp
public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddOpenTracing();

            services.AddSingleton<ITracer>(serviceProvider =>
            {
                string serviceName = serviceProvider.GetRequiredService<IWebHostEnvironment>().ApplicationName;
                string hostName = <<JAEGER_AGENT_HOST>>;
                var tracer =
                    new Tracer.Builder(serviceName)
                        .WithSampler(new ConstSampler(true))
                        .WithReporter(new RemoteReporter.Builder().WithSender(
                            new UdpSender(hostName, 6831, 0)).Build())
                        .Build();
                    GlobalTracer.Register(tracer);

                    return tracer;
                }
            );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
```


</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="tab2">

First, create a tracer. If you already have a tracer in your app that forward traces to an agent. use this:
```csharp
var tracer = GlobalTracer.Instance;
```
Otherwise, Use the code snippet below. Replace `<<JAEGER_AGENT_HOST>>` with the host address of your Jaeger agent, use `localhost` if it's on the same machine. 
For K8S deployment, use `Environment.GetEnvironmentVariable(Jaeger.Configuration.JaegerAgentHost)` and make sure your app deployment contain the env variables below.

```csharp
string appName = System.Reflection.Assembly.GetEntryAssembly().GetName().Name;
string hostName = "localhost";
var tracer =
        new Tracer.Builder(appName)
            .WithSampler(new ConstSampler(true))
            .WithReporter(new RemoteReporter.Builder().WithSender(
                    new UdpSender(hostName, 6831, 0)).Build()
            )
            .Build();
```
Then, construct you traces with spans where you want:

```csharp
 using (IScope scope = _tracer.BuildSpan("Operation").StartActive(finishSpanOnDispose: true))
            {
                try
                {
                    // Do something
                }
                catch (Exception ex)
                {
                    Tags.Error.Set(scope.Span, true);
                }

                // No need to call scope.Span.Finish() as we've set finishSpanOnDispose:true in StartActive.
            }
```

You can nest the above code, to create child spans. For more information on manual tracing instrumentation, see [OpenTracing's C# Guide](https://opentracing.io/guides/csharp/).


</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->

### K8S Reference

If you are deploying your app on k8s, make sure to [deploy Jaeger/OpenTelemetry collector and agents](https://docs.logz.io/user-guide/distributed-tracing/k8s-deployment).
Then, add the following env variables to your app containers:

 ```yaml
 env:
 - name: JAEGER_AGENT_HOST
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: JAEGER_AGENT_PORT
   value: "6831"
```