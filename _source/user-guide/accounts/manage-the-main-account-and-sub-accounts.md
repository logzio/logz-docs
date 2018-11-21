---
layout: article
title: Manage the main account and sub accounts
permalink: /user-guide/accounts/manage-the-main-account-and-sub-accounts.html
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - main-account
  - sub-accounts
contributors:
  - imnotashrimp
  - ayigal
---

Each Logz.io plan starts off with a main account.
If you're on a Pro or Enterprise plan, you can create sub accounts to help manage user access to your data.

## The main account

Users in your main account have access to your data in sub accounts and timeless accounts.
Admin users of the main account also have these permissions:

* Create, view, update, and delete users in the main account and sub accounts, including other admin users
* Create, view, update, and delete sub accounts
* Create, view, update, and delete timeless accounts
* Create and delete shared tokens and API tokens

Because of the high level of permissions, we recommend limiting the number of admin users in the main account.

## Sub accounts

Sub accounts help you control data usage and manage user access to your logs.
By shipping different logs to different sub accounts, you can define data volumes and retention periods for different environments.

## Managing your accounts

If you're an admin for the main account, you can manage the main account and sub accounts from the [**Manage Accounts**](https://app.logz.io/#/dashboard/settings/manage-users) page (**<i class="li li-gear"></i> > Settings > Manage accounts** in the top menu).

Click an account in the _Time based retention plan_ panel to see its settings.

![Manage the main account]({{site.baseurl}}/images/accounts/accounts--manage-main-account.png)

##### Time-based account settings

| Setting name | Description |
|---|---|
| Token | This is your account [token]({{site.baseurl}}/user-guide/tokens/), which you use when shipping logs to route them to your account. Keep this token secure. |
| Account name | A descriptive name for this account. |
| Total daily volume | The maximum volume of logs you can ship in a day, in GB. |
| Retention | The number of days to retain your logs. |
| Enable main account users to access this account | For sub accounts only. If selected, users who have access to the main account can also log in to this account.|
| Searchable from the main account | For sub accounts only. If selected, this account's logs can be searched from the main account. |
| Save account utilization metrics | Logs [account utilization metrics]({{site.baseurl}}/user-guide/accounts/monitor-account-usage.html#what-are-account-utilization-metrics) in regular increments—every 10, 30, or 60 minutes—depending on your settings. Stored as `logzio_account_utilization` type. |
| Save log size | Adds a [new field]({{site.baseurl}}/user-guide/accounts/monitor-account-usage.html#what-happens-when-i-save-log-size) to incoming logs. This new field is called `LogSize`, and it contains the size of the log line in bytes or kilobytes. |
| Use objects from the selected accounts | Allows this account to access Kibana objects (dashboards, visualizations, searches) stored in other accounts. |