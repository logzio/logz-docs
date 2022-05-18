---
title: Ship logs from S3 Bucket with Lambda
logo:
  logofile: aws-s3.svg
  orientation: vertical
data-source: S3 Bucket with Lambda
data-for-product-source: Logs
short-description: Send logs stored in S3 Bucket to Logz.io via a Lambda function
open-source:
  - title: s3-hook
    github-repo: s3-hook
contributors:
  - mirii1994
shipping-tags:
  - aws
---

<!-- tab:start -->

With this integration, you can collect Logs from S3 bucket and forward them to Logz.io.

<div class="tasklist">

##### Create new stack

To deploy this project, click the button that matches the region you wish to deploy your Stack to:

| Region | Deployment                                                                                                                                                                                                                                                                                                               |
| --- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `us-east-1` | [![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/s3_hook/0.0.1/sam-template.yaml&stackName=logzio-s3-hook) | 


##### Specify template

Keep the default setting in the Create stack screen and select **Next**.

![Step 1 screenshot](https://github.com/logzio/s3-hook/tree/master/img/01.png)

##### Specify stack details

Specify the stack details as per the table below and select **Next**.

| Parameter        | Description                                                                                                                                       | Required/Default   |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| `bucketName`     | Name of the bucket you wish to fetch logs from. Will be used for IAM policy.                                                                      | **Required**       |
| `logzioListener` | The Logz.io listener URL fot your region. (For more details, see the [regions page](https://docs.logz.io/user-guide/accounts/account-region.html) | **Required**       |
| `logzioToken`    | Your Logz.io log shipping token.                                                                                                                  | **Required**       |
| `logLevel`       | Log level for the Lambda function. Can be one of: `debug`, `info`, `warn`, `error`, `fatal`, `panic`.                                             | Default: `info`    |
| `logType`        | The log type you'll use with this Lambda. This is shown in your logs under the type field in Kibana. Logz.io applies parsing based on type.       | Default: `s3_hook` |


![Step 2 screenshot](https://github.com/logzio/s3-hook/tree/master/img/02.png)

##### Configure stack options

Specify the Key and Value parameters for the Tags (optional) and select **Next**.

![Step 3 screenshot](https://github.com/logzio/s3-hook/tree/master/img/03.png)

##### Review

Confirm that you acknowledge that AWS CloudFormation might create IAM resources and select **Create stack**.

![Step 4 screenshot](https://github.com/logzio/s3-hook/tree/master/img/04.png)

##### Add trigger

Give the stack a few minutes to be deployed.

Once your Lambda function is ready, you'll need to manually add a trigger. This is due to Cloudformation limitations.

Go to the function's page, and click on **Add trigger**.

![Step 5 screenshot](https://github.com/logzio/s3-hook/tree/master/img/05.png)

Then, choose **S3** as a trigger, and fill in:

- **Bucket**: Your bucket name.
- **Event type**: Choose option `All object create events`.
- Prefix and Suffix should be left empty.

Confirm the checkbox, and click **Add*.

![Step 5 screenshot](https://github.com/logzio/s3-hook/tree/master/img/06.png)

##### Send logs

That's it. Your function is configured.
Once you upload new files to your bucket, it will trigger the function, and the logs will be sent to your Logz.io account.

</div>
<!-- tab:end -->
