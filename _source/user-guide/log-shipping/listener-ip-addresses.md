---
layout: article
title: Listener IP addresses
description: If you're having trouble shipping your logs to Logz.io, you may need to open your firewall to Logz.io listener servers. This page contains the Logz.io listener IP addresses so you can do just that.
permalink: /user-guide/log-shipping/listener-ip-addresses.html
show-date: false
flags:
  rss-subscribe: /listener-ip-addresses.xml
tags:
  - log-shipping
contributors:
  - imnotashrimp
  - schwin007
---

If you're having trouble shipping your logs to Logz.io, you may need to open your firewall to Logz.io listener servers. To see if you need to change your firewall configuration, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

Ship logs to the listener URL, not to individual IP addresses.
This ensures that logs are properly balanced on our listener servers,
and that your logs will be available to you as quickly as possible.
{:.info-box.note}

On this page
{:.inline-header}

* toc list
{:toc}

{% for r in site.data.logzio-regions -%}
  {%- if r.suffix -%}
      {%- assign suffix = r.suffix | prepend: "-" -%}
    {%- else -%}
      {%- assign suffix = "" -%}
  {%- endif %}

## listener{{suffix}}.logz.io — _{{r.title}}, {{r.cloud}}_

If you're shipping logs to listener{{suffix}}.logz.io, open your firewall to these {{r.cloud}} IP addresses:

{% assign sortedIPs = r.listener-ips | sort -%}
{%- for ip in sortedIPs %}
* {{ip}}
{%- endfor %}
{% endfor %}