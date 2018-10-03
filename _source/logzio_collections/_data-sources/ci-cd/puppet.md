---
layout: article
title: Ship Puppet data
logofile: puppet.png
vertical-logo: true
shipping-summary:
  data-source: Puppet
  log-shippers:
    - Filebeat
  os: Linux
contributors:
  - imnotashrimp
---

## Puppet + Filebeat setup

**You'll need:** [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) 6.x or higher, root access

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br /> [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5015 |
| **Default log location** | _See Puppet docs on [where log files are installed](https://puppet.com/docs/pe/2018.1/what_gets_installed_and_where.html#log-files-installed)_ |
| **Log type** <br /> _for automatic parsing_ | Puppet server: `puppetserver` <br /> Puppet server access: `puppetserver-access`|

###### Guided configuration

{: .tasklist }
1. For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

2. In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Puppet to the filebeat.inputs section.

    <div class="info-box tip">
      We recommend configuring Puppet to output JSON logs. [Read more](https://puppet.com/docs/puppetserver/5.1/config_logging_advanced.html)
    </div>

    {% include log-shipping/your-account-token.html %}

    ```yaml
    filebeat.inputs:
    - type: log
      paths:

      # If you configured Puppet to output JSON logs, replace the filename with
      #  `puppetserver.log.json`
      - /var/log/puppetlabs/puppetserver/puppetserver.log

      fields:

        # If you configured Puppet to output JSON logs, set logzio_codec to
        #  `json`
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: {account-token}
        type: puppetserver
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    - type: log
      paths:

      # If you configured Puppet to output JSON logs, replace the filename with
      #  `puppetserver-access.log.json`
      - /var/log/puppetlabs/puppetserver/puppetserver-access.log

      fields:

        # If you configured Puppet to output JSON logs, set logzio_codec to
        #  `json`
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: {account-token}
        type: puppetserver-access
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

5. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

