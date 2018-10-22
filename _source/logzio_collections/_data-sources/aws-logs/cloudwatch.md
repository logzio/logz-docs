---
layout: article
title: Ship CloudWatch logs
logo:
  logofile: aws-cloudwatch.svg
  orientation: vertical
shipping-summary:
  data-source: Amazon CloudWatch
  log-shippers:
    - AWS Lambda function
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/CloudWatch
contributors:
  - imnotashrimp
---

## Setup

###### Configuration

{: .tasklist .firstline-headline }
1. Create a new Lambda function

    This Lambda function will collect CloudWatch logs and sends them to Logz.io in bulk over HTTP.

    Open the AWS Lambda Console, and click **Create function**.
    Choose **Author from scratch**, and use this information:

    * **Name**: We suggest adding the log type to the name, but you can name this function whatever you want.
    * **Runtime**: Choose **Python 2.7**
    * **Role**: Click **Create new role from template(s)**. Under Existing role, select **Basic Edge Lambda permissions**

    Click **Create Function** (bottom right corner of the page). After a few moments, you'll see configuration options for your Lambda function.

    You'll need this page later on, so keep it open.

2. Zip the source files

    Download the [CloudWatch Logs Shipper - Lambda](https://github.com/logzio/cloudwatch-logs-shipper-lambda) project from GitHub to your computer, and zip the Python files in the src/ folder.

    ```shell
    zip logzio-cloudwatch-log-shipper lambda_function.py shipper.py
    ```

3. Upload the zip file and set environment variables

    In the Function code section of Lambda find the **Code entry type** list. Choose **Upload a .ZIP file** from this list.

    Click **Upload**, and choose the zip file you created earlier (`logzio-cloudwatch-log-shipper`).

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

    Keep an eye on your Lambda usage, and adjust these values accordingly.

5. Set the CloudWatch Logs event trigger

    Find the **Add triggers** list (left side of the Designer panel). Choose **CloudWatch Logs** from this list.

    Below the Designer, you'll see the Configure triggers panel. Choose the **Log group** that the Lambda function will watch.

    Type a **Filter name** (required) and **Filter pattern** (optional).

    Click **Add**, and then click **Save** at the top of the page.

6. Test your configuration

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).