---
layout: article
title: FAQs about sending log data 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: DIY Logz.io Data Parsing for ingested logs
permalink: /user-guide/log-shipping/faqs-logs
flags: 
  logzio-plan: community
tags:
  - log-shipping
contributors:
  - boofinka
  - ralongit
  - yberlinger
---

## Question: Can we integrate our logs for a specific service or application with Logz.io?


## TL;DR (the short answers)


<!-- tabContainer:start -->
<div class="branching-container">

* [Integrating with your 3rd-party application or service](#3rd-party)
* [Integrating with your proprietary application or service](#proprietary)
{:.branching-tabs}

<!-- tab:start -->
<div id="3rd-party">


- If the logs are only viewable within the 3rd-party service or application, the most likely answer is "no“, because there is no way to have the logs ingested and indexed on our clusters.

- If the logs are accessible from outside your service or application, then it's much more likely that you can ship those to Logz.io - depending on how that access is managed.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="proprietary">

We offer a variety of [Send Your Data integrations](https://app.logz.io/#/dashboard/send-your-data?tag=from-your-code&collection=log-sources) to enable you to ship logs directly from your code, based on the language you're using.

This information is also available in the Logz.io Docs, via [**Ship data > Logs**](https://docs.logz.io/shipping/#log-sources), when you select the **From your code** filter.

</div>

<!--tab:end -->
</div>


## The detailed answers

<!-- tabContainer:start -->
<div class="branching-container">

* [Logs written to a file](#file)
* [Logs written to cloud storage](#cloud)
* [Logs that are accessible via API](#api)
{:.branching-tabs}

<!-- tab:start -->
<div id="file">


### One time upload

**cURL file upload** enables single file shipping and comes native with both MacOs and Linux.  The full command syntax can be found in our [cURL shipping instructions](https://app.logz.io/#/dashboard/send-your-data/log-sources/curl). 
Windows users can [download the files from the official website.](https://curl.haxx.se/download.html)

This method requires the following outside communication ports: 

+ Text files: 8021 (HTTP) and 8022 (HTTPS)
+ JSON files: 8070 (HTTP) and 8071 (HTTPS) 

This information is also available in the Logz.io Docs, in [**Ship your data > Logs > cURL file upload**](https://docs.logz.io/shipping/log-sources/curl.html).


**Invoke-RestMethod file upload** allows you to interact with REST APIs in PowerShell to upload JSON or plain text files. You can use Invoke_RestMethod to test your configuration or troubleshoot your connectivity to Logz.io. The full command syntax can be found in [Invoke-RestMethod file upload](https://app.logz.io/#/dashboard/send-your-data/log-sources/file-upload).

This information is also available in the Logz.io Docs, in [**Ship your data > Logs > Upload log files using Invoke-RestMethod**](https://docs.logz.io/shipping/log-sources/file-upload.html).

### Continuous shipping
[Filebeat](https://app.logz.io/#/dashboard/send-your-data/log-sources/filebeat) is your best option: It's lightweight, reliable, and easy to set up. This method requires outside communication on port 5015.

Other options: 

- [Logstash](https://app.logz.io/#/dashboard/send-your-data/log-sources/logstash): This method requires outside communication on port 5006 (encrypted) or port 5050 (unencrypted).
- [Rsyslog](https://app.logz.io/#/dashboard/send-your-data/log-sources/rsyslog): This method requires outside communication on port 5001.
- [Fluentd](https://app.logz.io/#/dashboard/send-your-data/log-sources/fluentd): This method requires outside communication on port 8071.

This information is also available in the Logz.io Docs **Ship your data** section in the [Filebeat](https://docs.logz.io/shipping/log-sources/filebeat.html), [Logstash](https://docs.logz.io/shipping/log-sources/logstash.html), [Rsyslog over TLS](https://docs.logz.io/shipping/log-sources/rsyslog.html), and [Fluentd](https://docs.logz.io/shipping/log-sources/fluentd.html) topics.
</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="cloud">

We have existing integrations with both [S3](https://app.logz.io/#/dashboard/send-your-data/log-sources/s3-bucket) and [Azure Blob](https://app.logz.io/#/dashboard/send-your-data/log-sources/azure-blob) storage.

This information is also available in the Logz.io Docs **Ship your data** section, in the [S3 Bucket](https://docs.logz.io/shipping/log-sources/s3-bucket.html)  and [Azure Blob Storage](https://docs.logz.io/shipping/log-sources/azure-blob.html) topics.

</div>
<!-- tab:end -->




<!-- tab:start -->
<div id="api">

### One-time upload

Run the relevant API query per the instructions provided by the application or service and send the response as  payload to the [Logz.io JSON bulk uploads over HTTP/HTTPs](https://app.logz.io/#/dashboard/send-your-data/log-sources/json-uploads?type=http-config) endpoint. 

This method requires outside bulk HTTP/S endpoint communication on ports 8070 (HTTP) and 8071 (HTTPS).

<!--info-box-start:info -->
The payload must be formatted as inline JSON objects separated by a newline. Arrays or pretty-printed JSON payloads will fail.
{:.info-box.important}
<!-- info-box-end -->

This information is also available in the Logz.io Docs **Ship your data** section, in the [Upload JSON logs](https://docs.logz.io/shipping/log-sources/json-uploads.html) topic.


### Continuous shipping

This method follows the same instructions as the one-time upload, but we recommend that you script the process to save time and effort. 




</div>
<!-- tab:end -->
</div>
