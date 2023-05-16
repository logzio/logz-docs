---
title: Ship Fail2ban logs
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship Fail2ban logs to Logz.io
logo:
  logofile: fail2ban.png
  orientation: vertical
data-source: Fail2ban
data-for-product-source: Cloud SIEM
templates: [beats-logs]
contributors:
  - imnotashrimp
shipping-tags:
  - linux
order: 560
---
Fail2Ban is an intrusion prevention software framework that protects computer servers from brute-force attacks. This integration allows you to send Fail2ban logs to your Logz.io SIEM account.

#### Guided configuration

**Before you begin, you'll need**:
[Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
[Fail2ban](https://www.fail2ban.org/wiki/index.php/Downloads),
root access

<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Add Fail2ban as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Fail2ban to the filebeat.inputs section.

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/filebeat-input-extension.md %}


```yaml
# ...
filebeat.inputs:
- type: filestream

  paths:
  - /var/log/fail2ban.log

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<LOG-SHIPPING-TOKEN>>
    type: fail2ban
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
```

If you're running Filebeat 7 to 8.1, paste the code block below instead:

```yaml
# ...
filebeat.inputs:
- type: log

  paths:
  - /var/log/fail2ban.log

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<LOG-SHIPPING-TOKEN>>
    type: fail2ban
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
```



##### Set Logz.io as the output

If Logz.io is not an output, add it now.
Remove all other outputs.

{% include log-shipping/listener-var.html %} 

```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Filebeat

[Start or restart Filebeat](https://www.elastic.co/guide/en/beats/filebeat/master/filebeat-starting.html) for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [Filebeat troubleshooting](https://docs.logz.io/shipping/log-sources/filebeat.html#troubleshooting).

</div> 
