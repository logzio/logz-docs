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
shipper-tags:
  - log-shipper
---

## Setup

###### Configuration

**You'll need**:
CMake

1.  Install Fluent Bit

    If you haven't installed Fluent Bit yet,
    you can build it from source with CMake
    according to the [instructions from Fluent Bit](https://docs.fluentbit.io/manual/installation/build_install).

2.  Install and configure the Logz.io plugin

    ```shell
    wget -o /fluent-bit/plugins/out_logzio.so \
    https://github.com/logzio/fluent-bit-logzio-output/tree/master/build
    ```
    <!-- TODO This is a binary. Waiting for word on where the final binary will be available -->

    In your Fluent Bit configuration file,
    add Logz.io as an output.

    Logz.io-Out Plugin for Fluent Bit
    supports one output stream to Logz.io.
    We plan to add support for multiple streams in the future. \\
    In the meantime,
    we recommend running a new instance for each output stream you need.
    {:.info-box.note}

    For a complete list of options, see the configuration parameters below the code block.👇

    ```python
    [OUTPUT]
      Name  logzio
      Match *
      logzio_token <<SHIPPING-TOKEN>>
      logzio_url   https://<<LISTENER-HOST>>:8071
    ```

    Parameters
    {:.inline-header}

    logzio_token <span class="required-param"></span>
    : {% include log-shipping/replace-vars.html token=true %}

    logzio_url <span class="default-param">`https://listener.logz.io:8071`</span>
    : Listener URL and port. \\
      {% include log-shipping/replace-vars.html listener=true %}

    logzio_type <span class="default-param">`logzio-fluenbit`</span>
    : The [log type](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html), shipped as `type` field.
      Used by Logz.io for consistent parsing.
      Can't contain spaces.

    logzio_debug <span class="default-param">`false`</span>
    : Set to `true` to print debug messages to stdout.

3.  Run Fluent Bit with the Logz.io plugin

    As a standalone app...

    ```shell
    fluent-bit -e /fluent-bit/plugins/out_logzio.so \
    -c /fluent-bit/etc/fluent-bit.conf
    ```

    ...or in a Docker container.

    ```shell
    docker run -it --rm \
    -v /path/to/fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf \
    logzio/fluent-bit-output
    ```

4.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}
