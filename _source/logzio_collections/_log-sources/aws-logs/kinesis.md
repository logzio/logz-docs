---
layout: article
title: Ship Kinesis logs
logo:
  logofile: aws-kinesis.svg
  orientation: vertical
shipping-summary:
  data-source: Amazon Kinesis
  log-shippers:
    - AWS Lambda function
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Kinesis
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [Manual Lambda configuration](#manual-lambda-configuration)
  * [Automatic CloudFront deployment](#automatic-cloudfront-deployment)

<div id="manual-lambda-configuration">

## Kinesis + Lambda setup

###### Manual configuration

{: .tasklist .firstline-headline }
1. Create a new Lambda function

    This Lambda function will consume a Kinesis data stream and sends the logs to Logz.io in bulk over HTTP.

    Open the AWS Lambda Console, and click **Create function**.
    Choose **Author from scratch**, and use this information:

    * **Name**: We suggest adding the log type to the name, but you can name this function whatever you want.
    * **Runtime**: Choose **Python 2.7**
    * **Role**: Use a role that has `AWSLambdaKinesisExecutionRole` permissions.

    Click **Create Function** (bottom right corner of the page). After a few moments, you'll see configuration options for your Lambda function.

    You'll need this page later on, so keep it open.

2. Zip the source files

    Download the [Kinesis Stream Shipper - Lambda](https://github.com/logzio/logzio_aws_serverless/tree/master/kinesis) project from GitHub to your computer.

    In the command line, `cd` into logzio_aws_serverless/kinesis, and zip the Python files in the src/ folder.

    ```shell
    mkdir dist; cp -r ../shipper dist/ && cp src/lambda_function.py dist/ && cd dist/ && zip logzio-kinesis shipper/* lambda_function.py
    ```

    This creates a zip file at dist/logzio-kinesis.zip. You'll upload this file in the next step.

3. Upload the zip file and set environment variables

    In the Function code section of Lambda find the **Code entry type** list. Choose **Upload a .ZIP file** from this list.

    Click **Upload**, and choose the zip file you created earlier (`logzio-kinesis.zip`).

    In the Environment variables section, set your Logz.io account token, URL, and log type, and any other variables that you need to use.

    {: .parameter-list }
    TOKEN <span class="required-param"></span>
      : {% include log-shipping/replace-vars.html token='noReplace' %}
        <!-- logzio:account-token -->

    TYPE <span class="required-param"></span>
      : The log type you'll use with this Lambda.
        This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type. <br />
        Please note that you should create a new Lambda for each log type you use.

    URL <span class="required-param"></span>
      : Your Logz.io listener URL.
        If your Logz.io login URL is app-eu.logz.io, use `https://listener-eu.logz.io:8071`.
        If your Logz.io login URL is app.logz.io, use `https://listener.logz.io:8071`.

    FORMAT
      : `json` or `text`.
        If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. <br />
        <span class="default-param">`text`</span>

    COMPRESS
      : Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. <br />
        <span class="default-param">`false`</span>

4. Configure the function's basic settings

    In Basic settings, we recommend starting with these settings:
    * **Memory:** 512 MB
    * **Timeout:** 1 min 0 sec

    <div class="info-box note">
    These default settings are just a starting point.
    Check your Lambda usage regularly, and adjust these values if you need to.
    </div>

5. Set the Kinesis event trigger

    Find the **Add triggers** list (left side of the Designer panel). Choose **Kinesis** from this list.

    Below the Designer, you'll see the Configure triggers panel. Choose the **Kinesis stream** that the Lambda function will watch.

    Click **Add**, and then click **Save** at the top of the page.

6. Test your configuration

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="automatic-cloudfront-deployment">

## Kinesis + Lambda setup

**You'll need:** AWS CLI, an S3 bucket to store the CloudFormation package

###### Automatic CloudFront deployment

{: .tasklist .firstline-headline }
1. Zip the source files

    Download the [Kinesis Stream Shipper - Lambda](https://github.com/logzio/logzio_aws_serverless/tree/master/kinesis) project from GitHub to your computer.

    In the command line, `cd` into logzio_aws_serverless/kinesis, and zip the Python files in the src/ folder.

    ```shell
    mkdir dist; cp -r ../shipper dist/ && cp src/lambda_function.py dist/ && cd dist/ && zip logzio-kinesis shipper/* lambda_function.py
    ```

    This creates a zip file at dist/logzio-kinesis.zip.
    You'll upload this file in the next step.

2. Create the CloudFormation package and upload to S3

    In the command line, type `cd ..` to return to the logzio_aws_serverless/kinesis folder.

    Create the CloudFormation package using the AWS CLI.
    Replace `{YOUR-S3-BUCKET}` with the S3 bucket name where you'll be uploading this package.

    ```shell
    aws cloudformation package
      --template sam-template.yaml
      --output-template-file kinesis-template.output.yaml
      --s3-bucket {YOUR-S3-BUCKET}
      ```

3. Deploy the CloudFormation package

    Deploy the CloudFormation package using AWS CLI.

    For a complete list of options, see the configuration parameters below the code block. 👇

    ```shell
    aws cloudformation deploy
    --template-file $(pwd)/cloudformation-template.output.yaml
    --stack-name logzio-kinesis-logs-lambda-stack
    --parameter-overrides
      LogzioTOKEN='{ACCOUNT-TOKEN}'
      KinesisStream='{KINESIS-STREAM-NAME}'
    --capabilities "CAPABILITY_IAM"
    ```

    {: .parameter-list }
    LogzioTOKEN <span class="required-param"></span>
      : {% include log-shipping/replace-vars.html token=true %}
        <!-- logzio:account-token -->

    KinesisStream <span class="required-param"></span>
      : The name of the Kinesis stream where this function will listen for updates.

    LogzioURL
      : Your Logz.io listener URL.
        If your Logz.io login URL is app-eu.logz.io, use `https://listener-eu.logz.io:8071`.
        If your Logz.io login URL is app.logz.io, use `https://listener.logz.io:8071`. <br />
        <span class="default-param">`https://listener.logz.io:8071`</span>

    LogzioTYPE
      : The log type you'll use with this Lambda.
        This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type. <br />
        Please note that you should create a new Lambda for each log type you use.
        <span class="default-param">`logzio_kinesis_stream`</span>

    LogzioFORMAT
      : `json` or `text`.
        If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. <br />
        <span class="default-param">`text`</span>

    LogzioCOMPRESS
      : Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. <br />
        <span class="default-param">`false`</span>

    KinesisStreamBatchSize
      : The largest number of records to read from your stream at one time. <br />
        <span class="default-param">`100`</span>

    KinesisStreamStartingPosition
      : The position in the stream to start reading from.
        For more information, see [ShardIteratorType](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html) in the Amazon Kinesis API Reference. <br />
        <span class="default-param">`LATEST`</span>

4. Test your configuration

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>


</div>