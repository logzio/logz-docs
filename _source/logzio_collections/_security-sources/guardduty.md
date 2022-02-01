---
title: Ship GuardDuty logs
logo:
  logofile: aws-guardduty.png
  orientation: vertical
open-source:
  - title: Kinesis Stream Shipper - Lambda
    github-repo: logzio_aws_serverless/tree/master/python3/kinesis
data-source: GuardDuty
data-for-product-source: Cloud SIEM
templates: ["lambda-kinesis", "cloudformation"]
contributors:
  - idohalevi
  - imnotashrimp
  - ronish31
shipping-tags:
  - aws
order: 780   
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Manual Lambda configuration](#manual-lambda-configuration)
* [Automated CloudFormation deployment](#automated-cloudformation-deployment)
{:.branching-tabs}

<!-- tab:start -->
<div id="manual-lambda-configuration">

#### Manual Lambda configuration


<div class="tasklist">

##### Create a new Kinesis data stream

If you're not already sending your GuardDuty logs through a Kinesis data stream, create one using the [Kinesis console](https://console.aws.amazon.com/kinesis).

Save the name of the data stream—you'll need this in the next step.

##### Configure CloudWatch Events

In the [CloudWatch console](https://console.aws.amazon.com/cloudwatch/) left menu, click **Events > Rules**, and then click **Create rule**.

In the Event Source panel (on the left), set these options:

* Choose **Event Pattern**.
* In the **Build event pattern** section, choose **GuardDuty** from the **Service Name** list.
  You can choose any **Event Type** that you need.

In the Targets panel (on the right), click **Add target**, and choose **Kinesis stream**.
Choose the Kinesis data stream from step 1 from the **Stream** list.

Click **Configure details** (lower right corner).

##### Create a new IAM role

Create a new IAM role and attach the **AWSLambdaKinesisExecutionRole** policy to the new role.

##### Create a new Lambda function

This Lambda function will collect CloudWatch logs and sends them to Logz.io in bulk over HTTP.

Open the AWS Lambda Console, and click **Create function**.
Choose **Author from scratch**, and use this information:

* **Name**:
  We suggest adding the log type to the name, but you can name this function whatever you want.
* **Runtime**:
  Choose **Python 3.7**
* **Role**:
  Select **Use an existing role**.
  Then, select the role that you created in the previous step. It should have the **AWSLambdaKinesisExecutionRole** policy.
   
Click **Create Function** (bottom right corner of the page).
After a few moments, you'll see configuration options for your Lambda function.

You'll need this page later on, so keep it open.

##### Download the Kinesis stream shipper

Download the latest Kinesis stream shipper zip file from the [Logz.io GitHub page](https://github.com/logzio/logzio_aws_serverless/releases).

By default, the zip file will be named `logzio-kinesis-0.0.2.zip`.

##### Upload the zip file

In the _Function_ code section of Lambda, open the **Code entry type** list and select **Upload a .ZIP file**.

Click **Upload** and select the zip file you created in the previous step (`logzio-kinesis-0.0.2.zip`).

##### Set environment variables

In the _Environment variables_ section, set your Logz.io account token, URL, and log type, and any other variables that you need to use.

###### Environment variables

| Parameter | Description | Required/Default |
|---|---|---|
| TOKEN (Required) | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %} | Required  |
| REGION | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL.    You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. | Default: *blank* (US East)|
| URL  (Deprecated)| Use REGION instead. Protocol, listener host, and port (for example, `https://<<LISTENER-HOST>>:8071`). {% include log-shipping/listener-var.html %}  | Required |
| TYPE | The log type you'll use with this Lambda. This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type.    You should create a new Lambda for each log type you use. | `"guardduty"` |
| FORMAT | `"json"` or `"text"`. If `"json"`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. | `"text"` |
| COMPRESS | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. | `false` |


##### Configure the function's basic settings

In Basic settings, we recommend starting with these settings:

* **Memory**: 512 MB
* **Timeout**: 1 min 0 sec

<!-- info-box-start:info -->
These default settings are just a starting point. Check your Lambda usage regularly, and adjust these values if you need to.
{:.info-box.note}
<!-- info-box-end -->

##### Set the Kinesis event trigger

Find the **Add triggers** list (left side of the Designer panel).
Choose **Kinesis** from this list.

Below the Designer, you'll see the Configure triggers panel.
Choose the **Kinesis stream** that the Lambda function will watch.

Click **Add**, and then click **Save** at the top of the page.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

#### Working with test events

You can generate test events using the Logz.io Lambda test events generator and add these events to your Lambda function. This functionality is currently only available on Linux & macOS.


<div class="tasklist">

##### Generate a test event

In your terminal, run the following command:

```shell
bash <(curl -s https://raw.githubusercontent.com/logzio/logzio_aws_serverless/tree/master/python3/cloudwatch/test_events/test_event_generator.sh)
```

##### Add the generated test event to your Lambda function

1. Select the Lambda function that you need to add the test event to.
2. Open the **Test** tab.
3. Select **New event**.
4. In the **Template** field, select **CloudWatch Logs**.
5. In the **Name** field, enter the required name for the test event.
6. Populate the body field with the value of the test event generated in the previous step.
7. Select **Format** to format the test event.
8. Select **Save changes**.

##### Run the test event

To run the test event, select **Test** in the **Test** tab. The Lambda function will run and generate two logs in your account. The timestamp of the test event is in the UTC timezone.

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="automated-cloudformation-deployment">

#### Automated CloudFormation deployment


**Before you begin, you'll need**:
AWS CLI,
an S3 bucket to store the CloudFormation package

<div class="tasklist">

##### Create a new Kinesis data stream

If you're not already sending your GuardDuty logs through a Kinesis data stream, create one using the [Kinesis console](https://console.aws.amazon.com/kinesis).

Save the name of the data stream. You'll need this in the next step.

##### Configure CloudWatch Events

In the [CloudWatch console](https://console.aws.amazon.com/cloudwatch/) left menu, click **Events > Rules**, and then click **Create rule**.

In the Event Source panel (on the left), set these options:

* Choose **Event Pattern**.
* In the **Build event pattern** section, choose **GuardDuty** from the **Service Name** list.
  You can choose any **Event Type** that you need.

In the Targets panel (on the right), click **Add target**, and choose **Kinesis stream**.
Choose the Kinesis data stream from step 1 from the **Stream** list.

Click **Configure details** (lower right corner).


##### Download the Kinesis stream shipper

Download the latest Kinesis stream shipper zip file from the [Logz.io GitHub page](https://github.com/logzio/logzio_aws_serverless/releases).

By default, the zip file will be named `logzio-kinesis-0.0.2.zip`.

##### Create the CloudFormation package and upload to S3

Create the CloudFormation package using the AWS CLI.
Replace `<<YOUR-S3-BUCKET>>` with the S3 bucket name where you'll be uploading this package.

```shell
curl -o sam-template.yaml https://raw.githubusercontent.com/logzio/logzio_aws_serverless/master/python3/kinesis/sam-template.yaml
aws cloudformation package \
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
--stack-name logzio-guardduty-logs-lambda-stack \
--parameter-overrides \
  LogzioTOKEN='<<LOG-SHIPPING-TOKEN>>' \
  KinesisStream='<<KINESIS-STREAM-NAME>>' \
--capabilities "CAPABILITY_IAM"
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| LogzioTOKEN | Your Logz.io account token.  {% include log-shipping/log-shipping-token.html %}   | Required |
| KinesisStream | The name of the Kinesis stream where this function will listen for updates. | Required |
| LogzioREGION | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL.    You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. | Default: *blank* (US East)|
| LogzioURL  (Deprecated)| Use LogzioREGION instead. Protocol, listener host, and port (for example, `https://<<LISTENER-HOST>>:8071`). {% include log-shipping/listener-var.html %}  | Required |
| LogzioTYPE | The log type you'll use with this Lambda. This can be a [built-in log type]({{site.baseurl}}/user-guide/log-shipping/built-in-log-types.html), or a custom log type.    You should create a new Lambda for each log type you use. | `guardduty` |
| LogzioFORMAT | `"json"` or `"text"`. If `"json"`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. | `"text"` |
| LogzioCOMPRESS | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. | `false` |
| KinesisStreamBatchSize  | The largest number of records to read from your stream at one time. | `100` |
| KinesisStreamStartingPosition | The position in the stream to start reading from. For more information, see [ShardIteratorType](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_GetShardIterator.html) in the Amazon Kinesis API Reference. | `"LATEST"` |


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

#### Working with test events

You can generate test events using the Logz.io Lambda test events generator and add these events to your Lambda function. This functionality is currently only available on Linux & macOS.


<div class="tasklist">

##### Generate a test event

In your terminal, run the following command:

```shell
bash <(curl -s https://raw.githubusercontent.com/logzio/logzio_aws_serverless/tree/master/python3/cloudwatch/test_events/test_event_generator.sh)
```

##### Add the generated test event to your Lambda function

1. Select the Lambda function that you need to add the test event to.
2. Open the **Test** tab.
3. Select **New event**.
4. In the **Template** field, select **CloudWatch Logs**.
5. In the **Name** field, enter the required name for the test event.
6. Populate the body field with the value of the test event generated in the previous step.
7. Select **Format** to format the test event.
8. Select **Save changes**.

##### Run the test event

To run the test event, select **Test** in the **Test** tab. The Lambda function will run and generate two logs in your account. The timestamp of the test event is in the UTC timezone.

</div>

</div>
<!-- tab:end -->

<!-- tabContainer:end -->
</div>
