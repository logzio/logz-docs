---
title: Ship Puppet logs
logo:
  logofile: puppet.png
  orientation: vertical
data-source: Puppet
templates: [beats-logs]
contributors:
  - amosd92
  - imnotashrimp
shipping-tags:
  - ci-cd
---

## Setup

<details>

<summary>
Configuration tl;dr
</summary>

| Item | Description |
|---|---|
| Files | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br> [Logz.io public certificate]({% include log-shipping/certificate-path.md %}) |
| Listener | Port 5015. For help finding your region's listener host, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| Default log location | _Puppet produces lots of different logs. See [Log files installed](https://puppet.com/docs/pe/2018.1/what_gets_installed_and_where.html#log-files-installed) from Puppet Labs for more information._ |
| Log type _\(for preconfigured parsing\)_ | Puppet server: `puppetserver` <br> Puppet server access: `puppetserver-access` |
{:.paramlist}

</details>

#### Guided configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

<div class="tasklist">

{% include log-shipping/certificate.md server="to your Filebeat server" %}

##### Add Puppet as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Puppet to the filebeat.inputs section.

  We recommend configuring Puppet to output JSON logs.
  See [Advanced Logging Configuration](https://puppet.com/docs/puppetserver/5.1/config_logging_advanced.html) from Puppet for more information.
  {:.info-box.tip}

{% include log-shipping/replace-vars.md %}

```yaml
# ...
filebeat.inputs:
- type: log
  paths:

  # If you configured Puppet to output JSON logs, replace the filename with
  #  `puppetserver.log.json`
  - /var/log/puppetlabs/puppetserver/puppetserver.log

  fields:

    # If you configured Puppet to output JSON logs, set logzio_codec to
    #  `json`
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: puppetserver
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:

  # If you configured Puppet to output JSON logs, replace the filename with
  #  `puppetserver-access.log.json`
  - /var/log/puppetlabs/puppetserver/puppetserver-access.log

  fields:

    # If you configured Puppet to output JSON logs, set logzio_codec to
    #  `json`
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: puppetserver-access
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
```

If you're running Filebeat 7, paste this code block.
Otherwise, you can leave it out.

```yaml
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

If you're running Filebeat 6, paste this code block.

```yaml
# ... For Filebeat 6 only ...
registry_file: /var/lib/filebeat/registry
```

##### Set Logz.io as the output

If Logz.io is not an output, add it now.
Remove all other outputs.

{% include log-shipping/replace-vars-listener.md %}

```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
