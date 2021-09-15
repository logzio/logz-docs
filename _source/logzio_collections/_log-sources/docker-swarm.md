---
title: Ship Docker Swarm logs
short-description: Want to analyze logs from docker containers? This is the best option for you - it uses Filebeat to collect logs from other Docker containers and ship them to your Logz.io account.
logo:
  logofile: docker-swarm-logo2.png
  orientation: horizontal
data-source: Docker Swarm container
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


This integration is a Docker Swarm container that uses Filebeat to collect logs
from other Docker containers and forward them to your Logz.io account.

To use docker-collector-logs, you'll set environment variables when you run the container.
The Docker logs directory and docker.sock are mounted to the container, allowing Filebeat to collect the logs and metadata.


{% include log-shipping/docker-collector-logs.md %}

#### Deploy the Docker Swarm collector

<div class="tasklist">

##### Pull the Docker image

Download the logzio/docker-collector-logs image.

```shell
docker pull logzio/docker-collector-logs
```

##### Run the Docker image
  

For a complete list of options, see the parameters below the code block.👇
  

```shell
docker service create --name docker-collector-logs \
--env LOGZIO_TOKEN="<<LOG-SHIPPING-TOKEN>>" \
--mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
--mount type=bind,source=/var/lib/docker/containers,target=/var/lib/docker/containers \
--mode global logzio/docker-collector-logs
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

