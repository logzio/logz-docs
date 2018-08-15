---
layout: article
title: IIS-NXLog log shipping
permalink: /user-guide/log-shipping/shipping-methods/server-app--iis-nxlog.html
contributors:
  - imnotashrimp
---

##### Requirements

* You have admin access
* NXLog is [installed](https://nxlog.co/products/nxlog-community-edition/download)
* You can send outgoing traffic to destination port 8010

###### Configure NXLog to ship IIS logs

1. Copy this code into your configuration file (at `C:\Program Files (x86)\nxlog\conf\nxlog.conf`).

    {% include your-account-token.html %}

    {% include your-listener-url.html %}

    ```
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
        Exec $raw_event = '[{your-account-token}][type=iis]' + $raw_event;
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

2. Restart NXLog using the Services tool.

3. Confirm you're shipping logs by opening an IIS-hosted webpage in your browser. Give your logs a minute to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).