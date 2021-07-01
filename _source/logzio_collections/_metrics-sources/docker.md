---
title: Ship Docker metrics
logo:
  logofile: docker.svg
  orientation: horizontal
data-source: Docker
templates: ["docker-metricbeat"]
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - mirii1994
  - imnotashrimp
  - amosd92
  - shalper
shipping-tags:
  - container
order: 40
---

To simplify shipping metrics from one or many sources,
we created Docker Metrics Collector.
Docker Metrics Collector is a container
that runs Metricbeat with the modules you enable at runtime.

{% include /metric-shipping/docker-metricbeat-version.md %}

#### Configuration

If you're not already running Docker Metrics Collector,
follow these steps.

Otherwise, stop the container, add
`docker`
to the `LOGZIO_MODULES` environment variable,
add `-v /var/run/docker.sock:/var/run/docker.sock:ro` to the command,
and restart.
You can find the `run` command and all parameters
in this procedure.

The `docker` module collects these metrics:
`container`,
`cpu`,
`diskio`,
`healthcheck`,
`info`,
`memory`,
`network`

<div class="tasklist">

##### Pull the Docker image

Download the Docker Metrics Collector image:

```shell
docker pull logzio/docker-collector-metrics
```

##### Run the container

You'll set your configuration using environment variables
in the `docker run` command.
Each parameter is formatted like this:
`--env ENV_VARIABLE_NAME="value"`.

For a complete list of options, see the parameters below the code block.👇

```shell
docker run --name docker-collector-metrics \
--env LOGZIO_TOKEN="<<METRICS-SHIPPING-TOKEN>>" \
--env LOGZIO_MODULES="docker" \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
logzio/docker-collector-metrics
```

###### Parameters for all modules

| Parameter | Description | Required/Default|
|---|---|---|
| LOGZIO_TOKEN | Your Logz.io Metrics account token. {% include /metric-shipping/replace-metrics-token.html %} |Required|
| LOGZIO_MODULES  | Comma-separated list of Metricbeat modules to be enabled on this container (formatted as `"module1,module2,module3"`). To use a custom module configuration file, mount its folder to `/logzio/modules`. | N/A |

<!-- info-box-start:info -->
The `LOGZIO_MODULES` parameter by default supports only these prebuilt modules: `aws`, `system` and `docker`.
{:.info-box.note}
<!-- info-box-end --> 

{% include general-shipping/region-parameter.md %}
| LOGZIO_TYPE | This field is needed only if you're shipping metrics to Kibana and you want to override the default value.    In Kibana, this is shown in the `type` field. Logz.io applies parsing based on `type`. | `docker-collector-metrics`|
| LOGZIO_LOG_LEVEL | The log level the module startup scripts will generate. | `"INFO"`|
| LOGZIO_EXTRA_DIMENSIONS | Semicolon-separated list of dimensions to be included with your metrics (formatted as `dimensionName1=value1;dimensionName2=value2`).    To use an environment variable as a value, format as `dimensionName=$ENV_VAR_NAME`. Environment variables must be the only value in the field. If an environment variable can't be resolved, the field is omitted. | N/A |
| DEBUG  | Set to `true` if you want Metricbeat to run in debug mode. **Note:** Debug mode tends to generate a lot of debugging output, so you should probably enable it temporarily only when an error occurs while running the docker-collector in production.  | `"false"`|
| HOSTNAME  | Insert your host name if you want it to appear in the metrics' `host.name`. If null, host.name will show the container's ID. | `` |
| CLOUD_METADATA | Set to `true` to enrich events with instance metadata from the machine’s hosting provider. | `"false"`|



{% include metric-shipping/open-dashboard.md title="Docker overview" %}


</div>
