---
title: Ship Elastic Container Service logs
logo:
  logofile: aws-ecs.svg
  orientation: vertical
open-source:
  - title: logzio-aws-ecs
    github-repo: logzio-aws-ecs
data-source: Elastic Container Service
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/ECS
contributors:
  - imnotashrimp
  - supereli
  - amosd92
  - idohalevi
  - boofinka
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
docker pull logzio/logzio-aws-ecs
```

##### Run the Docker image

For a complete list of options, see the parameters below the code block. 👇

```shell
docker run --name=logzio-aws-ecs \
-e "LOGZIO_URL_1=https://<LISTENER-URL>:8071?token=<ACCOUNT-TOKEN>" \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /var/lib/docker/containers:/var/lib/docker/containers \
-v /tmp:/tmp \
-d --net="host" \
logzio/logzio-aws-ecs
```

###### Parameters

Upgrading to a newer version of docker-collector-logs while it is already running
will cause it to resend logs that are within the `ignoreOlder` timeframe.
You can minimize log duplicates
by setting the `ignoreOlder` parameter of the new docker
to a lower value (for example, `20m`).
{:.info-box.note}

| Paramater | Details |
|---|---|
| **LOGZIO_URL** | **Required**. Your Logz.io listener URL. Replace `<LISTENER-URL>` with your region's listener URL. For more information on finding your account's region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html) in the Logz.io Docs. |
| **LOGZIO_TOKEN** | **Required**. Your Logz.io account token. Replace `<ACCOUNT-TOKEN>` with the [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to. |

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>
