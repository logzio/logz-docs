---
title: Sending traces from Go applications via OpenTelemetry
logo:
  logofile: go.svg
  orientation: vertical
data-source: Go instrumentation
data-for-product-source: Tracing
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
* [Kubernetes](#kubernetes)
* [Troubleshooting](#troubleshooting)
{:.branching-tabs} 

<!-- tab:start -->
<div id="overview">

Deploy this integration to enable instrumentation of your Go application using OpenTelemetry. 

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


### Setup instrumentation for your locally hosted Go application and send traces to Logz.io

**Before you begin, you'll need**:

* A Go application without instrumentation
* An active account with Logz.io
* Port `4318` available on your host system
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
		otlptracehttp.WithEndpoint("localhost:4318"),
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

Create a dedicated directory on the host of your Go application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases) that is relevant to the operating system of your host.

<!-- info-box-start:info -->
This integration uses OpenTelemetry Collector Contrib, not the OpenTelemetry Collector Core.
{:.info-box.note}
<!-- info-box-end -->

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

<!-- tab:start -->
<div id="docker">


### Setup instrumentation for your Go application using Docker and send traces to Logz.io

This integration enables you to instrument your Go application and run a containerized OpenTelemetry collector to send your traces to Logz.io. If your application also runs in a Docker container, make sure that both the application and collector containers are on the same network.

**Before you begin, you'll need**:

* A Go application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
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
		otlptracehttp.WithEndpoint("localhost:4318"),
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

{% include tracing-shipping/docker.md %}
{% include /tracing-shipping/replace-tracing-token.html %}


##### Run the application

{% include /tracing-shipping/collector-run-note.md %}


Run the application to generate traces:

```shell
go run <YOUR-APPLICATION-FILE-NAME>.go
```


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="kubernetes">

### Overview

You can use a Helm chart to ship Traces to Logz.io via the OpenTelemetry collector. The Helm tool is used to manage packages of pre-configured Kubernetes resources that use charts.

**logzio-otel-traces** allows you to ship traces from your Kubernetes cluster to Logz.io with the OpenTelemetry collector.

<!-- info-box-start:info -->
This chart is a fork of the [opentelemtry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector) Helm chart. The main repository for Logz.io helm charts are [logzio-helm](https://github.com/logzio/logzio-helm).
{:.info-box.note}
<!-- info-box-end -->


#### Standard configuration

<div class="tasklist">

##### Deploy the Helm chart
 
Add `logzio-helm` repo as follows:
 
```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```


##### Run the Helm deployment code

```
helm install  \
--set config.exporters.logzio.region=<<LOGZIO_ACCOUNT_REGION_CODE>> \
--set config.exporters.logzio.account_token=<<TRACING-SHIPPING-TOKEN>> \
logzio-otel-traces logzio-helm/logzio-otel-traces
```

{% include /tracing-shipping/replace-tracing-token.html %}
`<<LOGZIO_ACCOUNT_REGION_CODE>>` - Your Logz.io account region code. [Available regions](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions).

##### Define the logzio-otel-traces service dns

In most cases, the service name will be `logzio-otel-traces.default.svc.cluster.local`, where `default` is the namespace where you deployed the helm chart and `svc.cluster.name` is your cluster domain name.
  
If you are not sure what your cluster domain name is, you can run the following command to look it up: 
  
```shell
kubectl run -it --image=k8s.gcr.io/e2e-test-images/jessie-dnsutils:1.3 --restart=Never shell -- \
sh -c 'nslookup kubernetes.default | grep Name | sed "s/Name:\skubernetes.default//"'
```
  
It will deploy a small pod that extracts your cluster domain name from your Kubernetes environment. You can remove this pod after it has returned the cluster domain name.
  



##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, then open [Logz.io](https://app.logz.io/).

</div>

####  Customizing Helm chart parameters

##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install`.

* Edit the `values.yaml`.

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

###### Example

```
helm install logzio-otel-traces logzio-helm/logzio-otel-traces -f my_values.yaml 
```

#### Uninstalling the Chart

The uninstall command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `logzio-otel-traces` deployment, use the following command:

```shell
helm uninstall logzio-otel-traces
```

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="troubleshooting">

{% include /tracing-shipping/otel-troubleshooting.md %}

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->