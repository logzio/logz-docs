---
title: Ship Sysmon logs from Windows Server
logo:
  logofile: windows.svg
  orientation: vertical
data-source: Sysmon (System Monitor)
templates: ["beats-logs"]
contributors:
  - shalper
shipping-tags:
  - security
---

System Monitor (Sysmon) is a Windows system service and device driver that, once installed on a system, remains resident across system reboots to monitor and log system activity to the Windows event log. It provides detailed information about process creations, network connections, and changes to file creation time.


#### Configuration

**Before you begin, you'll need**:
[Winlogbeat 7.0.0](https://www.elastic.co/downloads/past-releases/winlogbeat-7-0-0) or
[Winlogbeat 6](https://www.elastic.co/guide/en/beats/winlogbeat/6.8/winlogbeat-installation.html)

* Sysmon installed: https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon

* Sysmon configured

The rules and dashboards were made and tested with the following configuration:

https://github.com/SwiftOnSecurity/sysmon-config - Connect to preview 

Winlogbeat installed

https://app.logz.io/#/dashboard/data-sources/Windows

<div class="tasklist">

##### Download the Logz.io public certificate

Download the
[Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt)
to `C:\ProgramData\Winlogbeat\COMODORSADomainValidationSecureServerCA.crt`
on your machine.

##### Configure Windows applications as an input

If you're working with the default configuration file,
(`C:\Program Files\Winlogbeat\winlogbeat.yml`)
clear the contents and start with a fresh file.

Paste this code block:

```yaml
File Content:
winlogbeat.event_logs:
  - name: Microsoft-windows-sysmon/Operational
    ignore_older: 72h
fields:
  logzio_codec: json
  token: {{API_TOKEN}}
  type: wineventlog
fields_under_root: true
# ... For Winlogbeat 7 only ...
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
  - rename:
      fields:
      - from: "log"
        to: "log_information"
      ignore_missing: true
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['C:\ProgramData\Winlogbeat\COMODORSADomainValidationSecureServerCA.crt']
```

##### Replace the parameters

Winlogbeat can have one output only, so remove any other `output` entries.

{% include log-shipping/replace-vars.html listener=true %}

##### Restart Winlogbeat

```powershell
Restart-Service winlogbeat
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
