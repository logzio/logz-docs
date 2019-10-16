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
---

Logstash is a server app that ingests and parses log data.
We recommend using it for shipping to Logz.io only when you have an existing Logstash configuration.

For most other cases, we recommend using [Filebeat]({{site.baseurl}}/shipping/shippers/filebeat.html).

<div class="branching-container">

* [Shipping over SSL <span class="sm ital">(recommended)</span>](#ssl-config)
* [Shipping over TCP](#tcp-config)
{:.branching-tabs}

<div id="ssl-config">

#### Ship with Logstash over SSL

**Before you begin, you'll need**:
JDK,
[Logstash](https://www.elastic.co/guide/en/logstash/current/installing-logstash.html)

<div class="tasklist">

##### Download the Logz.io certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### _(If needed)_ Install the Lumberjack output plugin

The Lumberjack output plugin is required for SSL shipping.
For most Logstash versions, the plugin is included by default.

To see if Lumberjack output plugin is installed,
`cd` to your [Logstash bin directory](https://www.elastic.co/guide/en/logstash/current/dir-layout.html)
and run this command:

```shell
./logstash-plugin list | grep logstash-output-lumberjack
```

If you see `logstash-output-lumberjack`, skip to step 3.

Otherwise, you'll need to install the plugin.

```shell
./logstash-plugin install logstash-output-lumberjack
```

##### Add Logz.io to your configuration file

Add these code blocks to the end of your existing Logstash configuration file.

Make sure the `mutate` block is the last item in the `filters` block.

{% include log-shipping/replace-vars.html token=true %} \\
{% include log-shipping/replace-vars.html listener=true %}

```conf
filter {
  # ...
  # ...
  mutate {
    add_field => { "token" => "<<SHIPPING-TOKEN>>" }
  }
}

output {
  lumberjack {
    hosts => ["<<LISTENER-HOST>>"]
    port => 5006
    ssl_certificate => "/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt"
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

<div id="tcp-config">

#### Ship with Logstash over TCP

**Before you begin, you'll need**:
JDK,
[Logstash](https://www.elastic.co/guide/en/logstash/current/installing-logstash.html)

<div class="tasklist">

##### Add Logz.io to your configuration file

Add these code blocks to the end of your existing Logstash configuration file.

Make sure the `mutate` block is the last item in the `filters` block.

{% include log-shipping/replace-vars.html token=true %} \\
{% include log-shipping/replace-vars.html listener=true %}

```conf
filters {
  # ...
  # ...
  mutate {
    add_field => { "token" => "<<SHIPPING-TOKEN>>" }
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

</div>
