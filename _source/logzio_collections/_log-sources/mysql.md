---
title: Ship MySQL logs
logo:
  logofile: mysql.svg
  orientation: horizontal
data-source: MySQL
data-for-product-source: Logs
templates: [beats-logs, "docker"]
open-source:
  - title: mysql-logs
    github-repo: logzio-mysql-logs
contributors:
  - imnotashrimp
  - amosd92
  - schwin007
shipping-tags:
  - database
order: 280
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Filebeat](#filebeat-config)
* [Docker sidecar](#docker-sidecar-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="filebeat-config">

## MySQL + Filebeat setup

MySQL is an open-source relational database management system. Filebeat is often the easiest way to get logs from your system to Logz.io. Logz.io has a dedicated configuration wizard to make it simple to configure Filebeat. If you already have Filebeat and you want to add new sources, check out our other shipping instructions to copy&paste just the relevant changes from our code examples.

#### Configuration

**Before you begin, you'll need**:

* [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) installed
* Port 5015 open

<div class="tasklist">

##### Configure MySQL to write general query logs

In the MySQL configuration file (/etc/mysql/my.cnf),
paste these lines:

```
general_log_file = /var/log/mysql/mysql.log
general_log= 1
log_slow_queries = /var/log/mysql/mysql-slow.log
long_query_time = 1
log-queries-not-using-indexes = 1
```

Restart MySQL:

```shell
sudo /etc/init.d/mysql restart
```


{% include log-shipping/certificate.md %}

##### Add MySQL as an input in your Filebeat configuration

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add MySQL to the filebeat.inputs section.

{% include log-shipping/log-shipping-token.html %}

```yaml
# ...
filebeat.inputs:
- type: filestream
  paths:
    - /var/log/mysql/mysql.log

  fields:
    logzio_codec: plain

    # You can manage your tokens at
    # https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: mysql
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:
    - /var/log/mysql/mysql-slow.log

  fields:
    logzio_codec: plain

    # You can manage your tokens at
    # https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
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

    # You can manage your tokens at
    # https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: mysql_error
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
```

If you're running Filebeat 7 to 8.1, paste this code block.
Otherwise, you can leave it out.

```yaml
# ...
filebeat.inputs:
- type: log
  paths:
    - /var/log/mysql/mysql.log

  fields:
    logzio_codec: plain

    # You can manage your tokens at
    # https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: mysql
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: log
  paths:
    - /var/log/mysql/mysql-slow.log

  fields:
    logzio_codec: plain

    # You can manage your tokens at
    # https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
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

    # You can manage your tokens at
    # https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: mysql_error
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

###### Preconfigured log types

| Parameter | Log Type | Default log location |
|---|---|---|
| General query log | `mysql` | `/var/log/mysql/mysql.log` |
| Slow query log | `mysql_slow_query` | `/var/log/mysql/mysql-slow.log` |
| Error log | `mysql_error` | `/var/log/mysql/error.log` |

The log type is used to apply the appropriate Logz.io preconfigured parsing pipeline so that your logs will be automatically parsed.

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

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="docker-sidecar-config">

## Set up a Docker sidecar for MySQL

MySQL is an open-source relational database management system. Docker sidecar is a container that runs on the same Pod as the application container. This integration allows you to send your MySQL logs to your Logz.io account using a Docker sidecar. 


<div class="tasklist">

##### Pull the Docker image

Download the logzio/mysql-logs image:

```shell
docker pull logzio/mysql-logs
```

##### Run the Docker image

For a complete list of options, see the parameters below the code block.👇

```shell
docker run -d --name logzio-mysql-logs \
-e LOGZIO_TOKEN="<<LOG-SHIPPING-TOKEN>>" \
-e LOGZIO_LISTENER_HOST="<<LISTENER-HOST>>" \
-v /var/log/logzio:/var/log/logzio \
-v /var/log/mysql:/var/log/mysql \
logzio/mysql-logs
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| LOGZIO_TOKEN |{% include log-shipping/log-shipping-token.md %}  {% include log-shipping/log-shipping-token.html %} | Required |
| LOGZIO_LISTENER_HOST | Listener URL and port.    {% include log-shipping/listener-var.html %}  | `https://listener.logz.io:8071` |
| MYSQL_ERROR_LOG_FILE  | Path to the MySQL error log. | `/var/log/mysql/error.log` |
| MYSQL_SLOW_LOG_FILE  | Path to the MySQL slow query log. | `/var/log/mysql/mysql-slow.log` |
| MYSQL_LOG_FILE  | Path to the MySQL general log. | `/var/log/mysql/mysql.log` |



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->