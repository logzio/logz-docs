---
title: Ship logs from multiple AWS accounts
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
data-source: Multiple AWS accounts simultaneously
data-for-product-source: Logs
short-description: Send logs from multiple AWS accounts to Logz.io.
templates: ["lambda-cloudwatch", "cloudformation"]
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
* [Deploy integration](#deploy)
* [Update deployed integration](#update)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to simultaneously ship logs from multiple AWS accounts to Logz.io.

The integration consists of the following main steps:

* Creating a **landing account**, which receives logs from your multiple AWS accounts and sends them to Logz.io.
* Creating **destinations in the landing account** on each region you need to send logs from.
* Creating **subscription filters** in your multiple AWS accounts to enable them to send logs from Cloudwatch to the **destinations in the landing account**.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="deploy">


**Before you begin, you'll need**:

* Your AWS service [publishes logs to Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/aws-services-sending-logs.html). 
* Your log group is in the format: `/<<AWS-PARTITION/<<SERVICE-NAME>>/<<LOG-GROUP-NAME>>`, for example: `/aws/lambda/my_function`.
* AWS CLI

<div class="tasklist">

##### Create a main stack to deploy the landing account

Set the region of your AWS account to `us-east-1` and launch the stach by clicking the button below:

[![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=aws-cross-account-main&templateURL=https://integrations-testing.s3.amazonaws.com/cross-accounts/0.0.1/sam-template-main.yaml)

##### Specify the stack template

Keep the default settings in the **Create stack** screen and select **Next**.

##### Specify the stack details

Specify the stack details as per the table below and select **Next**.

| Parameter                | Description                                                                                                                                                                                                                                                                                             | Required / Defaults |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `AccountsArns`           | Comma-delimited list (**no spaces**) of all ARNs involved in this integration. This includes ARNs of the landing account and the accounts you'd like to send logs from. The ARNs should be specified as follows: `arn:aws:logs:*:<<ACCOUNT_NUMBER>>:*,arn:aws:logs:*:<<ACCOUNT_NUMBER>>:*,arn:aws:logs:*:<<ACCOUNT_NUMBER>>:*`     | Required            |
| `KinesisStreamBatchSize` | The largest number of records that will be read from your stream at once.                                                                                                                                                                                                                               | Default: `100`      |
| `LogzioCOMPRESS`         | If true, the Lambda will send compressed logs. If false, the Lambda will send uncompressed logs.                                                                                                                                                                                                        | Default: `true`     |
| `LogzioREGION`           | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. You can find your region code in the Regions and URLs [here](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls table). | Default: `us`       |
| `LogzioTOKEN`            | The token of the account you want to ship to. Can be found [here](https://app.logz.io/#/dashboard/settings/general).                                                                                                                                                                                    | Required            |
| `SendingAccounts`        | Comma-delimited list (**no spaces**) of account numbers of the accounts you'd like to send logs froms. The numbers should be specified as follows: `"1234","5678","9012"`                                                                                                                                                                  | Required           |



##### Configure stack options

If required, specify the **Key** and **Value** parameters for the **Tags** and select **Next**.

##### Review the stack

Confirm that you acknowledge that AWS CloudFormation might create IAM resources, IAM resources with custom names, may require `CAPABILITY_AUTO_EXPAND` and select **Create stack**.


##### Create a stack to deploy destinations in the landing account on each region you need to send logs from

Set the region of your AWS account to `us-east-1` and launch the stach by clicking the button below:

[![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=aws-cross-account-destination&templateURL=https://integrations-testing.s3.amazonaws.com/cross-accounts/0.0.1/sam-template-destination.yaml)


##### Specify the stack template

Keep the default settings in the **Create stack** screen and select **Next**.

##### Specify the stack details

Specify the stack details as per the table below and select **Next**.

| Parameter          | Description                                                                                                                                                 |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RoleArn`          | The ARN of the **Role** created in the main stack. You can find it in the main stack's **Outputs** tab, under **LogzioCrossAccountRole**                        |
| `KinesisStreamArn` | The ARN of the **Kinesis Stream** created in the main stack. You can find it in the main stack's **Outputs** tab, under **LogzioCrossAccountKinesisStreamArn**. |
| `SendingAccounts`        | Comma-delimited list (**no spaces**) of account numbers of the accounts you'd like to send logs froms. The numbers should be specified as follows: `"1234","5678","9012"` | 

##### Configure stack options

If required, specify the **Key** and **Value** parameters for the **Tags** and select **Next**.

##### Review the stack

Confirm that you acknowledge that AWS CloudFormation might create IAM resources, IAM resources with custom names, may require `CAPABILITY_AUTO_EXPAND` and select **Create stack**.


##### Create a subscription filter in your sending accounts

<!-- info-box-start:info -->
You need to create a subscription filter in each sending account separately.
{:.info-box.note}
<!-- info-box-end -->

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
   * Replace `<<DESTINATION-ARN>>` with the ARN of the destination you created in the landing account. You can find the ARN in the main stack's **Outputs** tab. The destination will be in the same region as your log group. 


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="update">

#### Update the integration

**Before you begin, you'll need**:

* Your AWS service [publishes logs to Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/aws-services-sending-logs.html). 
* Your log group is in the format: `/<<AWS-PARTITION/<<SERVICE-NAME>>/<<LOG-GROUP-NAME>>`, for example: `/aws/lambda/my_function`.
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

##### Select the stack to deploy destinations in the landing account on each region you need to send logs from

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
