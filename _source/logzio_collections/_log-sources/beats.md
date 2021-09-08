---
title: General guide to shipping logs with Beats
short-description: This document describes the way to get logs from your system to Logz.io using any of the Beats shippers 
logo:
  logofile: beats.svg
  orientation: vertical
data-source: Beats
shipping-tags:
  - log-shipper
  - beats
  - intro to beats
description: This document describes the way to get logs from your system to Logz.io using any of the Beats shippers.
logzio-app-url: https://app.logz.io/#/dashboard/send-your-data/log-sources/beats
contributors:
  - imnotashrimp
  - amosd92
  - shalper
  - nshishkin
shipping-tags:
  - agents
  - popular
order: 10
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Beats for macOS and Linux](#linux)
* [Beats for Windows](#windows)
{:.branching-tabs}

<!-- tab:start -->
<div id="linux">

This document describes the way to get logs from your system to Logz.io using any of the Beats shippers.

#### Configure your Beats shipper on macOS or Linux

**Before you begin, you'll need**:

* Any Beats shipper installed on your machine. This includes [Filebeat](https://docs.logz.io/shipping/log-sources/filebeat.html), Auditbeat, Functionbeat, Heartbeat, Journalbeat, Metricbeat or Packetbeat. Logz.io recommends that you use the latest stable version.
* Destination port 5015 open to outgoing traffic.


<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Configure your Beats shipper using the configuration file.

1. Open the configuration file for your Beats shipper.
2. Add the following to the inputs section:

   ```yml
     fields:
       logzio_codec: <plain> or <json>
       token: <<LOG-SHIPPING-TOKEN>>
       type: <LOGTYPE>
     fields_under_root: true
     encoding: utf-8
     ignore_older: 3h
   ```

3. Specify the log file format in the `logzio_codec` field. It can be `plain` or `json`.
4. Specify your Logz.io log shipping token in the `token` field. You can see the token by navigating to your Logz.io account and selecting **Settings > Manage tokens > Data shipping tokens**.
5. Select the log type from the list or select **Other** and give it a name of your choice to specify a custom log type.
   * If you select a log type from the list, the logs will be automatically parsed and analyzed. [List of types available for parsing by default](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html).
   * If you select **Other**, contact support to request custom parsing assistance. Don’t be shy, it’s included in your plan!
6. Add the following to the outputs section:

   ```yml
   output:
     logstash:
       hosts: ["<<LISTENER-HOST>>:5015"]  
       ssl:
         certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
   ```
7. {% include log-shipping/listener-var.html %}
8. Save the changes.

##### Validate the configuration file

It's a good idea to run the configuration file through a YAML validator to rule out indentation errors, clean up extra characters, and check if your YAML file is valid. [Yamllint.com](http://www.yamllint.com) is a great choice.

##### Start your Beats shipper

Start or restart your Beats shipper for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="windows">

This document describes the way to get logs from your system to Logz.io using any of the Beats shippers.

#### Configure your Beats shipper on Windows

**Before you begin, you'll need**: 

* Any Beats shipper installed on your machine. This includes [Filebeat](https://docs.logz.io/shipping/log-sources/filebeat.html), Auditbeat, Functionbeat, Heartbeat, Journalbeat, Metricbeat, Packetbeat or [Winlogbeat](https://docs.logz.io/shipping/log-sources/windows.html). Logz.io recommends that you use the latest stable version.
* Destination port 5015 open to outgoing traffic.

<div class="tasklist">

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

Download the
[Logz.io public certificate]({% include log-shipping/certificate-path.md %})
to `C:\ProgramData\<YOUR SHIPPER NAME>\Logzio.crt`
on your machine.


##### Configure your Beats shipper using the dedicated Logz.io configuration wizard

{% include log-shipping/filebeat-wizard.html %}


##### Configure your Beats shipper using the configuration file.

1. Open the configuration file for your Beats shipper.
2. Add the following to the inputs section:

   ```yml
     fields:
       logzio_codec: <plain> or <json>
       token: <<LOG-SHIPPING-TOKEN>>
       type: <LOGTYPE>
     fields_under_root: true
     encoding: utf-8
     ignore_older: 3h
   ```

3. Specify the log file format in the `logzio_codec` field. It can be `plain` or `json`.
4. Specify your Logz.io log shipping token in the `token` field. You can see the token by navigating to your Logz.io account and selecting **Settings > Manage tokens > Data shipping tokens**.
5. Select the log type from the list or select **Other** and give it a name of your choice to specify a custom log type.
   * If you select a log type from the list, the logs will be automatically parsed and analyzed. [List of types available for parsing by default](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html).
   * If you select **Other**, contact support to request custom parsing assistance. Don’t be shy, it’s included in your plan!
6. Add the following to the outputs section:

   ```yml
   output:
     logstash:
       hosts: ["<<LISTENER-HOST>>:5015"]  
       ssl:
         certificate_authorities: ['C:\ProgramData\<YOUR SHIPPER NAME>\Logzio.crt']
   ```


7. {% include log-shipping/listener-var.html %}
8. Save the changes.

##### Validate the configuration file

It's a good idea to run the configuration file through a YAML validator to rule out indentation errors, clean up extra characters, and check if your YAML file is valid. [Yamllint.com](http://www.yamllint.com) is a great choice.


##### Start your Beats shipper

Start or restart your Beats shipper for the changes to take effect.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>



</div>
<!-- tab:end -->

