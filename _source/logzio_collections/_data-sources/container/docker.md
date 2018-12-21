---
title: Ship Docker logs
logo:
  logofile: docker.svg
  orientation: horizontal
shipping-summary:
  data-source: Docker container
  log-shippers:
    - recommended: logzio-docker
    - logzio-logging-plugin (Docker logging driver)
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Docker-Logging
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [logzio-docker <span class="sm ital">(recommended)</span>](#logzio-docker-docker-image-config)
  * [logzio-logging-plugin](#logzio-logging-plugin-docker-logging-driver-config)

<div id="logzio-docker-docker-image-config">

## logzio-docker setup

**You'll need:** Docker 1.5 or higher

{: .tasklist .firstline-headline }
1. Pull the Docker image

    Download the logzio/logzio-docker image:

    ```shell
    docker pull logzio/logzio-docker
    ```

2. Run the Docker image

    For a complete list of options, see the parameters and command flags below the code block.👇

    ```shell
    docker run -d \
    -restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    logzio/logzio-docker \
    -t <ACCOUNT-TOKEN> \
    -z us \
    -a env=prod
    ```

    Parameters
    {: .inline-header }

    {: .parameter-list }
    -t <span class="required-param"></span>
      : Your Logz.io account token.
        {% include log-shipping/replace-vars.html token=true %}
        <!-- logzio:account-token -->

    -z
      : Your account region.
        If your login URL is app.logz.io, use `us`.
        If your login URL is app-eu.logz.io, use `eu`. <br />
        <span class="default-param">`us`</span>

    -i / --statsinterval
      : Integer.
        Collect samples and average them before sending to Logz.io.

     -a
      : Add more fields to the log.
        Fore example, you can use this to tag a specific application or environment. <br />
        **Syntax:** `key=value` (e.g. `env=prod`)

     --matchByName /regex/
      : Forward logs or stats only for the containers whose name matches the given regex.

    --matchByImage /regex/
      : Forward logs or stats only for the containers whose image matches the given regex.

    --skipByName /regex/
      : Don't forward logs or stats for the containers whose name matches the given regex.

    --skipByImage /regex/
      : Don't forward logs or stats for the containers whose image matches the given regex.


    Command flags
    {: .inline-header }

    {: .parameter-list }
    --no-logs
      : Don't send container logs to Logz.io.

    --no-dockerEvents
      : Don't send Docker events to Logz.io.

    --no-stats
      : Don't send Docker stats.
        Required if your Docker version is less than 1.5.

    --privileged
      : Use this if you receive `Error: read EACCES`.

3. Test your configuration

    Spin up your Docker containers if you haven't done so already. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="logzio-logging-plugin-docker-logging-driver-config">

## logzio-logging-plugin setup

**You'll need:** Docker Engine 17.05 or later, Docker Community Edition (Docker CE) 18.03 or later

{: .tasklist .firstline-headline }
1. Install the plugin from the Docker store

    ```shell
    docker plugin install store/logzio/logzio-logging-plugin:1.0.0 \
    --alias logzio/logzio-logging-plugin
    ```

    Check to see if logzio-logging-plugin is enabled.

    ```shell
    docker plugin ls --filter enabled=true
    ```

    If logzio-logging-plugin isn't on the list, enable it now.

    ```shell
    docker plugin enable logzio/logzio-logging-plugin
    ```

2. Configure global settings with daemon.json

    You can configure all containers with the same options using daemon.json.

    For a complete list of options, see the configuration parameters below the code sample.👇

    Code sample
    {: .inline-header }

    ```json
    {
      "log-driver": "logzio/logzio-logging-plugin",
      "log-opts": {
        "logzio-url": "<LISTENER-URL>",
        "logzio-token": "<ACCOUNT-TOKEN>",
        "logzio-dir-path": "/path/to/logs/"
      }
    }
    ```

    Parameters
    {: .inline-header}

    {: .parameter-list }
    logzio-token <span class="required-param"></span>
      : Your Logz.io account token.
        {% include log-shipping/replace-vars.html token=true %}
        <!-- logzio:account-token -->

    logzio-url	<span class="required-param"></span>
      : Listener URL and port. <br />
        {% include log-shipping/replace-vars.html listener=true %} <br />

    logzio-dir-path	<span class="required-param"></span>
      : Path of the logs to be sent to Logz.io.

    logzio-source
      : Event source.

    logzio-format
      : Log message format, either `json` or `text`. <br />
        <span class="default-param">`text`</span>

    logzio-tag
      : Log tag.
        For more information, see [Log tags for logging driver](https://docs.docker.com/v17.09/engine/admin/logging/log_tags/) from Docker. <br />
        {% raw %} <span class="default-param">`{{.ID}}` (Container ID)</span> {% endraw %}

    labels
      : Comma-separated list of labels to include in the log message.

    env
      :	Comma-separated list of environment variables to include in the log message.

    env-regex
      : A regular expression to match logging-related environment variables.
        Used for advanced log tag options.
        If there is collision between the `label` and `env` keys, `env` wins.
        Both options add additional fields to the attributes of a logging message.

    logzio-attributes
      : JSON-formatted metadata to include in the log message.


3. _(Optional)_ Set environment variables

    Some logzio-logging-plugin options are controlled using environment variables.
    Each of these variables has a default value, so you can skip this step if you're comfortable with the defaults.

    Environment variables
    {: .inline-header }

    {: .parameter-list }
    LOGZIO_DRIVER_LOGS_DRAIN_TIMEOUT
      : Time to sleep between sending attempts.<br />
        <span class="default-param">`5s`</span>

    LOGZIO_DRIVER_DISK_THRESHOLD
      : Threshold, as % of disk usage, over which plugin will start dropping logs. <br />
        <span class="default-param">`70`</span>

    LOGZIO_DRIVER_CHANNEL_SIZE
      : The number of pending messages that can be in the channel before adding them to the disk queue. <br />
        <span class="default-param">`10000`</span>

    LOGZIO_MAX_MSG_BUFFER_SIZE
      : Appends logs that are segmented by Docker with 16kb limit.
        Specifies the biggest message, in bytes, that the system can reassemble.
        `1048576` (1 MB) maximum. <br />
        <span class="default-param">`1048576` (1 MB)</span>

    LOGZIO_MAX_PARTIAL_BUFFER_DURATION
      : How long the buffer keeps the partial logs before flushing them. <br />
        <span class="default-param">`500ms`</span>

4. _(Optional)_ Override global settings for an individual container

    You can configure the plugin separately for each container when using the `docker run` command.

    Code sample
    {: .inline-header }

    {% raw %}
    ```shell
    $ docker run --log-driver=logzio/logzio-logging-plugin \
      <DOCKER-IMAGE-NAME> \
      --log-opt logzio-token=<ACCOUNT-TOKEN> \
      --log-opt logzio-url=https://<LISTENER-URL>:8071 \
      --log-opt logzio-dir-path=./docker_logs \
      --log-opt logzio-tag="{{.Name}}/{{.FullID}}" \
      --log-opt labels=region \
      --log-opt env=DEV \
      --env "DEV=true" \
      --label region=us-east-1
    ```
    {% endraw %}

    {% include log-shipping/replace-vars.html token=true listener=true %}

    For a complete list of options, see the configuration parameters in step 2.☝️

3. Test your configuration

    Spin up your Docker containers if you haven't done so already. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>