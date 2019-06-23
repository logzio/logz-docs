---
title: Ship Windows logs
logo:
  logofile: windows.svg
  orientation: vertical
data-source: Windows
contributors:
  - imnotashrimp
shipping-tags:
  - os
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Winlogbeat <span class="sm ital">(recommended)</span>](#winlogbeat-config)
* [NXLog](#nxlog-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="winlogbeat-config">

## Windows + Winlogbeat setup

**You'll need**:
[Winlogbeat](https://www.elastic.co/downloads/beats/winlogbeat)

1.  Download the Logz.io certificate

    For HTTPS shipping, download the [Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) to your machine.
    We'll place the certificate in `C:\ProgramData\Filebeat\COMODORSADomainValidationSecureServerCA.crt` for this example.

2.  Configure Windows input

    In the Winlogbeat configuration file (C:\Program Files\Winlogbeat\winlogbeat.yml by default), add this code block to the root level.

    {% include log-shipping/replace-vars.html token=true %}

    ```yaml
    fields:
      logzio_codec: json
      token: <<SHIPPING-TOKEN>>
      type: wineventlog
    fields_under_root: true
    ```

3.  Add Logz.io as an output

    If Logz.io is not an output in the Winlogbeat configuration file (C:\Program Files\Winlogbeat\winlogbeat.yml by default), add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
      hosts: ["<<LISTENER-HOST>>:5015"]
      ssl:
        certificate_authorities: ['C:\ProgramData\Filebeat\COMODORSADomainValidationSecureServerCA.crt']
    ```

4.  Remove remaining default blocks

    If the `output.elasticsearch` and `setup.template.settings` blocks are still in the configuration file, remove them.

    ```yaml
    # Remove this block if it's still in the config file
    setup.template.settings:
      index.number_of_shards: 3
    ```

    ```yaml
    # Remove this block if it's still in the config file
    output.elasticsearch:
      hosts: ["localhost:9200"]
    ```

5.  Restart Winlogbeat

    ```powershell
    PS C:\Program Files\Winlogbeat> Restart-Service winlogbeat
    ```

6.  Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
{:.tasklist.firstline-headline}

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="nxlog-config">

## Windows + NXLog setup

**You'll need**:
[NXLog](https://nxlog.co/products/nxlog-community-edition/download)

1.  Configure NXLog basics

    Copy this code into your configuration file (`C:\Program Files (x86)\nxlog\conf\nxlog.conf` by default).

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
    ```

2.  Add Windows as an input

    Add an `Input` block to append your account token to log records.

    {% include log-shipping/replace-vars.html token=true %}

    ```conf
    <Input eventlog>

    # For Windows Vista/2008 and later, set Module to `im_msvistalog`. For
    #  Windows XP/2000/2003, set to `im_mseventlog`.
        Module im_msvistalog

        Exec if $raw_event =~ /^#/ drop();
        Exec convert_fields("AUTO", "utf-8");
        Exec    $raw_event = '[<<SHIPPING-TOKEN>>][type=wineventlog]' + $raw_event;
    </Input>
    ```

3.  Add Logz.io as an output

    Add the Logz.io listener in the `Output` block.

    {% include log-shipping/replace-vars.html listener=true %}

    ```conf
    <Output out>
        Module  om_tcp
        Host    <<LISTENER-HOST>>
        Port    8010
    </Output>
    <Route 1>
        Path eventlog => out
    </Route>
    ```

4.  Restart NXLog

    ```powershell
    PS C:\Program Files (x86)\nxlog> Restart-Service nxlog
    ```
5.  Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).
{:.tasklist.firstline-headline}

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->