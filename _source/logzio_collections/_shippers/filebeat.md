---
title: Shipping with Filebeat
logo:
  logofile: beats.svg
  orientation: vertical
data-source: Filebeat
shipping-tags:
  - log-shipper
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Filebeat
contributors:
  - imnotashrimp
  - amosd92
---

## Setup

Filebeat is the easiest way to get logs from files in your system to Logz.io,
and it's the tool we recommend for most situations.

This page is a general reference for Filebeat.
If you need instructions for a specific log source (such as nginx, MySQL, or Wazuh),
see [Log shipping sources]({{site.baseurl}}/shipping/).

###### Configuration tl;dr

Files
: [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) \\
  [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt)

Listener
: Port 5015.
  For help finding your region's listener host, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

###### Guided configuration

**You'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)

<div class="branching-container">

* [Mac/Linux](#mac-linux-config)
* [Windows](#windows-config)
{:.branching-tabs}

<div id="mac-linux-config">

1.  Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

2.  Make your configuration file

    Make your configuration file using the Filebeat configuration wizard.

    <!-- logzio-inject:filebeat-wizard -->

    {% include log-shipping/in-app-configuration.html toolId="filebeat-wizard" %}

3.  Move the configuration file to the Filebeat folder

    Move the configuration file to `/etc/filebeat/filebeat.yml`.

4.  Start Filebeat

    Start or restart Filebeat for the changes to take effect.

5.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}

</div>

<div id="windows-config">

1.  Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    Download the [Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) to your machine. We recommend saving to `C:\ProgramData\Filebeat\COMODORSADomainValidationSecureServerCA.crt`.

2.  Make your configuration file

    Make your configuration file using the Filebeat configuration wizard.

    <!-- logzio-inject:filebeat-wizard -->

    {% include log-shipping/in-app-configuration.html toolId="filebeat-wizard" %}

3.  Move the configuration file to the Filebeat folder

    Move the configuration file to `C:\Program Files\Filebeat\filebeat.yml`.

4.  Restart Filebeat

    ```powershell
    PS C:\Program Files\Filebeat> Restart-Service filebeat
    ```

5.  Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}

</div>