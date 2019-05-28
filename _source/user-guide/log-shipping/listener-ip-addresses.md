---
layout: article
title: Listener IP addresses
description: If you're having trouble shipping your logs to Logz.io, you may need to open your firewall to Logz.io listener servers. This page contains the Logz.io listener IP addresses so you can do just that.
permalink: /user-guide/log-shipping/listener-ip-addresses.html
show-date: false
tags:
  - log-shipping
contributors:
  - imnotashrimp
  - schwin007
---

<div class="rss-button">
  [<i class="fas fa-rss"></i> Subscribe for updates]({{site.baseurl}}/listener-ip-addresses.xml)
</div>

If you're having trouble shipping your logs to Logz.io, you may need to open your firewall to Logz.io listener servers. To see if you need to change your firewall configuration, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

<div class="info-box note">
  Ship logs to the listener URL, not to individual IP addresses.
  This ensures that logs are properly balanced on our listener servers,
  and that your logs will be available to you as quickly as possible.
</div>

{% for r in site.data.logzio-regions -%}
  {%- assign attribs = r[1] -%}
  {%- case attribs.suffix -%}
    {%- when false -%}
      {%- assign suffix = "" -%}
    {%- else -%}
      {%- assign suffix = r[0] | prepend: "-" -%}
  {%- endcase %}

#### listener{{suffix}}.logz.io — _{{attribs.title}}, {{attribs.cloud}}_

If you're shipping logs to listener{{suffix}}.logz.io, open your firewall to these {{attribs.cloud}} IP addresses:

{% assign sortedIPs = attribs.listener-ips | sort -%}
{%- for ip in sortedIPs %}
* {{ip}}
{%- endfor %}
{% endfor %}