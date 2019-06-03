---
title: Ship logs from OSSEC
logo:
  logofile: ossec.png
  orientation: vertical
shipping-summary:
  data-source: OSSEC
contributors:
  - imnotashrimp
  - schwin007
shipping-tags:
  - security
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

Default log locations
: JSON _(recommended)_: `/var/ossec/logs/alerts/alerts.json` \\
  Plain text: `/var/ossec/logs/alerts/alerts.log`

</div>

</div>

###### Guided configuration

**You'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

{: .tasklist .firstline-headline }
1. Configure OSSEC for JSON alert output

    In the OSSEC configuration file (/var/ossec/etc/ossec.conf), find the `<global>` tag.
    Add the `<jsonout_output>` property and set to `yes`.

    ```xml
    <global>
      <jsonout_output>yes</jsonout_output>
    </global>
    ```

    Restart OSSEC.

    ```shell
    sudo /var/ossec/bin/ossec-control restart
    ```

2. Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

3. Add OSSEC as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add OSSEC to the filebeat.inputs section.

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
      - /var/ossec/logs/alerts/alerts.json

      fields:
        logzio_codec: json

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: ossec
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
      - /var/ossec/logs/alerts/alerts.json

      fields:
        logzio_codec: json

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: ossec
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    registry_file: /var/lib/filebeat/registry
    ```

    </div>

    </div>

4. Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
      hosts: ["<LISTENER-URL>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

5. Restart Filebeat

    ```shell
    sudo systemctl restart filebeat
    ```

6. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).