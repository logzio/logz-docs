---
title: Fluentd
logo:
  logofile: fluentd.svg
  orientation: vertical
data-source: Fluentd
shipping-tags:
  - log-shipper
contributors:
  - imnotashrimp
shipping-tags:
  - agents
---

#### Configure Fluentd

**Before you begin, you'll need**:
Ruby and ruby-dev 2.1 or higher

<div class="tasklist">

##### Install Fluentd and the Logz.io plugin

```shell
gem install fluentd fluent-plugin-logzio
```

##### Set up Fluentd

```shell
fluentd --setup ./fluent
```

##### Configure Fluentd with Logz.io output

Add this code block to your Fluent configuration file (`fluent.conf` by default).

See the configuration parameters below the code block.👇

```conf
<match **>
  @type logzio_buffered
  endpoint_url https://<<LISTENER-HOST>>:8071?token=<<SHIPPING-TOKEN>>&type=my_type
  output_include_time true
  output_include_tags true
  http_idle_timeout 10
  <buffer>
      @type memory
      flush_thread_count 4
      flush_interval 3s
      chunk_limit_size 16m
      queue_limit_length 4096
  </buffer>
</match>
```

###### Parameters

| Parameter | Description |
|---|---|
| endpoint_url | Your Logz.io region's listener URL, account token, and log type. <br> {% include log-shipping/replace-vars.html listener=true %} <br> {% include log-shipping/log-shipping-token.html %} |
| output_include_time | To add a timestamp to your logs when they're processed, `true` (recommended). Otherwise, `false`. |
| output_include_tags | To add the `fluentd` tag to logs, `true`. Otherwise, `false`. If `true`, use in combination with `output_tags_fieldname`. |
| output_tags_fieldname <span class="default-param">`fluentd_tag`</span> | If `output_include_tags` is `true`, sets output tag's field name. |
| http_idle_timeout | Time, in seconds, that the HTTP connection will stay open without traffic before timing out. |
{:.paramlist}

##### Run Fluentd

```shell
fluentd -c ./fluent/fluent.conf -vv
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
