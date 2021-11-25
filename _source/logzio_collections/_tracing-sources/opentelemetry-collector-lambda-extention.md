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

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Build a layer](#new)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

The Logzio OpenTelemetry Collector Lambda Extension provides a mechanism to synchronously export traces from AWS Lambda applications. It does this by embedding a stripped-down version of [OpenTelemetry Collector Contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib) inside an [AWS Extension Layer](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-extensions-in-preview/). This allows the Lambda applications to use the OpenTelemetry Collector Exporter to send traces and metrics to any configured backend, such as Logz.io.


</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="new">
  
#### Build your OpenTelemetry Collector Lambda layer from scratch

**Before you begin, you'll need**:
  
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
* Configured [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

<div class="tasklist">

##### Download a local copy of the Logzio OpenTelemetry Collector Lambda Extension repository

Download a local copy of the [logzio/opentelemetry-lambda repository from Github](https://github.com/logzio/opentelemetry-lambda).

##### Publish the Logzio OpenTelemetry Collector Lambda Extension

Run the following command to publish OpenTelemetry Collector Lambda layer to your AWS account and get its ARN:
  
```shell
cd collector && make publish-layer
```
  
</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
