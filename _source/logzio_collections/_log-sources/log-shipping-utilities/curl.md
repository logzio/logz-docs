---
title: cURL log file upload
logo:
  logofile: curl.svg
  orientation: vertical
shipping-summary:
  data-source: cURL file upload
  hidden: true
  log-shippers:
    - Plain text
    - JSON
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/File-UploadcURL
contributors:
  - imnotashrimp
---

<div class="branching-container">

{% include log-shipping/tabs.html %}

<div id="plain-text-config">

## Plain text logs

{% include log-shipping/replace-vars.html token=true listener=true %}

<div class="info-box important">
  File uploads must be smaller than 10 MB.
</div>

_Option 1: Secure upload over HTTPS (recommended)_

```shell
curl -T {PATH-TO-LOG-FILE} https://{LISTENER-URL}:8022/file_upload/{ACCOUNT-TOKEN}/{LOG-TYPE}
```

_Option 2: Upload over HTTP_

```shell
curl -T {PATH-TO-LOG-FILE} http://{LISTENER-URL}:8021/file_upload/{ACCOUNT-TOKEN}/{LOG-TYPE}
```

</div>


<div id="json-config">

## JSON logs

{% include log-shipping/replace-vars.html token=true listener=true %}

<div class="info-box important">
  File uploads must be smaller than 10 MB.
</div>

_Option 1: Secure upload over HTTPS (recommended)_

```shell
cat {PATH-TO-LOG-FILE} | curl -X POST "https://{LISTENER-URL}:8071?token={ACCOUNT-TOKEN}&type={LOG-TYPE}" -v --data-binary @-
```

_Option 2: Upload over HTTP_

```shell
cat {PATH-TO-LOG-FILE} | curl -X POST "http://{LISTENER-URL}:8070?token={ACCOUNT-TOKEN}&type={LOG-TYPE}" -v --data-binary @-
```

</div>


</div>