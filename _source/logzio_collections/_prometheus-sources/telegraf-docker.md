---
title: Send Docker metrics over Telegraf
logo:
  logofile: docker-logo.png
  orientation: vertical
open-source:
  - title: Docker Metrics Collector
    github-repo: telegraf-docker-collector-metrics
data-for-product-source: Metrics
data-source: Docker metrics
templates: ["docker"]
contributors:
  - hidan
  - nshishkin
shipping-tags:  
  - container
order: 800
---

## Overview

Deploy this integration to ship metrics from your Docker network using containerized Telegraf agent.

#### Setup

<div class="tasklist">
  

##### Pull the Docker image

```
docker pull logzio/docker-metrics-collector:latest
```

##### Start the collector

Run the following command:

```
docker run --name telegraf-docker-collector-metrics \
 --env METRICS_TOKEN="<<PROMETHEUS-METRICS-SHIPPING-TOKENN>>" \
 --env LOGZIO_LISTENER="<<LISTENER-HOST>>" \
 -v /var/run/docker.sock:/var/run/docker.sock \
 logzio/docker-metrics-collector:latest
```

{% include general-shipping/replace-placeholders-prometheus.html %}


If you prefer to keep these environment variables in an `.env` file, run the following command:

`docker run -d --env-file=docker.env -v /var/run/docker.sock:/var/run/docker.sock logzio/docker-metrics-collector:latest`

###### Parameters

Below is a list of all environment variables available with this integration. If required, add a variable to the `docker run` command using the `--env` flag.

|Name|Description|Required/Default|
|---|---|---|
|METRICS_TOKEN|Your Logz.io metrics account token.|Required|
|LOGZIO_LISTENER|Your Logz.io listener address followed by port `8053`.|Required/Default: `https://listener.logz.io:8053`.|
|DOCKER_ENDPOINT|Address to reach the required Docker Daemon.|Default: `unix:///var/run/docker.sock`.|
|TIMEOUT|The request timeout for any Docker Daemon query.|Default: `5s`.|
|EXCLUED_IMAGES|A list of strings, regexes, or globs, the container image names of which, will not be among the queried containers. !-prefixed negations are possible for all item types to signify that only unmatched container image names should be monitored. For example: `imageNameToExclude1,imageNameToExclude2)`|Default: `nil`.|

##### Check Logz.io metrics

Give your metrics a few minutes to get from your system to ours, and then open your Logz.io [Metrics](https://app.logz.io/#/dashboard/metrics) dashboard.

</div>
