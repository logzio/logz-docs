###### Parameters for all modules

| Parameter | Description | Default/Required |
|---|---|---|
| LOGZIO_TOKEN | Your Logz.io Metrics account token. {% include metric-shipping/replace-metrics-token.html %} | Required |
| LOGZIO_MODULES | Comma-separated list of Metricbeat modules to enable on this container (formatted as `"module1,module2,module3"`). To use a custom module configuration file, mount its folder to `/logzio/modules`. | Required |

<!-- info-box-start:info -->
The `LOGZIO_MODULES` parameter by default supports only these prebuilt modules: `aws`, `system` and `docker`.
{:.info-box.note}
<!-- info-box-end --> 

| LOGZIO_REGION | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL.  You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. | US East |
| LOGZIO_TYPE | This field is needed only if you're shipping metrics to Kibana and you want to override the default value.  In Kibana, this is shown in the `type` field. Logz.io applies parsing based on `type`. | `docker-collector-metrics` |
| LOGZIO_LOG_LEVEL | The log level the module startup scripts will generate. | `"INFO"` |
| LOGZIO_EXTRA_DIMENSIONS | Semicolon-separated list of dimensions to be included with your metrics (formatted as `dimensionName1=value1;dimensionName2=value2`).  To use an environment variable as a value, format as `dimensionName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. If an environment variable can't be resolved, the field is omitted. | -- |
| HOSTNAME | Insert your `host.name` for it to appear in the metrics. If null, `host.name` will show the container's ID. | `` |
| DEBUG | Set to `true` if you want Metricbeat to run in debug mode. **Note:** Debug mode tends to generate a lot of debugging output, so you should probably enable it temporarily only when an error occurs while running the docker-collector in production.  | `false` |



###### Parameters for the AWS module

Use these parameters if you prefer to explicitly name your access key ID and secret access key. If you are using a credentials file, skip to the relevant [section](#credentials).

These AWS module parameters are the preferred default.  We recommend that you use a credentials file (and the AWS module parameters associated with the credentials file) only if there is a specific use case for doing so.

| Parameter | Description | Required |
|---|---|---|
| AWS_ACCESS_KEY_ID | Your IAM user's access key ID. | Required |
| AWS_SECRET_ACCESS_KEY | Your IAM user's secret key. | Required |
| AWS_DEFAULT_REGION | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). | Required |
| AWS_NAMESPACES | Comma-separated list of namespaces of the metrics you want to collect.  For `{{include.namespace}}`, this is `AWS/{{include.namespace}}`. See [AWS Docs 🔗](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) for a complete list of valid namespaces. | Required |




###### Parameters for the AWS module when using a credentials file {#credentials}

You can use a credential file instead of explicitly naming your access key ID and secret access key. You'll also need to set an ARN role either on your credential file or explicitly using the parameter `AWS_ROLE_ARN`.

[Learn more about Metricbeat configuration options for AWS Credentials 🔗](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-aws.html#aws-credentials-config).

| Parameter | Description | Required |
|---|---|---|
| AWS_DEFAULT_REGION | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). | Required |
| AWS_NAMESPACES | Comma-separated list of namespaces of the metrics you want to collect.  For `{{include.namespace}}`, this is `AWS/{{include.namespace}}`. See [AWS Docs 🔗](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) for a complete list of valid namespaces. | Required |
| AWS_CREDENTIAL_PROFILE_NAME | Your profile name in shared credentials file. | Required |
| AWS_SHARED_CREDENTIAL_FILE  | Your directory of the shared credentials file, in your docker instance.  **Note:** If you're using this parameter, you'll have to mount your credentials folder. To mount your credentials folder, add the following line to your `docker run` command:  `-v /path/to/your/aws/credentials/folder:<<path/to/shared/credential/file/in/docker>>:ro` | Required |
| AWS_SESSION_TOKEN | Your IAM user's session token. | -- |
| AWS_ROLE_ARN | Your IAM role to assume. Add this parameter only if your credential file doesn't include an ARN role. | -- |

