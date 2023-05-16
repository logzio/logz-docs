---
title: Ship OneLogin logs
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Ship OneLogin logs to Logz.io
logo:
  logofile: onelogin.png
  orientation: vertical
data-source: OneLogin
data-for-product-source: Cloud SIEM
templates: ["azure-deployment-event-hubs"]
contributors:
  - nshishkin
shipping-tags:
  - identity
order: 630
---

OneLogin is a cloud-based identity and access management (IAM) provider. This integration allows you to ship logs from your OneLogin account to your Logz.io account.

**Before you begin, you'll need**: 

* An active account with OneLogin
* An actie account with Logz.io

<div class="tasklist">

##### Login to your OneLogin account

Log in to your OneLogin account as admin.

##### Open the **New broadcaster** dialog

Navigate to **Developers > Webhooks > New broadcaster**.

##### Fill out the **New broadcaster** dialog
  
![New-broadcaster](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/New-broadcaster.png)

* In the **Title** field, enter **logzio**.

* In the **Format** field, select **SIEM (NDJSON)**.

* In the **Listener URL** field, enter `https://<<LISTENER-HOST>>:8071/?token=<<LOG-SHIPPING-TOKEN>>&type=onelogin`. {% include log-shipping/listener-var.html %} {% include log-shipping/log-shipping-token.md %}


##### Save changes

When everything is filled out, click **Save**.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd). You can search for `type:onelogin` to filter for your OneLogin logs.
  
If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

