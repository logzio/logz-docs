---
title: Ship Juniper SRX logs
logo:
  logofile: juniper.png
  orientation: horizontal
data-source: Juniper
contributors:
  - shalper
shipping-tags:
  - security
---

Juniper SRX is a firewall ...  If you ship your Juniper firewall logs to your Logz.io Cloud SIEM, you can centralize your security ops and receive alerts about security events logged by Juniper.

Here are just a few examples for security rules written specifically for Juniper SRX and provided out-of-the-box by Logz.io's security team: .....

You can review the Juniper SRX resources in your Logz.io Cloud SIEM account, under the pre-configured [Juniper SRX security rules](https://app.logz.io/#/dashboard/security/rules/rule-definitions?from=0&sortBy=updatedAt&sortOrder=DESC&search=juniper) and search for the provided Juniper SRX [dashboards](https://app.logz.io/#/dashboard/security/research/dashboards?) to get you started.

###### On this page
{:.no_toc}

1. toc list
{:toc}

#### Step by step
{:.no_toc}

**Before you begin, you'll need**:
Juniper SRX,
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html),
root access

<div class="tasklist">

##### Configure Juniper SRX to output logs over UDP:514

Open Juniper SRX’s configuration file with your preferred text editor. The default location is `....yaml` but it depends on your installation.
See Juniper SRX's [documentation](https://kb.juniper.net/InfoCenter/index?page=content&id=KB16502&actp=METADATA)
if you need help finding the file.

Configure Juniper syslog server to send logs over port UDP/514 by default.

Save and exit the yaml file.

##### Download the Logz.io certificate to your Filebeat server

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contents. (You want to replace the file's contents with this code block.)

This code block adds Juniper SRX as an input sent over UDP traffic. It contains the placeholder `<<SHIPPING-TOKEN>>` which you'll need to replace in the next step.

```yaml
# ...
filebeat.inputs:
- type: udp
  max_message_size: 10MiB
  host: "0.0.0.0:514"

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: juniper
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h 
  
  # ... For Filebeat 7 only ...
filebeat.registry.path: /var/lib/filebeat
processors:
- rename:
    fields:
    - from: "agent"
      to: "filebeat_agent"
    ignore_missing: true
- rename:
    fields:
    - from: "log.file.path"
      to: "source"
    ignore_missing: true
```

Copy and paste the following code block directly below. It sets Logz.io as the output. It contains the placeholder `<<LISTENER-HOST>>` which you'll need to replace in the next step.  

```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']    
```

##### Replace the placeholders in the Filebeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

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