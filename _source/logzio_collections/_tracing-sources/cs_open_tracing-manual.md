---
title: Sending traces from C# applications via manual instrumentation
logo:
  logofile: csharp-dotnet.png
  orientation: vertical
data-source: .NET C# manual instrumentation example
description: How to manually instrument traces from a C# application
open-source:
  - title: 
    github-repo: jaeger-logzio
contributors:
  - yyyogev
  - yberlinger
shipping-tags:
  - new-instrumentation
order: 980
---

{% include tracing-shipping/csharp-open-tracing-overview.md instmethod="manually" %}


#### Manually instrument your C\# code

<div class="tasklist">


##### Set up a tracer
Configure an existing tracer or set up a new tracer.

+ **Configure an existing tracer**

    If you already have a tracer in your application that forwards traces to an agent, use    this code:
   
     ```csharp
     var tracer = GlobalTracer.Instance;
     ```

+ **Set up a new tracer**

   To set up a new tracer, use the code snippet below. 
   
     + Replace `<<JAEGER_AGENT_HOST>>` with the host address of your Jaeger agent: Use    `localhost` if it's on the same machine. 
     + For a Kubernetes deployment, use `Environment.GetEnvironmentVariable(Jaeger.   Configuration.JaegerAgentHost)` and make sure your application deployment contains the environment variables as shown in the tab `Kubernetes reference`.
   
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

{% include tracing-shipping/csharp-snippet_and_replace.md %}


##### Construct traces

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