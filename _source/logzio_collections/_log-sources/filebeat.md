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

##### Add your first log source to the configuration file

{% include log-shipping/filebeat-wizard.html %}


<!-- logzio-inject:filebeat-wizard:os-linux -->



For each of the log types you plan to send to Logz.io, fill in the following:

* Select your operating system - **Linux** or **Windows**.
* Specify the full **Path** to the logs.
* Select a log **Type** from the list or select **Other** and give it a name of your choice to specify a custom log type. 
  * If you select a log type from the list, the logs will be automatically parsed and analyzed. [List of types available for parsing by default](https://docs.logz.io/user-guide/log-shipping/built-in-log-types.html).
  * If you select **Other**, contact support to request custom parsing assistance. Don't be shy, it's included in your plan!
* Select the log format - **Plaintext** or **Json**.
* (_Optional_) Enable the **Multiline** option if your log messages span
multiple lines. You’ll need to give a regex that
identifies the beginning line of each log.
* (_Optional_) Add a custom field. Click **+ Add a field** to add additional fields.

##### Add additional sources (_Optional_)

The wizard makes it simple to add multiple log types to a single configuration file. Click **+ Add a log type** to fill in the details for another log type. Repeat as necessary.


##### Validate the file

When you're done adding your sources, click **Make the config file** to download it.

You can compare it to our [sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) if you have questions.

If you've edited the file manually, it's a good idea to run it through a YAML validator to rule out indentation errors, clean up extra characters, and check if your yml file is valid. ([Yamllint.com](http://www.yamllint.com/) is a great choice.)

##### Move the configuration file to the Filebeat folder

Move your configuration file to `/etc/filebeat/filebeat.yml`.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
