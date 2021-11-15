---
title: Ship CloudWatch logs
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
data-source: CloudWatch
data-for-product-source: Logs
short-description: Send your data to Logz.io from CloudWatch via a Lambda function, every x seconds.
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

* [Manual Lambda configuration](#manual-lambda-configuration)
* [Automated CloudFormation deployment](#automated-cloudformation-deployment)
* [Terraform deployment](#terraform-deployment)
{:.branching-tabs}

<!-- tab:start -->
<div id="manual-lambda-configuration">

#### Manual configuration with a Lambda function

{% include log-shipping/note-lambda-test.md %}

<div class="tasklist">

##### Create a new Lambda function

This Lambda function will collect CloudWatch logs and sends them to Logz.io in bulk over HTTPS.

Open the AWS Lambda Console, and click **Create function**.
Choose **Author from scratch**, and use this information:

* **Name**: We suggest adding the log type to the name, but you can name this function whatever you want.
* **Runtime**: Choose **Python 3.7**
* **Role**: Click **Create new role from template(s)**. Then, from the **Policy Templates** list, select **Basic Edge Lambda permissions**.

Click **Create Function** (bottom right corner of the page). After a few moments, you'll see configuration options for your Lambda function.

You'll need this page later on, so keep it open.

##### Zip the source files

Clone the CloudWatch Logs Shipper - Lambda project from GitHub to your computer,
and zip the Python files in the `src/` folder.

```shell
git clone https://github.com/logzio/logzio_aws_serverless.git \
&& cd logzio_aws_serverless/python3/cloudwatch/ \
&& mkdir -p dist/python3/shipper; cp -r ../shipper/shipper.py dist/python3/shipper \
&& cp src/lambda_function.py dist \
&& cd dist/ \
&& zip logzio-cloudwatch lambda_function.py python3/shipper/*
```

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

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="automated-cloudformation-deployment">

#### Automated CloudFormation deployment

{% include log-shipping/note-lambda-test.md %}

**Before you begin, you'll need**:
AWS CLI,
an S3 bucket to store the CloudFormation package

<div class="tasklist">

##### Zip the source files

Clone the CloudWatch Logs Shipper - Lambda project from GitHub to your computer,
and zip the Python files in the `src/` folder.

```shell
git clone https://github.com/logzio/logzio_aws_serverless.git \
&& cd logzio_aws_serverless/python3/cloudwatch/ \
&& mkdir -p dist/python3/shipper; cp -r ../shipper/shipper.py dist/python3/shipper \
&& cp src/lambda_function.py dist \
&& cd dist/ \
&& zip logzio-cloudwatch lambda_function.py python3/shipper/*
```

##### Create the CloudFormation package and upload to S3

Create the CloudFormation package using the AWS CLI.
Replace `<<YOUR-S3-BUCKET>>` with the S3 bucket name where you'll be uploading this package.

```shell
cd ../ \
&& aws cloudformation package \
  --template sam-template.yaml \
  --output-template-file cloudformation-template.output.yaml \
  --s3-bucket <<YOUR-S3-BUCKET>>
```

##### Deploy the CloudFormation package

Deploy the CloudFormation package using AWS CLI.

For a complete list of options, see the configuration parameters below the code block. 👇

```shell
aws cloudformation deploy \
--template-file $(pwd)/cloudformation-template.output.yaml \
--stack-name logzio-cloudwatch-logs-lambda-stack \
--parameter-overrides \
  LogzioTOKEN='<<LOG-SHIPPING-TOKEN>>' \
--capabilities "CAPABILITY_IAM"
```


###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| LogzioTOKEN | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}  | Required |
| LogzioREGION |  {% include log-shipping/log-region.md %}
| LogzioURL (Deprecated) | Use LogzioREGION instead. Protocol, listener host, and port (for example, `https://<<LISTENER-HOST>>:8071`). The [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to. | -- |
| LogzioTYPE | The log type you'll use with this Lambda. This can be a [built-in log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), or a custom log type. You should create a new Lambda for each log type you use. | `logzio_cloudwatch_logs` |
| LogzioFORMAT | `json` or `text`. If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. | `text` |
| LogzioCOMPRESS | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. | `false` |
| LogzioENRICH | Enrich CloudWatch events with custom properties, formatted as `key1=value1;key2=value2`. | -- |



{% include log-shipping/cloudwatch-defaults.md %}


##### Set the CloudWatch Logs event trigger

1. Find the **Add triggers** list (left side of the Designer panel). Choose **CloudWatch Logs** from this list.

2. Below the Designer, you'll see the Configure triggers panel. Choose the **Log group** that the Lambda function will watch.

3. Type a **Filter name** (required) and **Filter pattern** (optional).

4. Click **Add**, then **Save** at the top of the page.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="terraform-deployment">

#### Terraform deployment

You can deploy this integration using Terraform with [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

##### Zip the source files
Clone the CloudWatch Logs Shipper - Lambda project from GitHub to your computer, and zip the Python files in the src/ folder as follows:

```bash
git clone https://github.com/logzio/logzio_aws_serverless.git \
&& cd logzio_aws_serverless/python3/cloudwatch/ \
&& mkdir -p dist/python3/shipper; cp -r ../shipper/shipper.py dist/python3/shipper \
&& cp src/lambda_function.py dist \
&& cd dist/ \
&& zip logzio-cloudwatch lambda_function.py python3/shipper/* \
&& mv logzio-cloudwatch.zip ..... \
&& cd ..... \
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

(NICO PLEASE ADD HERE THE PARAMETERS TABLE FROM THE MANUAL DEPLOYMENT TAB)

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

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


##### Destroying the resources

To destroy the resources, use the following:

```bash
terraform destroy
```

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
