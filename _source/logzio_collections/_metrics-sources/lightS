---
title: LightS
open-source:
  - title: Light Synthetic Monitoring
logo:
  logofile: logz-symbol.svg
  orientation: vertical
data-source: LightS
tags:
  - aws
contributors:
  - doron-bargo
shipping-tags:
  - aws
--- 


LightS is a web monitoring solution to check availability and load performance of your web site.
This solution will be deployed on your AWS account.



#### Configuration

<div class="tasklist">

##### Create Task


To start just press the button and follow the instructions:

[![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=logzio-sm-light&templateURL=https://sm-template.s3.amazonaws.com/auto-deployment.yaml)
{:.override.btn-img}

You'll be taken to AWS, where you'll configure the resources to be deployed.
Keep the defaults and click Next on the following screen

![Customized template](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-create-stack.png)

###### Specify stack details

![Customized template](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-stack-details.png)

| Parameter | Description |
|---|---|
| logzioLogsToken | Token for shipping logs to your Logz.io account. |
| logzioMetricsToken | Token for shipping metrics to your Logz.io account. |
| logzioURL | Logz.io listener URL. See https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls for further information. |
| regions | A comma separated list of AWS regions for deployment, (example: us-east-1,ap-south-1). |
| shippingProtocol | Protocol for shipping metrics and logs. Default is https and it better to leave it as is |
| url | URL to monitor. For example : https://www.logz.io |

and click Next

##### Configure stack

On the following page fill Tags to easily identified your Lambda function and press Next
![Customized template](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-configure-stack.png)


###### Confirm IAM Role permissions and create the stack

AWS will automatically show a notice requesting that you acknowledge that AWS CloudFormation might create IAM resources.

![AWS IAM Role notice](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-IAM-role-notice.png)

Check the box to acknowledge this option and click **Create stack**.

##### Open your Synthetic Monitoring dashboard in Logz.io

Give your metrics some time to get from your system to ours, and then open [Logz.io Metrics](https://app.logz.io/#/dashboard/grafana/).

Your metrics should appear in the preconfigured dashboard in your Metrics account. Use the Synthetic Monitoring Dashboard to monitor your website performance and availability via Logz.io.

</div>
