---
title: Ship OpenVAS logs
logo:
  logofile: greenbone_icon.png
  orientation: vertical
data-source: OpenVAS
templates: ["network-device-filebeat"]
contributors:
  - shalper
shipping-tags:
  - security
---

OpenVAS reporting allows you to create a report from one or more OpenVAS/Greenbone XML reports. 

OpenVAS reports are typically generated manually, as needed. There are also third-party tools for scheduling OpenVAS to generate reports automatically.

The following instructions show you how to configure Filebeat to send OpenVAS reports to Logz.io.

#### Step by step

<div class="tasklist">


**Before you begin, you'll need**:

* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* root access


##### Download the Logz.io public certificate to your Filebeat server

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

If you're using a windows machine, see the [instructions for installing Filebeat for Windows]({{site.baseurl}}/shipping/filebeat-for-windows.html).


##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contents. (You want to replace the file's contents with this code block.)

This code block adds OpenVAS as an input and sets Logz.io as the output.

```yaml
# ...
filebeat.inputs:

- type: log
  paths:
    - <<filepath-to-openvas-reports.csv>>
    - /home/kali/Downloads/Filebeat_read/*.csv
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

* Replace the filepath placeholder `<<filepath-to-openvas-reports.csv>>`. Type in the folder where you’ll be keeping your OpenVAS reports.

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.
<br>
Filebeat is now configured to send OpenVAS CSV reports directly to Logz.io.

##### Generate a CSV report in OpenVAS

After completing a scan in OpenVAS, perform the following steps to generate a CSV report.

1. Click the **Scans tab**, then choose **Reports**.
2. Select a report from the list.
3. The report summary will open. Select **CSV Results** from the drop-down menu (top left corner) and click the download option (It's the green arrow <i class="fas fa-long-arrow-alt-down"></i>).

    ![OpenVAS image](https://dytvr9ot2sszz.cloudfront.net/logz-docs/security-analytics/openvas.png)

4. The CSV file will be downloaded to the default Downloads path set for your Web browser, unless you've changed the default. Make sure it is the same path as set in your Filebeat configuration above.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

