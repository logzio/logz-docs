---
title: Perform synthetic scripting and send the metrics to Logz.io
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Perform synthetic scripting and send the metrics to Logz.io
logo:
  logofile: apii.svg
  orientation: vertical
data-source: Synthetic scripting
data-for-product-source: Synthetic monitoring
open-source:
  - title: Synthetic scripting
    github-repo: synthetic-scripting
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:

order: 1380
---

### Overview

This mini application for synthetic scripting mimics and supervises your personalized user experience through browser scripting, which directs the browser to your website, performs specific actions, and verifies specific elements. By utilizing synthetic frameworks like [Playwright](https://playwright.dev/), the synthetic scripting app facilitates the creation of tests to specify your custom user experience.


<div class="tasklist">

##### Run Application

1. Pull the Docker image.

```sh
docker pull logzio/synthetic-script:latest
```

2. Run the Docker container.

```sh
docker run -p 8080:8080 -d --name synthetic-script logzio/synthetic-script:latest
```

The Docker image will run a Node.js mini app. Navigate to http://localhost:8080 in your browser to access the UI that helps you establish connection between your app and Logz.io.

##### Define a script for running the test

![UI first screen](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/screen-edit.png)

1. Select the required framework for your test code from the **Framework selector** dropdown.
   ![UI dropdown](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/dropdown-framework.png)

2. Enter your code into the Code editor.
   ![UI code editor](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/code-editor.png)

Here you can define the code for your test using [Playwright](https://playwright.dev). Put your code between the comments.

Click the **Test Script** button to check if the code runs correctly.

3. Check if you want to record browser based video of your test.
   ![UI record-video](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/record-video.png)

4. You can select device on what you want to start a test.
   ![UI record-video](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/select-device.png)

5. Define environment variables in the Environment Variables manager.
   ![UI env-variable](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/env-variable.png)

In the **Environment Variable** manager you can define environment variables that can be attached to your Lambda function. You can use them in the Code editor as `process.env.KEY` and define the `KEY` parameter, which will be present in the Lambda function.

<!-- info-box-start:info -->
Prior to testing the code locally, fill in the KEY-VALUE fields for all environment variables used.
{:.info-box.note}
<!-- info-box-end -->


6. Download the code as a template or deploy it directly to your cloud provider, using the `Explore/deploy` tab.

##### Download as a template

Open the tab to download the code as a template and fill in the parameters as per the parameters table.
![UI env-variable](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/screen-fill-locally.png)

##### Deploy directly to the cloud

Open the tab to deploy the code directly to the cloud and fill in the parameters as per the parameters table.
![UI env-variable](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/screen-fill-cloud.png)

| Parameter                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Name of the Lambda (Required)     | Name of the Lambda function that will be created. This name will also be used to identify the Lambda function in the Logz.io dashboard.                                                                                                                                                                                                                                                                                                                                                                                              |
| Description (Optional)            | Lambda function description.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Logz.io shipping Token (Required) | Your Logz.io logs shipping token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Schedule Rate (Default: 1 minute) | Range in a minutes to run a Lambda function (using cloudBridge event).                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Aws Access Key (Required)         | Your AWS access key ID. \*`Requires for Deploy to Cloud option for platform`.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Aws Secret Key (Required)         | Your AWS secret key ID.\*`Requires for Deploy to Cloud option for platform`.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Bucket Name (Required)            | The bucket name to which the PUT action will be initiated. When using this action with an access point, you must direct requests to the access point hostname. The access point hostname takes the form AccessPointName-AccountId.s3-accesspoint.Region.amazonaws.com. When using this action with an access point through the Amazon Web Services SDKs, you need to provide the access point ARN instead of the bucket name. For more information about access point ARNs, see **Using access points** in the Amazon S3 User Guide. |
| Aws Region (Required)             | Your AWS region to send service requests to.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

After deploying to the Cloud you will see that screen

![UI first screen](https://dytvr9ot2sszz.cloudfront.net/logz-docs/synthetic_scripting/finish.png)

##### Check Logz.io for your metrics

Give your metrics a few minutes to get from your system to ours,
and then open [Logz.io](https://app.logz.io/#/dashboard/metrics).


</div>

