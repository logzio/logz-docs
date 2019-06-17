---
title: Ship Kinesis logs
logo:
  logofile: aws-kinesis.svg
  orientation: vertical
open-source:
  - title: Kinesis Stream Shipper - Lambda
    github-repo: logzio_aws_serverless/tree/master/kinesis
data-source: Kinesis
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Kinesis
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - aws
---

<div class="branching-container">

* [Manual Lambda configuration](#manual-lambda-configuration)
* [Automated CloudFormation deployment](#automated-cloudformation-deployment)
{:.branching-tabs}

<div id="manual-lambda-configuration">

## Kinesis + Lambda setup

###### Manual configuration

1.  Create a new Lambda function

    This Lambda function will consume a Kinesis data stream and sends the logs to Logz.io in bulk over HTTP.

    Open the AWS Lambda Console, and click **Create function**.
    Choose **Author from scratch**, and use this information:

    * **Name**: We suggest adding the log type to the name, but you can name this function whatever you want.
    * **Runtime**: Choose **Python 2.7**
    * **Role**: Use a role that has `AWSLambdaKinesisExecutionRole` permissions.

    Click **Create Function** (bottom right corner of the page). After a few moments, you'll see configuration options for your Lambda function.

    You'll need this page later on, so keep it open.

2.  Zip the source files

    Download the [Kinesis Stream Shipper - Lambda](https://github.com/logzio/logzio_aws_serverless/tree/master/kinesis) project from GitHub to your computer.

    In the command line, `cd` into logzio_aws_serverless/kinesis, and zip the Python files in the src/ folder.

    ```shell
    mkdir dist; cp -r ../shipper dist/ && cp src/lambda_function.py dist/ && cd dist/ && zip logzio-kinesis shipper/* lambda_function.py
    ```

    This creates a zip file at dist/logzio-kinesis.zip. You'll upload this file in the next step.

3.  Upload the zip file and set environment variables

    In the Function code section of Lambda find the **Code entry type** list. Choose **Upload a .ZIP file** from this list.

    Click **Upload**, and choose the zip file you created earlier (`logzio-kinesis.zip`).

    In the Environment variables section, set your Logz.io account token, URL, and log type, and any other variables that you need to use.

    TOKEN <span class="required-param"></span>
    : {% include log-shipping/replace-vars.html token='noReplace' %}
      <!-- logzio-inject:account-token -->

    URL <span class="required-param"></span>
    : {% include log-shipping/replace-vars.html listener='noReplace' %}
      <!-- logzio-inject:listener-url -->

    TYPE <span class="required-param"></span>
    : The log type you'll use with this Lambda.
      This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type. \\
      Please note that you should create a new Lambda for each log type you use.

    FORMAT <span class="default-param">`text`</span>
    : `json` or `text`.
      If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields.

    COMPRESS <span class="default-param">`false`</span>
    : Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs.

4.  Configure the function's basic settings

    In Basic settings, we recommend starting with these settings:

    * **Memory**: 512 MB
    * **Timeout**: 1 min 0 sec

    These default settings are just a starting point.
    Check your Lambda usage regularly, and adjust these values if you need to.
    {:.info-box.note}

5.  Set the Kinesis event trigger

    Find the **Add triggers** list (left side of the Designer panel). Choose **Kinesis** from this list.

    Below the Designer, you'll see the Configure triggers panel. Choose the **Kinesis stream** that the Lambda function will watch.

    Click **Add**, and then click **Save** at the top of the page.

6.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}

</div>

<div id="automated-cloudformation-deployment">

## Kinesis + Lambda setup

**You'll need**:
AWS CLI,
an S3 bucket to store the CloudFormation package

###### CloudFront automated deployment

1.  Zip the source files

    Download the [Kinesis Stream Shipper - Lambda](https://github.com/logzio/logzio_aws_serverless/tree/master/kinesis) project from GitHub to your computer.

    In the command line, `cd` into logzio_aws_serverless/kinesis, and zip the Python files in the src/ folder.

    ```shell
    mkdir dist; cp -r ../shipper dist/ && cp src/lambda_function.py dist/ && cd dist/ && zip logzio-kinesis shipper/* lambda_function.py
    ```

    This creates a zip file at dist/logzio-kinesis.zip.
    You'll upload this file in the next step.

2.  Create the CloudFormation package and upload to S3

    In the command line, type `cd ..` to return to the logzio_aws_serverless/kinesis folder.

    Create the CloudFormation package using the AWS CLI.
    Replace `<<YOUR-S3-BUCKET>>` with the S3 bucket name where you'll be uploading this package.

    ```shell
    aws cloudformation package
      --template sam-template.yaml
      --output-template-file kinesis-template.output.yaml
      --s3-bucket <<YOUR-S3-BUCKET>>
      ```

3.  Deploy the CloudFormation package

    Deploy the CloudFormation package using AWS CLI.

    For a complete list of options, see the configuration parameters below the code block. 👇

    ```shell
    aws cloudformation deploy
    --template-file $(pwd)/cloudformation-template.output.yaml
    --stack-name logzio-kinesis-logs-lambda-stack
    --parameter-overrides
      LogzioTOKEN='<<SHIPPING-TOKEN>>'
      KinesisStream='<<KINESIS-STREAM-NAME>>'
    --capabilities "CAPABILITY_IAM"
    ```

    LogzioTOKEN <span class="required-param"></span>
    : {% include log-shipping/replace-vars.html token=true %}
      <!-- logzio-inject:account-token -->

    KinesisStream <span class="required-param"></span>
    : The name of the Kinesis stream where this function will listen for updates.

    LogzioURL <span class="default-param">`https://listener.logz.io:8071`</span>
    : {% include log-shipping/replace-vars.html listener='noReplace' %}
      <!-- logzio-inject:listener-url -->

    LogzioTYPE <span class="default-param">`logzio_kinesis_stream`</span>
    : The log type you'll use with this Lambda.
      This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type. \\
      Please note that you should create a new Lambda for each log type you use.

    LogzioFORMAT <span class="default-param">`text`</span>
    : `json` or `text`.
      If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields.

    LogzioCOMPRESS <span class="default-param">`false`</span>
    : Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs.

    KinesisStreamBatchSize <span class="default-param">`100`</span>
    : The largest number of records to read from your stream at one time.

    KinesisStreamStartingPosition <span class="default-param">`LATEST`</span>
    : The position in the stream to start reading from.
      For more information, see [ShardIteratorType](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html) in the Amazon Kinesis API Reference.

4.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}

</div>

</div>