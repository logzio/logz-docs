---
title: Ship CloudWatch logs
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
data-source: CloudWatch
data-for-product-source: Logs
short-description: Send your data to Logz.io from CloudWatch via a Lambda function, every x seconds.
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
templates: ["lambda-cloudwatch", "cloudformation"]
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/cloudwatch
open-source:
  - title: CloudWatch Lambda Log Shipper
    github-repo: logzio_aws_serverless/tree/master/python3/cloudwatch
contributors:
  - idohalevi
  - imnotashrimp
  - ronish31
shipping-tags:
  - aws
order: 110
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Automated CloudFormation deployment (default)](#automated-cloudformation-deployment)
* [Advanced configuration](#advanced)
{:.branching-tabs}

<!-- tab:start -->

<div id="automated-cloudformation-deployment">

We recommend Automated CloudFormation deployment as a default configuration. If you need to deploy this integration in a different way, please navigate to [Advanced configuration](#advanced).

#### Automated CloudFormation deployment

This project will create 2 Lambda functions:

- **Shipper function**: this function is responsible for processing and shipping the Cloudwatch logs to Logz.io. [See here the function's repo](https://github.com/logzio/logzio_aws_serverless/tree/master/python3/cloudwatch).

- **Trigger function**: this function is responsible for adding subscription filters to the desired Cloudwatch log groups, to trigger the shipper function.

When the Trigger function is run for the first time, it will add subscription filters to the log groups chosen by the user. If the user chose a service, the Trigger function will also get triggered whenever a log group is created to check if this log group is for a service that is one of the services that the user has selected. If yes, it will add a subscription filter to it.

<div class="tasklist">

##### Auto-deploy the Lambda function

👇 To begin, click this button to start the automated deployment. You will need to deploy it in your region.

| Region           | Deployment                                                                                                                                                                                                                                                                                                                                             |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `us-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `us-east-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-east-2.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `us-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-west-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `us-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-us-west-2.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `eu-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-central-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)     | 
| `eu-north-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-north-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-north-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)         | 
| `eu-west-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-west-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `eu-west-2`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-west-2.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `eu-west-3`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks/create/review?templateURL=https://logzio-aws-integrations-eu-west-3.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `sa-east-1`      | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-sa-east-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)           | 
| `ap-northeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-northeast-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ap-northeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-northeast-2.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ap-northeast-3` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-3#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-northeast-3.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ap-south-1`     | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-south-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)         | 
| `ap-southeast-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-southeast-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ap-southeast-2` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/review?templateURL=https://logzio-aws-integrations-ap-southeast-2.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071) | 
| `ca-central-1`   | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks/create/review?templateURL=https://logzio-aws-integrations-ca-central-1.s3.amazonaws.com/cloudwatch-shipper-trigger/1.1.0/sam-template.yaml&stackName=logzio-cloudwatch&param_logzioToken=<<LOG-SHIPPING-TOKEN>>&param_logzioListener=https://<<LISTENER-HOST>>:8071)     |


##### Specify stack details

Specify the stack details as per the table below, check the checkboxes and select **Create stack**.

###### Shipper config

| Parameter              | Description                                                                                                                                                                                                                             | Required/Default                  |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| `logzioToken`          | Replace `<<SHIPPING-TOKEN>>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.                                                                                                     | **Required**                      |
| `logzioListener`       | Listener host, and port (for example, `https://<<LISTENER-HOST>>:8071`).                                                                                                                                                                | **Required**                      |
| `logzioType`           | The log type you'll use with this Lambda. This can be a [built-in log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), or a custom log type. <br> You should create a new Lambda for each log type you use. | `logzio_cloudwatch_logs` |
| `logzioFormat`         | `json` or `text`. If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields.                                                                                    | `text`                   |
| `logzioCompress`       | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs.                                                                                                                                           | `true`                   |
| `logzioEnrich`         | Enrich CloudWatch events with custom properties, formatted as `key1=value1;key2=value2`.                                                                                                                                                | -                                 |
| `shipperLambdaTimeout` | The number of seconds that Lambda allows a function to run before stopping it, for the shipper function.                                                                                                                                | `60`                     |
| `shipperLambdaMemory`  | Shipper function's allocated CPU proportional to the memory configured, in MB.                                                                                                                                                          | `512`                             |

###### Trigger config

| Parameter               | Description                                                                                                                                                                                                                                              | Required/Default |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| `services`              | A comma-seperated list of services you want to collect logs from. Supported options are: `apigateway`, `rds`, `cloudhsm`, `cloudtrail`, `codebuild`, `connect`, `elasticbeanstalk`, `ecs`, `eks`, `aws-glue`, `aws-iot`, `lambda`, `macie`, `amazon-mq`. | -                |
| `customLogGroups`       | A comma-seperated list of custom log groups you want to collect logs from                                                                                                                                                                                | -                |
| `triggerLambdaTimeout`  | The amount of seconds that Lambda allows a function to run before stopping it, for the trigger function.                                                                                                                                                 | `60`             |
| `triggerLambdaMemory`   | Trigger function's allocated CPU proportional to the memory configured, in MB.                                                                                                                                                                           | `512`            |
| `triggerLambdaLogLevel` | Log level for the Lambda function. Can be one of: `debug`, `info`, `warn`, `error`, `fatal`, `panic`                                                                                                                                                     | `info`           |

<!-- info-box-start:info -->
AWS limits every log group to have up to 2 subscription filters. If your chosen log group already has 2 subscription filters, the trigger function won't be able to add another one.
{:.info-box.note}
<!-- info-box-end -->


##### Send logs

Give the stack a few minutes to be deployed.

Once new logs are added to your chosen log group, they will be sent to your Logz.io account.

<!-- info-box-start:info -->
If you've used the `services` field, you'll have to **wait 6 minutes** before creating new log groups for your chosen services. This is due to cold start and custom resource invocation, that can cause the cause Lambda to behave unexpectedly.
{:.info-box.important}
<!-- info-box-end -->

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


</div>
</div>
<!-- tab:end -->


<div></div>

<!-- tab:start -->
<div id="advanced">

The advanced configuration settings for this integration include:


* [Manual configuration with a Lambda function](#manual-configuration-with-a-lambda-function)
* [Deployment using a module](#deployment-using-a-module)
* [Terraform deployment](#terraform-deployment)
* [Working with test events](#working-with-test-events)



#### Manual configuration with a Lambda function

<div class="tasklist">

##### Create a new Lambda function

This Lambda function will collect CloudWatch logs and sends them to Logz.io in bulk over HTTPS.

Open the AWS Lambda Console, and click **Create function**.
Choose **Author from scratch**, and use this information:

* **Name**: We suggest adding the log type to the name, but you can name this function whatever you want.
* **Runtime**: Choose **Python 3.7**
* **Role**: Click **Create new role from template(s)**. Then, from the **Policy Templates** list, select **Basic Lambda@Edge permissions (for Cloudfront trigger)**.

Click **Create Function** (bottom right corner of the page). After a few moments, you'll see configuration options for your Lambda function.

You'll need this page later on, so keep it open.

##### Zip the source files

Clone the CloudWatch Logs Shipper - Lambda project from GitHub to your computer,
and zip the Python files by running the following command:

```shell
git clone https://github.com/logzio/logzio_aws_serverless.git \
&& cd logzio_aws_serverless/python3/cloudwatch/ \
&& mkdir -p dist/python3/shipper; cp -r ../shipper/shipper.py dist/python3/shipper \
&& cp src/lambda_function.py dist \
&& cd dist/ \
&& zip logzio-cloudwatch lambda_function.py python3/shipper/*
```

<!-- info-box-start:info -->
You can alternatively zip the required files manually. To do this, zip folders `cloudwatch` and `shipper` in `python3` directory.
{:.info-box.note}
<!-- info-box-end -->

You'll upload `logzio-cloudwatch.zip` in the next step.

##### Upload the zip file and set environment variables

In the _Function_ code section of Lambda, find the **Code entry type** list. Choose **Upload a .ZIP file** from this list.

Click **Upload**, and choose the zip file you created earlier (`logzio-cloudwatch.zip`).

In the _Environment variables_ section, set your Logz.io account token, URL, and log type, and any other variables that you need to use.

###### Environment variables

| Parameter | Description | Required/Default |
|---|---|---|
| TOKEN | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}  | Required  |
| REGION |  {% include log-shipping/log-region.md %}
| URL (Deprecated) | Use REGION instead. | -- |
| TYPE | The log type you'll use with this Lambda. This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type.    You should create a new Lambda for each log type you use. | `logzio_cloudwatch_lambda` |
| FORMAT | `json` or `text`. If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. | `text` |
| COMPRESS | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. | `false` |
| ENRICH | Enrich CloudWatch events with custom properties, formatted as `key1=value1;key2=value2`. | -- |




##### Configure the function's basic settings

In Basic settings, we recommend starting with these settings:

* **Memory**: 512 MB
* **Timeout**: 1 min 0 sec

<!-- info-box-start:info -->
These default settings are just a starting point.
Check your Lambda usage regularly, and adjust these values if you need to.
{:.info-box.note}
<!-- info-box-end -->


{% include log-shipping/cloudwatch-defaults.md %}


##### Set the CloudWatch Logs event trigger

1. Find the **Add triggers** list (left side of the Designer panel). Choose **CloudWatch Logs** from this list.

2. Below the Designer, you'll see the Configure triggers panel. Choose the **Log group** that the Lambda function will watch.

3. Type a **Filter name** (required) and **Filter pattern** (optional).

4. Click **Add**, then **Save** at the top of the page.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>



#### Deployment using a module

Deploy this integration to add a module for CloudWatch to your existing stack. This integration uses CloudWatch Public Registry.
  
<!-- info-box-start:info -->
Logz.io Public Registry extensions are currently only available on the AWS region `us-east-1`.
{:.info-box.note}
<!-- info-box-end -->

**Before you begin, you'll need**:

* A CloudFormation stack
* An S3 bucket to store the CloudFormation package

<div class="tasklist">

##### Select the Logz.io AWS Cloudwatch extension

1. Navigate to **CloudFormation > Registry > Public extensions**.
2. Set **Extension type > Modules** and **Publisher > Third party**.
3. Select **logzio::autoDeploymentLogzio::CloudWatch::MODULE**.


##### Activate the Logz.io AWS Cloudwatch extension

1. On the **logzio::autoDeploymentLogzio::CloudWatch** select **Activate**.
2. In the **Extension details** section, select **Use default**.
3. In the **Automatic updates** section, select **On**.
4. Select **Activate extension**.

##### Copy the configuration template

On the **logzio::autoDeploymentLogzio::CloudWatch** page, navigate to **Example template** and select **Copy template**.

##### Add your stack values to the configuration template

```yaml
{
    "Resources": {
        "MyModule": {
            "Type": "logzio::autoDeploymentLogzio::CloudWatch::MODULE",
            "Properties": {
                "LogzioListenerUrl": "https://<<LISTENER-HOST>>:8071",
                "LogzioToken": "<<LOG-SHIPPING-TOKEN>>",
                "LogzioType": "LogzioType",
                "LogzioFormat": "LogzioFormat",
                "LogzioCompress": "LogzioCompress",
                "LogzioSendAll": "LogzioSendAll",
                "LogzioEnrich": "LogzioEnrich",
                "LogGroup": "LogGroup"
            }
        }
    }
}
```

Save the template as a yaml file and add the values of your stack to the as per the table below.


| Parameter | Description | Required/Default |
|---|---|---|
| LogzioListenerUrl |  {% include log-shipping/listener-var.md %} | |
| LogzioToken | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}  | Required  |
| LogzioType | The log type you'll use with this Lambda. This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type.    You should create a new Lambda for each log type you use. | `logzio_cloudwatch_lambda` |
| LogzioFormat | `json` or `text`. If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. | `text` |
| LogzioCompress | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. | `false` |
| LogzioSendAll | Set to `true` to send all logs |  |
| LogzioEnrich | Enrich CloudWatch events with custom properties, formatted as `key1=value1;key2=value2`. | -- |
| LogGroup | CloudWatch log group. | -- |
  
##### Add your stack values to the configuration template

If you are creating a new stack:

1. In step 1 of the **Create stack** process, select **Template is ready**.
2. Select **Upload a template file**.

If you are editing an existing stack:

1. Select the stack.
2. Select **Update**.
3. Select **Edit template in designer**.
4. Paste the content of the yaml file into the **Resources** section of the template as follows:

   ```yaml
   "MyModule": {
            "Type": "logzio::autoDeploymentLogzio::CloudWatch::MODULE",
            "Properties": {
                "LogzioListenerUrl": "https://<<LISTENER-HOST>>:8071",
                "LogzioToken": "<<LOG-SHIPPING-TOKEN>>",
                "LogzioType": "LogzioType",
                "LogzioFormat": "LogzioFormat",
                "LogzioCompress": "LogzioCompress",
                "LogzioSendAll": "LogzioSendAll",
                "LogzioEnrich": "LogzioEnrich",
                "LogGroup": "LogGroup"
            }
        }
   ```
5. If required, change the module name by editing the `"MyModule"` value.



</div>



#### Terraform deployment

You can deploy this integration using Terraform with [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

<div class="tasklist">

##### Zip the source files
Clone the CloudWatch Logs Shipper - Lambda project from GitHub to your computer, and zip the Python files in the src/ folder as follows:

```bash
git clone https://github.com/logzio/logzio_aws_serverless.git \
&& cd logzio_aws_serverless/python3/cloudwatch/ \
&& mkdir -p dist/python3/shipper; cp -r ../shipper/shipper.py dist/python3/shipper \
&& cp src/lambda_function.py dist \
&& cd dist/ \
&& zip logzio-cloudwatch lambda_function.py python3/shipper/* \
&& mv logzio-cloudwatch.zip ../../../.. \
&& cd ../../../.. \
&& rm -rf logzio_aws_serverless
```

The above script will create `logzio-cloudwatch.zip` that contains the source code for your lambda function.

##### Set AWS credentials

Create environment variables that contain your AWS credentials:

```bash
export AWS_ACCESS_KEY_ID="<<AWS-ACCESS-KEY>>"
export AWS_SECRET_ACCESS_KEY="<<AWS-SECRET-KEY>>"
export AWS_DEFAULT_REGION="<<AWS-REGION>>"
```

<!-- info-box-start:info -->
This configuration uses AWS keys credentials.
If you're using another authentication method for AWS, see [here](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#shared-credentials-file) how to configure your provider accordingly.
{:.info-box.note}
<!-- info-box-end -->

##### Configure Terraform

Use the following configuration to create the necessary AWS resources to ship Cloudwatch logs to Logz.io.
Make sure you replace within the configuration to your details, where applicable:


```hcl
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "3.65.0"
    }
  }
}

resource "aws_iam_role" "iam_lambda_cw_to_logzio" {
  name = "lambda_cw_to_logzio"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_policy" "policy_cw_to_logzio" {
  name        = "policy_cw_to_logzio"
  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "logs:PutResourcePolicy",
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
})
}

resource "aws_iam_policy_attachment" "attach_cw_to_logzio" {
  name       = "attach_cw_to_logzio"
  roles      = [aws_iam_role.iam_lambda_cw_to_logzio.name]
  policy_arn = aws_iam_policy.policy_cw_to_logzio.arn
}

resource "aws_lambda_function" "lambda_cloudwatch_to_logzio" {
  # Change to your path of the zip file you created in the 1st step
  filename      = "/path/to/your/logzio-cloudwatch.zip"

  function_name = "cloudwatch_to_logzio"
  role          = aws_iam_role.iam_lambda_cw_to_logzio.arn
  runtime = "python3.9"
  handler = "lambda_function.lambda_handler"

  # These default settings are just a starting point. Check your Lambda usage regularly, and adjust these values if you need to.
  timeout = 60
  memory_size = 512

  environment {
    variables = {
      # Required variables:
      TOKEN = "<<LOG-SHIPPING-TOKEN>>" # Your Logz.io shipping token
      LISTENER_URL = "https://<<LISTENER-HOST>>:8071" # Your Logz.io listener host (for example, listener.logz.io)

      # To learn more about all the environment variables for this function, see the parameters table in the documentation.
    }
  }
}

# Log group for the lambda function we create
resource "aws_cloudwatch_log_group" "log_group_cw_to_logzio" {
  name = "/aws/lambda/${aws_lambda_function.lambda_cloudwatch_to_logzio.function_name}"

  # You can add retention days for the function's log group
  # retention_in_days = 5
}

resource "aws_lambda_permission" "allow_cloudwatch" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_cloudwatch_to_logzio.function_name
  principal     = "logs.amazonaws.com"
}

# Subscription filter to the log group you wish to subscribe to.
# Create a seperate "aws_cloudwatch_log_subscription_filter" resource for every log group you want to subscribe to.
resource "aws_cloudwatch_log_subscription_filter" "cw_to_logzio_subscription" {
  name            = "cw_to_logzio_subscription"
  # Change "log_group_name" to the log group name you want to subscribe to. For example - /aws/lambda/my_lambda_function
  log_group_name  = "<<LOG-GROUP-TO-READ-FROM>>"
  filter_pattern  = ""
  destination_arn = "${aws_lambda_function.lambda_cloudwatch_to_logzio.arn}"
}

```

{% include log-shipping/cloudwatch-parameters.md %}

##### Create Terraform execution plan

The following command will create a Terraform execution plan out of your configuration

```bash
terraform plan -out terraform.plan
```

##### Apply the plan

The following command will apply the execution plan you've created in the previous step, meaning that Terraform will create the resources you described in the configuration:

```bash
terraform apply terraform.plan  
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


##### Destroying the resources

To destroy the resources, use the following:

```bash
terraform destroy
```
</div>


#### Working with test events

You can generate test events using the Logz.io Lambda test events generator and add these events to your Lambda function. This functionality is currently only available on Linux & macOS.


<div class="tasklist">

##### Generate a test event

1. In your terminal, run the following command:
  
   ```shell
   bash <(curl -s https://raw.githubusercontent.com/logzio/logzio_aws_serverless/master/python3/cloudwatch/test_events/test_event_generator.sh)      
   ```
               
   This script generates a test event with a UTC timestamp of the moment you run the script.
               
2. Copy the output JSON.

##### Add the generated test event to your Lambda function

1. Select the Lambda function that you need to add the test event to.
2. Open the **Test** tab.
3. Select **New event**.
4. In the **Template** field, select **CloudWatch Logs**.
5. In the **Name** field, enter a name for the test event. No specific naming convention is required. 
6. Populate the body field with the output JSON of the test event generated in the previous step.
7. Select **Format** to format the test event.
8. Select **Save changes**.

##### Run the test event

To run the test event, select **Test** in the **Test** tab. The Lambda function will run and generate the following two logs in your account:
`[ERROR] Logz.io cloudwatch test log1` `[ERROR] Logz.io cloudwatch test log2`

</div>
</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
