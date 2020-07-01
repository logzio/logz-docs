---
title: Ship OpenVAS logs
logo:
  logofile: greenbone_icon.png
  orientation: vertical
data-source: OpenVAS
templates: ["network-device-filebeat"]
contributors:
  - moshekruger
shipping-tags:
  - security
---

OpenVAS reporting allows you to create a report from one or more OpenVAS/Greenbone XML reports. 

OpenVAS reports are typically generated manually, as needed. There are also third-party tools for scheduling OpenVAS to generate reports automatically.

The following instructions show you how to configure Filebeat to automatically send OpenVAS reports to Logz.io. 

###### On this page
{:.no_toc}

1. toc list
{:toc}

#### Step by step
{:.no_toc}

**Before you begin, you'll need**:

* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) 
* root access

<div class="tasklist">

##### Generate a CSV report in OpenVAS

After completing a scan in OpenVAS, perform the following steps:

Click the **Scans tab**, then choose **Reports**. 

In the list of scans that is displayed, click the desired report date.

In the page that is displayed, at the top left, choose **CSV Results** in the drop-down, then click the green arrow immediately to its right.

![OpenVAS image](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/openvas.png.)

The file downloads to the default Downloads path set for your Web browser. You can either copy the CSV report file to the folder you set in Filebeat, or set the browser’s default Downloads location to that folder.


##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contents. (You want to replace the file's contents with this code block.)

This code block adds OpenVAS as an input and sets Logz.io as the output.

```yaml
#...
filebeat.inputs:

- type: log
  paths:
    - [OUTPUT_PATH]
  fields:
    logzio_codec: plain
    token: <<SHIPPING-TOKEN>>
    type: openvas
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
  multiline:
    pattern: '^(?:[0-9]{1,3}\.){3}[0-9]{1,3}'
    negate: true
    match: after

#For version 6.x and lower
#filebeat.registry_file: /var/lib/filebeat/registry

#For version 7 and higher
filebeat.registry.path: /var/lib/filebeat

#The following processors are to ensure compatibility with version 7
processors:
- rename:
    fields:
     - from: "agent"
       to: "beat_agent"
    ignore_missing: true
- rename:
    fields:
     - from: "log.file.path"
       to: "source"
    ignore_missing: true

#...
output:
  logstash:
    hosts: ["<<LISTENER-HOST>>:5015"]
    ssl:
      certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Replace the placeholders in the Filebeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* Replace the placeholder `[OUTPUT_PATH]` with the filepath to the folder where you’ll be keeping your reports. For example: `/home/kali/Downloads/Filebeat_read/*.csv`

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
