---
title: Ship Elastic Container Service logs
logo:
  logofile: aws-ecs.svg
  orientation: vertical
open-source:
  - title: Logz.io AWS ECS Collector
    github-repo: logzio-aws-ecs
shipping-summary:
  data-source: Amazon Elastic Container Service
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/ECS
contributors:
  - imnotashrimp
  - supereli
---

This integration uses Fluentd in a Docker container to forward logs from Amazon Elastic Container Service (ECS) to Logz.io.

## Setup

To use Logz.io AWS ECS Collector, you'll set environment variables when you run the container.
The Docker logs directory and docker.sock are mounted to the container, allowing Fluentd to collect the logs and metadata.

###### Deploy the AWS ECS collector

{: .tasklist .firstline-headline }
1. Pull the Docker image

    Download the logzio/logzio-aws-ecs image:

    ```shell
    docker pull logzio/logzio-aws-ecs
    ```

2. Run the Docker image

    For a complete list of options, see the parameters below the code block.👇

    ```shell
    docker run -d --name=logzio-aws-ecs \
    --env LOGZIO_TOKEN="<ACCOUNT-TOKEN>" \
    --env LOGZIO_URL="https://<LISTENER-URL>:8071" \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /var/lib/docker/containers:/var/lib/docker/containers \
    -v /tmp:/tmp \
    --net="host" \
    logzio/logzio-aws-ecs
    ```

    {: .inline-header }
    Parameters

    LOGZIO_TOKEN <span class="required-param"></span>
    : Your Logz.io account token.
      {% include log-shipping/replace-vars.html token=true %}

    LOGZIO_URL <span class="required-param"></span>
    : Your Logz.io listener URL.
      {% include log-shipping/replace-vars.html listener=true %}

3. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).
