---
layout: article
title: Ship GitLab logs
logo:
  logofile: gitlab.svg
  orientation: vertical
shipping-summary:
  data-source: GitLab
  log-shippers:
    - Filebeat
  os: Linux
contributors:
  - amosd92
  - imnotashrimp
---

## GitLab + Filebeat setup

**You'll need:** [GitLab](https://about.gitlab.com/installation/) installed locally, [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) 6.x or higher

###### Manual configuration

| **Files** | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br /> [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 5015 |
| **Default log locations** | If installed from Omnibus packages: `/var/log/gitlab/...` <br /> If installed from source: `/home/git/gitlab/log/...` <br /> _(See [GitLab log system documentation](https://docs.gitlab.com/ee/administration/logs.html) for details)_ |
| **Log type** <br /> _for automatic parsing_ | Production, JSON: `gitlab-production-json` <br /> Production, plain text: `gitlab-production` <br /> API: `gitlab-api-json` <br /> Application: `gitlab-application` |

###### Guided configuration

{: .tasklist .firstline-headline }
1. Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

2. Add GitLab as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add GitLab to the filebeat.inputs section.

    {% include log-shipping/replace-vars.html token=true %}

    ```yaml
    filebeat.inputs:
    - type: log
      paths:
      - /var/log/gitlab/gitlab-rails/production_json.log
      fields:
        logzio_codec: json

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: {ACCOUNT-TOKEN}
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
        token: {ACCOUNT-TOKEN}
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
        token: {ACCOUNT-TOKEN}
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
        token: {ACCOUNT-TOKEN}
        type: gitlab-application
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    registry_file: /var/lib/filebeat/registry
    ```

3. Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
      hosts: ["{LISTENER-URL}:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

4. Restart Filebeat

    ```shell
    sudo systemctl restart filebeat
    ```

5. Test your configuration

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

