---
title: Ship Sysmon logs from Windows Server
logo:
  logofile: windows.svg
  orientation: vertical
data-source: Sysmon
templates: ["beats-logs"]
contributors:
  - shalper
shipping-tags:
    
---

Sysmon (System Monitor) is a Windows system service that monitors and logs system activity of the Windows event log. It tracks process creations, network connections, and changes to file creation time.


#### Configuration

**Before you begin, you'll need**:

* [Winlogbeat 7](https://www.elastic.co/downloads/past-releases/winlogbeat-7-0-0) installed.

* [Sysmon](https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon) installed and configured according to the [SwiftOnSecurity configuration](https://github.com/SwiftOnSecurity/sysmon-config).

<div class="tasklist">

##### Download the Logz.io public certificate

Download the
[Logz.io public certificate]({% include log-shipping/certificate-path.md %})
to `C:\ProgramData\Winlogbeat\COMODORSADomainValidationSecureServerCA.crt`
on your machine.

##### Configure Windows applications as an input

If you're working with the default configuration file, clear the contents and start with a fresh file. (The location may be `C:\ProgramData\Elastic\Beats\winlogbeat\winlogbeat.yml` or `C:\Program Files\Winlogbeat\winlogbeat.yml`, depending on where you installed it.)


Paste this code block:

```yaml
File Content:
winlogbeat.event_logs:
  - name: Microsoft-windows-sysmon/Operational
    ignore_older: 72h
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
  type: wineventlog
fields_under_root: true
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


##### Replace the placeholders in the configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/replace-vars.html token=true %}

* {% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Restart Winlogbeat

Open PowerShell as an admin and run this command:

```powershell
Restart-Service winlogbeat
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
