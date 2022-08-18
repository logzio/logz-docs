## Send custom python metrics from lambda functions
This integration is using opentelemetry collector extention and python metrics sdk to create and send metrics from your lambda functions to logz.io

**Note:** This integration is currently supported in the following aws regions: **us-east-1**, **us-east-2**,**us-west-1**, **us-west-2**, **ca-central-1**, **ap-northeast-2**, **ap-northeast-1**,**eu-central-1**, **eu-west-2**

### Quick satrt:
* Create a new lambda function in your aws account (with python version >= 3.7) or use our example [deployment package](https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/aws-otel-lambda-python/logzio-lambda-python-metrics-deployment.zip) including code example.
* Add `OPENTELEMETRY_COLLECTOR_CONFIG_FILE` environment variable with a value of `/var/task/collector.yaml`. This will tell the collector extention the path to the configuration file.
* Add `collector.yaml` at the root of your lambda function:
```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:

exporters:
  logging:
    loglevel: info
  prometheusremotewrite:
    endpoint: "<<listener-url>>" # example: https://listener.logz.io:8053
    resource_to_telemetry_conversion:
      enabled: true # Convert resource attributes to metric labels
    headers:
      Authorization: "Bearer <<token>>"
service:
  pipelines:
    metrics:
      receivers: [otlp]
      exporters: [logging,prometheusremotewrite]
```
* Edit the following parameters:

|Environment variable|Description|
|---|---|
|istener-url|  The Logz.io [Listener URL](https://docs.logz.io/user-guide/accounts/account-region.html) for for your region, configured to use port **8052** for http traffic, or port **8053** for https traffic. |
|token| Your Logz.io Prometheus Metrics account token.  |


* Create a `lambda_function.py` file for your lambda handler:
```python
import json
import os
from opentelemetry.sdk._metrics import MeterProvider
from opentelemetry.sdk._metrics.export import (
    PeriodicExportingMetricReader,
)
from opentelemetry.exporter.otlp.proto.grpc._metric_exporter import (
    OTLPMetricExporter,
)
from opentelemetry.sdk.resources import SERVICE_NAME, Resource


def lambda_handler(event, context):
    print("lets start sending metrics")
    # Initialize otlp exporter, reader, meterProvier, meter
    exporter = OTLPMetricExporter(insecure=True)
    # Add service name and lambda function metadata
    resource = Resource(attributes={
        SERVICE_NAME: "logzio-lambda",
        "function_name": os.environ["AWS_LAMBDA_FUNCTION_NAME"],
        "aws_region": os.environ["AWS_REGION"],
    })
    reader = PeriodicExportingMetricReader(exporter)
    provider = MeterProvider(resource=resource, metric_readers=[reader])
    # set_meter_provider(provider)
    meter = provider.get_meter("logzio", "0.1.2")

    # create a counter metric and provide the first data point
    counter = meter.create_counter("counter")
    counter.add(5)
    # add labels
    labels = {
        "env": "prod"
    }
    counter.add(25, labels)
 
    # Flush all metrics and close meter provider
    provider.force_flush()
    provider.shutdown()

    return {
        'statusCode': 200,
        'body': json.dumps('Finished sending metrics')
    }

```
* Add the `logzio-otel-python-layer` lambda layer to your function:
```
arn:aws:lambda:<<your-aws-region>>:486140753397:layer:logzio-otel-python-layer:1
```
* Run your lambda and check logz.io for your metrics

## Types of metrics
For more information, see the OpenTelemetry [documentation](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/metrics/api.md).

| Name | Behavior |
| ---- | ---------- |
| Counter           | Metric value can only go up or be reset to 0, calculated per `counter.Add(context,value,labels)` request. |
| UpDownCounter     | Metric value can arbitrarily increment or decrement, calculated per `updowncounter.Add(context,value,labels)` request. |
| Histogram         | Metric values captured by the `histogram.Record(context,value,labels)` function, calculated per request. |

### More examples
#### Counter:
```python
    # create a counter metric and provide the first data point
    counter = meter.create_counter("counter")
    # add labels
    labels = {
        "env": "prod"
    }
    counter.add(5,labels)
    counter.add(25, labels)
```
#### Up down counter:
```python
    # create an up down counter metric and provide the first data points
    up_down_counter = meter.create_up_down_counter(
        name="example_up_down_counter",
        description="example_up_down_counter",
    )
    labels = {
        "env": "prod"
    }
    up_down_counter.add(20,labels)
    up_down_counter.add(-10,labels)
```
