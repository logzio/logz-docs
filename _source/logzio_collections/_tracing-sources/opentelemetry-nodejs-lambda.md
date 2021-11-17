# OpenTelemetry Lambda NodeJS

**This project is a fork of [opentelemetry-lambda](https://github.com/open-telemetry/opentelemetry-lambda)**

Layer for running NodeJS applications on AWS Lambda with OpenTelemetry. Adding the layer and pointing to it with
the `AWS_LAMBDA_EXEC_WRAPPER` environment variable will initialize OpenTelemetry, enabling tracing with no code change.

To use, add the layer to your function configuration and then set `AWS_LAMBDA_EXEC_WRAPPER` to `/opt/otel-handler`.

[AWS SDK v2 instrumentation](https://github.com/aspecto-io/opentelemetry-ext-js/tree/master/packages/instrumentation-aws-sdk) is also
included and loaded automatically if you use the AWS SDK v2.

## Installing
To install the OpenTelemetry Collector Lambda layer to an existing Lambda function using the `aws` CLI:

```
aws lambda update-function-configuration --function-name Function --layers arn:aws:lambda:<<your-aws-region>>:486140753397:layer:logzio-opentelemetry-collector-layer:1
```
Activate function tracing:
```
aws lambda update-function-configuration --function-name Function --tracing-config Mode=Active
```
To install the Logzio opentelemetry nodejs Lambda layer to an existing Lambda function using the `aws` CLI:

```
aws lambda update-function-configuration --function-name Function --layers arn:aws:lambda:<<your-aws-region>>:486140753397:layer:logzio-opentelemetry-nodejs-wrapper:1
```
Add the `AWS_LAMBDA_EXEC_WRAPPER` environment variable to point to the `otel-handler` executable
```
aws lambda update-function-configuration --function-name Function --environment Variables={AWS_LAMBDA_EXEC_WRAPPER=/opt/otel-handler}
```


## Building from scratch

To build the layer and sample applications:
- Download a local copy of the [logzio/opentelemetry-lambda repository from Github](https://github.com/logzio/opentelemetry-lambda).
- run:

```
cd nodejs && npm install
```

This will download all dependencies and compile all code. The layer zip file will be present at `./packages/layer/build/layer.zip`.

