---
title: Fluent Bit
logo:
  logofile: fluent-bit.svg
  orientation: vertical
data-source: Fluent Bit
open-source:
  - title: Logz.io-Out Plugin for Fluent Bit
    github-repo: fluent-bit-logzio-output
contributors:
  - imnotashrimp
  - idohalevi
shipping-tags:
  - log-shipper
shipping-tags:
  - agents
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Run as a standalone app](#standalone-config)
* [Run in a Docker container](#docker-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="standalone-config">

#### Run Fluent Bit as a standalone app

<div class="tasklist">

##### Install Fluent Bit

If you haven't installed Fluent Bit yet,
you can build it from source
according to the [instructions from Fluent Bit](https://docs.fluentbit.io/manual/installation/sources/build-and-install).

##### Install and configure the Logz.io plugin

For Linux:

```shell
wget -o /fluent-bit/plugins/out_logzio.so \
https://github.com/logzio/fluent-bit-logzio-output/blob/master/build/out_logzio-linux.so
```

For MacOS:

```shell
wget -o /fluent-bit/plugins/out_logzio.so \
    https://github.com/logzio/fluent-bit-logzio-output/raw/master/build/out_logzio-macOS.so
```

In your Fluent Bit configuration file (`fluent-bit.conf` by default),
add Logz.io as an output.

Logz.io-Out Plugin for Fluent Bit
supports one output stream to Logz.io.
We plan to add support for multiple streams in the future. \\
In the meantime,
we recommend running a new instance for each output stream you need.
{:.info-box.note}

For a list of options, see the configuration parameters below the code block. 👇

```python
[OUTPUT]
    Name  logzio
    Match *
    logzio_token <<LOG-SHIPPING-TOKEN>>
    logzio_url   https://<<LISTENER-HOST>>:8071
```

###### Parameters

| Parameter | Description |
|---|---|
| logzio_token (Required) | {% include log-shipping/log-shipping-token.html %} |
| logzio_url <span class="default-param">`https://listener.logz.io:8071`</span> | Listener URL and port. <br> {% include log-shipping/replace-vars.html listener=true %} |
| logzio_type <span class="default-param">`logzio-fluent-bit`</span> | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. |
| logzio_debug <span class="default-param">`false`</span> | Set to `true` to print debug messages to stdout. |
{:.paramlist}

##### Run Fluent Bit with the Logz.io plugin

```shell
fluent-bit -e /fluent-bit/plugins/out_logzio.so \
-c /fluent-bit/etc/fluent-bit.conf
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="docker-config">

#### Run Fluent Bit in a Docker container

<div class="tasklist">

##### Make the configuration file

To run in a container,
create a configuration file named `fluent-bit.conf`.

Logz.io-Out Plugin for Fluent Bit
supports one output stream to Logz.io.
We plan to add support for multiple streams in the future. \\
In the meantime,
we recommend running a new instance for each output stream you need.
{:.info-box.note}

For a list of options, see the configuration parameters below the code block. 👇

```python
[SERVICE]
    # Include your remaining SERVICE configuration here.
    Plugins_File plugins.conf

[OUTPUT]
    Name  logzio
    Match *
    logzio_token <<LOG-SHIPPING-TOKEN>>
    logzio_url   https://<<LISTENER-HOST>>:8071
```

######  Parameters

| Parameter | Description |
|---|---|
| logzio_token (Required) | {% include log-shipping/log-shipping-token.html %} |
| logzio_url <span class="default-param">`https://listener.logz.io:8071`</span> | Listener URL and port. <br> {% include log-shipping/replace-vars.html listener=true %} |
| logzio_type <span class="default-param">`logzio-fluent-bit`</span> | The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field. Used by Logz.io for consistent parsing. Can't contain spaces. |
| logzio_debug <span class="default-param">`false`</span> | Set to `true` to print debug messages to stdout. |
{:.paramlist}

##### Run the Docker image

Run the Docker image
using the `fluent-bit.conf` file you made in step 1.

```shell
docker run -it --rm \
-v /path/to/fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf \
logzio/fluent-bit-output
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
