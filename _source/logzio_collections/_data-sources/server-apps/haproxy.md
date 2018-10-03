---
layout: article
title: Ship HAProxy data
logofile: haproxy.png
shipping-summary:
  data-source: HAProxy
  log-shippers:
    - rsyslog
  os: Linux
contributors:
  - imnotashrimp
---

## HAProxy + rsyslog setup

**You'll need:** root access, rsyslog 5.8.0 or later

{: .tasklist }
1. Copy this text to your HAProxy configuration (`/etc/haproxy/haproxy.cfg` by default).

    ```conf
    global
      log 127.0.0.1:514 len 4096 local1 # Send logs to localhost port 514 over UDP, facility set to ‘local1’

    defaults HTTP # HTTP Defaults
      log global # refer to the global log definition
      option dontlog-normal # disable logging of normal, successful connections
      mode http
      option httplog # Enable logging of HTTP request, session state and timers

    listen INPUT_NAME_HTTP
      bind :PORT

      server SERVER_NAME SERVER_ADDRESS:PORT

    defaults TCP # TCP Defaults
      log global # refer to the global log definition
      option dontlog-normal # disable logging of normal, successful connections
      mode tcp
      option tcplog # Enable advanced logging of TCP connections, session state and timers

    listen INPUT_NAME_TCP
      bind :PORT

      server SERVER_NAME SERVER_ADDRESS:PORT
    ```

2. Copy this text to your rsyslog configuration (`/etc/rsyslog.conf` by default).

    {% include log-shipping/your-account-token.html %}

    {% include log-shipping/your-listener-url.html %}

    ```conf
    $ModLoad imuxsock # provides support for local system logging
    $ModLoad imklog # provides kernel logging support
    $ModLoad imudp
    $UDPServerAddress 0.0.0.0 # listen on the localhost , protocol UDP
    $UDPServerRun 514 # listen on port 514, protocol UDP
    $KLogPermitNonKernelFacility on
    $ActionFileDefaultTemplate RSYSLOG_TraditionalFileFormat
    $RepeatedMsgReduction on
    $FileOwner syslog
    $FileGroup adm
    $FileCreateMode 0640
    $DirCreateMode 0755
    $Umask 0022
    $PrivDropToUser syslog
    $PrivDropToGroup syslog
    $WorkDirectory /var/spool/rsyslog

    # the logz.io syslog template,
    $template HAProxyLogzioFormat,"[{account-token}] <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [type=haproxy] %msg%\n"

    # Send messages to Logz over TCP using the template.
    *.* @@{listener-url}:5000;HAProxyLogzioFormat
    ```

3. Restart rsyslog.

    ```shell
    sudo service rsyslog restart
    ```

4. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).