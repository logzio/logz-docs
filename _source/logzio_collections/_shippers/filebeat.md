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

<details>

<summary>
Configuration tl;dr
</summary>

| Item | Description |
|---|---|
| Files | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br> [New public certificate (_active from May 27, 2020_)](https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt) <br> [Public certificate (_expires May 26, 2020_)](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| Listener | Port 5015. For help finding your region's listener host, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). |
{:.paramlist}

</details>

#### Guided configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)

<div class="branching-container">

* [macOS/Linux](#mac-linux-config)
* [Windows](#windows-config)
{:.branching-tabs}

<div id="mac-linux-config">

#### Configure Filebeat on macOS or Linux

<div class="tasklist">

##### Download the Logz.io public certificate

Starting May 26, 2020, we'll be transitioning our listener servers
to a new public certificate.
To make sure your shipped data arrives at your account,
we recommend using both the old and new certificates
as soon as possible,
and including both certificates in your Filebeat configuration.
After June 1, 2020, you can safely remove the old certificate.
{:.info-box.important}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Make your configuration file

Make your configuration file using the Filebeat configuration wizard.

<!-- logzio-inject:filebeat-wizard -->

{% include log-shipping/in-app-configuration.html toolId="filebeat-wizard" %}

##### Move the configuration file to the Filebeat folder

Move the configuration file to `/etc/filebeat/filebeat.yml`.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>

<div id="windows-config">

#### Configure Filebeat on Windows

<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

Download the [Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) to your machine. We recommend saving to `C:\ProgramData\Filebeat\COMODORSADomainValidationSecureServerCA.crt`.

##### Make your configuration file

Make your configuration file using the Filebeat configuration wizard.

<!-- logzio-inject:filebeat-wizard -->

{% include log-shipping/in-app-configuration.html toolId="filebeat-wizard" %}

##### Move the configuration file to the Filebeat folder

Move the configuration file to `C:\Program Files\Filebeat\filebeat.yml`.

##### Restart Filebeat

```powershell
PS C:\Program Files\Filebeat> Restart-Service filebeat
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
