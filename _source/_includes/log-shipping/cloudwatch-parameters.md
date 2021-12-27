| Parameter | Description | Required/Default |
|---|---|---|
| LogzioTOKEN | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}  | Required |
| LogzioREGION |  {% include log-shipping/log-region.md %}
| LogzioURL (Deprecated) | Use LogzioREGION instead. Protocol, listener host, and port (for example, `https://<<LISTENER-HOST>>:8071`). The [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to. | -- |
| LogzioTYPE | The log type you'll use with this Lambda. This can be a [built-in log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), or a custom log type. You should create a new Lambda for each log type you use. | `logzio_cloudwatch_logs` |
| LogzioFORMAT | `json` or `text`. If `json`, the Lambda function will attempt to parse the message field as JSON and populate the event data with the parsed fields. | `text` |
| LogzioCOMPRESS | Set to `true` to compress logs before sending them. Set to `false` to send uncompressed logs. | `false` |
| LogzioENRICH | Enrich CloudWatch events with custom properties, formatted as `key1=value1;key2=value2`. | -- |
