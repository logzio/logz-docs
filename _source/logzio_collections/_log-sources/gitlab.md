---
title: Ship GitLab logs
logo:
  logofile: gitlab.svg
  orientation: vertical
data-source: GitLab
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
| Default log locations | If installed from Omnibus packages: `/var/log/gitlab/...` <br> If installed from source: `/home/git/gitlab/log/...` <br> _See [Log system](https://docs.gitlab.com/ee/administration/logs.html) from GitLab for more information._ |
| Log type | Production, JSON: `gitlab-production-json` <br> Production, plain text: `gitlab-production` <br> API: `gitlab-api-json` <br> Application: `gitlab-application` |
{:.paramlist}

</details>

#### Configuration

**Before you begin, you'll need**:

* [GitLab](https://about.gitlab.com/installation/) locally installed
* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)

<div class="tasklist">

{% include log-shipping/certificate.md server="to your Filebeat server" %}

##### Add GitLab as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add GitLab to the filebeat.inputs section.

GitLab has an advanced logging framework that ships a variety of different system logs.
We recommend reading [Log system](https://docs.gitlab.com/ee/administration/logs.html) from GitLab and modifying the Filebeat sample configuration according to your needs.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ...
filebeat.inputs:
- type: log
  paths:
  - /var/log/gitlab/gitlab-rails/production_json.log
  fields:
    logzio_codec: json

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: gitlab-production-json
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:
  - /var/log/gitlab/gitlab-rails/production.log
  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: gitlab-production
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:
  - /var/log/gitlab/gitlab-rails/api_json.log
  fields:
    logzio_codec: json

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: gitlab-api-json
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:
  - /var/log/gitlab/gitlab-rails/application.log
  fields:
    logzio_codec: json

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: gitlab-application
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
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
