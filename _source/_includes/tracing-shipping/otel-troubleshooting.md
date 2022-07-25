This section contains some guidelines for handling errors that you may encounter when trying to collect traces with OpenTelemetry.

## Problem: No traces are sent

The code has been instrumented, but the traces are not being sent.

### Possible cause - Collector not installed

The OpenTelemetry collector may not be installed on your system.

#### Suggested remedy

Check if you have an OpenTelemetry collector installed and configured to receive traces from your hosts.


### Possible cause - Collector path not configured

If the collector is installed, it may not have the correct endpoint configured for the receiver.

#### Suggested remedy

1. Check that the configuration file of the collector lists the following endpoints:

   ```yaml
   receivers:
     jaeger:
       protocols:
         thrift_compact:
           endpoint: "0.0.0.0:6831"
         thrift_binary:
           endpoint: "0.0.0.0:6832"
         grpc:
           endpoint: "0.0.0.0:14250"
         thrift_http:
           endpoint: "0.0.0.0:14268"
     opencensus:
       endpoint: "0.0.0.0:55678"
     otlp:
       protocols:
         grpc:
           endpoint: "0.0.0.0:4317"
         http:
           endpoint: "0.0.0.0:4318"
     zipkin:
       endpoint: "0.0.0.0:9411"
   ```

2. In the instrumentation code, make sure that the endpoint is specified correctly. Refer to our [tracing documentation](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=tracing-sources) for more on this.


### Possible cause - Traces not genereated

If the collector is installed and the endpoints are properly configured, the instrumentation code may be incorrect.


#### Suggested remedy


1. Check if the instrumentation can output traces to a console exporter.
2. Use a web-hook to check if the traces are going to the output.
3. Use the metrics endpoint of the collector (http://localhost:8888/metrics) to see the number of spans received per receiver and the number of spans sent to the Logz.io exporter.

If the above steps do not work, refer to our [tracing documentation](https://app.logz.io/#/dashboard/send-your-data/collection?tag=all&collection=tracing-sources) and re-instrument the application.


### Possible cause - Wrong exporter/protocol/endpoint

If traces are generated but not send, the collector may be using incorrect exporter, protocol and/or endpoint.

#### Suggested remedy

1. Activate `debug` logs in the configuration file of the collector as follows:

   ```yaml
   service:
     telemetry:
       logs:
         level: "debug"
   ```

If you don't see this log (true for opentelemetry-collector version v0.52.0):

```shell
2022-05-02T13:21:27.973Z	debug	logzioexporter@v0.48.0/y trces logger.go:54	logziosender.go: Sending bulk of 496 bytes
	{"kind": "exporter", "name": "logzio"}
```

The exporter didn't get traces and you need to check if the collector is configured to use the correct exporter, protocol, and/or endpoint.

This log indicates that the exporter is attempting to send data. If the post request is successful, there will be an additional log with the status code 200. If the post request failed for some reason, there would be another log with the reason for the failure.


### Possible cause - Collector failure

If the `debug` logs are sent, but the traces are still not generated, the collector logs need to be investigated.

#### Suggested remedy

1. On Linux and MacOS, see the logs for the collector:

   ```shell
   journalctl | grep otelcol
   ```

   To only see errors:

   ```shell
   journalctl | grep otelcol | grep Error
   ```

2. Otherwise, navigate to the following URL - http://localhost:8888/metrics

This is the endpoint to access the collector metrics in order to see different events that might happen within the collector - receiving spans, sending spans as well as other errors.

### Possible cause - Exporter failure

Traces may not be generated if the exporter is not configured properly.

#### Suggested remedy

If you are unable to export traces to a destination, this may be caused by the following:

* There is a network configuration issue
* The exporter configuration is incorrect
* The destination is unavailable

To investigate this issue:

1. Make sure that the `exporters` and `service: pipelines` are configured correctly.
2. Check the collector logs as well as `zpages` for potential issues.
3. Check your network configuration, such as firewall, DNS, or proxy.

For example, those metrics can provide information about the exporter:

```shell
# HELP otelcol_exporter_enqueue_failed_metric_points Number of metric points failed to be added to the sending queue.

# TYPE otelcol_exporter_enqueue_failed_metric_points counter
otelcol_exporter_enqueue_failed_metric_points{exporter="logging",service_instance_id="0582dab5-efb8-4061-94a7-60abdc9867e1",service_version="latest"} 0
```


### Possible cause - Receiver failure

Traces may not be generated if the receiver is not configured properly.


#### Suggested remedy

If you are unable to receive data, this may be caused by the following:

* There is a network configuration issue
* The receiver configuration is incorrect
* The receiver is defined in the receivers section, but not enabled in any pipelines
* The client configuration is incorrect


Those metrics can provide about the receiver:

```shell
# HELP otelcol_receiver_accepted_spans Number of spans successfully pushed into the pipeline.

# TYPE otelcol_receiver_accepted_spans counter
otelcol_receiver_accepted_spans{receiver="otlp",service_instance_id="0582dab5-efb8-4061-94a7-60abdc9867e1",service_version="latest",transport="grpc"} 34


# HELP otelcol_receiver_refused_spans Number of spans that could not be pushed into the pipeline.

# TYPE otelcol_receiver_refused_spans counter
otelcol_receiver_refused_spans{receiver="otlp",service_instance_id="0582dab5-efb8-4061-94a7-60abdc9867e1",service_version="latest",transport="grpc"} 0
```