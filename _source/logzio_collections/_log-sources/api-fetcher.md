---
title: Ship Auth/OAuth API data to Logz.io
logo:
  logofile: oauth-logo.png
  orientation: vertical
data-source: Auth/OAuth API
data-for-product-source: Logs
open-source:
  - title: oauth-logo.png
    github-repo: oauth-logo.png
contributors:
  - nshishkin
shipping-tags:
  - popular
order: 470
---


<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Auth](#auth)
* [OAuth](#oauth)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

This integration allows you to collect data from Auth and OAuth APIs and send it to your Logz.io account. At the moment, this integration supports:

* Cisco general and secure Auth API
* Azure Graph and general OAuth API

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="auth">

## Auth

Deploy this integration to send Auth APIs data using the Logz.io API fetcher. The supported types of APIs currently include:
  
* Cisco SecureX
* General

<div class="tasklist">


##### Pull the Docker image of the Logz.io API fetcher

```shell
docker pull logzio/logzio-api-fetcher
```


##### Create a local directory for this integration

You will need a dedicated directory to use it as mounted directory for the Docker container of the Logz.io API fetcher.

```shell
mkdir logzio-api-fetcher
cd logzio-api-fetcher
```

##### Create a configuration file

In the directory created in the previous step, create a file `config.yaml` using the example configuration below:

```yaml
logzio:
  url: https://<<LISTENER-HOST>>:8071
  token: <<LOG-SHIPPING-TOKEN>>

auth_apis:
  - type: cisco_secure_x
    name: cisco
    credentials:
      id: <<API_CREDENTIALS_ID>>
      key: <<API_CREDENTIALS_KEY>>
    settings:
      time_interval: 5
      days_back_fetch: 7
    filters:
      event_type%5B%5D: '1090519054'
      start_date: 2021-10-05T10%3A10%3A10%2B00%3A00
    custom_fields:
      type: cisco
      level: high
  - type: general
    name: cisco general
    credentials:
      id: <<API_CREDENTIALS_ID>>
      key: <<API_CREDENTIALS_KEY>>
    settings:
      time_interval: 2
      days_back_fetch: 5
    start_date_name: start_date
    http_request:
      method: GET
      url: https://api.amp.cisco.com/v1/events
    json_paths:
      next_url: metadata.links.next
      data: data
      data_date: date
    filters:
      event_type%5B%5D: '1090519054'
```

| Parameter | Description | Required/Default |
|---|---|---|
| URL | {% include log-shipping/listener-var.md %} | Required |
| TOKEN | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}  | Required  |
| type | The type of the Auth API. Currently we support the following types: cisco_secure_x, general. | Required |
| name | The name of the Auth API. Please make names unique. | Required | 
| credentials.id | The Auth API credentials id. | Required |
| credentials.key | The Auth API credentials key. | Required | 
| settings.time_interval | The Auth API time interval between runs. | Required |
| settings.days_back_fetch | The max days back to fetch from the Auth API. | Optional. Default value is 14 days. | 
| filters | Pairs of key and value of parameters that can be added to the Auth API url. Make sure the keys and values are valid for the Auth API. | Optional | 
| custom_fields | Pairs of key and value that will be added to each data and be sent to Logz.io. | Optional | 
| start_date_name| The start date parameter name of the auth api url. | Required. General type only | 
| http_request.method | The HTTP method. Can be GET or POST. | Required. General type only |
| http_request.url | The Auth API url. Make sure the url is without `?` at the end. | Required. General type only | 
| http_request.headers | Pairs of key and value the represents the headers of the HTTP request. | Optional. General type only | 
| http_request.body | The body of the HTTP request. Will be added to HTTP POST requests only. | Optional. General type only |
| json_paths.next_url | The json path to the next url value inside the response of the Auth API. | Required. General type only | 
| json_paths.data | The json path to the data value inside the response of the Auth API. | Required. General type only | 
| json_paths.data_date | The json path to the data's date value inside the response of the Auth API | Required. General type only | 

##### Create a Last Start Dates text file

Create an empty text file named last_start_dates.txt in the same directory as the config file:

```shell
$ touch last_start_dates.txt
```

After every successful iteration of an API, the last start date of the next iteration will be written to last_start_dates.txt. Each line starts with the API name and ends with the last start date.

If you stopped the container, you can continue from the exact place you stopped, by adding the date to the API filters in the configuration.

##### Run the Docker container

```shell
docker run --name logzio-api-fetcher \
-v "$(pwd)":/app/src/shared \
logzio/logzio-api-fetcher
```

##### Stop the Docker container

When you stop the container, the code will run until the iteration is completed. To make sure it will finish the iteration on time, please give it a grace period of 30 seconds when you run the `docker stop` command.

```shell
docker stop -t 30 logzio-api-fetcher
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs,
see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="oauth">

## Oauth

Deploy this integration to send general and Azure Graph API data using the Logz.io API fetcher. The supported types of APIs currently include:

* Azure Graph
* General 

<div class="tasklist">


##### Pull the Docker image of the Logz.io API fetcher

```shell
docker pull logzio/logzio-api-fetcher
```


##### Create a local directory for this integration

You will need a dedicated directory to use it as mounted directory for the Docker container of the Logz.io API fetcher.

```shell
mkdir logzio-api-fetcher
cd logzio-api-fetcher
```

##### Create a configuration file

In the directory created in the previous step, create a file `config.yaml` using the example configuration below:

```yaml
logzio:
  url: https://<<LISTENER-HOST>>:8071
  token: <<LOG-SHIPPING-TOKEN>>

oauth_apis:
  - type: azure_graph
    name: azure_test
    credentials:
      id: <<AZURE_AD_SECRET_ID>>
      key: <<AZURE_AD_SECRET_VALUE>>
    token_http_request:
      url: https://login.microsoftonline.com/<<AZURE_AD_TENANT_ID>>/oauth2/v2.0/token
      body: client_id=<<AZURE_AD_CLIENT_ID>>
        &scope=https://graph.microsoft.com/.default
        &client_secret=<<AZURE_AD_SECRET_VALUE>>
        &grant_type=client_credentials
      headers:
      method: POST
    data_http_request:
      url: https://graph.microsoft.com/v1.0/auditLogs/signIns
      headers:
    json_paths:
      data_date: createdDateTime
      next_url:
      data:
    settings:
      time_interval: 1
      days_back_fetch: 30
  - type: general
    name: general_test
    credentials:
      id: aaaa-bbbb-cccc
      key: abcabcabc
    token_http_request:
      url: https://login.microsoftonline.com/abcd-efgh-abcd-efgh/oauth2/v2.0/token
      body: client_id=aaaa-bbbb-cccc
            &scope=https://graph.microsoft.com/.default
            &client_secret=abcabcabc
            &grant_type=client_credentials
      headers:
      method: POST
    data_http_request:
      url: https://graph.microsoft.com/v1.0/auditLogs/directoryAudits
      headers:
    json_paths:
      data_date: activityDateTime
      data: value
      next_url: '@odata.nextLink'
    settings:
      time_interval: 1
    start_date_name: activityDateTime
```

| Parameter | Description | Required/Default |
|---|---|---|
| URL | {% include log-shipping/listener-var.md %} | Required |
| TOKEN | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}  | Required  |
| type | The type of the OAuth API. Currently we support the following types: azure_graph, general. | Required | 
| name | The name of the OAuth API. Please make names unique. | Required | 
| credentials.id | The OAuth API credentials id. | Required | 
| credentials.key | The OAuth API credentials key. | Required |
| http_request.method | The HTTP method. Can be GET or POST. | Required | 
| http_request.url | The OAuth API url. Make sure the url is without `?` at the end. | Required | 
| http_request.headers | Pairs of key and value the represents the headers of the HTTP request. | Optional | 
| http_request.body | The body of the HTTP request. Will be added to HTTP POST requests only. | Optional | 
| token_http_request.method | The HTTP method. Can be GET or POST. | Required |
| token_http_request.url | The OAuth API token request  url. Make sure the url is without `?` at the end. | Required | 
| token_http_request.headers | Pairs of key and value the represents the headers of the HTTP request. | Optional |
| token_http_request.body | The body of the HTTP request. Will be added to HTTP POST requests only. | Optional | 
| json_paths.next_url | The json path to the next url value inside the response of the OAuth API. | Required/Optional for Azure | 
| json_paths.data | The json path to the data value inside the response of the OAuth API. | Required/Optional for Azure | 
| json_paths.data_date | The json path to the data's date value inside the response of the OAuth API. | Required | 
| settings.time_interval | The OAuth API time interval between runs. | Required | 
| settings.days_back_fetch | The max days back to fetch from the OAuth API. | Optional. Default value is 14 days.| 
| filters | Pairs of key and value of parameters that can be added to the OAuth API url. Make sure the keys and values are valid for the OAuth API. | Optional |
| custom_fields | Pairs of key and value that will be added to each data and be sent to Logz.io. | Optional | 
| start_date_name| The start date parameter name of the OAuth API url. (Same as json_paths.data_date in most cases)| Required | 

##### Create a Last Start Dates text file

Create an empty text file named last_start_dates.txt in the same directory as the config file:

```shell
$ touch last_start_dates.txt
```

After every successful iteration of an API, the last start date of the next iteration will be written to last_start_dates.txt. Each line starts with the API name and ends with the last start date.

If you stopped the container, you can continue from the exact place you stopped, by adding the date to the API filters in the configuration.

##### Run the Docker container

```shell
docker run --name logzio-api-fetcher \
-v "$(pwd)":/app/src/shared \
logzio/logzio-api-fetcher
```

##### Stop the Docker container

When you stop the container, the code will run until the iteration is completed. To make sure it will finish the iteration on time, please give it a grace period of 30 seconds when you run the `docker stop` command.

```shell
docker stop -t 30 logzio-api-fetcher
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs,
see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->


