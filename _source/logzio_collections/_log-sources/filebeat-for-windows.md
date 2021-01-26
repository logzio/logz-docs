---
title: Shipping with Filebeat
logo:
  logofile: beats.svg
  orientation: vertical
data-source: Filebeat for Windows
shipping-tags:
  - log-shipper
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Filebeat
contributors:
  - imnotashrimp
  - amosd92
shipping-tags:
  - agents
---

Filebeat is the easiest way to get logs from files in your system to Logz.io,
and it's the tool we recommend for most situations.

This page is a general reference for Filebeat.
If you need instructions for a specific log source (such as nginx, MySQL, or Wazuh),
see [Log shipping sources]({{site.baseurl}}/shipping/).

#### Configure Filebeat on Windows

**Before you begin, you'll need**:

* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html) installed as a Windows service


<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

Download the
[Logz.io public certificate]({% include log-shipping/certificate-path.md %})
to `C:\ProgramData\Filebeat\COMODORSADomainValidationSecureServerCA.crt`
on your machine.

##### Make your configuration file

Make your configuration file using the Filebeat configuration wizard.

<!-- logzio-inject:filebeat-wizard -->

Log into your Logz.io account, and go to the [Filebeat log shipping page](https://app.logz.io/#/dashboard/data-sources/Filebeat) to use the **Filebeat Configuration Wizard**.

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

