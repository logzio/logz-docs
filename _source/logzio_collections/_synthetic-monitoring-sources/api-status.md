---
title: Sending API status metrics of user API
logo:
  logofile: apii.svg
  orientation: vertical
data-source: API status
data-for-product-source: Synthetic monitoring
open-source:
  - title: Logzio API status metrics
    github-repo: logzio-api-status
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:

order: 1380
---

### Overview

Deploy this integration to collect API status metrics of user API and send them to Logz.io.

The integration is based on a Lambda function that will be auto-deployed together with the layer [LogzioLambdaExtensionLogs](https://github.com/logzio/logzio-lambda-extensions/tree/main/logzio-lambda-extensions-logs). 







<div class="tasklist">

##### Auto-deploy the Lambda function

👇 To begin, click this button to start the automated deployment. You will need to deploy it in your environment.


[![Deploy to AWS](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lights/LightS-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template?templateURL=https://logzio-aws-integrations-us-east-1.s3.amazonaws.com/api-status-auto-deployment/auto-deployment.yaml&stackName=logzio-api-status-auto-deployment)


##### Specify the template

![Specify stack template](https://dytvr9ot2sszz.cloudfront.net/logz-docs/api_status/api_template.png)

Keep the defaults and click **Next**.


##### Specify the stack details

![Specify stack details](https://dytvr9ot2sszz.cloudfront.net/logz-docs/api_status/api_details.png)

Specify the stack details as per the table below and select **Next**.



| Parameter | Description | Required/Optional | Default |
| --- | --- | --- | --- |
| ApiURL | Your API URL to collect status from (for example: https://example.api:1234). | Required | - |
| Method | Your API HTTP request method. Can be `GET` or `POST` | Required | `GET` |
| ApiResponseTimeout | Your API response timeout (seconds). | Required | `10 (seconds)` |
| ExpectedStatusCode | The expected HTTP response status code your API should return. | Required | `200` |
| ExpectedBody | The expected HTTP response body your API should return (leave empty if your API HTTP response body is empty). | Required | ` ` |
| LogzioListener | The Logz.io listener URL: `https://<<LISTENER-HOST>>:8071` {% include log-shipping/listener-var.html %} | Required | `https://listener.logz.io` |
| LogzioMetricsToken | Your Logz.io metrics shipping token:`<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>` | Required | - |
| LogzioLogsToken | Your Logz.io log shipping token:`<<LOG-SHIPPING-TOKEN>>` {% include log-shipping/log-shipping-token.html %} | Required | - |
| SchedulingInterval | The scheduling expression that determines when and how often the Lambda function runs. | Required | `rate(30 minutes)` |
| Headers | Your API headers separated by comma and each header's key and value are separated by `=` (`header_key_1=header_value_1,header_key_2=header_value_2`). | Optional | - |
| Body | Your API HTTP request body. | Optional | - |
| BearerToken | Your API bearer token. | Optional | - |
| Username | Your API username. | Optional | - |
| Password | Your API password. | Optional | - |


##### Configure the stack options

![Specify stack options](https://dytvr9ot2sszz.cloudfront.net/logz-docs/api_status/api_options.png)

Keep the defaults and click **Next**.

##### Review the deployment

Confirm that you acknowledge that AWS CloudFormation might create IAM resources and select **Create stack**.


##### Run the tests

Run the ping statistics tests to generate metrics.


##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana). All metrics that were sent from the Lambda function will have the prefix `api_status` in their name.
  
{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["1RCzCjjByhyz0bJ4Hmau0y"] --> 

{% include metric-shipping/generic-dashboard.html %} 



</div>

