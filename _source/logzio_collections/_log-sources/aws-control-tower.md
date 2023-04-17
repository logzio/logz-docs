---
title: Ship AWS Control Tower logs
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
short-description: Sends logs from S3 buckets automatically created by AWS Control Tower to Logz.io.
open-source:
  - title: S3 Hook
    github-repo: s3-hook
logo:
  logofile: aws-control-tower.png
  orientation: vertical
data-source: AWS Control Tower
data-for-product-source: Logs
templates: ["azure-deployment-event-hubs"]
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 630
---
<!-- tabContainer:start -->
<div class="branching-container">

* [Setup](#setup)
* [Advanced settings](#Advanced)
{:.branching-tabs}

<!-- tab:start -->
<div id="setup">


<!-- info-box-start:info -->
This integration is currently released as a beta version.
{:.info-box.note}
<!-- info-box-end -->


AWS Control Tower is a tool to control a top-level summary of policies applied to the AWS environment. This integration sends logs from S3 buckets that the AWS Control Tower automatically creates in your AWS environment.


#### Configuration

<div class="tasklist">

##### Deploy an S3 Hook Lambda function

<!-- info-box-start:info -->
The stacks must be deployed in the same region as the S3 buckets.
{:.info-box.note}
<!-- info-box-end -->

This stack sends logs as they get added to the bucket. To start, click the button that matches the region you wish to deploy your Stack to:


{% include log-shipping/stack.md %}


##### Specify stack details

Specify the stack details as per the table below, check the checkboxes and select **Create stack**.

| Parameter        | Description                                                                                                                                                                                                                                                         | Required/Default   |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| `bucketName`     | Name of the bucket you wish to fetch logs from. Will be used for IAM policy.                                                                                                                                                                                        | **Required**       |
| `logzioListener` | The Logz.io listener URL for your region. (For more details, see the [regions page](https://docs.logz.io/user-guide/accounts/account-region.html)                                                                                                                   | **Required**       |
| `logzioToken`    | Your Logz.io log shipping token.                                                                                                                                                                                                                                    | **Required**       |
| `logLevel`       | Log level for the Lambda function. Can be one of: `debug`, `info`, `warn`, `error`, `fatal`, `panic`.                                                                                                                                                               | Default: `info`    |
| `logType`        | The log type you'll use with this Lambda. This is shown in your logs under the type field in Open Search Dashboards. Logz.io applies parsing based on the log type.                                                                                                                 | Default: `s3_hook` |
| `pathsRegexes`   | Comma-seperated list of regexes that match the paths you'd like to pull logs from.                                                                                                                                                                                  | -                  |
| `pathToFields`   | Fields from the path to your logs directory that you want to add to the logs. For example, `org-id/aws-type/account-id` will add each of the fields `ord-id`, `aws-type` and `account-id` to the logs that are fetched from the directory that this path refers to. See [Advanced settings](#Advanced) for more on this. | -                  |


##### Add trigger

Give the stack a few minutes to be deployed.

Once your Lambda function is ready, you'll need to manually add a trigger. This is due to Cloudformation limitations.

Go to the function's page, and click on **Add trigger**.

![Step 5 screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/control-tower/s3-hook-stack-05.png)

Then, choose **S3** as a trigger, and fill in:

- **Bucket**: Your bucket name.
- **Event type**: Choose option `All object create events`.
- Prefix and Suffix should be left empty.

Confirm the checkbox, and click **Add*.

![Step 5 screenshot](https://dytvr9ot2sszz.cloudfront.net/logz-docs/control-tower/s3-hook-stack-06.png)


##### Deploy the Control Tower stack

This stack creates a Lambda function, an EventBridge rule and IAM roles to automatically add triggers to the S3 Hook Lambda function as the Control Tower is creating new buckets. 



<!-- info-box-start:info -->
The stacks must be deployed in the same region as the S3 buckets.
{:.info-box.note}
<!-- info-box-end -->


To deploy this project, click the button that matches the region you wish to deploy your Stack to:

| Region           | Deployment                                                                                                                                                                                                                                                                                                                                           |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `us-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `us-east-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-east-2.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `us-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-west-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `us-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-west-2.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `eu-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-central-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)     | 
| `eu-north-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-north-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-north-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)         | 
| `eu-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-west-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `eu-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-west-2.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `eu-west-3`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-west-3.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `sa-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-sa-east-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `ap-northeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-northeast-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ap-northeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-northeast-2.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ap-northeast-3` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-3#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-northeast-3.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ap-south-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-south-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)         | 
| `ap-southeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-southeast-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ap-southeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-southeast-2.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ca-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-ca-central-1.s3.amazonaws.com/s3-hook/control-tower/0.0.2/sam-template.yaml&stackName=logzio-control-tower&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)     | 


##### Specify stack details

Specify the stack details as per the table below, check the checkboxes, and select **Create stack**.

| Parameter   | Description                                                                                           | Required/Default |
|-------------|-------------------------------------------------------------------------------------------------------|------------------|
| `logLevel`  | Log level for the Lambda function. Can be one of: `debug`, `info`, `warn`, `error`, `fatal`, `panic`. | Default: `info`  |
| `s3HookArn` | The ARN of your S3 Hook Lambda function.                                                              | **Required**     |


<!-- info-box-start:info -->
It can take a few minutes after the stack creation for EventBridge rule to be triggered.
{:.info-box.note}
<!-- info-box-end -->

<!-- info-box-start:info -->
If want to delete the S3 Hook Stack - you'll need to detach the policy "LambdaAccessBuckets" first.
{:.info-box.important}
<!-- info-box-end -->

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).



</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="Advanced">

#### Advanced settings

##### Automatic parsing

S3 Hook will automatically parse logs in the following cases:

- The object's path contains the phrase `cloudtrail` (case insensitive).

##### Filtering files

If there are specific paths within the bucket that you want to pull logs from, you can use the `pathsRegex` variable.
This variable should hold a comma-seperated list of regexes that match the paths you wish to extract logs from.
**Note**: This will still trigger your Lambda function every time a new object is added to your bucket. However, if the key does not match the regexes, the function will quit and won't send the logs.


##### Adding object path as logs field

In case you want to use your objects' path as extra fields in your logs, you can do so by using `pathToFields`.

For example, if your objects are under the path: `oi-3rfEFA4/AWSLogs/2378194514/file.log`, where `oi-3rfEFA4` is org id, `AWSLogs` is aws type, and `2378194514` is account id. 

Setting `pathToFields` with the value: `org-id/aws-type/account-id` will add to logs the following fields:
`org-id: oi-3rfEFA4`, `aws-type: AWSLogs`, `account-id: 2378194514`.

<!-- info-box-start:info -->
If you use `pathToFields`, you need to add a value for each subfolder in the path. Otherwise there will be a mismatch and the logs will be sent without fields.
{:.info-box.note}
<!-- info-box-end -->

<!-- info-box-start:info -->
This will override a field with the same key, if it exists.
{:.info-box.note}
<!-- info-box-end -->

<!-- info-box-start:info -->
In order for the feature to work, you need to set `pathToFields` from the root of the bucket.
{:.info-box.note}
<!-- info-box-end -->

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->

