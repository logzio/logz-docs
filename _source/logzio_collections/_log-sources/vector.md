---
title: Vector
logo:
  logofile: vector.svg
  orientation: vertical
data-source: Vector
data-for-product-source: Logs
shipping-tags:
  - log-shipper
contributors:
  - imnotashrimp
  - idohalevi
shipping-tags:
  - agents
order: 710
---

#### Configure Vector

<div class="tasklist">

##### Install Vector

If you haven't already, install Vector:

```shell
curl https://sh.vector.dev -sSf | sh
```

For alternate installation instructions,
see [Installation](https://vector.dev/docs/setup/) from Vector. 

##### Configure Vector with Logz.io sink

Add this code block to your Vector configuration file.
We recommend the configuaration shown in the code block.

<!-- info-box-start:info -->
Find the complete configuration docs at [http sink](https://docs.vector.dev/usage/configuration/sinks/http) from Vector.
{:.info-box.read}
<!-- info-box-end -->

```toml
[sinks.logzio]
  # REQUIRED - General
  type = "http" # Don't change this setting
  inputs = ["YOUR_SOURCE_ID"]
  encoding = "ndjson" # enum: "ndjson" or "text"

  # More information on uri below this code block
  uri = "https://<<LISTENER-HOST>>:8071/?token=<<LOG-SHIPPING-TOKEN>>&type=vector"

  # OPTIONAL - General
  compression = "gzip" # no default, must be: "gzip" (if supplied)

  # OPTIONAL - Batching
  batch.max_bytes = 9000000 # bytes - Logz.io max batch is 10MB
  batch.timeout_secs = 3

  # OPTIONAL - Buffer
  [sinks.logzio.buffer]
    type = "disk" # default, enum: "memory" or "disk"
    when_full = "block" # default, enum: "block" or "drop_newest"
    max_size = 104900000 # no default, bytes(104.9mb), relevant when type = "disk"
```

###### Parameters

| Parameter | Description |
|---|---|
| uri (Required) | Your Logz.io region's listener URL account token, and log type. <br> {% include log-shipping/listener-var.html %}  <br> {% include log-shipping/log-shipping-token.html %} |
{:.paramlist}

##### Run Vector

```shell
vector --config path/to/your/vector.toml
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
