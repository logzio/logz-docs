---
title: Sending traces from your application (other than Node.js) on AWS Lambda using OpenTelemetry
logo:
  logofile: AWS-Lambda.svg
  orientation: vertical
data-source: Applications other than Node.js on AWS Lambda
data-for-product-source: Tracing
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
  - yotamloe
shipping-tags:
  - new-instrumentation
order: 1380
---

Deploy this integration to instrument your applications running on AWS Lambda and send the traces to your Logz.io account. This integration is for any application code other than Node.js. For Node.js application on AWS Lambda, see the [dedicated setup instructions](https://app.logz.io/#/dashboard/send-your-data?tag=new-instrumentation&collection=tracing-sources).

This integration will add to your function a dedicated layer for OpenTelemetry collector, which you can configure using the environment variables.

<!-- info-box-start:info -->
This integration only works for the following AWS regions: us-east-1, us-east-2, ca-central-1, ap-northeast-2, ap-northeast-1, eu-central-1, eu-west-2.
{:.info-box.note}
<!-- info-box-end -->

#### Setup instructions

**Before you begin, you'll need**:

* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
* Configured [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)


<div class="tasklist">

##### Instrument the code of your application in the Lambda function

Add required instrumentation to your application code in the AWS Lambda function. You can refer to [our tracing documentation](https://app.logz.io/#/dashboard/send-your-data?tag=new-instrumentation&collection=tracing-sources) for more on this.

<!-- info-box-start:info -->
If you would like to request a dedicated wrapper layer for your application code, contact [Logz.io support](support@logz.io).
{:.info-box.note}
<!-- info-box-end -->

##### Add the OpenTelemetry collector layer to your Lambda function

This layer contains the OpenTelemetry collector that will capture data from your application.

```shell
aws lambda update-function-configuration --function-name <<YOUR-LAMBDA_FUNCTION_NAME>> --layers arn:aws:lambda:<<YOUR-AWS-REGION>>:486140753397:layer:logzio-opentelemetry-collector-layer:1
```

Replace `<<YOUR-LAMBDA_FUNCTION_NAME>>` with the name of your Lambda function running the Node.js application.

Replace `<<YOUR-AWS-REGION>>` with the code of your AWS regions, e.g. `us-east-1`.

##### Create a configuration file for the OpenTelemetry collector
  
By default, the OpenTelemetry collector layer exports data to the Lambda console. To customize the collector configuration, you need to add a `collector.yaml` to your function and specifiy its location via the `OPENTELEMETRY_COLLECTOR_CONFIG_FILE` environment variable.

The `collector.yaml` file will have the following configuration:
  
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

##### Direct the OpenTelemetry collector to the configuration file


Add `OPENTELEMETRY_COLLECTOR_CONFIG_FILE` variable to direct the OpenTelemetry collector to the configuration file:

```
aws lambda update-function-configuration --function-name <<YOUR-LAMBDA_FUNCTION_NAME>> --environment Variables={OPENTELEMETRY_COLLECTOR_CONFIG_FILE=/var/task/collector.yaml}
```

Replace `<<YOUR-LAMBDA_FUNCTION_NAME>>` with the name of your Lambda function running the Node.js application.


##### Activate tracing for your Lambda function

```shell
aws lambda update-function-configuration --function-name <<YOUR-LAMBDA_FUNCTION_NAME>> --tracing-config Mode=Active
```

Replace `<<YOUR-LAMBDA_FUNCTION_NAME>>` with the name of your Lambda function running the Node.js application.


</div>

