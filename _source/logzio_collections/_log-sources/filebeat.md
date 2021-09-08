---
title: General guide to shipping logs with Filebeat
short-description: Filebeat is usually the best and easiest way to ship logs to Logz.io. It's a lightweight open source agent that collects and ships your logs to Logz.io. 
logo:
  logofile: beats.svg
  orientation: vertical
data-source: Filebeat
shipping-tags:
  - log-shipper
  - filebeat
  - intro to filebeat
description: Filebeat is often the easiest way to get logs from your system to Logz.io. Logz.io has a dedicated configuration wizard to make it simple to configure Filebeat. If you already have Filebeat and you want to add new sources, check out our other shipping instructions to copy&paste just the relevant changes from our code examples.
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/filebeat
contributors:
  - imnotashrimp
  - amosd92
  - shalper
shipping-tags:
  - agents
  - popular
order: 10
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Filebeat for Linux](#linux)
* [Filebeat for Windows](#windows)
{:.branching-tabs}

<!-- tab:start -->
<div id="linux">

Filebeat is often the easiest way to get logs from your system to Logz.io. Logz.io has a dedicated configuration wizard to make it simple to configure Filebeat. If you already have Filebeat and you want to add new sources, check out our other shipping instructions to copy&paste just the relevant changes from our code examples.

#### Configure Filebeat on macOS or Linux

**Before you begin, you'll need**:


{% include /log-shipping/filebeat-installed-port5015-begin.md %}{% include /log-shipping/filebeat-installed-port5015-end.md %}


<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Configure Filebeat using the dedicated Logz.io configuration wizard

{% include log-shipping/filebeat-wizard.html %}

<!-- logzio-inject:filebeat-wizard:os-linux -->


{% include log-shipping/filebeat-wizard.md %}


{% include log-shipping/validate-yaml.md %}


##### Move the configuration file to the Filebeat folder

Move your configuration file to `/etc/filebeat/filebeat.yml`.

##### Start Filebeat

[Start or restart Filebeat](https://www.elastic.co/guide/en/beats/filebeat/master/filebeat-starting.html) for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="windows">

Filebeat is often the easiest way to get logs from your system to Logz.io. Logz.io has a dedicated configuration wizard to make it simple to configure Filebeat. If you already have Filebeat and you want to add new sources, check out our other shipping instructions to copy & paste just the relevant changes from our code examples.


#### Configure Filebeat on Windows

**Before you begin, you'll need**: 


{% include /log-shipping/filebeat-installed-port5015-begin.md %} installed as a Windows service{% include /log-shipping/filebeat-installed-port5015-end.md %}




<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

Download the
[Logz.io public certificate]({% include log-shipping/certificate-path.md %})
to `C:\ProgramData\Filebeat\Logzio.crt`
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



</div>
<!-- tab:end -->

