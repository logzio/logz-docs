---
title: Shipping with Logstash
logo:
  logofile: logstash.svg
  orientation: vertical
data-source: Logstash
shipping-tags:
  - log-shipper
contributors:
  - imnotashrimp
shipping-tags:
  - agents
---


<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Shipping over SSL <span class="sm ital">(recommended)</span>](#ssl-config)
* [Shipping over TCP](#tcp-config)
{:.branching-tabs}


<!-- tab:start -->
<div id="overview">

Logstash is a server app that ingests and parses log data.
We recommend using it for shipping to Logz.io only when you have an existing Logstash configuration.

For most other cases, we recommend using [Filebeat]({{site.baseurl}}/shipping/shippers/filebeat.html).

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="ssl-config">

#### Ship with Logstash over SSL

**Before you begin, you'll need**:
JDK,
[Logstash](https://www.elastic.co/guide/en/logstash/current/installing-logstash.html)

<div class="tasklist">


{% include log-shipping/certificate.md %}


##### Add Logz.io to your configuration file

Add these code blocks to the end of your existing Logstash configuration file.

Make sure the `mutate` block is the last item in the `filters` block.

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

```conf
filter {
  # ...
  # ...
  mutate {
    add_field => { "token" => "<<LOG-SHIPPING-TOKEN>>" }
  }
}

output {
  lumberjack {
    hosts => ["<<LISTENER-HOST>>"]
    port => 5006
    ssl_certificate => "/usr/share/logstash/keys/TrustExternalCARoot.crt"
    codec => "json_lines"
  }
}
```

##### Start Logstash

Start or restart Logstash for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="tcp-config">

#### Ship with Logstash over TCP

**Before you begin, you'll need**:
JDK,
[Logstash](https://www.elastic.co/guide/en/logstash/current/installing-logstash.html)

<div class="tasklist">

##### Add Logz.io to your configuration file

Add these code blocks to the end of your existing Logstash configuration file.

Make sure the `mutate` block is the last item in the `filters` block.

{% include log-shipping/log-shipping-token.html %} \\
{% include log-shipping/listener-var.html %} 

```conf
filter {
  # ...
  # ...
  mutate {
    add_field => { "token" => "<<LOG-SHIPPING-TOKEN>>" }
  }
}

output {
  tcp {
    host => "<<LISTENER-HOST>>"
    port => 5050
    codec => json_lines
  }
}
```

##### Start Logstash

Start or restart Logstash for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->