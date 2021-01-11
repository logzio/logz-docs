###### Parameters for all modules

| Parameter | Description | Default |
|---|---|---|
| LOGZIO_TOKEN (Required) | Your Logz.io account token. {% include log-shipping/replace-vars.html token=true %}   | 
| LOGZIO_MODULES (Required) | Comma-separated list of Metricbeat modules to enable on this container (formatted as `"module1,module2,module3"`). To use a custom module configuration file, mount its folder to `/logzio/modules`. |
| LOGZIO_REGION | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL.  You can find your region code in the [Regions and URLs]({{site.baseurl}}/user-guide/accounts/account-region.html#regions-and-urls) table. | <span class="default-param">_Blank (US East)_</span>  |
| LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span> | This field is needed only if you're shipping metrics to Kibana and you want to override the default value.  In Kibana, this is shown in the `type` field. Logz.io applies parsing based on `type`. |
| LOGZIO_LOG_LEVEL <span class="default-param">`"INFO"`</span> | The log level the module startup scripts will generate. |
| LOGZIO_EXTRA_DIMENSIONS | Semicolon-separated list of dimensions to be included with your metrics (formatted as `dimensionName1=value1;dimensionName2=value2`).  To use an environment variable as a value, format as `dimensionName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. If an environment variable can't be resolved, the field is omitted. |
| HOSTNAME <span class="default-param">``</span> | Insert your host name if you want it to appear in the metrics' `host.name`. If null, host.name will show the container's ID. |
| DEBUG (false by default) | Set to `true` if you want Metricbeat to run in debug mode. **Note:** Debug mode tends to generate a lot of debugging output, so you should probably enable it temporarily only when an error occurs while running the docker-collector in production.  |
{:.paramlist}


###### Parameters for the AWS module

Use these parameters if you prefer to explicitly name your access key ID and secret access key. If you are using a credentials file, skip to the relevant [section](#credentials).

These AWS module parameters are the preferred default.  We recommend that you use a credentials file (and the AWS module parameters associated with the credentials file) only if there is a specific use case for doing so. 

| Parameter | Description |
|---|---|
| AWS_ACCESS_KEY_ID (Required) | Your IAM user's access key ID. |
| AWS_SECRET_ACCESS_KEY (Required) | Your IAM user's secret key. |
| AWS_DEFAULT_REGION (Required) | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). |
| AWS_NAMESPACES (Required) | Comma-separated list of namespaces of the metrics you want to collect.  For {{include.namespace}}, this is `AWS/{{include.namespace}}`. For the complete list of all valid namespaces, see this [resource](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html). |
{:.paramlist}

 

###### Parameters for the AWS module when using a credentials file {#credentials}

You can use a credential file instead of explicitly naming your access key ID and secret access key. You'll also need to set an ARN role either on your credential file or explicitly using the parameter `AWS_ROLE_ARN`.

[Learn more about configration options for AWS Credentials](https://www.elastic.co/guide/en/beats/metricbeat/current/metricbeat-module-aws.html#aws-credentials-config).

| Parameter | Description |
|---|---|
| AWS_DEFAULT_REGION (Required) | Your region's slug. You can find this in the AWS region menu (in the top menu, to the right). |
| AWS_NAMESPACES (Required) | Comma-separated list of namespaces of the metrics you want to collect.  For {{include.namespace}}, this is `AWS/{{include.namespace}}`. For the complete list of all valid namespaces, see this [resource](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html). |
| AWS_CREDENTIAL_PROFILE_NAME (Required) | Your profile name in shared credentials file. |
| AWS_SHARED_CREDENTIAL_FILE (Required) | Your directory of the shared credentials file, in your docker instance.  **Note:** If you're using this parameter, you'll have to mount your credentials folder. To mount your credentials folder, add the following line to your `docker run` command:  `-v /path/to/your/aws/credentials/folder:<<path/to/shared/credential/file/in/docker>>:ro` |
| AWS_SESSION_TOKEN | Your IAM user's session token. |
| AWS_ROLE_ARN | Your IAM role to assume. Add this parameter only if your credential file doesn't include an ARN role. |
{:.paramlist}
