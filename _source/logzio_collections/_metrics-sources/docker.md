---
title: Ship Docker metrics
logo:
  logofile: docker.svg
  orientation: horizontal
data-source: Docker
open-source:
  - title: docker-collector-metrics
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
  - amosd92
shipping-tags:
  - container
---

## docker-collector-metrics setup

###### Configuration

1.  Pull the Docker image

    Download the logzio/docker-collector-metrics image:

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
    logzio/docker-collector-metrics
    ```

    Parameters
    {: .inline-header }

    LOGZIO_TOKEN <span class="required-param"></span>
    : Your Logz.io account token.
      {% include log-shipping/replace-vars.html token=true %}
      <!-- logzio-inject:account-token -->

    LOGZIO_URL <span class="required-param"></span>
    : Logz.io listener URL to ship the logs to.
      {% include log-shipping/replace-vars.html listener=true %}

    LOGZIO_TYPE <span class="default-param">`docker-collector-metrics`</span>
    : The log type you'll use with this Docker.
      This is shown under the `type` field in Kibana. \\
      Logz.io applies parsing based on `type`.

    matchContainerName
    : Comma-separated list of containers you want to collect the logs from.
      If a container's name partially matches a name on the list, that container's logs are shipped.
      Otherwise, its logs are ignored. \\
      **Note**: Can't be used with skipContainerName

    skipContainerName
    : Comma-separated list of containers you want to ignore.
      If a container's name partially matches a name on the list, that container's logs are ignored.
      Otherwise, its logs are shipped. \\
      **Note**: Can't be used with matchContainerName

    <div class="info-box note">
      By default, logs from docker-collector-logs and docker-collector-metrics containers are ignored.
    </div>

3.  Check Logz.io for your metrics

    Spin up your Docker containers if you haven't done so already.
    Give your metrics a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).
{: .tasklist .firstline-headline }
