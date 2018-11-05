---
layout: article
title: Fluentd
logo:
  logofile: fluentd.svg
  orientation: vertical
shipping-summary:
  data-source: Fluentd
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Filebeat
contributors:
  - imnotashrimp
---

**You'll need:** [Fluentd](https://www.fluentd.org/download) 1.0 or higher, root access

###### Configuration at a glance

| **Listener URL** | `listener.logz.io` or `listener-eu.logz.io` |
| **Listener port** | 8071 |

###### Configuration wizard

{: .tasklist .firstline-headline }
1. Install the Logz.io plugin for Fluentd

    ```shell
    gem install fluent-plugin-logzio
    ```

2. Move the configuration file to the Filebeat folder

    **Mac/Linux:** Move the configuration file to `/etc/filebeat/filebeat.yml`.

    **Windows:** Move the configuration file to `C:\Program Files\Filebeat\filebeat.yml`.

3. Restart Filebeat

    **Max/Linux:**

    ```shell
    sudo systemctl restart filebeat
    ```

    **Windows:**

    ```powershell
    PS C:\Program Files\Filebeat> Restart-Service filebeat
    ```

4. Test your configuration

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
