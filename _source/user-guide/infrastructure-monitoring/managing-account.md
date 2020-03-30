---
layout: article
title: Managing your Metrics account
permalink: /user-guide/infrastructure-monitoring/metrics-account.html
flags:
  admin: true 
  logzio-plan:
tags:
contributors:
  - shalper
---

By default, your Metrics account is found under your main log monitoring account. 
To open it, log into your Logz.io Operations account and select the 
[Metrics tab](https://app.logz.io/#/dashboard/grafana/). 

![Navigate to your metrics account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/reach-metrics.png)

If the Metrics tab is missing, the account doesn't have permissions to it. You can give it permissions if you're an admin, as shown next. 


#### To add view access to your Metrics account

You can give your log-monitoring sub-accounts access to view the Metrics account.

To manage which log-monitoring accounts have view permissions to a Metrics account, select [**<i class="li li-gear"></i> > Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts) from the top-right corner.

Click on a Metrics account to expand its panel. Here you'll find the account's shipping token, account name, and usage history. 
You can add any of the log-monitoring sub-accounts in the drop-down list. 

![Managing Metrics account permissions](https://dytvr9ot2sszz.cloudfront.net/logz-docs/grafana/metrics-account-read-permissions.png)
