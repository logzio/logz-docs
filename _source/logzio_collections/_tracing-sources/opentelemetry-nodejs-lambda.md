---
title: Sending traces from AWS Lambda NodeJS Extension layer with OpenTelemetry Collector
logo:
  logofile: AWS-Lambda.svg
  orientation: vertical
data-source: AWS Lambda Extension NodeJS
data-for-product-source: Tracing
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
  - yotamloe
shipping-tags:
  - new-instrumentation
order: 1380
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Build a layer](#new)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">
  
OpenTelemetry Lambda NodeJS is a layer for running NodeJS applications on AWS Lambda with OpenTelemetry. Adding the layer and pointing to it with
the `AWS_LAMBDA_EXEC_WRAPPER` environment variable will initialize OpenTelemetry, enabling tracing with no code change.

To use it, you will need add the layer to your function configuration and then set `AWS_LAMBDA_EXEC_WRAPPER` to `/opt/otel-handler`.

[AWS SDK v2 instrumentation](https://github.com/aspecto-io/opentelemetry-ext-js/tree/master/packages/instrumentation-aws-sdk) is also
included and loaded automatically if you use the AWS SDK v2.


</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="new">
  
#### Build your OpenTelemetry Collector NodeJS Lambda layer from scratch

**Before you begin, you'll need**:
  
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
* Configured [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

<div class="tasklist">

##### Download a local copy of the Logzio OpenTelemetry Collector Lambda NodeJS Extension repository

Download a local copy of the [logzio/opentelemetry-lambda repository from Github](https://github.com/logzio/opentelemetry-lambda).
  
##### Download all dependencies and compile the code
  
Run:

```shell
cd nodejs && npm install
```

This will download all dependencies and compile the code. The layer zip file will be located at `./packages/layer/build/layer.zip`.
  
</div>

</div>
<!-- tab:end -->
  
</div>
<!-- tabContainer:end -->
