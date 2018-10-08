---
layout: article
title: Ship Linux logs
logo:
  logofile: linux.svg
  orientation: vertical
shipping-summary:
  data-source: Linux
  log-shippers:
    - rsyslog
contributors:
  - imnotashrimp
---

## Linux + rsyslog setup

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-rsyslog-config.conf) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5000 |
| **Default log location** | `/var/log/` |
| **Log type** <br /> _for automatic parsing_ | `syslog` |

###### Guided configuration

**You'll need:** root access

{: .tasklist }
1. Run the Logz.io rsyslog configuration script.

    {% include log-shipping/your-account-token.html %}

    {% include log-shipping/your-listener-url.html %}

    ```shell
    curl -sLO https://github.com/logzio/logzio-shipper/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t linux -a "{account-token}" -l "{listener-url}"
    ```

2. Confirm you're shipping logs by opening an Apache-hosted webpage in your browser.
  Give your logs a few minutes to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).