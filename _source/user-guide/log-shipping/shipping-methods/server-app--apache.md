---
layout: article
title: Apache log shipping
permalink: /user-guide/log-shipping/shipping-methods/server-app--apache.html
shipping-summary:
  data-source: Apache HTTPS Server 2 (httpd)
  log-shippers:
    - recommended: Filebeat
    - rsyslog
  os: macOS or Linux
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [Filebeat](#filebeat-config)
  * [rsyslog](#rsyslog-config)

<div id="filebeat-config">

## Apache + Filebeat


###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/filebeat-templates/master/apache-filebeat.yml) <br /> [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5015 |
| **Default log locations** |  Ubuntu, Debian: `/var/log/apache2/access.log` <br /> macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log` |
| **Log type** <br /> _for automatic parsing_ | `apache`, `apache_access`, or `apache-access` |

###### Guided configuration

{: .tasklist }
1. For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

2. Download the Logz.io Filebeat configuration to the Filebeat folder.

    {% include log-shipping/your-account-token.html %}

    ```shell
    sudo curl -o filebeat.yml -s https://raw.githubusercontent.com/logzio/filebeat-templates/master/apache-filebeat.yml && sudo sed -i 's/LOGZIO-TOKEN/{account-token}/g' ./filebeat.yml

    sudo mv filebeat.yml /etc/filebeat/filebeat.yml
    ```

3. If they're not already running, start Filebeat and Apache.

    ```shell
    sudo systemctl start filebeat

    sudo service apache2 start
    ```

4. Confirm you're shipping logs by opening an Apache-hosted webpage in your browser. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="rsyslog-config">

## Apache + rsyslog

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-rsyslog-config.conf) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5000 |
| **Default log location** | Ubuntu, Debian: `/var/log/apache2/access.log` <br /> macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log` |
| **Log type** <br /> _for automatic parsing_ | `apache`, `apache_access`, or `apache-access` |

###### Guided configuration

**You'll need:** root access

{: .tasklist }
1. Run the Logz.io rsyslog configuration script.

    {% include log-shipping/your-account-token.html %}

    {% include log-shipping/your-listener-url.html %}

    ```shell
    curl -sLO https://github.com/logzio/logzio-rsyslog/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t apache -a "{account-token}" -l "{listener-url}"
    ```

2. Confirm you're shipping logs by opening an Apache-hosted webpage in your browser. Give your logs a few minutes to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>