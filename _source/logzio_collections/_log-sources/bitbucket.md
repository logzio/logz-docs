---
title: Ship Bitbucket logs
logo:
  logofile: bitbucket.png
  orientation: vertical
data-source: Bitbucket
data-for-product-source: Logs
templates: ["azure-deployment-event-hubs"]
tags:
  - azure
  - event-hubs
contributors:
  - nshishkin
shipping-tags:
  - azure
order: 630
---

Bitbucket is a Git-based source code repository hosting service. This integration allows you to ship logs from your Bitbucket repository to your Logz.io account.

**Before you begin, you'll need**: 

* An active account with Bitbucket and a Bitbucket repository
* An actie account with Logz.io

<div class="tasklist">

##### Open the Bitbucket repository

Log in to your Bitbucket account and navigate to the repository that you need to send logs from.

##### Open the **Add new webhook** page

Navigate to **Repository Settings > Webhooks > Add webhook**.

##### Fill out the **Add new webhook** page

* In the **Title** field, enter **logzio**.

* In the **URL** field, enter `http://<<LISTENER-HOST>>:8070/?token=<<LOG-SHIPPING-TOKEN>>`. {% include log-shipping/listener-var.html %} {% include log-shipping/log-shipping-token.md %}

* In the **Status** section, enable **Active**.

* Skip the **SSL/TLS** section.

* In the **Triggers** section, enable all triggers.

##### Save changes

When everything is filled out, click **Save**.


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana/discover?). 
  
If you still don’t see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

