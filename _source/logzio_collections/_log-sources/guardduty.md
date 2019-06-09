---
title: Ship GuardDuty logs
logo:
  logofile: aws-guardduty.png
  orientation: vertical
open-source:
  - title: Kinesis Stream Shipper - Lambda
    github-repo: logzio_aws_serverless/tree/master/kinesis
shipping-summary:
  data-source: Amazon GuardDuty
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/GuardDuty
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - aws
  - security
---

<div class="branching-container">

{: .branching-tabs }
  * [Manual Lambda configuration](#manual-lambda-configuration)
  * [Automated CloudFormation deployment](#automated-cloudformation-deployment)

<div id="manual-lambda-configuration">

## GuardDuty setup

###### Manual configuration

{: .tasklist .firstline-headline }
1. Create a new Kinesis data stream

    If you're not already sending your GuardDuty logs through a Kinesis data stream, create one using the [Kinesis console](https://console.aws.amazon.com/kinesis).

    Save the name of the data stream—you'll need this in the next step.

2. Configure CloudWatch Events

    In the [CloudWatch console](https://console.aws.amazon.com/cloudwatch/) left menu, click **Events > Rules**, and then click **Create rule**.

    In the Event Source panel (on the left), set these options:

    * Choose **Event Pattern**.
    * In the **Build event pattern** section, choose **GuardDuty** from the **Service Name** list.
      You can choose any **Event Type** that you need.

    In the Targets panel (on the right), click **Add target**, and choose **Kinesis stream**.
    Choose the Kinesis data stream from step 1 from the **Stream** list.

    Click **Configure details** (lower right corner).

3. Create a new Lambda function

    This Lambda function will collect CloudWatch logs and sends them to Logz.io in bulk over HTTP.

    Open the AWS Lambda Console, and click **Create function**.
    Choose **Author from scratch**, and use this information:

    * **Name**: We suggest adding the log type to the name, but you can name this function whatever you want.
    * **Runtime**: Choose **Python 2.7**
    * **Role**: Click **Create new role from template(s)**.
      Under Existing role, select **Basic Edge Lambda permissions**

    Click **Create Function** (bottom right corner of the page).
    After a few moments, you'll see configuration options for your Lambda function.

    You'll need this page later on, so keep it open.

4. Zip the source files

    Download the [Kinesis Stream Shipper - Lambda](https://github.com/logzio/logzio_aws_serverless/tree/master/kinesis) project from GitHub to your computer.

    In the command line, `cd` into logzio_aws_serverless/kinesis, and zip the Python files in the src/ folder.

    ```shell
    mkdir dist; cp -r ../shipper dist/ && cp src/lambda_function.py dist/ && cd dist/ && zip logzio-kinesis shipper/* lambda_function.py
    ```

    This creates a zip file at dist/logzio-kinesis.zip.
    You'll upload this file in the next step.

5. Upload the zip file and set environment variables

    In the Function code section of Lambda find the **Code entry type** list.
    Choose **Upload a .ZIP file** from this list.

    Click **Upload**, and choose the zip file you created earlier (`logzio-kinesis.zip`).

    In the Environment variables section, set your Logz.io account token, URL, and log type, and any other variables that you need to use.

    TOKEN <span class="required-param"></span>
    : {% include log-shipping/replace-vars.html token='noReplace' %}
      <!-- logzio-inject:account-token -->

    URL <span class="required-param"></span>
    : {% include log-shipping/replace-vars.html listener='noReplace' %}
      <!-- logzio-inject:listener-url -->

    TYPE <span class="default-param">`"guardduty"`</span>
    : The log type you'll use with this Lambda.
      This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type. \\
      Please note that you should create a new Lambda for each log type you use.

    FORMAT <span class="default-param">`"text"`</span>
    : `"json"` or `"text"`.
      If `"json"`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields.

    COMPRESS <span class="default-param">`false`</span>
    : Set to `true` to compress logs before sending them.
      Set to `false` to send uncompressed logs.

6. Configure the function's basic settings

    In Basic settings, we recommend starting with these settings:

    * **Memory**: 512 MB
    * **Timeout**: 1 min 0 sec

    <div class="info-box note">
    These default settings are just a starting point.
    Check your Lambda usage regularly, and adjust these values if you need to.
    </div>

7. Set the Kinesis event trigger

    Find the **Add triggers** list (left side of the Designer panel).
    Choose **Kinesis** from this list.

    Below the Designer, you'll see the Configure triggers panel.
    Choose the **Kinesis stream** that the Lambda function will watch.

    Click **Add**, and then click **Save** at the top of the page.

8. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="automated-cloudformation-deployment">

## GuardDuty setup

**You'll need**:
AWS CLI,
an S3 bucket to store the CloudFormation package

###### CloudFormation automated deployment

{: .tasklist .firstline-headline }
1. Create a new Kinesis data stream

    If you're not already sending your GuardDuty logs through a Kinesis data stream, create one using the [Kinesis console](https://console.aws.amazon.com/kinesis).

    Save the name of the data stream---you'll need this in the next step.

2. Configure CloudWatch Events

    In the [CloudWatch console](https://console.aws.amazon.com/cloudwatch/) left menu, click **Events > Rules**, and then click **Create rule**.

    In the Event Source panel (on the left), set these options:

    * Choose **Event Pattern**.
    * In the **Build event pattern** section, choose **GuardDuty** from the **Service Name** list.
      You can choose any **Event Type** that you need.

    In the Targets panel (on the right), click **Add target**, and choose **Kinesis stream**.
    Choose the Kinesis data stream from step 1 from the **Stream** list.

    Click **Configure details** (lower right corner).

3. Zip the source files

    Download the [Kinesis Stream Shipper - Lambda](https://github.com/logzio/logzio_aws_serverless/tree/master/kinesis) project from GitHub to your computer.

    In the command line, `cd` into logzio_aws_serverless/kinesis, and zip the Python files in the src/ folder.

    ```shell
    mkdir dist; cp -r ../shipper dist/ && cp src/lambda_function.py dist/ && cd dist/ && zip logzio-kinesis shipper/* lambda_function.py
    ```

    This creates a zip file at dist/logzio-kinesis.zip.
    You'll upload this file in the next step.

4. Create the CloudFormation package and upload to S3

    In the command line, type `cd ..` to return to the logzio_aws_serverless/kinesis folder.

    Create the CloudFormation package using the AWS CLI.
    Replace `<YOUR-S3-BUCKET>` with the S3 bucket name where you'll be uploading this package.

    ```shell
    aws cloudformation package
      --template sam-template.yaml
      --output-template-file kinesis-template.output.yaml
      --s3-bucket <YOUR-S3-BUCKET>
      ```

5. Deploy the CloudFormation package

    Deploy the CloudFormation package using AWS CLI.

    For a complete list of options, see the configuration parameters below the code block. 👇

    ```shell
    aws cloudformation deploy
    --template-file $(pwd)/cloudformation-template.output.yaml
    --stack-name logzio-kinesis-logs-lambda-stack
    --parameter-overrides
      LogzioTOKEN='<ACCOUNT-TOKEN>'
      KinesisStream='<KINESIS-STREAM-NAME>'
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

    LogzioFORMAT <span class="default-param">`"text"`</span>
    : `"json"` or `"text"`.
      If `"json"`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields.

    LogzioCOMPRESS <span class="default-param">`false`</span>
    : Set to `true` to compress logs before sending them.
      Set to `false` to send uncompressed logs.

    KinesisStreamBatchSize <span class="default-param">`100`</span>
    : The largest number of records to read from your stream at one time.

    KinesisStreamStartingPosition <span class="default-param">`"LATEST"`</span>
    : The position in the stream to start reading from.
      For more information, see [ShardIteratorType](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html) in the Amazon Kinesis API Reference.

6. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>


</div>