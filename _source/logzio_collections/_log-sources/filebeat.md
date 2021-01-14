---
title: Shipping with Filebeat
logo:
  logofile: beats.svg
  orientation: vertical
data-source: Filebeat for macOS/Linux
shipping-tags:
  - log-shipper
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Filebeat
contributors:
  - imnotashrimp
  - amosd92
shipping-tags:
  - agents
---

Filebeat is the easiest way to get logs from files in your system to Logz.io,
and it's the tool we recommend for most situations.

This page is a general reference for Filebeat.
If you need instructions for a specific log source (such as nginx, MySQL, or Wazuh),
see [Log shipping sources]({{site.baseurl}}/shipping/).


#### Configure Filebeat on macOS or Linux

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html)


<div class="tasklist">

{% include log-shipping/certificate.md %}

##### Make your configuration file

{% include _source/_includes/log-shipping/filebeat-wizard.html %}


<!-- logzio-inject:filebeat-wizard -->



For each of the log types you plan to send to Logz.io, fill in the following:

* Select your operating system - **Linux** or **Windows**.
* Input the full path to the logs.
* Select a log **Type**. This determines the parsing pipeline used to automatically parse and analyze the logs. [List of types available for parsing by default](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html). Contact support if your log type is not on the list to request custom parsing assistance.
* Select the log format - **plaintext** or **Json**.
* Enable the **multiline** option if your log messages span
multiple lines. You’ll need to give a regex that
identifies the beginning line of each log. (_Optional_)
* Click **+ Add a field** to add another log type.

The wizard makes it simple to add multiple log types. Simply click **+ Add a log type** to add another log type and fill in the above parameters for each.


* We've prepared a [sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) as a reference to help guide you.
If you edit the file manually, it's a good idea to run it through a YAML validator. ([yamllint.com](http://www.yamllint.com/) is a great choice) to rule out indentation errors, clean up extra characters, and check if your yml file is valid.

##### Move the configuration file to the Filebeat folder

Once you're happy with your file, click **Make the config file** to download it.
Next, move your configuration file to `/etc/filebeat/filebeat.yml`.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
