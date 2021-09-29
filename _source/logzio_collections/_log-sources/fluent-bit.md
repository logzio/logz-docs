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
  - nshishkin
shipping-tags:
  - log-shipper
shipping-tags:
  - agents
order: 320
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
according to the [instructions from Fluent Bit](https://docs.fluentbit.io/manual/installation/getting-started-with-fluent-bit).

##### Install and configure the Logz.io plugin

For Linux:

```shell
wget -o /fluent-bit/plugins/out_logzio.so \
https://github.com/logzio/fluent-bit-logzio-output/raw/master/build/out_logzio-linux.so
```

For MacOS:

```shell
wget -o /fluent-bit/plugins/out_logzio.so \
    https://github.com/logzio/fluent-bit-logzio-output/raw/master/build/out_logzio-macOS.so
```

For Windows:

```shell
wget https://github.com/logzio/fluent-bit-logzio-output/raw/master/build/out_logzio-windows.so
```

In your Fluent Bit configuration file (`fluent-bit.conf` by default),
add Logz.io as an output.

<!-- info-box-start:info -->
Logz.io-Out Plugin for Fluent Bit supports one output stream to Logz.io. We recommend running a new instance for each output stream you need.
{:.info-box.note}
<!-- info-box-end -->

For a list of options, see the configuration parameters below the code block. 👇

```python
[OUTPUT]
    Name  logzio
    Match *
    logzio_token <<LOG-SHIPPING-TOKEN>>
    logzio_url   https://<<LISTENER-HOST>>:8071
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| logzio_token | {% include log-shipping/log-shipping-token.md %}  {% include log-shipping/log-shipping-token.html %} | Required |
| logzio_url  | Listener URL and port. {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| logzio_type   | {% include log-shipping/type.md %} | `logzio-fluent-bit` |
| logzio_debug    | Set to `true` to print debug messages to stdout. | `false` |


##### Run Fluent Bit with the Logz.io plugin

Linux and MacOS:

```shell
fluent-bit -e /fluent-bit/plugins/out_logzio.so \
-c /fluent-bit/etc/fluent-bit.conf
```

Windows:

```shell
C:\PROGRA~1\td-agent-bit\bin\fluent-bit.exe -c C:\PROGRA~1\td-agent-bit\conf\fluent-bit.conf -e <<PATH_TO_PLUGIN>>\out_logzio-windows.so
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

<!-- info-box-start:info -->
Logz.io-Out Plugin for Fluent Bit supports one output stream to Logz.io. We recommend running a new instance for each output stream you need.
{:.info-box.note}
<!-- info-box-end -->

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

| Parameter | Description |Required/Default |
|---|---|---|
| logzio_token | {% include log-shipping/log-shipping-token.md %}  {% include log-shipping/log-shipping-token.html %} | Required |
| logzio_url  | Listener URL and port. {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| logzio_type   | {% include log-shipping/type.md %} | `logzio-fluent-bit` |
| logzio_debug    | Set to `true` to print debug messages to stdout. | `false` |



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
