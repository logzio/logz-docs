---
title: Vector
logo:
  logofile: vector.svg
  orientation: vertical
data-source: Vector
shipper-tags:
  - log-shipper
contributors:
  - imnotashrimp
  - idohalevi
---

## Setup

###### Configure Vector

1.  Install Vector

    If you haven't already, install Vector:

    ```shell
    curl https://sh.vector.dev -sSf | sh
    ```

    For alternate installation instructions,
    see [Installation](https://docs.vector.dev/setup/installation) from Vector.

2.  Configure Vector with Logz.io sink

    Add this code block to your Vector configuration file.
    We recommend the configuaration shown in the code block.

    Find the complete configuration docs
    at [http sink](https://docs.vector.dev/usage/configuration/sinks/http) from Vector.
    {:.info-box.read}

    ```toml
    [sinks.logzio]
      # REQUIRED - General
      type = "http" # Don't change this setting
      inputs = ["YOUR_SOURCE_ID"]
      encoding = "ndjson" # enum: "ndjson" or "text"

      # More information on uri below this code block
      uri = "https://<<LISTENER-HOST>>?token=<<SHIPPING-TOKEN>>&type=vector"

      # OPTIONAL - General
      compression = "gzip" # no default, must be: "gzip" (if supplied)

      # OPTIONAL - Batching
      batch_size = 9000000 # bytes - Logz.io max batch is 10MB
      batch_timeout = 3

      # OPTIONAL - Buffer
      [sinks.logzio.buffer]
        type = "disk" # default, enum: "memory" or "disk"
        when_full = "block" # default, enum: "block" or "drop_newest"
        max_size = 104900000 # no default, bytes(104.9mb), relevant when type = "disk"
    ```

    Parameters
    {:.inline-header}

    uri <span class="required-param"></span>
    : Your Logz.io region's listener URL account token, and log type. \\
      {% include log-shipping/replace-vars.html listener=true %} \\
      {% include log-shipping/replace-vars.html token=true %}

3.  Run Vector

    ```shell
    vector --config path/to/your/vector.toml
    ```

4.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}

## Try it out

  1.  Install Vector
  2.  Create a vector.toml configuration file:

      ```shell
      touch vector.toml
      ```

  3.  Create a folder for Vector logs:

      ```shell
        mkdir vector
      ```

  4.  Configure vector.toml with the configuration below and replace your parameters:

      ```toml
      # Set global options
      data_dir = "./vector"

      [sources.in]
        type = "stdin"

      # Structure and parse the data
      [transforms.apache_parser]
          inputs = ["in"]
          type   = "regex_parser"
          regex    = '^(?P<host>[\w\.]+) - (?P<user>[\w]+) (?P<bytes_in>[\d]+) \[(?P<timestamp>.*)\] "(?P<method>[\w]+) (?P<path>.*)" (?P<status>[\d]+) (?P<bytes_out>[\d]+)$'

      # Set Logz.io sink
      [sinks.logzio]
        # REQUIRED - General
        type = "http" # must be: "http"
        inputs = ["YOUR_SOURCE_ID"]
        encoding = "ndjson" # enum: "ndjson" or "text"
        uri = "https://<YOUR_LOGZIO_HOST>?token=<YOUR_LOGZIO_SHIPPING_TOKEN>&type=vector"

        # OPTIONAL - General
        compression = "gzip" # no default, must be: "gzip" (if supplied)

        # OPTIONAL - Batching
        batch_size = 9000000 # bytes - Logz.io max batch is 10MB
        batch_timeout = 3

        # OPTIONAL - Buffer
        [sinks.logzio.buffer]
          type = "disk" # default, enum: "memory" or "disk"
          when_full = "block" # default, enum: "block" or "drop_newest"
          max_size = 104900000 # no default, bytes(104.9mb), relevant when type = "disk"
      ```

  5.  Run Vector:

      ```shell
      echo '172.128.80.109 - Bins5273 656 [2019-05-03T13:11:48-04:00] "PUT /mesh" 406 10272' \
        | vector --config ./vector.toml
      ```

  6.  Check Logz.io for your logs
