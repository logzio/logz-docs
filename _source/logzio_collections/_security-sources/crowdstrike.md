---
title: Ship events from Crowdstrike
logo:
  logofile: crowdstrike-logo.svg
  orientation: vertical
data-source: Crowdstrike
templates: ["network-device-filebeat"]
shipping-tags:
  - endpoint-security
order: 1380
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Setup instructions](#setup-instructions)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to ship Crowdstrike events from your Crowdstrike account to Logz.io using FluentD.


### Architecture overview

This integration includes:


* Establishing communication between the Crowdstrike connector and your Crowdstrike account
* Configuring a FluentD agent on your device
* Establishing communication between the FluentD agent and your Logz.io account

![Crowdstrike integration architecture](https://dytvr9ot2sszz.cloudfront.net/logz-docs/crowdstrike/Crowdstrike_draft.png)

Upon deployment, the Crowdstrike connector connects to your Crowdstrike account to collect events. This data is written into a file on your device. The FluentD agent collects the data from this file, connects to your Logz.io account and sends the events to Logz.io.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="setup-instructions">



#### Connect your Crowdstrike account to Logz.io

**Before you begin, you'll need**: 

* an active account with Crowdstrike
* an active account with Logz.io
* FluentD agent on your machine
* Crowdstrike connector installed on your machine


<div class="tasklist">


##### Configure Crowdstrike connector


1. Open the configuration file located at `/opt/crowdstrike/etc/cs.falconhoseclient.cfg`.
2. Enter the Client ID value into the `client_id` value field.
3. Enter the Client Secret value into the `client_secret` value field.
4. Make sure that the **base URL** in `api_url` and `request_token_url` corresponds to the base URL for your account.
5. Save the changes.


##### Install Ruby gems for FluentD

1. Install the **fluent-plugin_concat** gem. This gem concatenates multiline logs.
2. Install the **fluent-plugin-logzio** gem. This gem enables communication between your FluentD agent and Logz.io.


##### Configure FluentD

1. Write down your Logz.io listener URL and logs shipping token by navigating to your Logz.io account and selecting **Settings > Tools > Manage Tokens**. The Listener URL for your account is displayed above the token table.
2. Create a new configuration file for your FluentD. For example, `fluentdconfig.conf`.
3. Paste the following into the file:

   ```conf
   <system>
     log_level info
   </system>
   ​
   # Tailing the default path Crowdstrike's SIEM Connector
   <source>
     @type tail
     path /var/log/crowdstrike/falconhoseclient/output
     pos_file /var/log/td-agent/falconhoseclient.log.pos
     tag crowdstrike-fluentd
     <parse>
       @type none
     </parse>
   </source>
   ​
   # Concatenating the event as one log
   <filter crowdstrike-fluentd>
     @type concat
     key message
     multiline_start_regexp /^{/
     multiline_end_regexp /^}/
   </filter>
   ​
   # This adds type to the log && removes key log & message. If you change the type in this code section, the data is not parsed into the relevant fields for the Crowdstrike integration.
    <filter crowdstrike-fluentd>
      @type record_transformer
      <record>
        type crowdstrike
      </record>
    </filter>
   ​
   # Sending to Logz.io
   <match crowdstrike-fluentd>
     @type logzio_buffered
   ​
     endpoint_url https://<<LOGZIO_LISTENER>>:8071?token=<<LOGZIO_SHIPPING_TOKEN>>
   ​
     output_include_time true
     output_include_tags true
     http_idle_timeout 10
   ​
     <buffer>
         @type memory
         flush_thread_count 4
         flush_interval 3s
         chunk_limit_size 16m      # Logz.io bulk limit is decoupled from chunk_limit_size. Set whatever you want.
         queue_limit_length 4096
     </buffer>
   </match>
   ​
   # Exclude fluentd logs
   <label @FLUENT_LOG>
     <match **>
       @type null
     </match>
   </label>
   ```

   <!-- info-box-start:info -->
   The default configuration for the log level is set to **info**. The **log_level** setting defines which events are recorded in the log. In order of verbosity, the log level can be defined as **fatal**, **error**, **warn**, **info**, **debug** or **trace**. The **info** level records all events categorized as **info** and higher in verbosity. To learn more about the settings used in the configuration file, see [Logz.io plugin for Fluentd](https://github.com/logzio/fluent-plugin-logzio).
   {:.info-box.note}
   <!-- info-box-end -->

   <!-- info-box-start:info -->
   If you change `type` in the `@type record_transformer` section, the data is not parsed into the relevant fields for the Crowdstrike integration.
   {:.info-box.note}
   <!-- info-box-end -->

4. Replace ```<<LOGZIO_LISTENER>>``` with the Listener URL for your account.
5. Replace ```<LOGZIO_SHIPPING_TOKEN>``` with your token value.
6. Save the changes.


##### Start the Crowdstrike connector

Run the following command:

* For Ubuntu 14.x:

```shell
sudo start cs.falconhoseclientd
```

* For Ubuntu 16.04 and later:

```shell
sudo systemctl start cs.falconhoseclientd.service
```

* For CentOS:

```shell
sudo service cs.falconhoseclientd start
```


##### Start FluentD

Start your FluentD agent with the configuration file created for this integration.

For example, run `fluentd -c <<PATH-TO-YOUR-FLUENTD-CONFIG-FILE>>`. 


##### Check Logz.io for your events

Give your events some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). You can filter for data of type `crowdstrike` to see the incoming Crowdstrike events.
  
If you still don’t see your data, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
