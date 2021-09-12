---
title: Sending traces from Go applications via auto instrumentation with OpenTelemetry
logo:
  logofile: go.svg
  orientation: vertical
data-source: Automatic Go instrumentation
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
{:.branching-tabs} 

<!-- tab:start -->
<div id="overview">

Deploy this integration to enable automatic instrumentation of your Go application using OpenTelemetry. 

### Architecture overview

This integration includes:

* Installing the OpenTelemetry Go instrumentation packages on your application host
* Installing the OpenTelemetry collector with Logz.io exporter
* Running your Go application in conjunction with the OpenTelemetry instrumentation

On deployment, the Go instrumentation automatically captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">


### Setup auto-instrumentation for your locally hosted Go application and send traces to Logz.io

**Before you begin, you'll need**:

* A Go application without instrumentation
* An active account with Logz.io
* A name defined for your tracing service


<div class="tasklist">


##### Download the general instrumentation packages

These packages are required to enable instrumentation for your code regardless of the type of application that you need to instrument. 

To download these packages, run the following command from the application directory:

```shell
go get -u go.opentelemetry.io/otel
go get -u go.opentelemetry.io/otel/exporters/otlp
go get -u go.opentelemetry.io/otel
go get -u go.opentelemetry.io/otel/attribute
go get -u go.opentelemetry.io/otel/baggage
go get -u go.opentelemetry.io/otel/propagation
go get -u go.opentelemetry.io/otel/sdk/resource
go get -u go.opentelemetry.io/otel/sdk/trace
go get -u go.opentelemetry.io/otel/semconv/v1.4.0
go get -u go.opentelemetry.io/otel/trace
go get -u go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp
```

<!-- info-box-start:info -->
We recommend sending OTLP traces using HTTP. This is why we import the `otlptracehttp` package.
{:.info-box.note}
<!-- info-box-end -->

##### Download the application specific instrumentation packages

Depending on the type of your application, you need to download instrumentation packages specific to your application. For example, if your application is a HTTP server, you will need the `opentelemetry.io/contrib/instrumentation/net/http/otelhttp` package. The full list of all available packages can be found in the [OpenTelemetry contrib directory](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/v0.22.0/instrumentation).

The example below is given for a HTTP server application:

```shell
go get -u go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp
```

##### Add the instrumentation to the `import` function

Add all the packages downloaded in the previous steps to the `import` function of your application.

The example below is given for a HTTP server application:

```go
import (
	"context"
	"io"
	"log"
	"net/http"

	"go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/baggage"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.4.0"
	"go.opentelemetry.io/otel/trace"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
)
```

##### Add the `initProvider` function


Add the `initProvider` function to the application code as follows:

```go
func initProvider() func() {
	ctx := context.Background()

	res, err := resource.New(ctx,
		resource.WithAttributes(
			semconv.ServiceNameKey.String("test-service"),
		),
	)
	handleErr(err, "failed to create resource")

	traceExporter, err := otlptracehttp.New(ctx,
		otlptracehttp.WithInsecure(),
		otlptracehttp.WithEndpoint("localhost:<<PORT>>"),
	)
	handleErr(err, "failed to create trace exporter")

	bsp := sdktrace.NewBatchSpanProcessor(traceExporter)
	tracerProvider := sdktrace.NewTracerProvider(
		sdktrace.WithSampler(sdktrace.AlwaysSample()),
		sdktrace.WithResource(res),
		sdktrace.WithSpanProcessor(bsp),
	)
	otel.SetTracerProvider(tracerProvider)
	otel.SetTextMapPropagator(propagation.TraceContext{})
	return func() {
		handleErr(tracerProvider.Shutdown(ctx), "failed to shutdown TracerProvider")
	}
}
```

{% include /tracing-shipping/tracing-ports.md %}


##### Instrument the code in the `main` function

In the `main` function of your application, add the following code:

```go
	shutdown := initProvider()
	defer shutdown()
```

After this, you need to declare the instrumentation according to your application. The example below is given for a HTTP server application. The HTTP handler instructs the tracer to create spans on each request.

```go
uk := attribute.Key("username")

	helloHandler := func(w http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		span := trace.SpanFromContext(ctx)
		bag := baggage.FromContext(ctx)
		span.AddEvent("handling this...", trace.WithAttributes(uk.String(bag.Member("username").Value())))

		_, _ = io.WriteString(w, "Hello, world!\n")
	}

	otelHandler := otelhttp.NewHandler(http.HandlerFunc(helloHandler), "Hello")

	http.Handle("/hello", otelHandler)
	err := http.ListenAndServe(":7777", nil)
	if err != nil {
		panic(err)
	}
}
func handleErr(err error, message string) {
	if err != nil {
		log.Fatalf("%s: %v", message, err)
	}
```


##### Download and configure OpenTelemetry collector

Create a dedicated directory on the host of your Go application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.33.0) that is relevant to the operating system of your host.


After downloading the collector, create a configuration file `config.yaml` with the following parameters:

{% include /tracing-shipping/collector-config.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Start the collector

Run the following command from the directory of your application file:

```shell
<path/to>/otelcontribcol_<VERSION-NAME> --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.
* Replace `<VERSION-NAME>` with the version name of the collector applicable to your system, e.g. `otelcontribcol_darwin_amd64`.

##### Run the application

Run the application to generate traces:

```shell
go run <YOUR-APPLICATION-FILE-NAME>.go
```


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
