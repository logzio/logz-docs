---
layout: article
title: Apache + rsyslog log shipping
permalink: /user-guide/log-shipping/shipping-methods/server-app--apache-rsyslog.html
contributors:
  - imnotashrimp
---

<div class="shipping-summary">
<div>
  Data source <span>Apache HTTPS Server 2 (httpd)</span>
</div>
<div>
  Shipper <span>rsyslog</span>
</div>
<div>
  OS <span>macOS or Linux</span>
</div>
</div>

<div class="info-box note">
  We recommend [using Filebeat](server-app--apache-filebeat.html) to ship your logs.
</div>

## Manual configuration

If you're manually configuring log shipping, use these details to route your to your account.

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-rsyslog-config.conf) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5000 |
| **Default log location** | Ubuntu, Debian: `/var/log/apache2/access.log` <br /> macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log` |
| **Log type** <br /> _for automatic parsing_ | `apache`, `apache_access`, or `apache-access` |

## Guided configuration

**Requirements:** root access

1. Run the Logz.io rsyslog configuration script.

    {% include log-shipping/your-account-token.html %}

    {% include log-shipping/your-listener-url.html %}

    ```shell
    curl -sLO https://github.com/logzio/logzio-rsyslog/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t apache -a "{account-token}" -l "{listener-url}"
    ```

2. Confirm you're shipping logs by opening an Apache-hosted webpage in your browser. Give your logs a few minutes to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).