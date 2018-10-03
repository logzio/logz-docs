---
layout: article
title: Ship IIS data
shipping-summary:
  data-source: Microsoft IIS
  log-shippers:
    - NXLog
  os: Windows
contributors:
  - imnotashrimp
---

## IIS + NXLog setup

**You'll need:** Admin access

1. Copy this code into your configuration file (`C:\Program Files (x86)\nxlog\conf\nxlog.conf` by default).

    {% include log-shipping/your-account-token.html %}

    {% include log-shipping/your-listener-url.html %}

    ```conf
    define ROOT C:\\Program Files (x86)\\nxlog
    define ROOT_STRING C:\\Program Files (x86)\\nxlog
    define CERTDIR %ROOT%\\cert
    Moduledir %ROOT%\\modules
    CacheDir %ROOT%\\data
    Pidfile %ROOT%\\data\\nxlog.pid
    SpoolDir %ROOT%\\data
    LogFile %ROOT%\\data\\nxlog.log
    <Extension charconv>
        Module xm_charconv
        AutodetectCharsets utf-8, euc-jp, utf-16, utf-32, iso8859-2
    </Extension>

    #create one for each application
    <Input IIS_Site1>
        Module im_file
        File "C:\\inetpub\\logs\\LogFiles\\W3SVC1\\u_ex*.log"
        SavePos TRUE
        Exec if $raw_event =~ /^#/ drop();
        Exec convert_fields("AUTO", "utf-8");
        Exec $raw_event = '[{account-token}][type=iis]' + $raw_event;
    </Input>
    <Output out>
        Module  om_tcp
        Host    {listener-url}
        Port    8010
    </Output>

    <Route IIS>
        Path IIS_Site1 => out
    </Route>
    ```

2. Start or restart NXLog using Windows Services Manager.

3. Confirm you're shipping logs by opening an IIS-hosted webpage in your browser. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).