---
title: Ship container logs with Fluentd on Docker
logo:
  logofile: FluentD_Docker.png
  orientation: vertical
short-description: Ship container logs with Fluentd on Docker
data-source: Fluentd on Docker
shipping-tags:
  - log-shipper
contributors:
  - nshishkin
shipping-tags:
  - agents
order: 180
---
<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Setup instructions](#setup-instructions)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to ship logs from Docker containers on your host system to Logz.io using Fluentd running in a separate container. The host system refers to a physical or virtual machine that hosts your Docker containers.


### Architecture overview

This integration includes:


* Pulling a Docker image of containerized Fluentd
* Configuring and running containerized Fluentd

![Integration architecture Fluentd on Docker](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/docker_fluentd_draft_hla.png)

Upon deployment, each container on your host system, including the Fluentd container, writes logs to a dedicated log file. Fluentd fetches the log data from this file and ships the data to your Logz.io account, either via an optional proxy sever or directly.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="setup-instructions">

#### Deploy containerized Fluentd to ship container logs to your Logz.io account

**Before you begin, you'll need**:
Docker installed on your host system

<div class="tasklist">

##### Pull the Docker image for containerized Fluentd

```shell
docker pull logzio/fluentd-docker-logs
```

##### Start the container

To send your container logs directly to Logz.io:

1. Set the configuration parameters in the command below:

   ```conf
   docker run -it --rm \
   --name fluentd-docker-logs \
   -v $(pwd)/log:/fluentd/log \
   -v /var/lib/docker/containers:/var/lib/docker/containers:/var/lib/docker/containers:ro \
   -v /var/run/docker.sock:/var/run/docker.sock:ro \
   -p 5001:5001 \
   -e LOGZIO_LOG_LISTENER="<<LISTENER-HOST>>:8071" \
   -e LOGZIO_LOG_SHIPPING_TOKEN=<<LOG-SHIPPING-TOKEN>> \
   -e LOGZIO_TYPE=docker-fluentd \
   -e LOGZIO_INCLUDE_REGEX=<<LOGZIO_INCLUDE_REGEX>> \
   logzio/fluentd-docker-logs
   ```

2. {% include log-shipping/listener-var.html %}
3. {% include log-shipping/log-shipping-token.html %}
4. Replace `<<LOGZIO_INCLUDE_REGEX>>` with the Regex that matches names of containers that you need to ship logs from. The default value for this setting is `.+`.

To send your container logs to Logz.io via a proxy server:

1. Set the configuration parameters in the command below:

   ```conf
   docker run -it --rm \
   --name fluentd-docker-logs \
   -v $(pwd)/log:/fluentd/log \
   -v /var/lib/docker/containers:/var/lib/docker/containers:/var/lib/docker/containers:ro \
   -v /var/run/docker.sock:/var/run/docker.sock:ro \
   -p 5001:5001 \
   -e LOGZIO_LOG_LISTENER="<<LISTENER-HOST>>:8071" \
   -e LOGZIO_LOG_SHIPPING_TOKEN=<<LOG-SHIPPING-TOKEN>> \
   -e LOGZIO_TYPE=docker-fluentd \
   -e LOGZIO_INCLUDE_REGEX=<<LOGZIO_INCLUDE_REGEX>> \
   -e LOGZIO_PROXY_URI=<<LOGZIO_PROXY_URI>> \
   -e LOGZIO_PROXY_CERT=<<LOGZIO_PROXY_CERT>> \
   logzio/fluentd-docker-logs
   ```

2. {% include log-shipping/listener-var.html %}
3. {% include log-shipping/log-shipping-token.html %}
4. Replace `<<LOGZIO_INCLUDE_REGEX>>` with the Regex that matches names of containers that you need to ship logs from. The default value for this setting is `.+`.
5. Replace `<<LOGZIO_PROXY_URI>>` with your proxy URI.
6. Replace `<<LOGZIO_PROXY_CERT>>` with your proxy certificate.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for data of type `docker-fluentd` to see the incoming container logs.
  
If you still don’t see your data, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).
</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
