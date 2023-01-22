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

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Using a Lambda functiion](#lambda)
* [Telegraf on a local host](#local)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

### Overview

Deploy this integration to collect API status metrics of user API and send them to Logz.io.

</div>

<!-- tab:end -->

<!-- tab:start -->
<div id="lambda">




The integration is based on a Lambda function that will be auto-deployed together with the layer [LogzioLambdaExtensionLogs](https://github.com/logzio/logzio-lambda-extensions/tree/main/logzio-lambda-extensions-logs). 


<!-- logzio-inject:install:grafana:dashboards ids=["1RCzCjjByhyz0bJ4Hmau0y"] --> 







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
</div>
  
<!-- tab:end -->

<!-- tab:start -->
<div id="local">

The integration uses a locally hosted Telegraf agent with a Prometheus remote write plugin to send metrics to Logz.op.


<!-- logzio-inject:install:grafana:dashboards ids=["1rNO8llFw8Cm9N8U3M3vCQ"] --> 

<div class="tasklist">

##### Set up Telegraf v1.17 or higher:

{% include metric-shipping/telegraf-setup.md %}

##### Enable the inputs.http_response plug-in

Add the **inputs.http_response** section to the configuration file:

``` ini
[[inputs.http_response]]
  ## List of urls to query.
  urls = ["http://localhost"]

  ## Set http_proxy.
  ## Telegraf uses the system wide proxy settings if it's is not set.
  # http_proxy = "http://localhost:8888"

  ## Set response_timeout (default 5 seconds)
  response_timeout = "5s"

  ## HTTP Request Method
  method = "GET"

  ## HTTP response status codes that are considered a success
  response_status_success = [200,201,202,203,204]

  ## Headers to send with HTTP requests
  headers = {"Content-Type": "application/json",
             "Authorization": "Bearer YOUR_LOGZIO_API_TOKEN"}

  ## JSON data path, e.g. foo.bar.baz
  json_query = "metrics"


  ## Whether to follow redirects from the server (defaults to false)
  # follow_redirects = false

  ## Optional file with Bearer token
  ## file content is added as an Authorization header
  # bearer_token = "/path/to/file"

  ## Optional HTTP Basic Auth Credentials
  # username = "username"
  # password = "pa$$word"

  ## Optional HTTP Request Body
  # body = '''
  # {'fake':'data'}
  # '''

  ## Optional name of the field that will contain the body of the response.
  ## By default it is set to an empty String indicating that the body's
  ## content won't be added
  # response_body_field = ''

  ## Maximum allowed HTTP response body size in bytes.
  ## 0 means to use the default of 32MiB.
  ## If the response body size exceeds this limit a "body_read_error" will
  ## be raised.
  # response_body_max_size = "32MiB"

  ## Optional substring or regex match in body of the response (case sensitive)
  # response_string_match = "\"service_status\": \"up\""
  # response_string_match = "ok"
  # response_string_match = "\".*_status\".?:.?\"up\""

  ## Expected response status code.
  ## The status code of the response is compared to this value. If they match,
  ## the field "response_status_code_match" will be 1, otherwise it will be 0.
  ## If the expected status code is 0, the check is disabled and the field
  ## won't be added.
  # response_status_code = 0

  ## Optional TLS Config
  # tls_ca = "/etc/telegraf/ca.pem"
  # tls_cert = "/etc/telegraf/cert.pem"
  # tls_key = "/etc/telegraf/key.pem"
  ## Use TLS but skip chain & host verification
  # insecure_skip_verify = false
  ## Use the given name as the SNI server name on each URL
  # tls_server_name = ""
  ## TLS renegotiation method, choose from "never", "once", "freely"
  # tls_renegotiation_method = "never"

  ## HTTP Request Headers (all values must be strings)
  # [inputs.http_response.headers]
  #   Host = "github.com"

  ## Optional setting to map response http headers into tags
  ## If the http header is not present on the request, no corresponding tag will
  ## be added. If multiple instances of the http header are present, only the
  ## first value will be used.
  # http_header_tags = {"HTTP_HEADER" = "TAG_NAME"}

  ## Interface to use when dialing an address
  # interface = "eth0"
```

##### Configure the **inputs.http_response** plugin

Specify the plugin parameters as per the table below:


| Parameter | Description | Required/Optional | Default |
| --- | --- | --- | --- |
| urls | Comma-separated list of your API URLs to collect status from (for example: ["http://sample1", "http://sample2"]. | Required | - |
| http_proxy | HTTP proxy URL. | Optional | - |
| response_timeout | Your API response timeout (seconds). | Required | `5 (seconds)` |
| method | Your API HTTP request method. Can be `GET` or `POST` | Required | `GET` |
| response_status_success | HTTP response status codes that are considered a success | Required | - |
| headers | Headers to send with HTTP requests. | Required | - |
| json_query | JSON data path. | Required | - |
| follow_redirects | Defines whether to follow redirects from the server (defaults to false) | Optional | false |
| bearer_token | Optional path to a file where the bearer token is stored. The bearer token is specified   | Optional | false |
| Username | Your API username. | Optional | - |
| Password | Your API password. | Optional | - |
| body | Your API HTTP request body. | Optional | - |
| response_body_field | Optional name of the field that will contain the body of the response. | Optional | - |
| response_body_max_size | Maximum allowed HTTP response body size in bytes. | Optional | - |
| response_string_match | Optional substring or regex match in body of the response (case sensitive). | Optional | - |
| response_status_code | Expected response status code. | Optional | - |
| tls_ca | Optional TLS Config setting | Optional | - |
| tls_cert | Optional TLS Config setting | Optional | - |
| tls_key | Optional TLS Config setting | Optional | - |
| insecure_skip_verify | Use TLS but skip chain & host verification | Optional | - |
| tls_server_name | Use the given name as the SNI server name on each URL | Optional | - |
| tls_renegotiation_method | TLS renegotiation method, choose from "never", "once", "freely" | Optional | - |
| inputs.http_response.headers | HTTP Request Headers (all values must be strings) | Optional | - |
| http_header_tags | Optional setting to map response http headers into tags | Optional | - |
| interface | Interface to use when dialing an address | Optional | - |

##### Add the outputs.http plug-in

After you create a config file for Telegraf, configure the output plug-in to enable your data to be sent to Logz.io in Prometheus-format and add the following code to the configuration file:


``` yaml
[[outputs.http]]
  url = "https://<<LISTENER-HOST>>:8053"
  data_format = "prometheusremotewrite"
  [outputs.http.headers]
     Content-Type = "application/x-protobuf"
     Content-Encoding = "snappy"
     X-Prometheus-Remote-Write-Version = "0.1.0"
     Authorization = "Bearer <<PROMETHEUS-METRICS-SHIPPING-TOKEN>>"
``` 

{% include general-shipping/replace-placeholders-prometheus.html %}

<!-- info-box-start:info -->
The full list of data scraping and configuring options can be found [here](https://docs.influxdata.com/telegraf/v1.18/plugins/).
{:.info-box.note}
<!-- info-box-end -->


##### Check Logz.io for your metrics

{% include metric-shipping/custom-dashboard.html %} Install the pre-built dashboard to enhance the observability of your metrics.

<!-- logzio-inject:install:grafana:dashboards ids=["32X5zm8qW7ByLlp1YPFkrJ"] --> 

{% include metric-shipping/generic-dashboard.html %} 

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
