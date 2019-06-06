---
title: cURL log file upload
logo:
  logofile: curl.svg
  orientation: vertical
shipping-summary:
  data-source: cURL file upload
shipping-tags:
  - log-shipper
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/File-UploadcURL
contributors:
  - imnotashrimp
---

cURL is a command line utility for transferring data.
Generally, we recommend using Filebeat for shipping logs to Logz.io.

Even so, cURL is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.
You can upload JSON or plain text files.

<div class="info-box important">
  File uploads must be smaller than 10 MB.
</div>

<div class="branching-container">

{: .branching-tabs }
  * [JSON](#json-config)
  * [Plain text](#plain-text-config)

<div id="plain-text-config">

###### Upload a plain text log file

**You'll need**:
[cURL](https://curl.haxx.se/download.html)

{: .tasklist .firstline-headline }
1. Upload the file

    {% include log-shipping/replace-vars.html token=true listener=true %}

    ```shell
    curl -T /path/to/log/file https://<LISTENER-URL>:8022/file_upload/<ACCOUNT-TOKEN>/<LOG-TYPE>
    ```

2. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>


<div id="json-config">

###### Upload a JSON log file

**You'll need**:
[cURL](https://curl.haxx.se/download.html)

{: .tasklist .firstline-headline }
1. Upload the file

    {% include log-shipping/replace-vars.html token=true listener=true %}

    ```shell
    cat /path/to/log/file | curl -X POST "https://<LISTENER-URL>:8071?token=<ACCOUNT-TOKEN>&type=<LOG-TYPE>" -v --data-binary @-
    ```

2. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>