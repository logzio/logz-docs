---
title: Ship Active Directory logs from Windows Server
logo:
  logofile: windows.svg
  orientation: vertical
data-source: Active Directory (Windows Server)
contributors:
  - imnotashrimp
shipping-tags:
  - server-app
  - security
---

#### Configuration

**Before you begin, you'll need**:
[Winlogbeat 7.0.0](https://www.elastic.co/downloads/past-releases/winlogbeat-7-0-0) or
[Winlogbeat 6](https://www.elastic.co/guide/en/beats/winlogbeat/6.8/winlogbeat-installation.html)

<div class="tasklist">

##### Download the Logz.io public certificate

**Action required**:
Starting May 26, 2020, we'll transition our listener servers
to a new public SSL certificate.
Before that date,
you'll need to include both the old and new certificates
in your configurations. \\
\\
**If you send encrypted data without using both certificates after May 26,
that data might not arrive at your Logz.io account or be archived.** \\
\\
You can safely remove the old certificate
after June 5, 2020.
{:.info-box.warning}

Download the
[new Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt)
to `C:\ProgramData\Winlogbeat\SectigoRSADomainValidationSecureServerCA.crt`
and the
[old Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt)
to `C:\ProgramData\Winlogbeat\COMODORSADomainValidationSecureServerCA.crt`
on your machine.

##### Configure Windows applications as an input

If you're working with the default configuration file,
(`C:\Program Files\Winlogbeat\winlogbeat.yml`)
clear the contents and start with a fresh file.

Paste this code block.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ...
winlogbeat.event_logs:
  - name: Application
    ignore_older: 72h
  - name: Security
  - name: System

fields:
  logzio_codec: json

  # Your Logz.io account token. You can find your token at
  #  https://app.logz.io/#/dashboard/settings/manage-accounts
  token: <<SHIPPING-TOKEN>>
  type: wineventlog
fields_under_root: true
```

If you're running Winlogbeat 7, paste this code block.
Otherwise, you can leave it out.

```yaml
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
```

##### Set Logz.io as the output

If Logz.io isn't the output, set it now.

Winlogbeat can have one output only, so remove any other `output` entries.

{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities:
      - 'C:\ProgramData\Winlogbeat\SectigoRSADomainValidationSecureServerCA.crt'
      - 'C:\ProgramData\Winlogbeat\COMODORSADomainValidationSecureServerCA.crt'
```

##### Restart Winlogbeat

```powershell
Restart-Service winlogbeat
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
