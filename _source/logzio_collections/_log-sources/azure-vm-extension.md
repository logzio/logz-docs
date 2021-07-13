---
title: Ship logs from Azure VM
logo:
  logofile: azure-VMs.svg
  orientation: vertical
data-source: Azure VM
templates: ["no-template"]
contributors:
  - mirii1994
  - nshishkin
shipping-tags:
  -  azure
order: 640
---
## Overview

Extensions are small applications that provide post-deployment configuration and automation on Azure VMs.

Logz.io Azure VM extension allows you to ship logs directly from your VM to your Logz.io account, using Filebeat.

#### Ship logs from Azure VM to Logz.io

**Before you begin, you'll need**: 

* Running Azure VM - Ubuntu 18.04+
* Python 3.6+ installed on your VM

<div class="tasklist">

##### Define the VM in your Azure portal

Log in to your [Azure portal](https://portal.azure.com/) and navigate to the VM that you need to install the extension on. Make sure that the VM is runnig.

##### Install the extension with default Filebeat settings

In the Cloudshell of your VM directory, run:

```shell

az vm extension set -n <<EXTENSION-NAME>> --publisher logzio --vm-name <<VM-NAME>> --resource-group <<VM-RESOURCE-GROUP>> --protected-settings '{\"logzioLogsToken\":\"<<LOG-SHIPPING-TOKEN>>\", \"logzioListener\":\"<<LISTENER-HOST>>:5015\"}'

```

* Replace `<<VM-NAME>>` with the name of your VM.
* Replace `<<VM-RESOURCE-GROUP>>` with the name of your VM resource group.
{% include general-shipping/replace-placeholders.html %}

The default setting of the extension will collect log files from the var/log directory. If you need to customize the settings, refer to [Custom settings](#Custom).

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


#### <a name="Custom"></a>Custom settings

If you need to customize the Filebeat settings, you can define them in a configuration file and then refer the extension to this file. In this case, you will need to specify the log shipping token and listener URL in that configuration file.

To install the extension with a custom configuration, run the following command in the Cloudshell of your VM directory:

```shell

az vm extension set -n <<EXTENSION-NAME>> --publisher logzio --vm-name <<VM-NAME>> --resource-group <<VM-RESOURCE-GROUP>> --protected-settings <PATH-TO-YOUR-CONFIG>

```

* Replace `<<VM-NAME>>` with the name of your VM.
* Replace `<<VM-RESOURCE-GROUP>>` with the name of your VM resource group.
* Replace `<<PATH-TO-YOUR-CONFIG>>` with the path to your custom configuration file.


</div>
