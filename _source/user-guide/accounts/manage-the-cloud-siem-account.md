---
layout: article
title: Manage Cloud SIEM accounts
permalink: /user-guide/accounts/manage-the-cloud-siem-account.html
flags:
  admin: true
  logzio-plan: enterprise
tags:
  - accounts
  - security-account
  - security-analytics
contributors:
  - shalper
  - imnotashrimp
---

You can manage your Cloud SIEM accounts
from the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page.
You'll need to be signed in to the main account in your Operations workspace.

If you're interested in adding a Cloud SIEM plan,
reach out to your account manager
or email [the Sales team](mailto:sales@logz.io).
{:.info-box.note}

#### To manage your Cloud SIEM accounts

Each Security account is a separate entity, with its own users, rules, and feeds.
Security accounts can’t access each other's dashboards, rules, private feeds, or data.


<div class="tasklist">

##### Add a Cloud SIEM account

You'll find your Cloud SIEM accounts
in the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page
of your Operations workspace. Scroll down towards the bottom of the page to see them.

Click **Add Security account** to open the form.
The number of accounts you can create is listed.

![Manage the Cloud SIEM account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/add-security-account.png)


##### Configure your new account

![Manage the Cloud SIEM account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/add-security-accounts.png)


Fill in the form:

1. **Name** (or rename) the account.
2. **Enable Cloud SIEM on these accounts** - Select the log accounts to be secured. You'll be giving the security account **read permissions** so it can monitor and enrich the logs.

    Logs are not shipped directly to your Cloud SIEM accounts. Instead, you'll grant read-access to log accounts you want a security account to monitor.

  You can add the same log account to multiple Security accounts. It will be monitored by each Security account independently.
  {:.info-box.note}


##### Save your changes

Click **Create**/**Apply** to save your changes.

When you first add a new account, give it a few minutes to finish setting up.

</div>
