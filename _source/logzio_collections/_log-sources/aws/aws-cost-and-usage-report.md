---
title: AWS cost and usage report
logo:
  logofile: aws.svg
  orientation: vertical
shipping-summary:
  data-source: AWS cost and usage report
  log-shippers:
    - AWS Lambda function
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/AWS-costandusagereport
open-source:
  title: AWS Cost and Usage Lambda
  github-repo: aws-cost-and-usage-lambda
contributors:
  - idohalevi
  - imnotashrimp
---

## Setup

**You'll need:** AWS Cost and Usage [turned on](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-getting-started.html)

<div class="info-box important">
  Your Lambda function needs to run within the AWS Lambda limits, such as memory allocation and timeout.
  Make sure you understand these limits.


  If you can't adjust your settings to stay within the Lambda limits, you can use the AWS [Support Center console](https://console.aws.amazon.com/support/v1#/case/create?issueType=service-limit-increase) to request an increase.


  For more information, see [AWS Lambda Limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html) from AWS.
</div>

###### Configuration

{: .tasklist .firstline-headline }
1. Create a new Lambda function

    This Lambda function collects your AWS Cost and Usage report files from an S3 bucket and sends them to Logz.io in bulk over HTTP.

    Open the AWS Lambda Console, and click **Create function**.
    Choose **Author from scratch**, and use this information:

    * **Name**: We suggest using "cost-and-usage" in the name, but you can name this function whatever you want.
    * **Runtime**: Choose **Python 2.7**
    * **Role**: Choose **Create a custom role**. This opens the IAM Management Console in a new tab.

    We'll come back to the Lambda Managment Console, so keep this tab open.

2. Create a new IAM Role

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

3. Zip the source files

    Download the [aws-cost-and-usage-lambda](https://github.com/logzio/aws-cost-and-usage-lambda) project from GitHub to your computer, and zip the Python files in the src/ folder.

    ```shell
    zip logzio-cost-and-usage-shipper lambda_function.py shipper.py
    ```

4. Upload the zip file and set environment variables

    In the Function code section of Lambda find the **Code entry type** list. Choose **Upload a .ZIP file** from this list.

    Click **Upload**, and choose the zip file you created earlier (`logzio-cost-and-usage-shipper.zip`).

    In the Environment variables section, set your Logz.io account token, URL, and log type, and any other variables that you need to use.

    TOKEN <span class="required-param"></span>
    : {% include log-shipping/replace-vars.html token='noReplace' %}
      <!-- logzio-inject:account-token -->

    URL <span class="required-param"></span>
    : {% include log-shipping/replace-vars.html listener='noReplace' %}
      <!-- logzio-inject:listener-url -->

    REPORT_NAME
    : In [AWS Cost and Usage Reports](https://console.aws.amazon.com/billing/home?#/reports), copy this from the **Report name** column for your report.

    REPORT_PATH
    : In [AWS Cost and Usage Reports](https://console.aws.amazon.com/billing/home?#/reports), click <i class="fas fa-caret-right"></i> (next to the report name), and copy the **Report path**.

    S3_BUCKET_NAME
    : In [AWS Cost and Usage Reports](https://console.aws.amazon.com/billing/home?#/reports), copy this from the **S3 Bucket** column for your report.

5. Configure the function's basic settings

    In Basic settings, we recommend starting with these settings:

    * **Memory:** 1024 MB
    * **Timeout:** 5 min 0 sec

    <div class="info-box note">
    These default settings are just a starting point.
    Check your Lambda usage regularly, and adjust these values if you need to.
    </div>

6. Set the CloudWatch Logs event trigger

    Find the **Add triggers** list (left side of the Designer panel). Choose **CloudWatch Events** from this list.

    Below the Designer, you'll see the Configure triggers panel. Choose **Create a new rule** from the **Rule** list.

    Type a **Rule name** (required) and **Rule description** (optional).

    Under **Rule type**, select **Schedule expression**, and then type `rate(10 hours)` in the **Schedule expression** box.

    <div class="info-box note">
      We recommend starting with 10 hours, but you can adjust this time as needed.
    </div>

    Click **Add**, and then click **Save** at the top of the page.

7. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).