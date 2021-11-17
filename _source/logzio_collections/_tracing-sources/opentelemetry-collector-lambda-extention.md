# OpenTelemetry Collector AWS Lambda Extension layer

**This project is a fork of [opentelemetry-lambda](https://github.com/open-telemetry/opentelemetry-lambda)** 

The Logzio openTelemetry Collector Lambda Extension provides a mechanism to export telemetry aynchronously from AWS Lambdas. It does this by embedding a stripped-down version of [OpenTelemetry Collector Contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib) inside an [AWS Extension Layer](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-extensions-in-preview/). This allows lambdas to use the OpenTelemetry Collector Exporter to send traces and metrics to any configured backend.


## Installing
To install the OpenTelemetry Collector Lambda layer to an existing Lambda function using the `aws` CLI:

```
aws lambda update-function-configuration --function-name Function --layers arn:aws:lambda:<<your-aws-region>>:486140753397:layer:logzio-opentelemetry-collector-layer:1	
```
Activate function tracing:
```
aws lambda update-function-configuration --function-name Function --tracing-config Mode=Active
```
## Configuration

By default, OpenTelemetry Collector Lambda layer exports telemetry data to Lambda console. To customize the collector configuration, add a `collector.yaml` to your function and specifiy its location via the `OPENTELEMETRY_COLLECTOR_CONFIG_FILE` environment file.

Here is a sample configuration file:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:

exporters:
  logzio:
    account_token: <<LOGZIO-TOKEN>>
    region: "us"

service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [logzio]

```

Once the file has been deployed with a Lambda, configuring the `OPENTELEMETRY_COLLECTOR_CONFIG_FILE` will tell the OpenTelemetry extension where to find the collector configuration:

```
aws lambda update-function-configuration --function-name Function --environment Variables={OPENTELEMETRY_COLLECTOR_CONFIG_FILE=/var/task/collector.yaml}
```


### Build your OpenTelemetry Collector Lambda layer from scratch
- Download a local copy of the [logzio/opentelemetry-lambda repository from Github](https://github.com/logzio/opentelemetry-lambda).
- Run command: `cd collector && make publish-layer` to publish OpenTelemetry Collector Lambda layer in your AWS account and get its ARN

Be sure to:

* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
* Config [AWS credential](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
