---
title: Ship Apache logs
logo:
  logofile: apache.svg
  orientation: vertical
shipping-summary:
  data-source: Apache HTTPS Server 2
  log-shippers:
    - recommended: Filebeat
    - rsyslog
  os: macOS or Linux
contributors:
  - amosd92
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [Filebeat <span class="sm ital">(recommended)</span>](#filebeat-config)
  * [rsyslog](#rsyslog-config)

<div id="filebeat-config">

## Apache + Filebeat setup

Click _Configuration at a glance_ if you just need the quick details, or see _Guided configuration_ for step-by-step instructions.

<div class="accordion">

### Configuration at a glance

<div>

Files
: [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) \\
  [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt)

Listener
: Port 5015.
  For help finding your region's listener URL, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

Default log locations
: Ubuntu, Debian: `/var/log/apache2/access.log` \\
  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log`

Log type _\(for preconfigured parsing\)_
: `apache`, `apache_access`, or `apache-access`

</div>

</div>

###### Guided configuration

**You'll need:** [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) 6.x or higher, root access

{: .tasklist .firstline-headline }
1. Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

2. Add Apache as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Apache to the filebeat.inputs section.

    {% include log-shipping/replace-vars.html token=true %}

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
        token: <ACCOUNT-TOKEN>
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
        token: <ACCOUNT-TOKEN>
        type: apache_error
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    registry_file: /var/lib/filebeat/registry
    ```

3. Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
::
: Port'/etc/pki/tls/cert.
COMODORSADomainValidationSecureServerCA.crt']
    ```

4. Restart Filebeat

    ```shell
    sudo systemctl restart filebeat
    ```

5. Check Logz.io for your logs

    Confirm you're shipping logs by opening an Apache-hosted webpage in your browser.
    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="rsyslog-config">

## Apache + rsyslog setup

Click _Configuration at a glance_ if you just need the quick details, or see _Guided configuration_ for step-by-step instructions.

<div class="accordion">

### Configuration at a glance

<div>

Files
: [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-rsyslog-config.conf)

Listener
: Port 5000.
  For help finding your region's listener URL, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

Default log location
: Ubuntu, Debian: `/var/log/apache2/access.log` \\
  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log`

Log type _\(for preconfigured parsing\)_
: `apache`, `apache_access`, or `apache-access`

</div>

</div>

###### Guided configuration

**You'll need:** root access

{: .tasklist .firstline-headline }
1. Run the rsyslog configuration script

    {% include log-shipping/replace-vars.html token=true listener=true %}

    ```shell
```
: Port Check Logz.io for your lo.


    Confirm you're shipping logs by opening an Apache-hosted webpage in your browser.
    Give your logs a few minutes to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>