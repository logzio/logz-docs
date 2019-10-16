---
title: Ship Docker metrics
logo:
  logofile: docker.svg
  orientation: horizontal
data-source: Docker
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
  - amosd92
shipping-tags:
  - container
---

Docker Metrics Collector is a container that runs Metricbeat with the modules you enable at runtime.
If you're not already running Docker Metrics Collector, follow the steps in [Configuration](#configuration) below.

Otherwise, stop the container, add `docker` to the `LOGZIO_MODULES` environment variable, and restart.
You can find the `run` command and all parameters in step 2 of the configuration below.

The `docker` module collects these metrics:
`container`, `cpu`, `diskio`, `healthcheck`, `info`, `memory`, `network`

#### Configuration {#configuration}

<div class="tasklist">

##### Pull the Docker image

Download the Docker Metrics Collector image:

```shell
docker pull logzio/docker-collector-metrics
```

##### Run the container

For a complete list of options, see the parameters below the code block.👇

```shell
docker run --name docker-collector-metrics \
--env LOGZIO_TOKEN="<<SHIPPING-TOKEN>>" \
--env LOGZIO_URL="<<LISTENER-HOST>>:5015" \
--env LOGZIO_MODULES="docker" \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
logzio/docker-collector-metrics
```

###### Parameters for all modules

| Parameter | Description |
|---|---|
| LOGZIO_TOKEN <span class="required-param"></span> | Your Logz.io account token. {% include log-shipping/replace-vars.html token=true %} <!-- logzio-inject:account-token --> |
| LOGZIO_URL <span class="required-param"></span> | Logz.io listener URL to ship the metrics to. {% include log-shipping/replace-vars.html listener=true %} |
| LOGZIO_MODULES <span class="required-param"></span> | Comma-separated list of Metricbeat modules to be enabled on this container (formatted as `"module1,module2,module3"`). To use a custom module configuration file, mount its folder to `/logzio/logzio_modules`. |
| LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span> | The log type you'll use with this Docker. This is shown under the `type` field in Kibana. <br> Logz.io applies parsing based on `type`. |
| LOGZIO_LOG_LEVEL <span class="default-param">`"INFO"`</span> | The log level the module startup scripts will generate. |
| LOGZIO_ADDITIONAL_FIELDS | Semicolon-separated list of additional fields to be included with each message sent (formatted as `fieldName1=value1;fieldName2=value2`). <br> To use an environment variable as a value, format as `fieldName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. Where an environment variable can't be resolved, the field is omitted. |
{:.paramlist}

###### Parameters for Docker Metrics Collector

| Parameter | Description |
|---|---|
| DOCKER_MATCH_CONTAINER_NAME | Comma-separated list of containers you want to collect the metrics from. If a container's name partially matches a name on the list, that container's metrics are shipped. Otherwise, its metrics are ignored. <br> **Note**: Can't be used with `DOCKER_SKIP_CONTAINER_NAME`. |
| DOCKER_SKIP_CONTAINER_NAME | Comma-separated list of containers you want to ignore. If a container's name partially matches a name on the list, that container's metrics are ignored. Otherwise, its metrics are shipped. <br> **Note**: Can't be used with `DOCKER_MATCH_CONTAINER_NAME`. |
| DOCKER_PERIOD <span class="default-param">`10s`</span> | Sampling rate of metrics. The Docker API takes up to 2 seconds to respond, so we recommend setting this to `3s` or longer. |
| DOCKER_CERTIFICATE_AUTHORITY | Filepath to certificate authority for connecting to Docker over TLS. |
| DOCKER_CERTIFICATE | Filepath to CA certificate for connecting to Docker over TLS. |
| DOCKER_KEY | Filepath to Docker key for connecting to Docker over TLS. |
{:.paramlist}

##### Check Logz.io for your metrics

Spin up your Docker containers if you haven't done so already.
Give your metrics a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>
