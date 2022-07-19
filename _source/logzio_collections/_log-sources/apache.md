---
title: Ship Apache logs
logo:
  logofile: apache.svg
  orientation: vertical
short-description: Use Filebeat - a lightweight open source agent - to send Apache logs to Logz.io.
data-source: Apache HTTPS Server
data-for-product-source: Logs
templates: [beats-logs]
contributors:
  - amosd92
  - imnotashrimp
shipping-tags:
  - server-app
order: 120
---
The Apache HTTP Server, colloquially called Apache, is a free and open-source cross-platform web server. This integration allows you to send logs from your Apache server instances to your Logz.io account.

#### Step by step

**Before you begin, you'll need**:

* [Filebeat](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) installed
* Port 5015 open.
* Root access

<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Add Apache as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Apache to the filebeat.inputs section.


The default log locations for:

* Ubuntu and Debian - `/var/log/apache2/access.log`
* RHEL, CentOS, Fedora - `/var/log/httpd/access_log`


{% include log-shipping/log-shipping-token.html %}

```yaml
# ...
filebeat.inputs:
- type: filestream

  paths:
  # Ubuntu, Debian: `/var/log/apache2/access.log`
  #  RHEL, CentOS, Fedora: `/var/log/httpd/access_log`
  - /var/log/apache2/access.log

  fields:
    logzio_codec: plain

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: apache_access
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

- type: filestream

  paths:
  # Ubuntu, Debian: `/var/log/apache2/error.log`
  #  RHEL, CentOS, Fedora: `/var/log/httpd/error_log`
  - /var/log/apache2/error.log

  fields:
    logzio_codec: plain

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: apache_error
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
  # Ubuntu, Debian: `/var/log/apache2/access.log`
  #  RHEL, CentOS, Fedora: `/var/log/httpd/access_log`
  - /var/log/apache2/access.log

  fields:
    logzio_codec: plain

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
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

    # You can manage your tokens at
    #  https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping
    token: <<LOG-SHIPPING-TOKEN>>
    type: apache_error
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

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana). You can search for `type:apache OR apache_access OR apache-access` to filter for your Apache logs. Your logs should be already parsed thanks to the Logz.io preconfigured parsing pipeline.

If you still don't see your logs, see [Filebeat troubleshooting](https://docs.logz.io/shipping/log-sources/filebeat.html#troubleshooting).

</div> 
