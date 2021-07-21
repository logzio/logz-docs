```yaml
receivers:  
  otlp:
    protocols:
      grpc:
      http:

exporters:
  logzio:
    account_token: "<<TRACING-SHIPPING-TOKEN>>"
    #region: "<<LOGZIO_ACCOUNT_REGION_CODE>>" - (Optional): Your logz.io account region code. Defaults to "us". Required only if your logz.io region is different than US East. https://docs.logz.io/user-guide/accounts/account-region.html#available-regions

processors:
  batch:

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
      receivers: [otlp]
      processors: [batch]
      exporters: [logzio]
```
