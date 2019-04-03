---
title: Ship Elastic Container Service logs
logo:
  logofile: aws-ecs.svg
  orientation: vertical
open-source:
  title: Logz.io AWS ECS Collector
  github-repo: logzio-aws-ecs
shipping-summary:
  data-source: Amazon Elastic Container Service
  log-shippers:
    - S3 fetcher
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/ECS
contributors:
  - imnotashrimp
  - supereli
---

This integration uses Fluentd in a Docker container to forward logs from Amazon Elastic Container Service (ECS) to Logz.io.

To use Logz.io AWS ECS Collector, you'll set environment variables when you run the container.
The Docker logs directory and docker.sock are mounted to the container, allowing Fluentd to collect the logs and metadata.

## logzio-docker-ecs setup

{: .tasklist .firstline-headline }
1. Pull the Docker image

    Download the logzio/logzio-docker-ecs image:

    ```shell
    docker pull logzio/logzio-docker-ecs
    ```

2. Run the Docker image

    For a complete list of options, see the parameters below the code block.👇

    ```shell
    docker run --name=logzio-aws-ecs \
    -e "LOGZIO_URL_1=https://<LISTENER-URL>:8071?token=<ACCOUNT-TOKEN>" \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /var/lib/docker/containers:/var/lib/docker/containers \
    -v /tmp:/tmp \
    -d --net="host" \
    logzio/logzio-aws-ecs
    ```

    {: .inline-header }
    Parameters

    {: .parameter-list }
    LOGZIO_URL_1 <span class="required-param"></span>
      : Your Logz.io listener URL and account token.
        To ship to different accounts, increment the number (e.g., `LOGZIO_URL_2`, `LOGZIO_URL_3`). \\
        {% include log-shipping/replace-vars.html listener=true %} \\
        {% include log-shipping/replace-vars.html token=true %}

3. Check Logz.io for your logs

    Spin up your Docker containers if you haven’t done so already. Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).
