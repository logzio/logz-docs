---
layout: article
title: nginx + rsyslog log shipping
permalink: /user-guide/log-shipping/shipping-methods/server-app--nginx-rsyslog.html
contributors:
  - imnotashrimp
---

{: .summary-table }
| Data source <span>nginx</span> | Shipper <span>rsyslog</span> | OS <span>Linux</span> |

<div class="info-box note">
  We recommend [using Filebeat](server-app--nginx-filebeat.html) to ship your logs.
</div>

## Manual configuration

If you're manually configuring log shipping, use these details to route your to your account.

| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5000 |
| **Default log location** | `/var/log/nginx/access.log` |
| **Log type** <br /> (for automatic parsing) | Access log: `nginx`, `nginx_access`, or `nginx-access` <br /> Error log: `nginx-error` |
| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-rsyslog-config.conf) |

## Guided configuration

**Requirements:** root access

1. Run the Logz.io rsyslog configuration script.

    {% include log-shipping/your-account-token.html %}

    {% include log-shipping/your-listener-url.html %}

    ```shell
    curl -sLO https://github.com/logzio/logzio-rsyslog/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t nginx -a "{account-token}" -l "{listener-url}"
    ```

2. Confirm you're shipping logs by opening an nginx-hosted webpage in your browser. Give your logs a minute to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).