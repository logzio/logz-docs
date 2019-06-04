---
title: Upload JSON uploads
logo:
  logofile: json.svg
  orientation: vertical
shipping-summary:
  data-source: JSON logs
contributors:
  - imnotashrimp
shipping-tags:
  - from-your-code
---

You can ship a batch of JSON logs to Logz.io via HTTP or HTTPS.
Simply issue a POST request to the listener in your account's region.

## Building the request

### The request header

<div class="branching-container">

{: .branching-tabs }
  * [HTTPS <span class="sm ital">(recommended)</span>](#https-config)
  * [HTTP](#http-config)

<div id="https-config">

```
https://<LISTENER-URL>:8071/?token=<ACCOUNT-TOKEN>&type=MY-TYPE
```

</div>

<div id="http-config">

```
http://<LISTENER-URL>:8070/?token=<ACCOUNT-TOKEN>&type=MY-TYPE
```

</div>

</div>

{% include log-shipping/replace-vars.html listener=true %}

Query parameters
{: .inline-header }

token <span class="required-param"></span>
: {% include log-shipping/replace-vars.html token=true %}
  <!-- logzio-inject:account-token -->

type <span class="default-param">`http-bulk`</span>
: The log type you'll use with this upload.
  This is shown in your logs under the `type` field in Kibana. \\
  Logz.io applies parsing based on `type`.

### The request body

Your request's body is a list of logs,
each in JSON Format,
seperated by a new line.

For example:

```json
{"message": "Hello there", "counter": 1}
{"message": "Hello again", "counter": 2}
```

<div class="info-box note">

  Newlines inside a JSON string should be escaped with `\n`.

</div>

If you include a `type` field in the log,
it overrides `type` in the request header.

Limitations
{: .inline-header }

* The body must be 10 MB (10,485,760 bytes) or less
* Each log line must be 500,000 bytes or less

Code sample
{: .inline-header }

```shell
echo $'{"message":"hello there", "counter": 1}\n{"message":"hello again", "counter": 2}' \
  | curl -X POST "http://listener.logz.io:8070?token=oPwWbJwsFeQSeSoUTVAaZVZYttszAsfg&type=test_http_bulk" -v --data-binary @-
```

## Possible responses

<div class="branching-container">

##### If the response is `200 OK`

All logs were received and validated.
The response body is empty.

Check Kibana for your logs.

##### If the response is `400 BAD REQUEST`

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

| Field | Description |
|---|---|
| malformedLines | The number of log lines that aren't valid JSON |

| successfulLines | The number of valid JSON log lines received |

| oversizedLines | The number of log lines that exceeded the line length limit |

| emptyLogLines | The number of empty log lines |

##### If the response is `401 UNAUTHORIZED`

The token query string parameter is missing or not valid.
Make sure it's using the right account token.
<!-- logzio-inject:"(" & account-token ")" -->

In the response body,
you'll see either "Logging token is missing"
or "Logging token is not valid" as the reason for the response.

##### If the response is `413 REQUEST ENTITY TOO LARGE`

The request body size is over 10MB.