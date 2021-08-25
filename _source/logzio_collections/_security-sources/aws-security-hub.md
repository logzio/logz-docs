---
title: AWS Security Hub 
logo:
  logofile: aws.svg
  orientation: vertical
data-source: AWS Security Hub
templates: ["lambda-cloudwatch"]
open-source:
  - title: AWS Security Hub
    github-repo: aws-security-hub
contributors:
  - nshishkin
shipping-tags:
  - endpoint-security
order: 830
---

#### Overview

This integration ships events from AWS Security Hub to Logz.io. It will automatically deploy [resources](#resources) to your AWS Account.

A new event triggers a designated EventBridge rule, which invokes a Lambda function. The function processes the event and sends it to Logz.io.

<!-- info-box-start:info -->
Your Lambda function needs to run within the AWS Lambda limits, such as memory allocation and timeout. Make sure you understand these limits. If you can't adjust your settings to stay within the Lambda limits, you can use the AWS [Support Center console](https://console.aws.amazon.com/support/v1#/case/create?issueType=service-limit-increase) to request an increase. [Learn more about AWS Lambda Limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html).
{:.info-box.important}
<!-- info-box-end -->


<div class="tasklist">

##### Login to your account

To begin, you need to login to your AWS account.

##### Create a new stack

Select the button below to create a new stack dedicated to sending events from AWS Security Hub to Logz.io.

| AWS Region | Launch a stack |
| --- | --- |
| `us-east-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=logzio-security-hub-collector&templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/aws-security-hub-collector/0.0.1/template.yaml) |

![Create stack](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/security-hub-step1.png)

Keep the default setting in the **Create stack** screen and select **Next**.

##### Specify the stack details

![Specify stack details](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/security-hub-step2.png)

Specify the stack details as per the table below and select **Next**.


| Parameter | Description |
| --- | --- |
| `logzioListener` | Your Logz.io [listener url](https://docs.logz.io/user-guide/accounts/account-region.html), followed by port `8070` or `8071`. For example, `https://listener.logz.io:8071` |
| `logzioLogLevel` | Log level for the Lambda function. Defaults to `info`. Valid options are: `debug`, `info`, `warn`, `error`, `fatal`, `panic`. |
| `logzioOperationsToken` | Your Logz.io [operations token](https://app.logz.io/#/dashboard/settings/general). |

##### Configure the stack options

![Configure stack options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/security-hub-step3.png)

Specify the **Key** and **Value** parameters for the **Tags** and select **Next**.

##### Review the deployment

![Review deployment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/security-hub-step4a.png)
![Confirm deployment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/security-hub-step4b.png)

Confirm that you acknowledge that AWS CloudFormation might create IAM resources and select **Create stack**.

<div id="resources">
##### Deployed resources

This deployment will automatically create the following resources:

![Resources](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/resources-security-hub.png)


##### Check Logz.io for your events

Give the stack some time to deploy and the resources to get created. Once this is finished, the stack sends a security event to Logz.io as soon as the event is created on the security hub. You can then see the data in [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your events, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
</div>
