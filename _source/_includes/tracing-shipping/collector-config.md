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
      exporters: [logging, logzio/traces]
```
