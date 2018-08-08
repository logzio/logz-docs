---
layout: article
title: NGINX-Filebeat log shipping
permalink: /user-guide/log-shipping/shipping-methods/server-app--nginx-filebeat.html
contributors:
  - imnotashrimp
---

This article is for automatic installation of your Filebeat configuration file. If you want to do the installation manually, you can download the [source configuration](https://raw.githubusercontent.com/logzio/filebeat-templates/master/nginx-filebeat.yml).

##### Requirements

* You have sudo access
* Filebeat is [installed](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html)
* You can send outgoing traffic to destination port 5015

###### Configure Filebeat on macOS/Linux to ship NGINX logs

1. For HTTPS shipping, download the Logz.io public certificate and copy it to your certificate authority folder.

    ```shell
    wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt && sudo mkdir -p /etc/pki/tls/certs && sudo mv COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
    ```

2. Download Logz.io Filebeat configuration to the Filebeat folder. 

    {% include your-account-token.html %}

    ```shell
    sudo curl -o filebeat.yml -s https://raw.githubusercontent.com/logzio/filebeat-templates/master/nginx-filebeat.yml && sudo sed -i 's/LOGZIO-TOKEN/{your-account-token}/g' ./filebeat.yml

    sudo mv filebeat.yml /etc/filebeat/filebeat.yml
    ```

3. If they're not already running, start Filebeat and NGINX.

    ```shell
    sudo systemctl start filebeat

    sudo systemctl start nginx
    ```

4. Confirm you're shipping logs by opening an NGINX-hosted webpage in your browser. Give your logs a minute to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).