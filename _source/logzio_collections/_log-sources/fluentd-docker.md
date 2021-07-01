---
title: Ship container logs with Fluentd on Docker
logo:
  logofile: FluentD_Docker.png
  orientation: vertical
short-description: Ship container logs with Fluentd on Docker
data-source: Fluentd on Docker
shipping-tags:
  - log-shipper
open-source:
  - title: Fluentd-Docker-logs
    github-repo: fluentd-docker-logs
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

![Integration architecture Fluentd on Docker](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/docker-fluentd-hla-v2.png)

Upon deployment, each container on your host system, including the Fluentd container, writes logs to a dedicated log file. Fluentd fetches the log data from this file and ships the data over HTTP or HTTPS to your Logz.io account, either via an optional proxy sever or directly.

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
   -e LOGZIO_LOG_LISTENER="https://<<LISTENER-HOST>>:8071" \
   -e LOGZIO_LOG_SHIPPING_TOKEN=<<LOG-SHIPPING-TOKEN>> \
   -e LOGZIO_TYPE=docker-fluentd \
   logzio/fluentd-docker-logs
   ```

2. {% include log-shipping/listener-var.html %}
3. {% include log-shipping/log-shipping-token.html %}

To send your container logs to Logz.io via a proxy server:

1. Set the configuration parameters in the command below:

   ```conf
   docker run -it --rm \
   --name fluentd-docker-logs \
   -v $(pwd)/log:/fluentd/log \
   -v /var/lib/docker/containers:/var/lib/docker/containers:/var/lib/docker/containers:ro \
   -v /var/run/docker.sock:/var/run/docker.sock:ro \
   -p 5001:5001 \
   -e LOGZIO_LOG_LISTENER="https://<<LISTENER-HOST>>:8071" \
   -e LOGZIO_LOG_SHIPPING_TOKEN=<<LOG-SHIPPING-TOKEN>> \
   -e LOGZIO_TYPE=docker-fluentd \
   -e LOGZIO_PROXY_URI=<<LOGZIO_PROXY_URI>> \
   -e LOGZIO_PROXY_CERT=<<LOGZIO_PROXY_CERT>> \
   logzio/fluentd-docker-logs
   ```

2. {% include log-shipping/listener-var.html %}
3. {% include log-shipping/log-shipping-token.html %}
4. Replace `<<LOGZIO_PROXY_URI>>` with your proxy URI.
5. Replace `<<LOGZIO_PROXY_CERT>>` with your proxy certificate.

If you need to customize the default settings of the configuration parameters, add any of the following lines to the command:
  
* To use Regex to specify what conainers to ship logs from: 
  
   ```conf
   -e LOGZIO_INCLUDE_REGEX=<<LOGZIO_INCLUDE_REGEX>> \
   ```
  
 If a container name does not match the Regex, logs from this container will not be shipped. The default value for this setting is `.+`.
  
* To specify the threshold for chunk flush performance check:
  
   ```conf
   -e LOGZIO_SLOW_FLUSH_LOG_THRESHOLD=<<LOGZIO_SLOW_FLUSH_LOG_THRESHOLD>> \
   ```

The default value for this setting is `20.0`.
 
* To specify which plugin to use as the backend:
  
   ```conf
   -e LOGZIO_BUFFER_TYPE=<<LOGZIO_BUFFER_TYPE>> \
   ```

The default value for this setting is `file`.
  
* To specify the path to the backend plugin:
  
   ```conf
   -e LOGZIO_BUFFER_PATH=<<LOGZIO_BUFFER_PATH>> \
   ```

The default value for this setting is `/var/log/Fluentd-buffers/stackdriver.buffer`.
  
* To specify the parameter that controls the behavior when the queue becomes full:
  
   ```conf
   -e LOGZIO_OVERFLOW_ACTION=<<LOGZIO_OVERFLOW_ACTION>> \
   ```

The default value for this setting is `block`. Refer to [documentation on Fluentd](https://docs.fluentd.org/output#overflow_action) for more on this.

* To specify the maximum size of a chunk allowed:
  
   ```conf
   -e LOGZIO_CHUNK_LIMIT_SIZE=<<LOGZIO_CHUNK_LIMIT_SIZE>> \
   ```

The default value for this setting is `2M`.

* To specify the maximum length of the output queue:
  
   ```conf
   -e LOGZIO_QUEUE_LIMIT_LENGTH=<<LOGZIO_QUEUE_LIMIT_LENGTH>> \
   ```

The default value for this setting is `6`.

* To specify the interval, in seconds, to wait before invoking the next buffer flush:
  
   ```conf
   -e LOGZIO_FLUSH_INTERVAL=<<LOGZIO_FLUSH_INTERVAL>> \
   ```

The default value for this setting is `5s`.

* To specify the maximum interval, in seconds, to wait between retries:
  
   ```conf
   -e LOGZIO_RETRY_MAX_INTERVAL=<<LOGZIO_RETRY_MAX_INTERVAL>> \
   ```

The default value for this setting is `30s`.
  
* To specify the number of threads to flush the buffer:
  
   ```conf
   -e LOGZIO_FLUSH_THREAD_COUNT=<<LOGZIO_FLUSH_THREAD_COUNT>> \
   ```

The default value for this setting is `2`.

* To specify the log level for this container:
  
   ```conf
   -e LOGZIO_LOG_LEVEL=<<LOGZIO_LOG_LEVEL>> \
   ```

The default value for this setting is `info`.
 

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for data of type `docker-fluentd` to see the incoming container logs.
  
If you still don’t see your data, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).
</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
