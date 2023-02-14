---
layout: article
title: Troubleshooting Filebeat
permalink: /user-guide/log-shipping/filebeat-troubleshooting/
sitemap: false 
noindex: true
tags:
  - log-shipping
  - troubleshooting
contributors:
  - schwin007
---

The process of getting logs from your system to Logz.io can be tricky,
and it can be difficult to pinpoint the exact issue.

In this guide, we'll walk through troubleshooting some common problems when using Filebeat.
We assume that you have already followed [Logz.io instructions for configuring Filebeat](https://app.logz.io/#/dashboard/send-your-data/log-sources/filebeat).


## Linux & other Operating Systems

Filebeat can be installed on various operating systems. This troubleshooting guide is designed for Linux installations of Filebeat but can be adapted to other operating systems.


#### Troubleshooting log shipping with Filebeat


<div class="tasklist">

##### Check your Filebeat yaml file for syntax errors

{% include log-shipping/filebeat-input-extension.md %}


Restart Filebeat again to make sure that your recent changes have already taken effect. Run:

```
$ sudo service filebeat restart
```

If you get an error with your Filebeat.yml file, check for the most common problems:

Indentation errors, especially indenting with tabs instead of spaces, is a very common problem.

You can use an online YAML validator [yamllint.com is a popular choice](http://www.yamllint.com/) to check if your yml file is valid. The same tool can also help you clean up extra characters, if it finds any.

##### Check the path to the registry file

Even if your YAML file is valid, this does not necessarily mean that the configuration is valid.

Filebeat uses a registry file to keep track of the locations of the logs in the files that have already been sent between restarts of Filebeat. Here's what you should check:

* Make sure that the path to the registry file exists.
* Check that the registry file is populated with values.

You can find the path of your registry file by looking at the filebeat.yml file and searching for the field `registry_file`.

Our standard configuration has it in the following location: `registry_file: /var/lib/filebeat/registry`

If the registry file does not exist or it only contains empty curly braces "{}", it means that Filebeat is not running or that it cannot find any logs to process.

##### Verify that the path to your logs is correct

Make sure that the path to the logs is correct.

If the log file already contains new log lines, the path is ok.
If there are no new log lines, you can either force the system to generate new logs or manually add a few log lines to the log file.

##### Check that the TLS certificate is in the correct location

Our filebeat endpoint requires TLS encryption.

Confirm that you have downloaded the correct certificate and placed it in the correct location.

* To find the location of the certificate, open the filebeat.yml file and search for the field `certificate_authorities`. In our example configuration, we recommend the following location:
certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']

##### Check if your server has access to the Logz.io listener

From the actual server on which you are running Filebeat, run the following command to verify that you have proper connectivity:

```
telnet listener.logz.io 5015
```

For Windows servers running Windows 8/Server 2012 and later, run the following command in PowerShell:

```shell
Test-NetConnection listener.logz.io -Port {port}
```

| Good response | Bad response |
|---|---|
| Connected to listener-group.logz.io Escape character is '^]' | trying xxx.xxx.xxx.xxx.... |

To exit the screen, type `Ctrl+]` and type in `quit`.

If you are unable to telnet to listener.logz.io on port 5015, please adjust your network settings to allow this communication. For a complete list of IPs used by the Logz.io listener, click [here](/user-guide/log-shipping/listener-ip-addresses.html).

###### Example for validating connection established

```
$ sudo netstat -taupn | grep filebeat
tcp        0      0  172.17.0.2:44912            52.21.71.179:5015            ESTABLISHED 39/filebeat
```

If no output has been sent, something is wrong. Check your network connectivity again.

Manually put something in the shipped log file to see if it is sent:

```
echo hello >> /var/log/my_log_file.log
```

##### Enable debugging and check the logs

If you are still encountering issues, enable debugging in Filebeat and check the logs for errors. See the official [Elastic guide](https://www.elastic.co/guide/en/beats/filebeat/current/enable-filebeat-debugging.html) for details.
