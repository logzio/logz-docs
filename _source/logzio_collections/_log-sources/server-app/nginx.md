---
title: Ship nginx logs
logo:
  logofile: nginx.svg
  orientation: horizontal
shipping-summary:
  data-source: nginx
  log-shippers:
    - recommended: Filebeat
    - rsyslog
  os: Linux
contributors:
  - amosd92
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [Filebeat <span class="sm ital">(recommended)</span>](#filebeat-config)
  * [rsyslog](#rsyslog-config)

<div id="filebeat-config">

## nginx + Filebeat setup

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
: `/var/log/nginx/access.log` or `/var/log/nginx/error.log`

Log type _\(for preconfigured parsing\)_
: Access log: `nginx`, `nginx_access`, or `nginx-access` \\
  Error log: `nginx-error`

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

2. Add nginx as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add nginx to the filebeat.inputs section.

    {% include log-shipping/replace-vars.html token=true %}

    ```yaml
    filebeat.inputs:
    - type: log
      paths:
      - /var/log/nginx/access.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: nginx_access
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    - type: log
      paths:
      - /var/log/nginx/error.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: nginx_error
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
      hosts: ["<LISTENER-URL>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

4. Restart Filebeat

    ```shell
    sudo systemctl restart filebeat
    ```

5. Check Logz.io for your logs

    Confirm you're shipping logs by opening an nginx-hosted webpage in your browser. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


</div>

<div id="rsyslog-config">

## nginx + rsyslog setup

Click _Configuration at a glance_ if you just need the quick details, or see _Guided configuration_ for step-by-step instructions.

<div class="accordion">

### Configuration at a glance

<div>

Files
: [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-rsyslog-config.conf)

Listener
: Port 5000.
  For help finding your region's listener URL, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

Default log locations
: `/var/log/nginx/access.log` or `/var/log/nginx/error.log`

Log type _\(for preconfigured parsing\)_
: Access log: `nginx`, `nginx_access`, or `nginx-access` \\
  Error log: `nginx-error`

</div>

</div>

###### Guided configuration

**You'll need:** root access

{: .tasklist .firstline-headline }
1. Run the rsyslog configuration script

    {% include log-shipping/replace-vars.html token=true listener=true %}

    ```shell
    curl -sLO https://github.com/logzio/logzio-rsyslog/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t nginx -a "<ACCOUNT-TOKEN>" -l "<LISTENER-URL>"
    ```

1. Check Logz.io for your logs

    Confirm you're shipping logs by opening an nginx-hosted webpage in your browser. Give your logs a few minutes to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>