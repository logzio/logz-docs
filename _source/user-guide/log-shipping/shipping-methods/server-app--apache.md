---
layout: article
title: Ship Apache data
permalink: /user-guide/log-shipping/shipping-methods/server-app--apache.html
shipping-summary:
  data-source: Apache HTTPS Server 2
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

## Apache + Filebeat setup

**You'll need:** [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) 6.x or higher, root access

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br /> [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
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

2. In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Apache to the filebeat.inputs section.

    {% include log-shipping/your-account-token.html %}

    ```yaml
    filebeat.inputs:
    - type: log

      paths:
      # Ubuntu, Debian: `/var/log/apache2/access.log`
      #  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log`
      - /var/log/apache2/access.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: {account-token}
        type: apache_access
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    - type: log

      paths:
      # Ubuntu, Debian: `/var/log/apache2/error.log`
      #  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/error_log`
      - /var/log/apache2/error.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: {account-token}
        type: apache_error
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    registry_file: /var/lib/filebeat/registry
    ```

3. If Logz.io is not an output, add it now.

    {% include log-shipping/your-listener-url.html %}

    ```yaml
    output.logstash:
      hosts: ["{listener-url}:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

4. Restart Filebeat.

    ```shell
    sudo systemctl restart filebeat
    ```

4. Confirm you're shipping logs by opening an Apache-hosted webpage in your browser.
Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="rsyslog-config">

## Apache + rsyslog setup

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

2. Confirm you're shipping logs by opening an Apache-hosted webpage in your browser.
  Give your logs a few minutes to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>