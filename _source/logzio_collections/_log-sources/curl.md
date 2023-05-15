---
title: Upload log files using cURL
short-description: cURL is a command line utility for transferring data. cURL is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
logo:
  logofile: curl.svg
  orientation: vertical
data-source: cURL file upload
data-for-product-source: Logs
shipping-tags:
  - log-shipper
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/curl
contributors:
  - imnotashrimp
shipping-tags:
  - agents
  - popular
order: 60
---

<!-- tabContainer:start -->
<div class="branching-container">

* [JSON](#json-config)
* [Plain text](#plain-text-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="json-config">

cURL is a command line utility for transferring data. cURL is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.

You can upload JSON or plain text files.


###### Limitations

* Max body size is 10 MB (10,485,760 bytes)
* Each log line must be 500,000 bytes or less
* If you include a `type` field in the log, it overrides `type` in the request header

#### Upload a JSON log file

**Before you begin, you'll need**:
[cURL](https://curl.haxx.se/download.html)


<div class="tasklist">

##### Upload the file

If you want to ship logs from your code but don't have a library in place,
you can send them directly to the Logz.io listener as a minified JSON file.

```shell
cat /path/to/log/file | curl -X POST "https://<<LISTENER-HOST>>:8071?token=<<LOG-SHIPPING-TOKEN>>&type=<LOG-TYPE>" -v --data-binary @-
```

{% include /general-shipping/replace-placeholders.html %}

* {% include log-shipping/type.md %} Otherwise, the default `type` is `http-bulk`.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="plain-text-config">

cURL is a command line utility for transferring data. cURL is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.

You can upload JSON or plain text files.


###### Limitations

* Max body size is 30 MB (31,457,280 bytes)
* Please note that if you include a `type` field in the log, it will be overridden by the type written in the request header


#### Upload a plain text log file

**Before you begin, you'll need**:
[cURL](https://curl.haxx.se/download.html)

<div class="tasklist">

##### Upload the file


```shell
curl -T /path/to/log/file https://<<LISTENER-HOST>>:8022/file_upload/<<LOG-SHIPPING-TOKEN>>/<<LOG-TYPE>>
```

Replace the placeholders to match your specifics. (They are indicated by the double angle brackets `<< >>`):

* Replace `<<LOG-SHIPPING-TOKEN>>` with the token of the account you want to ship to.

* {% include log-shipping/type.md %} Otherwise, the default `type` is `http-bulk`.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->
