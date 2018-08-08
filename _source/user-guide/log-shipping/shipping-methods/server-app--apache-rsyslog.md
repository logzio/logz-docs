---
layout: article
title: Apache-rsyslog log shipping
permalink: /user-guide/log-shipping/shipping-methods/server-app--apache-rsyslog.html
contributors:
  - imnotashrimp
---

<div class="info-box tip">
  We recommend [using Filebeat to ship your logs]({{site.baseurl}}/user-guide/log-shipping/shipping-methods/server-app--apache-filebeat.html).
</div>

##### Requirements

* You have sudo access
* You can send outgoing traffic to destination port 5000

###### Configure rsyslog to ship Apache logs

1. Configure rsyslog to monitor Apache files. 

    {% include your-account-token.html %}

    ```shell
    curl -sLO https://github.com/logzio/logzio-shipper/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t apache -a "{your-account-token}"
    ```

2. If it's not already running, start Apache.

    ```shell
    sudo service apache2 start
    ```

3. Confirm you're shipping logs by opening an Apache-hosted webpage in your browser. Give your logs a minute to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).