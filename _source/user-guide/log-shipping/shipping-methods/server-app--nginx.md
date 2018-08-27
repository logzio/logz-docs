---
layout: article
title: nginx log shipping
permalink: /user-guide/log-shipping/shipping-methods/server-app--nginx.html
shipping-summary:
  data-source: nginx
  log-shippers:
    - recommended: Filebeat
    - rsyslog
  os: Linux
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [Filebeat](#filebeat-config)
  * [rsyslog](#rsyslog-config)

<div id="filebeat-config">

## nginx + Filebeat

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/filebeat-templates/master/nginx-filebeat.yml) <br /> [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5015 |
| **Default log locations** |  `/var/log/nginx/access.log` or `/var/log/nginx/error.log` |
| **Log type** <br /> _for automatic parsing_ | Access log: `nginx`, `nginx_access`, or `nginx-access` <br /> Error log: `nginx-error` |

###### Guided configuration

**You'll need:** root access

{: .tasklist }
1. For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

2. Download Logz.io Filebeat configuration to the Filebeat folder. 

    {% include log-shipping/your-account-token.html %}

    ```shell
    sudo curl -o filebeat.yml -s https://raw.githubusercontent.com/logzio/filebeat-templates/master/nginx-filebeat.yml && sudo sed -i 's/LOGZIO-TOKEN/{account-token}/g' ./filebeat.yml

    sudo mv filebeat.yml /etc/filebeat/filebeat.yml
    ```

3. If they're not already running, start Filebeat and nginx.

    ```shell
    sudo systemctl start filebeat

    sudo systemctl start nginx
    ```

4. Confirm you're shipping logs by opening an nginx-hosted webpage in your browser. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


</div>

<div id="rsyslog-config">

## nginx + rsyslog

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-rsyslog-config.conf) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5000 |
| **Default log locations** |  `/var/log/nginx/access.log` or `/var/log/nginx/error.log` |
| **Log type** <br /> _for automatic parsing_ | Access log: `nginx`, `nginx_access`, or `nginx-access` <br /> Error log: `nginx-error` |


###### Guided configuration

**You'll need:** root access

{: .tasklist }
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