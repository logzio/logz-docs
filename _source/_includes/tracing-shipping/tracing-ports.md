Replace `<<PORT>>` with the port number that you use for this integration. For example, `4317` for OpenTelemetry installation sending traces to Logz.io using HTTP.

| Tracing source | Protocol | Port |
|---|---|---|
| OTLP | gRPC | 4317 |
| OTLP | HTTP | 55681 |
| Jaeger | gRPC | 14250 |
| Jaeger | HTTP | 14268 |
| Jaeger | Binary | 6832 |
| Jaeger | Compact | 6831 |
| Zipkin | HTTP | 9411 |
| OpenCensus | HTTP | 55678 | 