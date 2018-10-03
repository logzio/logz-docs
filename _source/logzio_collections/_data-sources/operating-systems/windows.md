---
layout: article
title: Ship Windows data
shipping-summary:
  data-source: Windows
  log-shippers:
    - recommended: Winlogbeat
    - NXLog
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs}
  * [Winlogbeat](#winlogbeat-config)
  * [NXLog](#nxlog-config)

<div id="winlogbeat-config">

## Windows + Winlogbeat setup

**You'll need:** [Winlogbeat](https://www.elastic.co/downloads/beats/winlogbeat)

{: .tasklist }
1. For HTTPS shipping, download the [Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) to your machine.
We'll place the certificate in `C:\logzio_cert\COMODORSADomainValidationSecureServerCA.crt` for this example.

2. In the Winlogbeat configuration file (C:\Program Files\Winlogbeat\winlogbeat.yml by default), add this code block to the root level.

    {% include log-shipping/your-account-token.html %}

    ```yaml
    fields:
      logzio_codec: json
      token: {account-token}
    fields_under_root: true
    ```

3. If Logz.io is not an output in the Winlogbeat configuration file (C:\Program Files\Winlogbeat\winlogbeat.yml by default), add it now.

    {% include log-shipping/your-listener-url.html %}

    ```yaml
    output.logstash:
      hosts: ["{listener-url}:5015"]
      ssl:
        certificate_authorities: ['C:\logzio_cert\COMODORSADomainValidationSecureServerCA.crt']
    ```

4. If the `output.elasticsearch` and `setup.template.settings` blocks are still in the configuration file, remove them.

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

5. Start or restart Winlogbeat using Windows Services Manager.

6. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="nxlog-config">

## Windows + NXLog setup

{: .tasklist }
1. Copy this code into your configuration file (`C:\Program Files (x86)\nxlog\conf\nxlog.conf` by default).

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

2. Add an `Input` block to append your account token to log records.

    {% include log-shipping/your-account-token.html %}

    ```conf
    <Input eventlog>

    # For Windows Vista/2008 and later, set Module to `im_msvistalog`. For
    #  Windows XP/2000/2003, set to `im_mseventlog`.
        Module im_msvistalog

        Exec if $raw_event =~ /^#/ drop();
        Exec convert_fields("AUTO", "utf-8");
        Exec    $raw_event = '[{account-token}][type=msevent]' + $raw_event;
    </Input>
    ```

3. Add the Logz.io listener in the `Output` block.

    {% include log-shipping/your-listener-url.html %}

    ```conf
    <Output out>
        Module  om_tcp
        Host    {listener-url}
        Port    8010
    </Output>
    <Route 1>
        Path eventlog => out
    </Route>
    ```

3. Start or Restart NXLog using Windows Services Manager.

4. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>

</div>