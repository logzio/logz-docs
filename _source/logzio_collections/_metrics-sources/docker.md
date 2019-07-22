---
title: Ship Docker metrics
logo:
  logofile: docker.svg
  orientation: horizontal
data-source: Docker
open-source:
  - title: Docker Collector (Metrics)
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
  - amosd92
shipping-tags:
  - container
---

## Docker Collector (Metrics) setup

###### Configuration

1.  Pull the Docker image


    Download the Docker Collector (Metrics) image:

    ```shell
    docker pull logzio/docker-collector-metrics
    ```

2.  Run the container

    For a complete list of options, see the parameters below the code block.👇

    ```shell
    docker run --name docker-collector-metrics \
    --env LOGZIO_TOKEN="<<SHIPPING-TOKEN>>" \
    --env LOGZIO_URL="<<LISTENER-HOST>>:5015" \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    LOGZIO_MODULES="docker" \
    logzio/docker-collector-metrics
    ```

    Parameters for all modules
    {: .inline-header }

    LOGZIO_TOKEN <span class="required-param"></span>
    : Your Logz.io account token.
      {% include log-shipping/replace-vars.html token=true %}
      <!-- logzio-inject:account-token -->

    LOGZIO_URL <span class="required-param"></span>
    : Logz.io listener URL to ship the logs to.
      {% include log-shipping/replace-vars.html listener=true %}

    LOGZIO_MODULES <span class="required-param"></span>
    : Comma-separated list of Metricbeat modules to be enabled on this container
      (formatted as `"module1,module2,module3"`).
      To use a custom module configuration file, mount its folder to `/logzio/logzio_modules`.

    LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span>
    : The log type you'll use with this Docker.
      This is shown under the `type` field in Kibana. \\
      Logz.io applies parsing based on `type`.

    LOGZIO_LOG_LEVEL <span class="default-param">`"INFO"`</span>
    : The log level the module startup scripts will generate.

    LOGZIO_ADDITIONAL_FIELDS
    : Semicolon-separated list of additional fields to be included with each message sent
      (formatted as `fieldName1=value1;fieldName2=value2`). \\
      To use an environment variable as a value, format as `fieldName=$ENV_VAR_NAME`.
      Environment variables must be the only value in the field.
      Where an environment variable can't be resolved, the field is omitted.

    Parameters for Docker Collector (Metrics)
    {:.inline-header}

    DOCKER_MATCH_CONTAINER_NAME
    : Comma-separated list of containers you want to collect the logs from.
      If a container's name partially matches a name on the list, that container's logs are shipped.
      Otherwise, its logs are ignored. \\
      **Note**: Can't be used with `DOCKER_SKIP_CONTAINER_NAME`

    DOCKER_SKIP_CONTAINER_NAME
    : Comma-separated list of containers you want to ignore.
      If a container's name partially matches a name on the list, that container's logs are ignored.
      Otherwise, its logs are shipped. \\
      **Note**: Can't be used with `DOCKER_MATCH_CONTAINER_NAME`

    DOCKER_PERIOD <span class="default-param">`10s`</span>
    : Sampling rate of metrics.
      The Docker API takes up to 2 seconds to respond,
      so we recommend setting this to `3s` or longer.

    DOCKER_CERTIFICATE_AUTHORITY
    : Filepath to certificate authority
      for connecting to Docker over TLS.

    DOCKER_CERTIFICATE
    : Filepath to CA certificate
      for connecting to Docker over TLS.

    DOCKER_KEY
    : Filepath to Docker key
      for connecting to Docker over TLS.

    {:.info-box.note}

3.  Check Logz.io for your metrics

    Spin up your Docker containers if you haven't done so already.
    Give your metrics a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).
{: .tasklist .firstline-headline }
