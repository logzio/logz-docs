---
layout: article
title: Manage the Security Analytics account
permalink: /user-guide/accounts/manage-the-security-analytics-account.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - accounts
  - security-account
  - security-analytics
contributors:
  - imnotashrimp
---

Your Security Analytics account holds your system's security event logs.
Security content is largely managed by Logz.io—new content (such as security rules, dashboards, and visualizations) is deployed to all security accounts.

Logs are not shipped directly to your Security Analytics account.
Instead, you'll grant read access to the other accounts you want to monitor.

![Manage the Security Analytics account]({{site.baseurl}}/images/accounts/manage-security-account.png)

You can manage your Security Analytics account from the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page of your Operations workspace.

###### To manage your Security Analytics account

{: .tasklist }
1. In the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page of your Operations workspace, you'll find your Security Analytics account at the bottom of the page.

    If you want, change the **Security account name** here.

    If you don't have a Security Analytics account yet, reach out to your account manager or email [the Sales team](mailto:sales@logz.io).

2. Give **Read permissions** for any accounts you want to monitor.
  Your Security Analytics account will watch the logs of these accounts.
  Any security events are stored as their own logs in Security Analytics.

3. Click **Apply** to save your changes.