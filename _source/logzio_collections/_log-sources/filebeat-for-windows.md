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


#### Configure Filebeat on Windows

**Before you begin, you'll need**: [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or [Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html) installed as a Windows service


<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

Download the
[Logz.io public certificate]({% include log-shipping/certificate-path.md %})
to `C:\ProgramData\Filebeat\COMODORSADomainValidationSecureServerCA.crt`
on your machine.


##### Configure Filebeat using the dedicated Logz.io configuration wizard

{% include log-shipping/filebeat-wizard.html %}


<!-- logzio-inject:filebeat-wizard:os-windows -->


{% include log-shipping/filebeat-wizard.md %}


{% include log-shipping/validate-yaml.md %}

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

