---
layout: article
title: nginx + rsyslog log shipping
permalink: /user-guide/log-shipping/shipping-methods/server-app--nginx-rsyslog.html
contributors:
  - imnotashrimp
---

<div class="shipping-summary">
<div>
  Data source <span>nginx</span>
</div>
<div>
  Shipper <span>rsyslog</span>
</div>
<div>
  OS <span>Linux</span>
</div>
</div>

<div class="branching-container">

{: .branching-tabs }
* [Manual configuration](#manual)
* [Guided configuration](#guided)


<div id="manual">

### Manual configuration

If you're manually configuring log shipping, use these details to route your logs to your account.

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-rsyslog-config.conf) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5000 |
| **Default log location** | `/var/log/nginx/access.log` |
| **Log type** <br /> _for automatic parsing_ | Access log: `nginx`, `nginx_access`, or `nginx-access` <br /> Error log: `nginx-error` |

</div>


<div id="guided">

### Guided configuration

**Requirements:** root access

1. Run the Logz.io rsyslog configuration script.

    {% include log-shipping/your-account-token.html %}

    {% include log-shipping/your-listener-url.html %}

    ```shell
    curl -sLO https://github.com/logzio/logzio-rsyslog/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t nginx -a "{account-token}" -l "{listener-url}"
    ```

2. Confirm you're shipping logs by opening an nginx-hosted webpage in your browser. Give your logs a few minutes to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
</div>