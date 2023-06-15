---
title: Upload log files using Invoke-RestMethod
short-description: Invoke-RestMethod is a command to interact with REST APIs in PowerShell. Invoke-RestMethod is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.
logo:
  logofile: Invoke-RestMethod.png
  orientation: vertical
data-source: Invoke-RestMethod file upload
data-for-product-source: Logs
shipping-tags:
  - log-shipper
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/Invoke-RestMethod
contributors:
  - imnotashrimp
  - nshishkin
shipping-tags:
  - agents
  - popular
order: 60
---
<!-->
<!-- tabContainer:start -->
<div class="branching-container">

* [JSON](#json-config)
* [Plain text](#plain-text-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="json-config">

Invoke-RestMethod is a command to interact with REST APIs in PowerShell. Invoke-RestMethod is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.

You can upload JSON or plain text files.


###### Limitations

* Max body size is 10 MB (10,485,760 bytes)
* Each log line must be 500,000 bytes or less
* If you include a `type` field in the log, it overrides `type` in the request header

#### Upload a JSON log file

**Before you begin, you'll need**:
[PowerShell](https://docs.microsoft.com/en-us/powershell/)


<div class="tasklist">

##### Upload the file

If you want to ship logs from your code but don't have a library in place,
you can send them directly to the Logz.io listener as a minified JSON file.

```shell
Invoke-RestMethod -method POST -Uri https://<<LISTENER-HOST>>:8071?token=<<LOG-SHIPPING-TOKEN>>"&"<<LOG-TYPE>> -InFile <<PATH/TO/LOG/FILE.JSON>>
```

{% include /general-shipping/replace-placeholders.html %}

* {% include log-shipping/type.md %} Otherwise, the default `type` is `http-bulk`.
* Replace `<<PATH/TO/LOG/FILE.JSON>>` with the path to your log file.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="plain-text-config">

Invoke-RestMethod is a command to interact with REST APIs in PowerShell. Invoke-RestMethod is a quick and easy way to test your configuration or troubleshoot your connectivity to Logz.io.

You can upload JSON or plain text files.


###### Limitations

* Max body size is 30 MB (31,457,280 bytes)
* If you include a `type` field in the log, it overrides `type` in the request header


#### Upload a plain text log file

**Before you begin, you'll need**:
[PowerShell](https://docs.microsoft.com/en-us/powershell/)

<div class="tasklist">

##### Upload the file


```shell
Invoke-RestMethod -method POST -Uri https://<<LISTENER-HOST>>:8022/file_upload/<<LOG-SHIPPING-TOKEN>>/<<LOG-TYPE>> -InFile <<PATH/TO/LOG/FILE>>
```
Replace the placeholders to match your specifics. (They are indicated by the double angle brackets `<< >>`):

* Replace `<<LOG-SHIPPING-TOKEN>>` with the token of the account you want to ship to.

* {% include log-shipping/type.md %} Otherwise, the default `type` is `http-bulk`.

* Replace `<<PATH/TO/LOG/FILE>>` with the path to your log file.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->
