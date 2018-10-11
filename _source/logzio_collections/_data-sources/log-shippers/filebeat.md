---
layout: article
title: Configure Filebeat
logo:
  logofile: beats.svg
  orientation: vertical
shipping-summary:
  data-source: Configure Filebeat
  hidden: true
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Filebeat
contributors:
  - imnotashrimp
  - amosd92
---

## Setup

**You'll need:** [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) 6.x or higher, root access

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br /> [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5015 |

###### Configuration wizard

{: .tasklist .firstline-headline }
1. Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    **Mac/Linux:**

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

    **Windows:**

    Download the [Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) to your machine. We recommend saving to `C:\ProgramData\Filebeat\COMODORSADomainValidationSecureServerCA.crt`.

2. Make your configuration file

    Make your configuration file using the Filebeat configuration wizard.

    <!-- logzio:filebeat-wizard -->

    {% include log-shipping/in-app-configuration.html toolId="filebeat-wizard" %}

3. Move the configuration file to the Filebeat folder

    **Mac/Linux:** Move the configuration file to `/etc/filebeat/filebeat.yml`.

    **Windows:** Move the configuration file to `C:\Program Files\Filebeat\filebeat.yml`.

4. Restart Filebeat

    **Mac/Linux:**

    ```shell
    sudo systemctl restart filebeat
    ```

    **Windows:**

    ```powershell
    PS C:\Program Files\Filebeat> Restart-Service filebeat
    ```

5. Test your configuration

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
