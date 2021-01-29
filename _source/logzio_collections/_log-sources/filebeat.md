---
title: Shipping with Filebeat
logo:
  logofile: beats.svg
  orientation: vertical
data-source: Filebeat for macOS/Linux
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


#### Configure Filebeat on macOS or Linux

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)


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

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
