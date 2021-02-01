---
title: Upload log files using cURL
logo:
  logofile: curl.svg
  orientation: vertical
data-source: cURL file upload
shipping-tags:
  - log-shipper
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/File-UploadcURL
contributors:
  - imnotashrimp
shipping-tags:
  - agents
---

<!-- tabContainer:start -->
<div class="branching-container">

* [JSON](#json-config)
* [Plain text](#plain-text-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="plain-text-config">

cURL is a command line utility for transferring data.
Generally, we recommend using Filebeat for shipping logs to Logz.io.

Even so, cURL is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.
You can upload JSON or plain text files.

<!-- info-box-start:info -->
File uploads must be smaller than 10 MB.
{:.info-box.important}
<!-- info-box-end -->

#### Upload a plain text log file

**Before you begin, you'll need**:
[cURL](https://curl.haxx.se/download.html)

<div class="tasklist">

##### Upload the file

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

```shell
curl -T /path/to/log/file https://<<LISTENER-HOST>>:8022/file_upload/<<LOG-SHIPPING-TOKEN>>/<LOG-TYPE>
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="json-config">

cURL is a command line utility for transferring data.
Generally, we recommend using Filebeat for shipping logs to Logz.io.

Even so, cURL is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.
You can upload JSON or plain text files.

<!-- info-box-start:info -->
File uploads must be smaller than 10 MB.
{:.info-box.important}
<!-- info-box-end -->


#### Upload a JSON log file

**Before you begin, you'll need**:
[cURL](https://curl.haxx.se/download.html)

<div class="tasklist">

##### Upload the file

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

```shell
cat /path/to/log/file | curl -X POST "https://<<LISTENER-HOST>>:8071?token=<<LOG-SHIPPING-TOKEN>>&type=<LOG-TYPE>" -v --data-binary @-
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->