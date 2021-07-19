---
layout: article
title: LightS - Light Synthetic Monitoring powered by AWS Lambda
permalink: /integrations/lights/
flags:
  logzio-plan: community
open-source:
  - title: logzio-synthetic-monitoring
    github-repo: synthetic-monitoring/tree/master/aws
tags:
  - integrations
  - aws
contributors:
  - doron-bargo
  - mirii1994
  - shalper
---


LightS is a web monitoring solution to check availability and load performance of your website.

To learn more about which resources are deployed behind the scenes and to understand the architecture, please refer to our [GitHub repo](https://github.com/logzio/synthetic-monitoring/tree/master/aws).

This solution will be deployed directly on your AWS account.
{:.info-box.note}

<!-- info-box-start:info -->
At the moment, our AWS Lambda-based integrations do not support working with test events. This option will be available soon.
{:.info-box.note}
<!-- info-box-end -->


#### Configuration

<div class="tasklist">

##### Create Stack

👇 To begin, click this button to start the automated deployment.

[![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template?templateURL=https://sm-template.s3.amazonaws.com/0.0.2/auto-deployment.yaml&stackName=logzio-sm-auto-deployment)
{:.override.btn-img}

You'll be taken to AWS, where you'll configure the resources to be deployed.
Keep the defaults and click **Next** on the following screen.

![Customized template](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/lights-create-stack.png)

##### Specify stack details

Fill in the form with the relevant parameters.

| Parameter | Description |
|---|---|
| logzioLogsToken | Token for shipping logs to your Logz.io account. |
| logzioMetricsToken | Token for shipping metrics to your Logz.io account. |
| logzioURL | Logz.io listener URL. See https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls for further information. |
| regions | A comma separated list of AWS regions for deployment, (example: us-east-1,ap-south-1). |
| shippingProtocol | Protocol for shipping metrics and logs. Default is https and it better to leave it as is |
| url | A comma-delimited list of the URLs you want to monitor. For example : https://www.logz.io,https://example.com |
| memory | `Default: 512 (MB)`. The memory size you want to assign to the Lambda function running LightS. 512 MB is the minimum memory recommended for a single URL. The more URLs you choose to monitor, the more memory you'll need.  |


Check your Lambda usage regularly, and adjust the memory value if you need to.
{:.info-box.note}

After filing in the form, click **Next** to continue.

![Customized template](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/lights-params-12182020.png)

##### Configure stack

On the following page, specify **Tags** to help you easily identify your Lambda function. Click **Next** to proceed.

![Customized template](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/lights-stack-options.png)

##### Confirm IAM Role permissions and create the stack

AWS will automatically show a notice requesting that you acknowledge that AWS CloudFormation might create IAM resources.

![AWS IAM Role notice](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-IAM-role-notice.png)

Check the box to acknowledge this option and click **Create stack**.

##### Open your Synthetic Monitoring dashboard in Logz.io

Give your metrics some time to get from your system to ours, and then open [Logz.io Metrics](https://app.logz.io/#/dashboard/metrics/).

Your metrics should appear in the preconfigured dashboard in your Metrics account. Use the Synthetic Monitoring Dashboard to monitor your website performance and availability via Logz.io.

</div>
