---
title: Send custom metrics from your GO application
logo:
  logofile: go.svg
  orientation: horizontal
open-source:
  - title: GO custom metrics
data-source: GO code
flags:
  logzio-plan:  
  beta: true
templates: ["docker"]
contributors:
  - yotamloe
  - yberlinger
shipping-tags:  
  - prometheus
  - custom-metrics
order: 910
---




This topic includes instructions on how to send custom metrics to Logz.io from your GO application. 

The included example uses the [OpenTelemetry GO SDK](https://github.com/open-telemetry/opentelemetry-go-contrib) and the [OpenTelemetry Cortex exporter](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/exporters/metric/cortex), which are both in alpha/preview.

#### Quick start

**Before you begin, you'll need**:
Go 1.x or higher

<div class="tasklist">

##### Installation

`go get -u go.opentelemetry.io/contrib/exporters/metric/cortex`

##### Add instruments to your application:

Set the variables in the following code snippet: 

|Environment variable|Description|
|---|---|
|Endpoint|  The Logz.io Listener URL for for your region, configured to use port **8052** for http traffic, or port **8053** for https traffic. {% include /log-shipping/listener-var.html %} |
|BearerToken| Your Logz.io Prometheus Metrics account token.  {% include /p8s-shipping/replace-prometheus-token.html %}  |
|p8s_logzio_name| Label to add to all custom metrics |


```go
package main

import (
	"context"
	"fmt"
	"time"

	"go.opentelemetry.io/contrib/exporters/metric/cortex"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/metric"
	controller "go.opentelemetry.io/otel/sdk/metric/controller/basic"
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.4.0"
)

func main() {
	// Create a new Config struct.
	config := cortex.Config{
		Endpoint:      "<<LISTENER-HOST>>",
		RemoteTimeout: 30 * time.Second,
		PushInterval:  15 * time.Second,
		BearerToken:   "<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>",
	}
	// Create and install the exporter. Additionally, set the push interval to 15 seconds
	// and add a resource to the controller.
	pusher, err := cortex.InstallNewPipeline(config,
		controller.WithCollectPeriod(15*time.Second),
		controller.WithResource(resource.NewWithAttributes(
			semconv.SchemaURL,
			attribute.String("p8s_logzio_name", "LABEL_NAME")),
		),
	)
	if err != nil {
		fmt.Printf("Error: %v", err)
	}
	ctx := context.Background()
	defer handleErr(pusher.Stop(ctx))
	// Create a counter and a value recorder
	meter := pusher.MeterProvider().Meter("go_metrics")
	// Create instruments
	counter := metric.Must(meter).NewInt64Counter(
		"go_metrics.counter",
		metric.WithDescription("Counts things"),
	)
	// Start the metrics pipline
	pusher.Start(ctx)
	// Record values to the instruments and add labels
	counter.Add(ctx, 10, attribute.String("key", "value"))
}
func handleErr(err error) {
	if err != nil {
		fmt.Println("Encountered error: ", err.Error())
	}
}
```

###### Types of metric instruments
For more information, see the OpenTelemetry [documentation](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md).

| Name | Behavior | Default aggregation |
| ---- | ---------- | ------------------- |
| Counter           | Metric value can only go up or be reset to 0, calculated per `counter.Add(context,value,labels)` request. | Sum |
| UpDownCounter     | Metric value can arbitrarily increment or decrement, calculated per `updowncounter.Add(context,value,labels)` request. | Sum |
| ValueRecorder     | Metric values captured by the `valuerecorder.Record(context,value,labels)` function, calculated per request. | TBD  |
| SumObserver       | Metric value can only go up or be reset to 0, calculated per push interval.| Sum |
| UpDownSumObserver | Metric value can arbitrarily increment or decrement, calculated per push interval.| Sum |
| ValueObserver     | Metric values captured by the callback function, calculated per push interval.| LastValue  |

###### [Counter](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#counter)
```go
// create counter instruments
counter := metric.Must(meter).NewInt64Counter(
	"go_metrics.counter",
	metric.WithDescription("your metric description"),
)
float_counter := metric.Must(meter).NewFloat64Counter(
	"go_metrics.float_counter",
	metric.WithDescription("your metric description"),
)
// Record values to the instruments and add labels
counter.Add(ctx, int64(10), attribute.String("key", "value"))
float_counter.Add(ctx, float64(8.3), attribute.String("key", "value"))
```
<!-- See full [example](link2github) -->


###### [UpDownCounter](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#updowncounter)
```go
// create updowncounter instruments
updowncounter := metric.Must(meter).NewInt64UpDownCounter(
	"go_metrics.updowncounter",
	metric.WithDescription("your metric description"),
)
float_updowncounter := metric.Must(meter).NewFloat64UpDownCounter(
	"go_metrics.float_updowncounter",
	metric.WithDescription("your metric description"),
)
// Record values to the instruments and add labels
updowncounter.Add(ctx, int64(-3), attribute.String("key", "value"))
float_updowncounter.Add(ctx, float64(8.3), attribute.String("key", "value"))
```
<!-- See full [example](link2github) -->


###### [ValueRecorder](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#valuerecorder)
```go
// create ValueRecorder instruments
valuerecorder := metric.Must(meter).NewInt64ValueRecorder(
	"go_metrics.valuerecorder",
	metric.WithDescription("your metric description"),
)
float_valuerecorder := metric.Must(meter).NewFloat64ValueRecorder(
	"go_metrics.float_valuerecorder",
	metric.WithDescription("your metric description"),
)
// Record values to the instruments and add labels
valuerecorder.Record(ctx, int(83), attribute.String("key", "value"))
float_valuerecorder.Record(ctx, float64(8.3), attribute.String("key", "value"))
```
<!-- See full [example](link2github) -->


###### [SumObserver](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#sumobserver)
```go
// Create callback for your SumObserver instrument
observerCallback := func(_ context.Context, result metric.Int64ObserverResult) {
	result.Observe(1, attribute.String("key", "value"))
}
// Start the metrics pipline
pusher.Start(ctx)
// create SumObserver instruments
_ = metric.Must(meter).NewInt64SumObserver("sum_observer", observerCallback,
	metric.WithDescription("A SumObserver set to 1"),
)
```
<!-- See full [example](link2github) -->


###### [UpDownSumObserver](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#updownsumobserver)
```go
// Create callback for your UpDownSumObserver instrument
observerCallback := func(_ context.Context, result metric.Int64ObserverResult) {
	result.Observe(-5, attribute.String("key", "value"))
}
// Start the metrics pipline
pusher.Start(ctx)
// create SumObserver instruments
_ = metric.Must(meter).NewInt64UpDownSumObserver("updown_sum_observer", observerCallback,
	metric.WithDescription("A UpDownSumObserver set to -5"),
)
```
<!-- See full [example](link2github) -->


###### [ValueObserver](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md#valueobserver)
```go
// Create callback for your UpDownSumObserver instrument
observerCallback := func(_ context.Context, result metric.Int64ObserverResult) {
	result.Observe(83, attribute.String("key", "value"))
}
// Start the metrics pipline
pusher.Start(ctx)
// create SumObserver instruments
_ = metric.Must(meter).NewInt64ValueObserver("valueobserver", observerCallback,
	metric.WithDescription("A valueobserver set to 83"),
)
```
<!-- See full [example](link2github) -->

##### Check Logz.io for your metrics
Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).

</div>
