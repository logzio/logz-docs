---
title: Sending traces from C# applications via auto instrumentation 
logo:
  logofile: csharp-dotnet.png
  orientation: vertical
data-source: Autonatic .NET C# instrumentation
description: How to auto instrument traces from a C# application
open-source:
  - title: 
    github-repo: jaeger-logzio
contributors:
  - yyyogev
  - yberlinger
shipping-tags:
  - new-instrumentation
order: 970
---


{% include tracing-shipping/csharp-open-tracing-overview.md instmethod="automatically" %}


## Auto instrument your C\# code

To auto instrument your C# application, add the code snippet below to your `Startup.cs` file. 

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
{% include tracing-shipping/csharp-snippet_and_replace.md %}
