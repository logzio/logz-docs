---
title: Ship GitLab logs
logo:
  logofile: gitlab.svg
  orientation: vertical
data-source: GitLab
contributors:
  - amosd92
  - imnotashrimp
shipping-tags:
  - ci-cd
---

## Setup

<div class="accordion">

### Configuration tl;dr

<div>

Files
: [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) \\
  [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt)

Listener
: Port 5015.
  For help finding your region's listener host, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

Default log locations
: If installed from Omnibus packages: `/var/log/gitlab/...` \\
  If installed from source: `/home/git/gitlab/log/...` \\
  _See [Log system](https://docs.gitlab.com/ee/administration/logs.html) from GitLab for more information._

Log type _\(for preconfigured parsing\)_
: Production, JSON: `gitlab-production-json` \\
  Production, plain text: `gitlab-production` \\
  API: `gitlab-api-json` \\
  Application: `gitlab-application`

</div>

</div>

###### Guided configuration

**You'll need**:
[GitLab](https://about.gitlab.com/installation/) installed locally,
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)

{: .tasklist .firstline-headline }
1.  Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

2.  Add GitLab as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add GitLab to the filebeat.inputs section.

    GitLab has an advanced logging framework that ships a variety of different system logs.
    We recommend reading [Log system](https://docs.gitlab.com/ee/administration/logs.html) from GitLab and modifying the Filebeat sample configuration according to your needs.

    {% include log-shipping/replace-vars.html token=true %}

    <div class="branching-container">

    {: .branching-tabs }
    * [Filebeat 7](#filebeat-7-code)
    * [Filebeat 6](#filebeat-6-code)

    <div id="filebeat-7-code">

    ```yaml
    # Filebeat 7 configuration

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

    </div>

    <div id="filebeat-6-code">

    ```yaml
    # Filebeat 6 configuration

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

    registry_file: /var/lib/filebeat/registry
    ```

    </div>

    </div>

3.  Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
      hosts: ["<<LISTENER-HOST>>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

4.  Start Filebeat

    Start or restart Filebeat for the changes to take effect.

5.  Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

