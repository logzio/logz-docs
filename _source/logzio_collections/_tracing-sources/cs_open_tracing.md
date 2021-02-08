# OpenTracing Instrumentation for C#

This article will describe how to automatically extract Traces from your C# based app with OpenTracing instrumentation.

## OpenTracing and Jaeger

OpenTracing is an API standard of instrumentation for distributed tracing.
Jaeger is one implementation of that standard and our most recommended practice for C#. It has a set of libraries and tools to provide open source implementation 
for distributed tracing.

## OpenTracing for C#

### Requirements
Add the following packages to your solution:
* OpenTracing.Contrib.NetCore
* OpenTracing
* Jaeger

### Implementation
Add to you `Stratup.cs` file the following code snippet:
Replace `<<JAEGER_AGENT_HOST>>` with the host address of your Jaeger agent, use `localhost` if it's on the same machine. 
For K8S deployment, use `Jaeger.Configuration.JaegerAgentHost` and make sure your app deployment contain the env variables below.
```csharp
public void ConfigureServices(IServiceCollection services)
        {
            services.AddRazorPages();
            services.AddOpenTracing();

            services.AddSingleton<ITracer>(serviceProvider =>
            {
                string serviceName = serviceProvider.GetRequiredService<IWebHostEnvironment>().ApplicationName;

                var tracer =
                    new Tracer.Builder(serviceName)
                        .WithSampler(new ConstSampler(true))
                        .WithReporter(new RemoteReporter.Builder().WithSender(
                            new UdpSender(<<JAEGER_AGENT_HOST>>, 6831, 0)).Build())
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
### K8S Reference
If you are deploying your app on k8s, make sure to [deploy Jaeger/OpenTelemetry collector and agents]().
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