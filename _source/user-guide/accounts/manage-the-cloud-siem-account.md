---
layout: article
title: Manage the Cloud SIEM account
permalink: /user-guide/accounts/manage-the-cloud-siem-account.html
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

When Logz.io detects a security event in your system,
it creates a log entry in your Cloud SIEM account.
Logs are not shipped directly to your Cloud SIEM account.
Instead, you'll grant read access to the other accounts you want to monitor.

If you don't have a Cloud SIEM account yet,
reach out to your account manager
or email [the Sales team](mailto:sales@logz.io).
{:.info-box.note}

![Manage the Cloud SIEM account]({{site.baseurl}}/images/accounts/manage-security-account.png)

You can manage your Cloud SIEM account
from the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page.
You'll need to be signed in to the main account in your Operations workspace.

#### To manage your Cloud SIEM account

<div class="tasklist">

##### Select your Cloud SIEM account

You'll find your Cloud SIEM account
in the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page
of your Operations workspace,
toward the bottom of the page.

If you want, change the **Security account name** here.

##### Set read permissions

Give **Read permissions** for any accounts you want to monitor.

Your Cloud SIEM account will watch the logs of these accounts.

Any security events are stored as their own logs in Cloud SIEM.

##### Save your changes

Click **Apply** to save your changes.

</div>
