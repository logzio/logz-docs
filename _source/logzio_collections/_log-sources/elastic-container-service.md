---
title: Ship Elastic Container Service logs
logo:
  logofile: aws-ecs.svg
  orientation: vertical
open-source:
  - title: docker-collector-logs
    github-repo: docker-collector-logs
data-source: Elastic Container Service
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/ECS
contributors:
  - imnotashrimp
  - supereli
  - amosd92
  - idohalevi
shipping-tags:
  - aws
---

This integration uses Filebeat in a Docker container to forward logs from Amazon Elastic Container Service (ECS) to Logz.io.

To use docker-collector-logs, you'll set environment variables when you run the container.
The Docker logs directory and docker.sock are mounted to the container, allowing Filebeat to collect the logs and metadata.

#### Deploy the Docker collector

{% include trust-chain-warning.html msg='docker' %}

<div class="tasklist">

##### Pull the Docker image

Download the logzio/docker-collector-logs image.

```shell
docker pull logzio/docker-collector-logs
```

##### Run the Docker image

For a complete list of options, see the parameters below the code block. 👇

```shell
docker run -d --name=docker-collector-logs \
--env LOGZIO_TOKEN="<<SHIPPING-TOKEN>>" \
--env LOGZIO_URL="<<LISTENER-HOST>>:5015" \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /var/lib/docker/containers:/var/lib/docker/containers \
logzio/docker-collector-logs
```

###### Parameters

| Parameter | Description |
|---|---|
| LOGZIO_TOKEN <span class="required-param"></span> | Your Logz.io account token. {% include log-shipping/replace-vars.html token=true %} |
| LOGZIO_URL <span class="required-param"></span> | Your Logz.io listener URL and port. {% include log-shipping/replace-vars.html listener=true %} |
{:.paramlist}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>