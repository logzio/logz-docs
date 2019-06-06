---
title: Ship MySQL logs
logo:
  logofile: mysql.svg
  orientation: horizontal
shipping-summary:
  data-source: MySQL
open-source:
  - title: mysql-logs
    github-repo: mysql-logs
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/MySQL-Logs
contributors:
  - imnotashrimp
  - amosd92
  - schwin007
shipping-tags:
  - database
---

<div class="branching-container">

{: .branching-tabs }
* [Filebeat](#filebeat-config)
* [Docker sidecar](#docker-sidecar-config)

<div id="filebeat-config">

## MySQL + Filebeat setup

<div class="accordion">

### Configuration tl;dr

<div>

Files
: [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) \\
  [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt)

Listener
: Port 5015.
  For help finding your region's listener URL, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

Default log locations
: General query log: `/var/log/mysql/mysql.log` \\
  Slow query log: `/var/log/mysql/mysql-slow.log` \\
  Error log: `/var/log/mysql/error.log`

Log type _(for preconfigured parsing)_
: General query log: `mysql` \\
  Slow query log: `mysql_slow_query` \\
  Error log: `mysql_error`

</div>

</div>

###### Guided configuration

**You'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
[MySQL](https://dev.mysql.com/downloads/)

{: .tasklist .firstline-headline }
1. Configure MySQL to write general query logs

    In the MySQL configuration file (/etc/mysql/my.cnf),
    paste these lines:

    ```
    general_log_file = /var/log/mysql/mysql.log
    general_log= 1
    log_slow_queries = /var/log/mysql/mysql-slow.log
    long_query_time = 1
    log-queries-not-using-indexes = 1
    ```

    Restart MySQL.

    ```shell
    sudo /etc/init.d/mysql restart
    ```

2. Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

3. Add MySQL as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add MySQL to the filebeat.inputs section.

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
        - /var/log/mysql/mysql.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: mysql
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    - type: log
      paths:
        - /var/log/mysql/mysql-slow.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: mysql_slow_query
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h
      multiline:
        pattern: '^# Time:'
        negate: true
        match: after

    - type: log
      paths:
        - /var/log/mysql/error.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: mysql_error
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

    - type: log
      paths:
        - /var/log/mysql/mysql.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: mysql
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    - type: log
      paths:
        - /var/log/mysql/mysql-slow.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: mysql_slow_query
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h
      multiline:
        pattern: '^# Time:'
        negate: true
        match: after

    - type: log
      paths:
        - /var/log/mysql/error.log

      fields:
        logzio_codec: plain

        # Your Logz.io account token. You can find your token at
        #  https://app.logz.io/#/dashboard/settings/manage-accounts
        token: <ACCOUNT-TOKEN>
        type: mysql_error
      fields_under_root: true
      encoding: utf-8
      ignore_older: 3h

    registry_file: /var/lib/filebeat/registry
    ```

    </div>

    </div>

4. Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
      hosts: ["<LISTENER-URL>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

5. Start Filebeat

    Start or restart Filebeat for the changes to take effect.

6. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="docker-sidecar-config">

## MySQL + Docker sidecar setup

###### Configuration

{: .tasklist .firstline-headline }
1. Pull the Docker image

    Download the logzio/mysql-logs image:

    ```shell
    docker pull logzio/mysql-logs
    ```

2. Run the Docker image

    For a complete list of options, see the parameters below the code block.👇

    ```shell
    docker run -d --name logzio-mysql-logs \
    -e LOGZIO_TOKEN="<ACCOUNT-TOKEN>" \
    -e LOGZIO_LISTENER_HOST="<LISTENER-URL>" \
    -v /var/log/logzio:/var/log/logzio \
    -v /var/log/mysql:/var/log/mysql \
    logzio/mysql-logs
    ```

    Parameters
    {: .inline-header }

    LOGZIO_TOKEN <span class="required-param"></span>
    : Your Logz.io account token.
      {% include log-shipping/replace-vars.html token=true %}
      <!-- logzio-inject:account-token -->

    LOGZIO_LISTENER_HOST <span class="default-param">`listener.logz.io`</span>
    : Logz.io listener URL to ship the logs to.
      {% include log-shipping/replace-vars.html listener=true %}

    MYSQL_ERROR_LOG_FILE <span class="default-param">`/var/log/mysql/error.log`</span>
    : Path to the MySQL error log.

    MYSQL_SLOW_LOG_FILE <span class="default-param">`/var/log/mysql/mysql-slow.log`</span>
    : Path to the MySQL slow query log.

    MYSQL_LOG_FILE <span class="default-param">`/var/log/mysql/mysql.log`</span>
    : Path to the MySQL general log.


3. Check Logz.io for your logs

    Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>