---
title: Ship Docker logs
short-description: Want to analyze logs from docker containers? This is the best option for you - it uses Filebeat to collect logs from other Docker containers and ship them to your Logz.io account.
logo:
  logofile: docker.svg
  orientation: horizontal
data-source: Docker container
open-source:
  - title: docker-collector-logs
    github-repo: docker-collector-logs
  - title: Logz.io Docker Logging Plugin
    github-repo: docker-logging-plugin
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/docker
contributors:
  - mirii1994
  - shalper
  - imnotashrimp
  - amosd92
shipping-tags:
  - container
  - popular
order: 40
---


<!-- tabContainer:start -->
<div class="branching-container">

* [docker-collector-logs](#docker-collector-logs-config)
* [logzio-logging-plugin](#logzio-logging-plugin-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="docker-collector-logs-config">

This integration is a Docker container that uses Filebeat to collect logs
from other Docker containers and forward them to your Logz.io account.

To use docker-collector-logs, you'll set environment variables when you run the container.
The Docker logs directory and docker.sock are mounted to the container, allowing Filebeat to collect the logs and metadata.


{% include log-shipping/docker-collector-logs.md %}

#### Deploy the Docker collector

<div class="tasklist">

##### Pull the Docker image

Download the logzio/docker-collector-logs image.

```shell
docker pull logzio/docker-collector-logs
```

##### Run the Docker image

For a complete list of options, see the parameters below the code block.👇

```shell
docker run --name docker-collector-logs \
--env LOGZIO_TOKEN="<<LOG-SHIPPING-TOKEN>>" \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /var/lib/docker/containers:/var/lib/docker/containers \
logzio/docker-collector-logs
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| LOGZIO_TOKEN | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}   | Required |
| LOGZIO_REGION | Logz.io region code to ship the logs to. This region code changes depending on the region your account is hosted in. For example, accounts in the EU region have region code `eu`. For more information, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html) on the Logz.io Docs. | (US region) |
| LOGZIO_TYPE | The log type you'll use with this Docker. {% include log-shipping/type.md %} | Docker image name |
| LOGZIO_CODEC | Set to `json` if shipping JSON logs. Otherwise, set to `plain` for plain text format. | `plain` |
| ignoreOlder |  Set a time limit on back shipping logs. Upgrading to a newer version of docker-collector-logs while it is already running will cause it to resend logs that are within the `ignoreOlder` timeframe. You can minimize log duplicates by setting the `ignoreOlder` parameter of the new docker to a lower value (for example, `20m`). | `3h` |
| additionalFields | Include additional fields with every message sent, formatted as `"fieldName1=fieldValue1;fieldName2=fieldValue2"`. To use an environment variable, format as `"fieldName1=fieldValue1;fieldName2=$ENV_VAR_NAME"`. In that case, the environment variable should be the only value in the field. If the environment variable can't be resolved, the field is omitted. | -- |
| matchContainerName | Comma-separated list of containers you want to collect the logs from. If a container's name partially matches a name on the list, that container's logs are shipped. Otherwise, its logs are ignored. **Note: Can't be used with skipContainerName** | -- |
| skipContainerName | Comma-separated list of containers you want to ignore. If a container's name partially matches a name on the list, that container's logs are ignored. Otherwise, its logs are shipped. **Note: Can't be used with matchContainerName** | -- |
| includeLines | Comma-separated list of regular expressions to match the lines that you want to include. **Note**: Regular expressions in this list should not contain commas. | -- |
| excludeLines | Comma-separated list of regular expressions to match the lines that you want to exclude. **Note**: Regular expressions in this list should not contain commas. | -- |
| renameFields | Rename fields with every message sent, formatted as `"oldName,newName;oldName2,newName2"`. To use an environment variable, format as `"oldName,newName;oldName2,$ENV_VAR_NAME"`. When using an environment variable, it should be the only value in the field. If the environment variable can't be resolved, the field will be omitted. | -- |
| HOSTNAME | Include your host name to display it for the field `agent.name`. If no value is entered, `agent.name`displays the container id.| `''` |
| multilinePattern | Include your regex pattern. See [Filebeat's official documentation](https://www.elastic.co/guide/en/beats/filebeat/7.12/multiline-examples.html#multiline) for more information. | `''` |
| multilineNegate |Include `'true'` to negate the pattern. **Note**: Cannot be used without multilinePattern. See [Filebeat's official documentation](https://www.elastic.co/guide/en/beats/filebeat/7.12/multiline-examples.html#multiline) for more information.| `'false'`  |
| multilineMatch | Specifies how Filebeat combines matching lines into an event. The settings are `after` or `before`. The behavior of these settings depends on what you specify for negate. **Note**: Cannot be used without multilinePattern. See [Filebeat's official documentation](https://www.elastic.co/guide/en/beats/filebeat/7.12/multiline-examples.html#multiline) for more information.| `'after'` |


<!-- info-box-start:info -->
By default, logs from docker-collector-logs and docker-collector-metrics containers are ignored.
{:.info-box.note}
<!-- info-box-end -->

##### Check Logz.io for your logs

Spin up your Docker containers if you haven't done so already.
Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="logzio-logging-plugin-config">

#### Set up logzio-logging-plugin

**Before you begin, you'll need**:
Docker Engine 17.05 or later,
Docker Community Edition (Docker CE) 18.03 or later

<div class="tasklist">

##### Install the plugin from the Docker store

```shell
docker plugin install store/logzio/logzio-logging-plugin:1.0.2 \
--alias logzio/logzio-logging-plugin
```

Check to see if logzio-logging-plugin is enabled.

```shell
docker plugin ls --filter enabled=true
```

If logzio-logging-plugin isn't on the list, enable it now.

```shell
docker plugin enable logzio/logzio-logging-plugin
```

##### Configure global settings with daemon.json

You can configure all containers with the same options using daemon.json.

For a complete list of options, see the configuration parameters below the code sample.👇

###### Code sample

```json
{
  "log-driver": "logzio/logzio-logging-plugin",
  "log-opts": {
    "logzio-url": "<<LISTENER-HOST>>",
    "logzio-token": "<<LOG-SHIPPING-TOKEN>>",
    "logzio-dir-path": "/path/to/logs/"
  }
}
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| logzio-token | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}   | Required |
| logzio-url | Listener URL and port. {% include log-shipping/listener-var.html %}  | Required |
| logzio-dir-path | Unsent logs are saved to this location on the disk. | Required |
| logzio-source | Event source. | -- |
| logzio-format | Log message format, either `json` or `text`. | `text` |
| logzio-tag | Log tag for the Container ID. For more information, see [Log tags for logging driver](https://docs.docker.com/v17.09/engine/admin/logging/log_tags/) from Docker. | `{{.ID}}` |
| labels | Comma-separated list of labels to include in the log message. | -- |
| env | Comma-separated list of environment variables to include in the log message. | -- |
| env-regex | A regular expression to match logging-related environment variables. Used for advanced log tag options. If there is collision between the `label` and `env` keys, `env` wins. Both options add additional fields to the attributes of a logging message. | -- |
| logzio-attributes | JSON-formatted metadata to include in the log message. | -- |


##### _(Optional)_ Set environment variables

Some logzio-logging-plugin options are controlled using environment variables.
Each of these variables has a default value, so you can skip this step if you're comfortable with the defaults.

###### Environment variables

| Parameter | Description | Required/Default |
|---|---|---|
| LOGZIO_DRIVER_LOGS_DRAIN_TIMEOUT | Time to wait between sending attempts. | `5s` |
| LOGZIO_DRIVER_DISK_THRESHOLD | Threshold, as % of disk usage, over which plugin will start dropping logs. | `70` |
| LOGZIO_DRIVER_CHANNEL_SIZE | The number of pending messages that can be in the channel before adding them to the disk queue. | `10000` |
| LOGZIO_MAX_MSG_BUFFER_SIZE | Appends logs that are segmented by Docker with 16kb limit. Specifies the biggest message, in bytes, that the system can reassemble. `1048576` (1 MB) maximum. | `1048576` (1 MB) |
| LOGZIO_MAX_PARTIAL_BUFFER_DURATION | How long the buffer keeps the partial logs before flushing them. | `500ms` |


##### _(Optional)_ Override global settings for an individual container

You can configure the plugin separately for each container when using the `docker run` command.

###### Code sample


```shell
docker run --log-driver=logzio/logzio-logging-plugin \
--log-opt logzio-token=<<LOG-SHIPPING-TOKEN>> \
--log-opt logzio-url=https://<<LISTENER-HOST>>:8071 \
--log-opt logzio-dir-path=./docker_logs \
--log-opt logzio-tag="{{Name}}/{{FullID}}" \
--log-opt labels=region \
--log-opt env=DEV \
--env "DEV=true" \
--label region=us-east-1 \
<<DOCKER-IMAGE-NAME>>
```


{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

For a complete list of options, see the configuration parameters above. 👆

##### Check Logz.io for your logs

Spin up your Docker containers if you haven't done so already. Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
