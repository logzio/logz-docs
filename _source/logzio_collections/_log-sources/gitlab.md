---
title: Ship GitLab logs
logo:
  logofile: gitlab.svg
  orientation: vertical
data-source: GitLab
data-for-product-source: Logs
templates: [beats-logs]
contributors:
  - amosd92
  - imnotashrimp
shipping-tags:
  - ci-cd
order: 870
---
GitLab is a DevOps platform that combines the ability to develop, secure, and operate software in a single application. This integration allows you to send logs from your GitLan platform to your Logz.io account. 

#### Configuration

**Before you begin, you'll need**:

* [GitLab](https://about.gitlab.com/installation/) locally installed
* [Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or [Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)
* Port 5015 open

<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Add GitLab as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add GitLab to the filebeat.inputs section.

GitLab has an advanced logging framework that ships a variety of different system logs.
We recommend reading [Log system](https://docs.gitlab.com/ee/administration/logs.html) from GitLab and modifying the Filebeat sample configuration according to your needs.

{% include log-shipping/log-shipping-token.html %}

```yaml
# ...
filebeat.inputs:
- type: log
  paths:
  - /var/log/gitlab/gitlab-rails/production_json.log
  fields:
    logzio_codec: json

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: gitlab-production-json
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:
  - /var/log/gitlab/gitlab-rails/production.log
  fields:
    logzio_codec: plain

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: gitlab-production
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:
  - /var/log/gitlab/gitlab-rails/api_json.log
  fields:
    logzio_codec: json

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: gitlab-api-json
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:
  - /var/log/gitlab/gitlab-rails/application.log
  fields:
    logzio_codec: json

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: gitlab-application
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
```

If you're running Filebeat 8.1+, the `type` of the `filebeat.inputs` is `filestream` instead of `logs`:

```yaml
filebeat.inputs:
- type: filestream
  paths:
    - /var/log/*.log
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

###### Preconfigured log types

* Production logs in JSON format: `gitlab-production-json`
* Production logs in plain text: `gitlab-production`
* API logs: `gitlab-api-json`
* Application logs: `gitlab-application`

The log type is used to apply the appropriate Logz.io preconfigured parsing pipeline so that your logs will be automatically parsed.

The default path to the logs differs, depending on how you've installed GitLab:

* If installed from Omnibus packages, the default path is: `/var/log/gitlab/...`
* If installed from source: `/home/git/gitlab/log/...`

Refer to GitLab Docs to learn more about the [Log system](https://docs.gitlab.com/ee/administration/logs.html).

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

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
