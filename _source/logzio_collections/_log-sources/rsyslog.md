---
title: Shipping with Rsyslog
logo:
  logofile: linux.svg
  orientation: vertical
short-description: Configure rsyslog to monitor a single log file or a directory, and then send it to Logz.io via TLS.
data-source: Rsyslog over TLS
templates: ["no-template"]
contributors:
  - shalper
shipping-tags:
  - os
order: 130
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Rsyslog over TLS](#rsyslog-tls)
* [Automatic configuration](#rsyslog-auto)
* [Manual configuration](#rsyslog-manual)
{:.branching-tabs}

<!-- tab:start -->
<div id="rsyslog-tls">


###### Shipping with Rsyslog

Most Unix systems these days come with pre-installed rsyslog, which is a great light weight service to consolidate logs.

You can configure rsyslog to monitor a log file. It can monitor a single log file or directory, and ship them over to Logz.io over TLS. In case of directory, all first level files will be monitored.

#### Configuration

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
$InputFileName <<PATH_TO_FILE>>
$InputFileTag TYPE:
$InputFileStateFile stat-TYPE
$InputFileSeverity info
$InputFilePersistStateInterval 20000
$InputRunFileMonitor

$DefaultNetstreamDriverCAFile /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
$ActionSendStreamDriver gtls
$ActionSendStreamDriverMode 1
$ActionSendStreamDriverAuthMode x509/name
$ActionSendStreamDriverPermittedPeer *.logz.io

$template logzFormatFileTagName,"[<<LOG-SHIPPING-TOKEN>>] <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [type=<<TYPE>>] %msg%\n"
if $programname == 'TYPE' then @@<<LISTENER-HOST>>:5001;logzFormatFileTagName
if $programname == 'TYPE' then ~
```

{% include /general-shipping/replace-placeholders.html %}
* `<<PATH_TO_FILE>>`: Path to your file or directory.
* `<<TYPE>>`: {% include log-shipping/type.md %}


##### Restart rsyslog

```
sudo service rsyslog restart
```

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana). 

If you still don't see your logs, see our [rsyslog troubleshooting guide](https://support.logz.io/hc/en-us/articles/209486069-Troubleshooting-Rsyslog-Failed-to-install).

</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="rsyslog-auto">

###### Shipping with Rsyslog

Most Unix systems these days come with pre-installed rsyslog, which is a great light weight service to consolidate logs.

You can configure rsyslog to monitor a log file. It can monitor a single log file or directory, and ship them over to Logz.io. In case of directory all first level files will be monitored.


#### Automatic configuration

**Before you begin, you'll need**:

* Sudo access
* Rsyslog version 5.8.0 and above
* Outgoing TCP traffic to destination port 5000 allowed
* A common linux distribution


<div class="tasklist">

##### Configure your rsyslog daemon

###### If your are monitoring plain-text logs

Run the following in order to configure your rsyslog daemon to monitor a log file or directory.

```
curl -sLO https://github.com/logzio/logzio-shipper/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t file -a "<<LOG-SHIPPING-TOKEN>>" -l "<<LISTENER-HOST>>" --filepath "<<PATH_TO_FILE>>" -tag "<<TYPE>>" 
```


###### If your are monitoring JSON logs

Run the following to configure your rsyslog daemon to monitor JSON log files.  Each log will need to be a single JSON line that ends with a new line.


```
curl -sLO https://github.com/logzio/logzio-shipper/raw/master/dist/logzio-rsyslog.tar.gz && tar xzf logzio-rsyslog.tar.gz && sudo rsyslog/install.sh -t file -a "<<LOG-SHIPPING-TOKEN>>" -l "<<LISTENER-HOST>>" --filepath "<<PATH_TO_FILE>>" -tag "<<TYPE>>" -c json
```

{% include /general-shipping/replace-placeholders.html %}
* `<<PATH_TO_FILE>>`: Path to your file or directory.
* `<<TYPE>>`: {% include log-shipping/type.md %}




</div>
</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="rsyslog-manual">

###### Shipping with Rsyslog

Most Unix systems these days come with pre-installed rsyslog, which is a great light weight service to consolidate logs.

You can configure rsyslog to monitor a log file. It can monitor a single log file or directory, and ship them over to Logz.io. In case of directory all first level files will be monitored.


#### Manual configuration

**Before you begin, you'll need**:

* Sudo access
* Rsyslog version 5.8.0 and above
* Outgoing TCP traffic to destination port 5000 allowed
* A common linux distribution


<div class="tasklist">

##### Configure rsyslog file spooling

To ship a log to logz.io, SSH to your Linux server, copy the below code snippet to your terminal window and execute it. The code verifies the working directory exists. In an Ubuntu server, it will set the proper permissions.

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
$InputFileName <<PATH_TO_FILE>>
$InputFileTag TYPE:
$InputFileStateFile stat-TYPE
$InputFileSeverity info
$InputFilePersistStateInterval 20000
$InputRunFileMonitor

$template logzFormatFileTagName,"[<<LOG-SHIPPING-TOKEN>>] <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [type=TYPE] %msg%\n"
if $programname == 'TYPE' then @@<<LISTENER-HOST>>:5000;logzFormatFileTagName
if $programname == 'TYPE' then ~
```


{% include /general-shipping/replace-placeholders.html %}
* `<<PATH_TO_FILE>>`: Path to your file or directory.
* `<<TYPE>>`: {% include log-shipping/type.md %}


##### Restart rsyslog

After editing and saving the file, execute the following command

```
sudo service rsyslog restart
```


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see our [rsyslog troubleshooting guide](https://support.logz.io/hc/en-us/articles/209486069-Troubleshooting-Rsyslog-Failed-to-install).


</div>
</div>
<!-- tab:end -->


<!-- tabContainer:end -->
