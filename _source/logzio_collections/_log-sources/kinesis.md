---
title: Ship Kinesis logs
logo:
  logofile: aws-kinesis.svg
  orientation: vertical
open-source:
  - title: Kinesis Stream Shipper - Lambda
    github-repo: logzio_aws_serverless/tree/master/python3/kinesis
data-source: Kinesis
templates: ["lambda-kinesis", "cloudformation"]
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Kinesis
contributors:
  - idohalevi
  - imnotashrimp
  - ronish31
  - yyyogev
shipping-tags:
  - aws
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Manual Lambda configuration](#manual-lambda-configuration)
* [Automated CloudFormation deployment](#automated-cloudformation-deployment)
{:.branching-tabs}

<!-- tab:start -->
<div id="manual-lambda-configuration">

#### Manual configuration with a Lambda function

<div class="tasklist">

##### Create a new Lambda function

This Lambda function will consume a Kinesis data stream and sends the logs to Logz.io in bulk over HTTP.

Open the AWS Lambda Console, and click **Create function**.
Choose **Author from scratch**, and use this information:

* **Name**: We suggest adding the log type to the name, but you can name this function whatever you want.
* **Runtime**: Choose **Python 3.7**
* **Role**: Use a role that has `AWSLambdaKinesisExecutionRole` permissions.

Click **Create Function** (bottom right corner of the page). After a few moments, you'll see configuration options for your Lambda function.

You'll need this page later on, so keep it open.

##### Download the Kinesis stream shipper

Download the [latest Kinesis stream shipper](https://github.com/logzio/logzio_aws_serverless/releases). It is a zip file.


##### Upload the zip file and set environment variables

In the _Function_ code section of Lambda, find the **Code entry type** list.
Choose **Upload a .ZIP file** from this list.

Click **Upload**, and choose the zip file you created earlier (`logzio-kinesis.zip`).

In the _Environment variables_ section, set your Logz.io account token, URL, and log type, and any other variables that you need to use.

###### Environment variables

| Parameter | Description |
|---|---|
| TOKEN (Required) | {% include log-shipping/replace-vars.html token='noReplace' %} <!-- logzio-inject:account-token --> |
| REGION | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. <br> You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. |
| URL (_Deprecated_) | Use REGION instead. Protocol, listener host, and port (for example, `https://<<LISTENER-HOST>>:8071`). <br > Replace `<<LISTENER-HOST>>` with your region's listener host (for example, `listener.logz.io`). For more information on finding your account's region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html). <!-- logzio-inject:listener-url --> |
| TYPE <span class="default-param">`kinesis_lambda`</span> | The log type you'll use with this Lambda. This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type. <br> You should create a new Lambda for each log type you use. |
| FORMAT <span class="default-param">`text`</span> | `json` or `text`. If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. |
| COMPRESS <span class="default-param">`false`</span> | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. |
| MESSAGES_ARRAY (_Optional_) | Name the field containing a JSON array that will be used to split the log document. [Learn more]({{site.baseurl}}/user-guide/mapping-and-parsing/split-json-array.html). **Note**: This option only works if the `FORMAT` is set to `json`. |
{:.paramlist}

##### Configure the function's basic settings

In Basic settings, we recommend starting with these settings:

* **Memory**: 512 MB
* **Timeout**: 1 min 0 sec

These default settings are just a starting point.
Check your Lambda usage regularly, and adjust these values if you need to.
{:.info-box.note}

##### Set the Kinesis event trigger

Find the **Add triggers** list (left side of the Designer panel). Choose **Kinesis** from this list.

Below the Designer, you'll see the Configure triggers panel. Choose the **Kinesis stream** that the Lambda function will watch.

Click **Add**, and then click **Save** at the top of the page.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="automated-cloudformation-deployment">

#### Automated CloudFormation deployment

**Before you begin, you'll need**:

* AWS CLI
* An S3 bucket to store the CloudFormation package

<div class="tasklist">

##### Download the Kinesis stream shipper

Download the [latest Kinesis stream shipper](https://github.com/logzio/logzio_aws_serverless/releases). It is a zip file.

##### Create the CloudFormation package and upload to S3

Create the CloudFormation package using the AWS CLI.
Replace `<<YOUR-S3-BUCKET>>` with the S3 bucket name where you'll be uploading this package.

```shell
curl -o sam-template.yaml https://raw.githubusercontent.com/logzio/logzio_aws_serverless/master/python3/kinesis/sam-template.yaml
aws cloudformation package \
  --template sam-template.yaml \
  --output-template-file kinesis-template.output.yaml \
  --s3-bucket <<YOUR-S3-BUCKET>>
```

##### Deploy the CloudFormation package

Deploy the CloudFormation package using AWS CLI.

For a complete list of options, see the configuration parameters below the code block. 👇

```shell
aws cloudformation deploy \
--template-file $(pwd)/kinesis-template.output.yaml \
--stack-name logzio-kinesis-logs-lambda-stack \
--parameter-overrides \
  LogzioTOKEN='<<SHIPPING-TOKEN>>' \
  KinesisStream='<<KINESIS-STREAM-NAME>>' \
--capabilities "CAPABILITY_IAM"
```

###### Parameters

| Parameter | Description |
|---|---|
| LogzioTOKEN (Required) | {% include log-shipping/replace-vars.html token=true %} <!-- logzio-inject:account-token --> |
| KinesisStream (Required) | The name of the Kinesis stream where this function will listen for updates. |
| LogzioREGION | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. <br> You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. |
| LogzioURL (Deprecated) | Use LogzioREGION instead. Protocol, listener host, and port (for example, `https://<<LISTENER-HOST>>:8071`). <br > The [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to. |
| LogzioTYPE <span class="default-param">`kinesis_lambda`</span> | The log type you'll use with this Lambda. This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type. <br> You should create a new Lambda for each log type you use. |
| LogzioFORMAT <span class="default-param">`text`</span> | `json` or `text`. If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. |
| LogzioCOMPRESS <span class="default-param">`false`</span> | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. |
| KinesisStreamBatchSize <span class="default-param">`100`</span> | The largest number of records to read from your stream at one time. |
| KinesisStreamStartingPosition <span class="default-param">`LATEST`</span> | The position in the stream to start reading from. For more information, see [ShardIteratorType](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html) in the Amazon Kinesis API Reference. |
{:.paramlist}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
