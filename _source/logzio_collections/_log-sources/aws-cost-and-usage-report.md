---
title: AWS cost and usage report
logo:
  logofile: aws.svg
  orientation: vertical
data-source: AWS cost and usage report
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/aws-cost-and-usage-report
templates: ["lambda-cloudwatch"]
open-source:
  - title: AWS Cost and Usage Lambda
    github-repo: aws-cost-and-usage-lambda
contributors:
  - idohalevi
  - imnotashrimp
shipping-tags:
  - aws
order: 830
---

#### Configuration

**Before you begin, you'll need**:
AWS Cost and Usage [turned on](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-getting-started.html)

<!-- info-box-start:info -->
Your Lambda function needs to run within the AWS Lambda limits, such as memory allocation and timeout. Make sure you understand these limits. If you can't adjust your settings to stay within the Lambda limits, you can use the AWS [Support Center console](https://console.aws.amazon.com/support/v1#/case/create?issueType=service-limit-increase) to request an increase. [Learn more about AWS Lambda Limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html).
{:.info-box.important}
<!-- info-box-end -->

<!-- info-box-start:info -->
At the moment, our AWS Lambda-based integrations do not support working with test events to send demo logs. This option will be available soon.
{:.info-box.note}
<!-- info-box-end -->

<div class="tasklist">

##### Create a new Lambda function

This Lambda function collects your AWS Cost and Usage report files from an S3 bucket and sends them to Logz.io in bulk over HTTP.

Open the AWS Lambda Console, and click **Create function**.
Choose **Author from scratch**, and use this information:

* **Name**: We suggest using "cost-and-usage" in the name, but you can name this function whatever you want.
* **Runtime**: Choose **Python 2.7**
* **Role**: Choose **Create a custom role**. This opens the IAM Management Console in a new tab.

We'll come back to the Lambda Managment Console, so keep this tab open.

##### Create a new IAM Role

In the IAM Management Console page that just opened:

* **IAM Role**: Choose **Create a new IAM Role**.
* **Role Name**: We suggest using "cost_and_usage" in the name, but you can name this role whatever you want.

Click **View Policy Document**, and then click **Edit**. Delete all the text in the policy document, and replace it with this block:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": "*"
    }
  ]
}
```

Click **Allow** to create the new role and close the page.

In the Lambda Management Console, click **Create Function** (bottom right corner of the page). After a few moments, you'll see configuration options for your Lambda function.

You'll need this page later on, so keep it open.

##### Zip the source files

Download the [aws-cost-and-usage-lambda](https://github.com/logzio/aws-cost-and-usage-lambda) project from GitHub to your computer, and zip the Python files in the src/ folder.

```shell
zip logzio-cost-and-usage-shipper lambda_function.py shipper.py
```

##### Upload the zip file and set environment variables

In the Function code section of Lambda find the **Code entry type** list. Choose **Upload a .ZIP file** from this list.

Click **Upload**, and choose the zip file you created earlier (`logzio-cost-and-usage-shipper.zip`).

In the Environment variables section, set your Logz.io account token, URL, and log type, and any other variables that you need to use.

| Parameter | Description |
|---|---|
| TOKEN (Required) |  Your Logz.io account token. {% include log-shipping/log-shipping-token.html %} |
| URL (Required) | {% include log-shipping/region-code.md %} |
| REPORT_NAME | In [AWS Cost and Usage Reports](https://console.aws.amazon.com/billing/home?#/reports), copy this from the **Report name** column for your report. |
| REPORT_PATH | Copy this from [AWS Cost and Usage Reports](https://console.aws.amazon.com/billing/home?#/reports). Click ▶️ (next to the report name) to copy the **Report path**. |
| S3_BUCKET_NAME | Copy this in [AWS Cost and Usage Reports](https://console.aws.amazon.com/billing/home?#/reports) from the **S3 Bucket** column of your report. |
{:.paramlist}

##### Configure the function's basic settings

In Basic settings, we recommend starting with these settings:

* **Memory**: 1024 MB
* **Timeout**: 5 min 0 sec

<!-- info-box-start:info -->
These default settings are just a starting point. Check your Lambda usage regularly, and adjust these values if you need to.
{:.info-box.note}
<!-- info-box-end -->

##### Set the CloudWatch Logs event trigger

Find the **Add triggers** list (left side of the Designer panel). Choose **CloudWatch Events** from this list.

Below the Designer, you'll see the Configure triggers panel. Choose **Create a new rule** from the **Rule** list.

Type a **Rule name** (required) and **Rule description** (optional).

Under **Rule type**, select **Schedule expression**, and then type `rate(10 hours)` in the **Schedule expression** box.

<!-- info-box-start:info -->
We recommend starting with 10 hours, but you can adjust this time as needed.
{:.info-box.note}
<!-- info-box-end -->

Click **Add**, and then click **Save** at the top of the page.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
