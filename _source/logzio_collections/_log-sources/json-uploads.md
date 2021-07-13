---
title: Upload JSON logs
short-description: If you want to ship logs from your code but don't have a library in place, you can send them directly to the Logz.io listener as a minified JSON file.
logo:
  logofile: json.svg
  orientation: vertical
data-source: JSON uploads
templates: ["no-template"]
contributors:
  - imnotashrimp
shipping-tags:
  - from-your-code
  - popular
order: 50
---



<!-- tabContainer:start -->
<div class="branching-container">

* [Bulk uploads over HTTP/HTTPS](#http-config)
* [TLS/SSL streams over TCP](#tcp-config)
{:.branching-tabs}




<!-- tab:start -->
<div id="http-config">

## Bulk uploads over HTTP/HTTPS

If you want to ship logs from your code but don't have a library in place,
you can send them directly to the Logz.io listener as a minified JSON file.

The listeners accept bulk uploads over an HTTP/HTTPS connection
or TLS/SSL streams over TCP.

### The request path and header

For HTTPS shipping _(recommended)_, use this URL configuration:

```
https://<<LISTENER-HOST>>:8071/?token=<<LOG-SHIPPING-TOKEN>>&type=<<MY-TYPE>>
```

Otherwise, for HTTP shipping, use this configuration:

```
http://<<LISTENER-HOST>>:8070/?token=<<LOG-SHIPPING-TOKEN>>&type=<<MY-TYPE>>
```

{% include /general-shipping/replace-placeholders.html %}

* {% include log-shipping/type.md %} Otherwise, the default `type` is `http-bulk`.


### The request body

Your request's body is a list of logs in minified JSON format. Also, each log must be separated by a new line. You can escape newlines in a JSON string with `\n`.

For example:

```json
{"message": "Hello there", "counter": 1}
{"message": "Hello again", "counter": 2}
```

###### Limitations

* Max body size is 10 MB (10,485,760 bytes)
* Each log line must be 500,000 bytes or less
* If you include a `type` field in the log, it overrides `type` in the request header


###### Code sample

```shell
echo $'{"message":"hello there", "counter": 1}\n{"message":"hello again", "counter": 2}' \
  | curl -X POST "http://<<LISTENER-HOST>>:8070?token=<<LOG-SHIPPING-TOKEN>>&type=test_http_bulk" -v --data-binary @-
```

### Possible responses

##### 200 OK

All logs were received and validated. Give your logs some time to get from your system to ours,
and then check your [Logz.io Log Management account](https://app.logz.io/#/dashboard/kibana) for your logs.

The response body is empty.

##### 400 BAD REQUEST

The input wasn't valid. The response message will look like this:


```
{
  "malformedLines": 2, #The number of log lines that aren't valid JSON
  "successfulLines": 10, #The number of valid JSON log lines received
  "oversizedLines": 3, #The number of log lines that exceeded the line length limit
  "emptyLogLines": 4 #The number of empty log lines
}
```

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

## Bulk uploads over TCP



If you want to ship logs from your code but don't have a library in place,
you can send them directly to the Logz.io listener as a minified JSON file.

The listeners accept bulk uploads over an HTTP/HTTPS connection
or TLS/SSL streams over TCP.


###### JSON log structure


Keep to these practices when shipping JSON logs over TCP:

* Each log must be a single-line JSON object
* Each log line must be 500,000 bytes or less
* Include your account token as a top-level property: `{ ... "token": "<<LOG-SHIPPING-TOKEN>>" , ... }`

#### Send TLS/SSL streams over TCP

<div class="tasklist">

{% include log-shipping/certificate.md %}


##### Send the logs

Using the certificate you just downloaded,
send the logs to TCP port 5052.

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

{% include /general-shipping/replace-placeholders.html %}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>


</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->
