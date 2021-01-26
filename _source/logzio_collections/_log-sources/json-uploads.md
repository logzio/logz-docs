---
title: Upload JSON logs
logo:
  logofile: json.svg
  orientation: vertical
data-source: JSON uploads
templates: ["no-template"]
contributors:
  - imnotashrimp
shipping-tags:
  - from-your-code
---

If you want to ship logs from your code but don't have a library in place,
you can send them directly to the Logz.io listener.

The listeners accept bulk uploads over an HTTP/HTTPS connection
or TLS/SSL streams over TCP.

<!-- tabContainer:start -->
<div class="branching-container">

* [Bulk uploads over HTTP/HTTPS](#http-config)
* [TLS/SSL streams over TCP](#tcp-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="http-config">

## Bulk uploads over HTTP/HTTPS

### The request path and header

For HTTPS shipping _(recommended)_, use this URL configuration:

```
https://<<LISTENER-HOST>>:8071/?token=<<LOG-SHIPPING-TOKEN>>&type=MY-TYPE
```

Otherwise, for HTTP shipping, use this configuration:

```
http://<<LISTENER-HOST>>:8070/?token=<<LOG-SHIPPING-TOKEN>>&type=MY-TYPE
```

{% include log-shipping/replace-vars.html listener=true %}

###### Query parameters

| Parameter | Description |
|---|---|
| token (Required) | {% include log-shipping/log-shipping-token.html %}   |
| type <span class="default-param">`http-bulk`</span> | The log type you'll use with this upload. This is shown in your logs under the `type` field in Kibana.    Logz.io applies parsing based on `type`. |
{:.paramlist}

### The request body

Your request's body is a list of logs,
each in JSON Format,
seperated by a new line.

For example:

```json
{"message": "Hello there", "counter": 1}
{"message": "Hello again", "counter": 2}
```

  Escape newlines inside a JSON string with `\n`.
  {:.info-box.note}

If you include a `type` field in the log,
it overrides `type` in the request header.

###### Limitations

* The body must be 10 MB (10,485,760 bytes) or less
* Each log line must be 500,000 bytes or less

###### Code sample

```shell
echo $'{"message":"hello there", "counter": 1}\n{"message":"hello again", "counter": 2}' \
  | curl -X POST "http://listener.logz.io:8070?token=oPwWbJwsFeQSeSoUTVAaZVZYttszAsfg&type=test_http_bulk" -v --data-binary @-
```

### Possible responses

##### 200 OK

All logs were received and validated.
The response body is empty.

Check Kibana for your logs.

##### 400 BAD REQUEST

The input wasn't valid.

The response body contains this JSON:

```json
{
  "malformedLines": 2,
  "successfulLines": 10,
  "oversizedLines": 3,
  "emptyLogLines": 4
}
```

###### Response fields

| Field | Description |
|---|---|
| malformedLines | The number of log lines that aren't valid JSON |
| successfulLines | The number of valid JSON log lines received |
| oversizedLines | The number of log lines that exceeded the line length limit |
| emptyLogLines | The number of empty log lines |
{:.paramlist}

##### 401 UNAUTHORIZED

The token query string parameter is missing or not valid.
Make sure you're using the right account token.

In the response body,
you'll see either "Logging token is missing"
or "Logging token is not valid" as the reason for the response.

##### 413 REQUEST ENTITY TOO LARGE

The request body size is larger than 10 MB.

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="tcp-config">

## TLS/SSL streams over TCP

### JSON log structure

Keep to these practices when shipping JSON logs over TCP:

* Each log must be a single-line JSON object
* Each log line must be 500,000 bytes or less
* Include your account token as a top-level property: \\
  `{ ... "token": "<<LOG-SHIPPING-TOKEN>>" , ... }`
  {% include log-shipping/replace-vars.html token=true prepend="  " %}

### Sending the logs

To send JSON logs over TCP, download the Logz.io public certificate to a local folder.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/TrustExternalCARoot_and_USERTrustRSAAAACA.crt
```

Using the certificate you just downloaded,
send the logs to TCP port 5052 at
  
{% include log-shipping/replace-vars.html listener='noReplace' isMidSentence=true %}

###### Code sample: NXLog

  To configure NXLog for log shipping, see
  [Ship Windows logs]({{site.baseurl}}/shipping/log-sources/windows.html)
  (the _NXLog_ tab).
  {:.info-box.read}

```conf
User nxlog
Group nxlog
LogFile /var/log/nxlog/nxlog.log
LogLevel INFO
<Extension json>
    Module      xm_json
</Extension>
<Input in>
    Module  im_file
    File    "/var/log/samples.log"
    Exec    $token="oPwWbJwsFeQSeSoUTVAaZVZYttszAsfg"; $type="samples_log"; $message = $raw_event;
    SavePos TRUE
</Input>
<Output out>
    Module  om_ssl
    CAFile /etc/nxlog/certs/TrustExternalCARoot_and_USERTrustRSAAAACA.crt
    AllowUntrusted FALSE
    Host    listener.logz.io
    Exec    $OutputModule="om_ssl"; to_json();
    Port    5052
</Output>
<Route 1>
    Path    in => out
</Route>
```

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
