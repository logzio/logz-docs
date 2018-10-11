---
layout: article
title: Ship Jenkins logs
logo:
  logofile: jenkins.png
  orientation: vertical
shipping-summary:
  data-source: Jenkins
  log-shippers:
    - Filebeat
  os: Linux
contributors:
  - amosd92
  - imnotashrimp
---

## Jenkins + Filebeat setup

**You'll need:** [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) 6.x or higher, root access

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br /> [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5015 |
| **Default log location** | `/var/log/jenkins/jenkins.log` |
| **Log type** <br /> _for automatic parsing_ | `jenkins` |

###### Guided configuration

{: .tasklist .firstline-headline }
1. Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

2. Add Jenkins as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Jenkins to the filebeat.inputs section.

    {% include log-shipping/your-account-token.html %}

    ```yaml
    filebeat.inputs:
    - type: log
      paths:
      - /var/log/jenkins/jenkins.log
      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: {account-token}
        type: jenkins
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h
      multiline:
        pattern: '^[A-Z]{1}[a-z]{2} {1,2}[0-9]{1,2}, [0-9]{4} {1,2}[0-9]{1,2}:[0-9]{2}:[0-9]{2}'
        negate: true
        match: after

    registry_file: /var/lib/filebeat/registry
    ```

3. Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/your-listener-url.html %}

    ```yaml
    output.logstash:
      hosts: ["{listener-url}:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

4. Restart Filebeat

    ```shell
    sudo systemctl restart filebeat
    ```

5. Test your configuration

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

