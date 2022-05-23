---
title: Ship logs from Carbon Black
logo:
  logofile: carbon-black.png
  orientation: vertical
data-source: Carbon Black
data-for-product-source: Cloud SIEM
short-description: Send Carbon Black logs stored in S3 Bucket to Logz.io via a Lambda function
open-source:
  - title: s3-hook
    github-repo: s3-hook
contributors:
  - mirii1994
shipping-tags:
  - aws
---

<!-- tab:start -->

With this integration, you can collect Logs from Carbon Black and forward them to Logz.io.

<div class="tasklist">

##### Set Carbon Black Event Forwarder
  
Follow [Carbon Black instructions](https://developer.carbonblack.com/reference/enterprise-response/event-forwarder/event-forwarder-s3-bucket-configuration/) for forwarding events to S3 bucket

##### Create new stack

To deploy this project, click the button that matches the region you wish to deploy your Stack to:

| Region           | Deployment                                                                                                                                                                                                                                                                                                                         |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `us-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)           | 
| `us-east-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/create/template?templateURL=https://logzio-aws-integrations-us-east-2.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)           | 
| `us-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-us-west-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)           | 
| `us-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/create/template?templateURL=https://logzio-aws-integrations-us-west-2.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)           | 
| `eu-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-eu-central-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)     | 
| `eu-north-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-north-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-eu-north-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)         | 
| `eu-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-eu-west-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)           | 
| `eu-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/create/template?templateURL=https://logzio-aws-integrations-eu-west-2.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)           | 
| `eu-west-3`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks/create/template?templateURL=https://logzio-aws-integrations-eu-west-3.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)           | 
| `sa-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-sa-east-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)           | 
| `ap-northeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-ap-northeast-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook) | 
| `ap-northeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#/stacks/create/template?templateURL=https://logzio-aws-integrations-ap-northeast-2.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook) | 
| `ap-northeast-3` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-3#/stacks/create/template?templateURL=https://logzio-aws-integrations-ap-northeast-3.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook) | 
| `ap-south-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-ap-south-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)         | 
| `ap-southeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-ap-southeast-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook) | 
| `ap-southeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/template?templateURL=https://logzio-aws-integrations-ap-southeast-2.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook) | 
| `ca-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-ca-central-1.s3.amazonaws.com/s3-hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook)     | 


##### Specify template

Keep the default setting in the Create stack screen and select **Next**.

![Step 1 screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/create-stack.png)


##### Specify stack details

Specify the stack details as per the table below and select **Next**.

| Parameter        | Description                                                                                                                                       | Required/Default   |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| `bucketName`     | Name of the bucket you wish to fetch logs from. Will be used for IAM policy.                                                                      | **Required**       |
| `logzioListener` | The Logz.io listener URL fot your region. (For more details, see the [regions page](https://docs.logz.io/user-guide/accounts/account-region.html) | **Required**       |
| `logzioToken`    | Your Logz.io log shipping token.                                                                                                                  | **Required**       |
| `logLevel`       | Log level for the Lambda function. Can be one of: `debug`, `info`, `warn`, `error`, `fatal`, `panic`.                                             | Default: `info`    |
| `logType`        | Set it to `Carbon-Black`. The log type you'll use with this Lambda. This is shown in your logs under the type field in Kibana. Logz.io applies parsing based on type.       | Default: `s3_hook` |


![Step 2 screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/specify-stack.png)

##### Configure stack options

Specify the Key and Value parameters for the Tags (optional) and select **Next**.

![Step 3 screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/configure-stack.png)

##### Review

Confirm that you acknowledge that AWS CloudFormation might create IAM resources and select **Create stack**.

![Step 4 screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/capabilities.png)

##### Add trigger

Give the stack a few minutes to be deployed.

Once your Lambda function is ready, you'll need to manually add a trigger. This is due to Cloudformation limitations.

Go to the function's page, and click on **Add trigger**.

![Step 5 screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/function-overview.png)

Then, choose **S3** as a trigger, and fill in:

- **Bucket**: Your bucket name.
- **Event type**: Choose option `All object create events`.
- Prefix and Suffix should be left empty.

Confirm the checkbox, and click **Add*.

![Step 6 screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/add-trigger-.png)

##### Send logs

That's it. Your function is configured.
Once you upload new files to your bucket, it will trigger the function, and the logs will be sent to your Logz.io account.

</div>
<!-- tab:end -->
