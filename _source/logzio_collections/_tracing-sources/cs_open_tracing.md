---
title: Sending traces from C# applications
logo:
  logofile: dotnet.svg
  orientation: vertical
data-source: .NET code
description: How to send traces from a C# application
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


<!-- tabContainer:start -->
<div class="branching-container">
* [Overview](#overview)
* [Auto instrumentation](#autoinst)
* [From your code](#manual)
* [Kubernetes reference](#k8sref)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

## OpenTracing Instrumentation for C\#

This article describes how to automatically extract traces from your C#-based application with OpenTracing instrumentation.

### OpenTracing and Jaeger

OpenTracing is an API standard of instrumentation for distributed tracing.
Jaeger is one implementation of that standard and our most recommended practice for C#. It has a set of libraries and tools to provide open source implementation for distributed tracing

### Requirements
Add the following packages to your solution:

* OpenTracing.Contrib.NetCore
* OpenTracing
* Jaeger

### Examples
To see an actual example, head to our [examples repository](https://github.com/logzio/Integrations_examples/tree/main/Tracing/cs_client_instrumentaion).

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="autoinst">

To autoinstrument your C# application, add the code snippet below to your `Startup.cs` file. 

Within the snippet:

  + Replace `<<JAEGER_AGENT_HOST>>` with the host address of your Jaeger agent: Use `localhost` if it's on the same machine. 
  + For a Kubernetes deployment, use `Environment.GetEnvironmentVariable(Jaeger.Configuration.  JaegerAgentHost)` and make sure your application deployment contains the environment variables as shown in the tab `Kubernetes reference`.


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
<div id="manual">


#### Set up a tracer

###### If you already have a tracer in your application that forwards traces to an agent, use this code:

  ```csharp
  var tracer = GlobalTracer.Instance;
  ```

###### Otherwise, use the code snippet below. 

  + Replace `<<JAEGER_AGENT_HOST>>` with the host address of your Jaeger agent: Use `localhost` if it's on the same machine. 
  + For a Kubernetes deployment, use `Environment.GetEnvironmentVariable(Jaeger.Configuration.JaegerAgentHost)` and make sure your application deployment contains the environment variables as shown in the tab `Kubernetes reference`.

  ```csharp
  string appName = System.Reflection.Assembly.GetEntryAssembly().GetName().Name;
  string hostName = <<JAEGER_AGENT_HOST>>;
  var tracer =
          new Tracer.Builder(appName)
              .WithSampler(new ConstSampler(true))
              .WithReporter(new RemoteReporter.Builder().WithSender(
                      new UdpSender(hostName, 6831, 0)).Build()
              )
              .Build();
  ```

#### Construct traces

Use the code snippet below to construct your traces with spans where you want. 

You can nest the code to create child spans. 
For more information on manual tracing instrumentation, see [OpenTracing's C# Guide](https://opentracing.io/guides/csharp/).


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




</div>
<!-- tab:end -->



<!-- tab:start -->
<div id="k8sref">

## Kubernetes Reference

If you are deploying your application on Kubernetes, first [deploy Jaeger/OpenTelemetry collector and agents](https://docs.logz.io/user-guide/distributed-tracing/k8s-deployment).
Then add the following environment variables to your application containers:

 ```yaml
 env:
 - name: JAEGER_AGENT_HOST
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: JAEGER_AGENT_PORT
   value: "6831"
```


</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->