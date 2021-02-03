#### Collect CloudWatch metrics

To collect CloudWatch metrics, you'll deploy a docker compose file that uses containers with the following images:

* [otel/opentelemetry-collector](https://hub.docker.com/r/otel/opentelemetry-collector)
* [prom/cloudwatch-exporter](https://hub.docker.com/r/prom/cloudwatch-exporter)
* [logzio/cloudwatch-config-builder](https://hub.docker.com/r/logzio/cloudwatch-config-builder)

<div class="tasklist">

##### Download the `docker-compose.yml` file

```
curl https://raw.githubusercontent.com/logzio/logzio-aws-metrics/main/docker-compose.yml -o docker-compose.yml
```

##### Define the environment variables

```
AWS_ACCESS_KEY_ID=<<AWS_ACCESS_KEY_ID>> \
AWS_SECRET_ACCESS_KEY=<<AWS_SECRET_ACCESS_KEY>> \
AWS_DEFAULT_REGION=<<AWS_DEFAULT_REGION>> \
LOGZIO_REGION= <<LOGZIO_REGION>> \
LOGZIO_TOKEN=<<LOGZIO_TOKEN>> \
AWS_NAMESPACES=<<AWS_NAMESPACES>> \
SCRAPE_INTERVAL=<<SCRAPE_INTERVAL>> \
P8S_LOGZIO_NAME=<<P8S_LOGZIO_NAME>> \
docker-compose up
```


###### Set environment variables for the `logzio/cloudwatch-config-builder` container

| Environment variable | Description |
|---|---|
| AWS_DEFAULT_REGION (Required) | Your region's slug. You can find this in the AWS Console region menu (in the top menu, to the right).  **Note:** This is the region that you will collect metrics from. |
| LOGZIO_REGION (Required)| Your Logz.io region code. For example if your region is US, then your region code is `us`. You can find your region code here: https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls. |
| LOGZIO_TOKEN (Required)| Token for shipping metrics to your Logz.io account. Find it under Settings > Manage accounts. [_How do I look up my Metrics account token?_](/user-guide/accounts/finding-your-metrics-account-token/) |
| SCRAPE_INTERVAL (Required)| The time interval (in seconds) during which the Cloudwatch exporter retrieves metrics from Cloudwatch, and the Opentelemtry collector scrapes and sends the metrics to Logz.io. Default = 300.   **Note:** This value must be a multiple of 60.|
| AWS_NAMESPACES (Required) | Comma-separated list of namespaces of the metrics you want to collect.  For `{{include.namespace}}`, this is `AWS/{{include.namespace}}`. You can find a complete list of namespaces at [_AWS Services That Publish CloudWatch Metrics_](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html).   **Note:** This Environment variable is required unless you define the `CUSTOM_CONFIG_PATH` Environment variable |
| P8S_LOGZIO_NAME | The value of the `p8s_logzio_name` external label. This variable identifies which Prometheus environment the metrics arriving at Logz.io came from. Default = `logzio-cloudwatch-metrics`.  |
| CUSTOM_CONFIG_PATH | Path to your Cloudwatch exporter configuration file. For more information refer to the [documentation](https://github.com/prometheus/cloudwatch_exporter#configuration).  **Note:** Set the `period_seconds` parameter according to your `SCRAPE_INTERVAL`|
| CUSTOM_LISTENER | Set a custom URL to ship metrics to (for example, http://localhost:9200). This overrides the `LOGZIO_REGION` Environment variable. |



###### Set environment variables for the `prom/cloudwatch-exporter` container

| Environment variable | Description |
|---|---|
| AWS_ACCESS_KEY_ID (Required)| Your IAM user's access key ID. |
| AWS_SECRET_ACCESS_KEY (Required)| Your IAM user's secret key. |

##### Run Docker
Run the command: `docker-compose up`.

##### View service configurations

You can view the exporter and collector configurations in the browser:

* CloudWatch exporter: [http://localhost:5001/config/cloudwatch](http://localhost:5001/config/cloudwatch)
* Opentelemtry collector: [http://localhost:5001/config/otel](http://localhost:5001/config/otel)

</div>