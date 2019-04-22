---
title: Ship Puppet logs
logo:
  logofile: puppet.png
  orientation: vertical
shipping-summary:
  data-source: Puppet
contributors:
  - amosd92
  - imnotashrimp
---

## Setup

<div class="accordion">

### Configuration tl;dr

<div>

Files
: [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) \\
  [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt)

Listener
: Port 5015.
  For help finding your region's listener URL, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

Default log location
: _Puppet produces lots of different logs._
  _See [Log files installed](https://puppet.com/docs/pe/2018.1/what_gets_installed_and_where.html#log-files-installed) from Puppet Labs for more information._

Log type _\(for preconfigured parsing\)_
: Puppet server: `puppetserver` \\
  Puppet server access: `puppetserver-access`

</div>

</div>

###### Guided configuration

**You'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

{: .tasklist .firstline-headline }
1. Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

2. Add Puppet as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Puppet to the filebeat.inputs section.

    <div class="info-box tip">
      We recommend configuring Puppet to output JSON logs.
      See [Advanced Logging Configuration](https://puppet.com/docs/puppetserver/5.1/config_logging_advanced.html) from Puppet for more information.
    </div>

    {% include log-shipping/replace-vars.html token=true %}

    <div class="branching-container">

    {: .branching-tabs }
    * [Filebeat 7](#filebeat-7-code)
    * [Filebeat 6](#filebeat-6-code)

    <div id="filebeat-7-code">

    ```yaml
    # Filebeat 7 configuration

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
        token: <ACCOUNT-TOKEN>
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
        token: <ACCOUNT-TOKEN>
        type: puppetserver-access
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    filebeat.registry.path: /var/lib/filebeat
    processors:
    - rename:
        fields:
        - from: "agent"
          to: "filebeat_agent"
        ignore_missing: true
    - rename:
        fields:
        - from: "log.file.path"
          to: "source"
        ignore_missing: true
    ```

    </div>

    <div id="filebeat-6-code">

    ```yaml
    # Filebeat 6 configuration

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
        token: <ACCOUNT-TOKEN>
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
        token: <ACCOUNT-TOKEN>
        type: puppetserver-access
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    registry_file: /var/lib/filebeat/registry
    ```

    </div>

    </div>

1. Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
      hosts: ["<LISTENER-URL>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

2. Restart Filebeat

    ```shell
    sudo systemctl restart filebeat
    ```

3. Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).