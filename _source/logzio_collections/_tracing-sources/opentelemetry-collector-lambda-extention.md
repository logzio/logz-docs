---
title: Sending traces from AWS Lambda Extension layer with OpenTelemetry Collector
logo:
  logofile: AWS-Lambda.svg
  orientation: vertical
data-source: AWS Lambda Extension
data-for-product-source: Tracing
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
  - yotamloe
shipping-tags:
  - new-instrumentation
order: 1380
---

The Logzio OpenTelemetry Collector Lambda Extension provides a mechanism to synchronously export traces from AWS Lambda applications. It does this by embedding a stripped-down version of [OpenTelemetry Collector Contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib) inside an [AWS Extension Layer](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-extensions-in-preview/). This allows the Lambda applications to use the OpenTelemetry Collector Exporter to send traces and metrics to any configured backend, such as Logz.io.

  
#### Install the OpenTelemetry Collector Lambda Extension to an existing Lambda function

**Before you begin, you'll need**:

* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
* Configured [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
* [Tracing instrumentation](https://app.logz.io/#/dashboard/send-your-data?tag=new-instrumentation&collection=tracing-sources) enabled in your code 


<div class="tasklist">

##### Install the OpenTelemetry Collector Lambda Extension to an existing Lambda function using the AWS CLI

```shell
aws lambda update-function-configuration --function-name Function --layers arn:aws:lambda:<<your-aws-region>>:486140753397:layer:logzio-opentelemetry-collector-layer:1	
```
  
##### Activate function tracing
  
```shelll
aws lambda update-function-configuration --function-name Function --tracing-config Mode=Active
```
  
##### Configuration the function
  
By default, OpenTelemetry Collector Lambda Extension exports the telemetry data to the Lambda console. To customize the collector configuration, add a `collector.yaml` to your function and specifiy its location via the `OPENTELEMETRY_COLLECTOR_CONFIG_FILE` environment file. Here is a sample configuration file:
  
```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:
exporters:
  logzio:
    account_token: <<TRACING-SHIPPING-TOKEN>>
    region: <<LOGZIO_ACCOUNT_REGION_CODE>>
service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [logzio]
```
  
{% include /tracing-shipping/replace-tracing-token.html %}
Once the file has been deployed with a Lambda, configuring the `OPENTELEMETRY_COLLECTOR_CONFIG_FILE` will tell the OpenTelemetry Collector Lambda Extension where to find the collector configuration:
```
aws lambda update-function-configuration --function-name Function --environment Variables={OPENTELEMETRY_COLLECTOR_CONFIG_FILE=/var/task/collector.yaml}
```
</div>

