---
title: Ship logs from Azure VM
logo:
  logofile: Octocat.png
  orientation: vertical
data-source: GitHub
templates: ["no-template"]
contributors:
  - nshishkin
shipping-tags:
  - ci-cd
order: 640
---

Extensions are small applications that provide post-deployment configuration and automation on Azure VMs.

Logz.io's logs extension allows shipping logs directly from your VM to your Logz.io account, using Filebeat.

#### Ship logs from Azure VM to Logz.io

**Before you begin, you'll need**: 

* Running Azure VM - Ubuntu 18.04+
* Python 3.6+ installed on your VM

<div class="tasklist">

##### Add a webhook to your GitHub project

Open your GitHub project. On your project page, go to **Setting** > **Webhooks** and select **Add webhook**.

![How to add a GitHub webhook](https://dytvr9ot2sszz.cloudfront.net/logz-docs/integrations/github-webhooks.png)

##### Add your payload url


For the **Payload url**, use either of the following formats. You can send your data encrypted via HTTPS, or unencrypted, via HTTP:

###### For HTTPS shipping

```
https://<<LISTENER-HOST>>:8071/?token=<<LOG-SHIPPING-TOKEN>>&type=github
```

###### For HTTP shipping

```
http://<<LISTENER-HOST>>:8070/?token=<<LOG-SHIPPING-TOKEN>>&type=github
```

{% include /log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %}

##### Configure your webhook

Complete filling in the form:

2. **Content Type**: Select **application/json**.
3. **Secret**: Leave it blank. Your Logz.io account token is used to securely route your logs to your account.
4. **SSL verification**: We recommend enabling SSL verification.
5. Select your event triggers. The options available are:
    * **Just the push event**
    * **Send me everything**
    * **Let me select individual events**. A checklist will appear for you to make your selections.
6. **Active**. Make sure this checkbox is enabled.
7. Click **Add webhook** to save your webhook.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana). Search for `type:github` in Kibana Discover to filter for your GitHub events. Your logs should be already parsed thanks to the Logz.io preconfigured parsing pipeline.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
