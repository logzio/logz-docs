---
title: Ship Zeek logs
logo:
  logofile: zeek.png
  orientation: vertical
data-source: Zeek
contributors:
  - imnotashrimp
shipping-tags:
  - security
---

## Setup

###### Guided configuration

**You'll need**:
Zeek or Bro,
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html),
root access

1.  Configure Zeek to output JSON logs

    The configuration filepath changes
    depending on your version of Zeek or Bro.
    For this reason, see your installation's [documentation](https://www.zeek.org/documentation/)
    if you need help finding the file.

    If you're running Bro (Zeek's predecessor),
    the configuration filename will be `ascii.bro`.
    Otherwise, the filename is `ascii.zeek`.

    In the configuration file,
    find the line that begins `const use_json`.
    Set the value to `T` (true).

    ```
    const use_json = T &redef;
    ```

2.  Download the Logz.io certificate

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

3.  Add Zeek as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Zeek to the filebeat.inputs section.

    {% include log-shipping/replace-vars.html token=true %}

    ```yaml
    # ...
    filebeat.inputs:
    - type: log

      # The path to your logs can change depending on your version and configuration.
      # To find it, run zeekctl config
      # sudo ./zeekctl config | grep logdir
      paths:
      - /var/log/bro/current/conn.log
      - /var/log/bro/current/ssh.log
      - /var/log/bro/current/rdp.log
      - /var/log/bro/current/ssl.log
      - /var/log/bro/current/smb.log
      - /var/log/bro/current/dpd.log
      - /var/log/bro/current/dns.log
      - /var/log/bro/current/http.log

      fields:
        logzio_codec: json

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <<SHIPPING-TOKEN>>
        type: zeek
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    - type: log
      paths:
        - /var/log/bro/current/notice.log
      fields:
        logzio_codec: json
        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <<SHIPPING-TOKEN>>
        type: zeek_alert
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h
    ```

    If you're running Filebeat 7, paste this code block.
    Otherwise, you can leave it out.

    ```yaml
    # ... For Filebeat 7 only ...
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

    If you're running Filebeat 6, paste this code block.

    ```yaml
    # ... For Filebeat 6 only ...
    registry_file: /var/lib/filebeat/registry
    ```

4.  Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    # ...
    output.logstash:
      hosts: ["<<LISTENER-HOST>>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

5.  Start Filebeat

    Start or restart Filebeat for the changes to take effect.

6.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}
