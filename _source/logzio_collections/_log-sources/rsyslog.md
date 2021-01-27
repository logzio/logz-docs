---
title: Ship Linux logs
logo:
  logofile: linux.svg
  orientation: vertical
data-source: Rsyslog over TLS
templates: ["no-template"]
contributors:
  - shalper
shipping-tags:
  - os
---

###### Shipping log files or directories using rsyslog

Most Unix systems these days come with pre-installed rsyslog, which is a great light weight service to consolidate logs.

You can configure rsyslog to monitor a log file. It can monitor a single log file or directory, and ship them over to Logz.io over TLS .In case of directory all first level files will be monitored.

#### Manual configuration

**Before you begin, you'll need**:

* Sudo access
* Rsyslog version 5.8.0 and above
* Outgoing TCP traffic to destination port 5001 allowed
* A common linux distribution

<div class="tasklist">

##### Install the rsyslog-gnutls add-on

On your Debian or Ubuntu Linux machine, run:

```
sudo apt-get install rsyslog-gnutls
```

For distributions based on Red Hat, use `rpm` or `yum` in place of `apt-get`.

{% include log-shipping/certificate.md %}

##### Configure rsyslog file spooling

To ship a log to logz.io, SSH to your Linux server, and run this command. The code verifies the working directory exists. In an Ubuntu server, it will set the proper permissions.

```
sudo mkdir -v /var/spool/rsyslog 
if [ "$(lsb_release -ds | grep Ubuntu)" != "" ]; then
    sudo chown -R syslog:adm /var/spool/rsyslog
fi
```

##### Create a new configuration file for Logz.io

```
sudo vim /etc/rsyslog.d/21-logzio-sample.conf
```

Add the additional configuration

```
#   -------------------------------------------------------
#        File Logging Directives for Logz.io
#   -------------------------------------------------------

$ModLoad imfile
$InputFilePollInterval 10
$PrivDropToGroup adm
$WorkDirectory /var/spool/rsyslog

# File access file:
$InputFileName PATH_TO_FILE
$InputFileTag TYPE:
$InputFileStateFile stat-TYPE
$InputFileSeverity info
$InputFilePersistStateInterval 20000
$InputRunFileMonitor

$DefaultNetstreamDriverCAFile /etc/ssl/certs/AddTrustExternalCARoot.crt
$ActionSendStreamDriver gtls
$ActionSendStreamDriverMode 1
$ActionSendStreamDriverAuthMode x509/name
$ActionSendStreamDriverPermittedPeer *.logz.io

$template logzFormatFileTagName,"[{{API_TOKEN}}] <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [type=TYPE] %msg%\n"
if $programname == 'TYPE' then @@{{LOGZ_LISTENER}}:5001;logzFormatFileTagName
if $programname == 'TYPE' then ~
```

Replace the following in the above code sample:

* PATH_TO_FILE: The default path is `/path/to/log/file/or/directory`.
* TYPE: {% include log-shipping/type.md %}
{% include log-shipping/log-shipping-token.html %}

##### Restart rsyslog

```
sudo service rsyslog restart
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana). 

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>