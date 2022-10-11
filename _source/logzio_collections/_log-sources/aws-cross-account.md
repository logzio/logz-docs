---
title: Ship logs from multiple AWS accounts
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
data-source: Multiple AWS accounts simultaneously
data-for-product-source: Logs
short-description: Send logs from multiple AWS accounts to Logz.io.
templates: ["lambda-cloudwatch"]
open-source:
  - title: AWS cross account shipping
    github-repo: aws-cross-account
contributors:
  - nshishkin
shipping-tags:
  - aws
order: 110
---
<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Deploy integration](#deploy-aws)
* [Update deployed integration](#update)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to simultaneously ship logs from multiple AWS accounts to Logz.io. This integration uses two types of accounts:
  
* Landing account, which receives logs from your multiple AWS accounts and sends them to Logz.io.
* Sending accounts, which send logs from your AWS services to the landing account.
  
![Overview](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws-cross-account/overview-aws.png)  

The integration creates the following resources:
  
##### In the landing account

* Kinesis stream, which receives logs from multiple AWS accounts.
* Destination, which encapsulates the stream and allows to send the logs to it.
* Lambda function, which uses the Kinesis stream as a trigger, and sends the logs to Logz.io
* Additional Destinations (if required) for each region you need to ship logs from.
  
##### In the sending accounts

* Subscription filters, which send the logs from Cloudwatch to the Destination of the landing account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="deploy-aws">


**Before you begin, you'll need**:

* Your AWS service [publishes logs to Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/aws-services-sending-logs.html). 
* Your log group is in the format: `/<<AWS-PARTITION>>/<<SERVICE-NAME>>/<<NAME>>`, for example: `/aws/lambda/my_function`.
* AWS CLI

<div class="tasklist">

#### Configure the landing account

##### Create a main stack to deploy the landing account

Click the button that matches the region you'd like to deploy your main stack to:

| AWS Region       | Launch a stack                                                                                                                                                                                                                                                                                                                                 |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `us-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `us-east-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-us-east-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `us-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-us-west-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `us-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-us-west-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `eu-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-eu-central-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)     |
| `eu-north-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-north-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-eu-north-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)         |
| `eu-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-eu-west-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `eu-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-eu-west-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `eu-west-3`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-eu-west-3.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `ca-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-ca-central-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)     |
| `ap-northeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-ap-northeast-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `ap-northeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-ap-northeast-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `ap-northeast-3` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-3#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-ap-northeast-3.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `ap-south-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-ap-south-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)         |
| `ap-southeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-ap-southeast-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `ap-southeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-ap-southeast-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `sa-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://logzio-aws-integrations-sa-east-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-main.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |


##### Specify the stack template

Keep the default settings in the **Create stack** screen and select **Next**.

##### Specify the stack details

Specify the stack details as per the table below and select **Next**.

| Parameter                | Description                                                                                                                                                                                                                                                                                             | Required / Defaults |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `AccountsArns`           | Comma-delimited list (**no spaces**) of **all ARNs involved in this integration**. This includes ARNs of the **landing account** and the **accounts you'd like to send logs from**. The ARNs should be specified as follows: `arn:aws:logs:*:<<ACCOUNT_NUMBER>>:*`. For example, if our landing account is 123, and we also want to send logs from account 456, we'll insert: `arn:aws:logs:*:123:*,arn:aws:logs:*:456:*`    | Required            |
| `KinesisStreamBatchSize` | The largest number of records that will be read from your stream at once.                                                                                                                                                                                                                               | Default: `100`      |
| `LogzioCOMPRESS`         | If true, the Lambda will send compressed logs. If false, the Lambda will send uncompressed logs.                                                                                                                                                                                                        | Default: `true`     |
| `LogzioREGION`           | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. You can find your region code in the Regions and URLs [here](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls table). | Default: `us`       |
| `LogzioTOKEN`            | The token of the account you want to ship to. Can be found [here](https://app.logz.io/#/dashboard/settings/general).                                                                                                                                                                                    | Required            |
| `SendingAccounts`        | Comma-delimited list (**no spaces**) of account numbers of the accounts you'd like to send logs from. **Each account number should be wrapped in double-quotes.** The numbers should be specified as follows: `"1234","5678","9012"`                                                                                                                                                                  | Required           |



##### Configure stack options

If required, specify the **Key** and **Value** parameters for the **Tags** and select **Next**.

##### Review the stack

Confirm that you acknowledge that AWS CloudFormation might create IAM resources, IAM resources with custom names, may require `CAPABILITY_AUTO_EXPAND` and select **Create stack**.


##### Create a stack to deploy destinations in the landing account on each region you need to send logs from


This procedure is only required if you need to send logs from regions that are different to the region that the main stack is deployed in.



Click the button that matches the region you'd like to deploy your destination stack to:

| AWS Region       | Launch a stack                                                                                                                                                                                                                                                                                                                                               |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `us-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `us-east-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-us-east-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `us-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-us-west-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `us-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-us-west-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `eu-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-eu-central-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)     |
| `eu-north-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-north-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-eu-north-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)         |
| `eu-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-eu-west-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `eu-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-eu-west-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `eu-west-3`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-eu-west-3.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |
| `ca-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-ca-central-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)     |
| `ap-northeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-ap-northeast-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `ap-northeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-ap-northeast-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `ap-northeast-3` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-3#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-ap-northeast-3.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `ap-south-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-ap-south-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)         |
| `ap-southeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-ap-southeast-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `ap-southeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-ap-southeast-2.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>) |
| `sa-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://logzio-aws-integrations-sa-east-1.s3.amazonaws.com/aws-cross-accounts/0.0.1/sam-template-destination.yaml&param_LogzioTOKEN=<<LOG-SHIPPING-TOKEN>>)           |


##### Specify the stack template

Keep the default settings in the **Create stack** screen and select **Next**.

##### Specify the stack details

Specify the stack details as per the table below and select **Next**.

| Parameter          | Description                                                                                                                                                 |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RoleArn`          | The ARN of the **Role** created in the main stack. You can find it in the main stack's **Outputs** tab, under **LogzioCrossAccountRole**                        |
| `KinesisStreamArn` | The ARN of the **Kinesis Stream** created in the main stack. You can find it in the main stack's **Outputs** tab, under **LogzioCrossAccountKinesisStreamArn**. |
| `SendingAccounts`        | Comma-delimited list (**no spaces**) of account numbers of the accounts you'd like to send logs from. **Each account number should be wrapped in double-quotes.**  The numbers should be specified as follows: `"1234","5678","9012"` | 

##### Configure stack options

If required, specify the **Key** and **Value** parameters for the **Tags** and select **Next**.

##### Review the stack

Confirm that you acknowledge that AWS CloudFormation might create IAM resources, IAM resources with custom names, may require `CAPABILITY_AUTO_EXPAND` and select **Create stack**.

#### Configure the sending accounts

##### Create a subscription filter in your sending accounts

You need to create a subscription filter in each sending account separately, for each service that you want to send logs from.


###### Create with AWS CLI

1. Make sure your AWS CLI is connected to the account you want to send logs from.
2. Make sure you have set the CLI to the region of the account that you need to send logs from.
3. Run the following command:

```shell
aws logs put-subscription-filter \
    --log-group-name "<<LOG-GROUP-NAME>>" \
    --filter-name "<<SUBSCRIPTION-FILTER-NAME>>" \
    --filter-pattern " " \
    --destination-arn "<<DESTINATION-ARN>>"
```
   * Replace `<<LOG-GROUP-NAME>>` with the name of the log group you want to collect logs from.
   * Replace `<<SUBSCRIPTION-FILTER-NAME>>` with the name of the subscription filter you create.
   * Replace `<<DESTINATION-ARN>>` with the ARN of the destination that matches the region of the sending account that you want to ship logs from. For example, if the log stream is in `us-west-2`, then they should use the arn of the Destination that's in `us-west-2`. You can find the ARN in the main stack's **Outputs** tab. 

###### Create with Terraform


In your Terraform configuration, add the following:

```tf
resource "aws_cloudwatch_log_subscription_filter" "subscription_filter" {
  name            = "<<SUBSCRIPTION-FILTER-NAME>>"
  log_group_name  = "<<LOG-GROUP-NAME>>"
  filter_pattern  = " "
  destination_arn = "<<DESTINATION-ARN>>"
}
```

   * Replace `<<LOG-GROUP-NAME>>` with the name of the log group you want to collect logs from.
   * Replace `<<SUBSCRIPTION-FILTER-NAME>>` with the name of the subscription filter you create.
   * Replace `<<DESTINATION-ARN>>` with the ARN of the destination that matches the region of the sending account that you want to ship logs from. For example, if the log stream is in `us-west-2`, then they should use the arn of the Destination that's in `us-west-2`. You can find the ARN in the main stack's **Outputs** tab.


If you create the log group and the subscription filter at the same time, add a `depends_on` field to the subscription filter and make it dependent on the log group, so that the log group will be created first.


###### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
  

If your log group is not in the required format, the logs will arrive under the default type `aws-cross-account`. Otherwise, the type will be the service you sent the logs from.

</div>

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="update">

#### Update the integration
  
If you need to add more accounts to an existing integration, you can update the deployed stacks as follows. 

**Before you begin, you'll need**:

* Your AWS service [publishes logs to Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/aws-services-sending-logs.html). 
* Your log group is in the format: `/<<AWS-PARTITION>>/<<SERVICE-NAME>>/<<NAME>>`, for example: `/aws/lambda/my_function`.
* AWS CLI

<div class="tasklist">

##### Select the main stack of the landing account

In your AWS Console, go to **Cloudformation**, choose your main stack and select **Update**.

##### Specify the stack template

Choose **Use current template** and select **Next**.

##### Specify the stack details

* Add new ARNs to `AccountsArns`. The ARNs should be specified as follows: `arn:aws:logs:*:<<ACCOUNT_NUMBER>>:*,arn:aws:logs:*:<<ACCOUNT_NUMBER>>:*,arn:aws:logs:*:<<ACCOUNT_NUMBER>>:*`.
* Add new account numbers to `SendingAccounts`. The numbers should be specified as follows: `"1234","5678","9012"`.

<!-- info-box-start:info -->
Do not overwrite existing values.
{:.info-box.note}
<!-- info-box-end -->

##### Configure stack options

If required, specify the **Key** and **Value** parameters for the **Tags** and select **Next**.

##### Review the stack

Confirm that you acknowledge that AWS CloudFormation might create IAM resources, IAM resources with custom names, may require `CAPABILITY_AUTO_EXPAND` and select **Create stack**.

##### In each Destination Stack you deployed

In your AWS Console, go to **Cloudformation**, choose your destinations stack and select **Update**.

##### Specify the stack template

Choose **Use current template** and select **Next**.

##### Specify the stack details

* Add new account numbers to `SendingAccounts`. The numbers should be specified as follows: `"1234","5678","9012"`.

<!-- info-box-start:info -->
Do not overwrite existing values.
{:.info-box.note}
<!-- info-box-end -->

##### Configure stack options

If required, specify the **Key** and **Value** parameters for the **Tags** and select **Next**.

##### Review the stack

Confirm that you acknowledge that AWS CloudFormation might create IAM resources, IAM resources with custom names, may require `CAPABILITY_AUTO_EXPAND` and select **Create stack**.

</div>

</div>
<!-- tab:end -->


<!-- tabContainer:end -->
