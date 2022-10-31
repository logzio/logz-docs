##### Pull the Docker image for the OpenTelemetry collector

```shell
docker pull otel/opentelemetry-collector:0.60.0
```

##### Create a configuration file

Create a file `config.yaml` with the following contents:

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



exporters:
  logzio/traces:
    account_token: <<TRACING-SHIPPING-TOKEN>>
    region: <<LOGZIO_ACCOUNT_REGION_CODE>>
    
processors:
  batch:
  tail_sampling:
    policies:
      [
        {
          name: policy-errors,
          type: status_code,
          status_code: {status_codes: [ERROR]}
        },
        {
          name: policy-slow,
          type: latency,
          latency: {threshold_ms: 1000}
        }, 
        {
          name: policy-random-ok,
          type: probabilistic,
          probabilistic: {sampling_percentage: 10}
        }        
      ]


extensions:
  pprof:
    endpoint: :1777
  zpages:
    endpoint: :55679
  health_check:

service:
  extensions: [health_check, pprof, zpages]
  pipelines:
    traces:
      receivers: [opencensus, jaeger, zipkin, otlp]
      processors: [tail_sampling, batch]
      exporters: [logzio/traces]

```

{% include /tracing-shipping/replace-tracing-token.html %}
{% include /tracing-shipping/tail-sampling.md %}


If you already have an OpenTelemetry installation, add the following parameters to the configuration file of your existing OpenTelemetry collector:

* Under the `exporters` list

```yaml
  logzio/traces:
    account_token: <<TRACING-SHIPPING-TOKEN>>
    region: <<LOGZIO_ACCOUNT_REGION_CODE>>
```

* Under the `service` list:

```yaml
  extensions: [health_check, pprof, zpages]
  pipelines:
    traces:
      receivers: [opencensus, jaeger, zipkin, otlp]
      processors: [tail_sampling, batch]
      exporters: [logzio/traces]
```

{% include /tracing-shipping/replace-tracing-token.html %}

An example configuration file looks as follows:

```yaml
receivers:  
  otlp:
    protocols:
      grpc:
      http:

exporters:
  logzio/traces:
    account_token: "<<TRACING-SHIPPING-TOKEN>>"
    region: "<<LOGZIO_ACCOUNT_REGION_CODE>>"

processors:
  batch:
  tail_sampling:
    policies:
      [
        {
          name: policy-errors,
          type: status_code,
          status_code: {status_codes: [ERROR]}
        },
        {
          name: policy-slow,
          type: latency,
          latency: {threshold_ms: 1000}
        }, 
        {
          name: policy-random-ok,
          type: probabilistic,
          probabilistic: {sampling_percentage: 10}
        }        
      ]

extensions:
  pprof:
    endpoint: :1777
  zpages:
    endpoint: :55679
  health_check:

service:
  extensions: [health_check, pprof, zpages]
  pipelines:
    traces:
      receivers: [opencensus, jaeger, zipkin, otlp]
      processors: [tail_sampling, batch]
      exporters: [logzio/traces]
```

{% include /tracing-shipping/replace-tracing-token.html %}
{% include /tracing-shipping/tail-sampling.md %}


##### Run the container

Mount the `config.yaml` as volume to the `docker run` command and run it as follows:

```
$ docker run -v $(pwd)/config.yaml:/etc/otelcol/config.yaml otel/opentelemetry-collector:0.60.0

```
