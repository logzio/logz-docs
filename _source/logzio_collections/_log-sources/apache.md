---
title: Ship Apache logs
logo:
  logofile: apache.svg
  orientation: vertical
shipping-summary:
  data-source: Apache HTTPS Server 2
contributors:
  - amosd92
  - imnotashrimp
shipping-tags:
  - server-app
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
: Ubuntu, Debian: `/var/log/apache2/access.log` \\
  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log`

Log type _\(for preconfigured parsing\)_
: `apache`, `apache_access`, or `apache-access`

</div>

</div>

###### Guided configuration

**You'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

{: .tasklist .firstline-headline }
1. Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

2. Add Apache as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Apache to the filebeat.inputs section.

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
      # Ubuntu, Debian: `/var/log/apache2/access.log`
      #  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log`
      - /var/log/apache2/access.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: apache_access
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    - type: log

      paths:
      # Ubuntu, Debian: `/var/log/apache2/error.log`
      #  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/error_log`
      - /var/log/apache2/error.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: apache_error
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
      # Ubuntu, Debian: `/var/log/apache2/access.log`
      #  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/access_log`
      - /var/log/apache2/access.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: apache_access
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    - type: log

      paths:
      # Ubuntu, Debian: `/var/log/apache2/error.log`
      #  macOS, RHEL, CentOS, Fedora: `/var/log/httpd/error_log`
      - /var/log/apache2/error.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: apache_error
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    registry_file: /var/lib/filebeat/registry
    ```

    </div>

    </div>

3. Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
      hosts: ["<LISTENER-HOST>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

4. Start Filebeat

    Start or restart Filebeat for the changes to take effect.

5. Check Logz.io for your logs

    Confirm you're shipping logs by opening an Apache-hosted webpage in your browser.
    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).