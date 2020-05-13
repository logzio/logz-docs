---
title: Ship Apache logs
logo:
  logofile: apache.svg
  orientation: vertical
data-source: Apache HTTPS Server 2
contributors:
  - amosd92
  - imnotashrimp
shipping-tags:
  - server-app
---

## Setup

<details>

<summary>
Configuration tl;dr
</summary>

| Item | Description |
|---|---|
| Files | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br> [New public certificate (_active from May 27, 2020_)](https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt) <br> [Public certificate (_expires May 26, 2020_)](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| Listener | Port 5015. For help finding your region's listener host, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| Default log locations | Ubuntu, Debian: `/var/log/apache2/access.log` <br> RHEL, CentOS, Fedora: `/var/log/httpd/access_log` |
| Log type _\(for preconfigured parsing\)_ | `apache`, `apache_access`, or `apache-access`|
{:.paramlist}

</details>

#### Guided configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

<div class="tasklist">

##### Download the Logz.io public certificate

**Action required**:
Starting May 26, 2020, we'll transition our listener servers
to a new public SSL certificate.
Before that time,
you'll need to include both the old and new certificates
in your configurations. \\
\\
**If you send encrypted data without using both certificates after May 26,
that data might not arrive at your Logz.io account or be archived.** \\
\\
You can safely remove the old certificate
after June 5, 2020.
{:.info-box.warning}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Add Apache as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Apache to the filebeat.inputs section.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ...
filebeat.inputs:
- type: log

  paths:
  # Ubuntu, Debian: `/var/log/apache2/access.log`
  #  RHEL, CentOS, Fedora: `/var/log/httpd/access_log`
  - /var/log/apache2/access.log

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: apache_access
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log

  paths:
  # Ubuntu, Debian: `/var/log/apache2/error.log`
  #  RHEL, CentOS, Fedora: `/var/log/httpd/error_log`
  - /var/log/apache2/error.log

  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: apache_error
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

{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities:
      - '/etc/pki/tls/certs/SectigoRSADomainValidationSecureServerCA.crt'
      - '/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt'
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Confirm you're shipping logs by opening an Apache-hosted webpage in your browser.
Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
