---
layout: article
title: Manage log accounts
permalink: /user-guide/accounts/manage-the-main-account-and-sub-accounts.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - accounts
  - main-account
  - sub-accounts
contributors:
  - shalper
  - ayigal
  - imnotashrimp
---

Each Logz.io plan starts off with a main account.
If you're on a Pro or Enterprise plan,
you can create sub accounts to help manage user access to your data.

## Main vs. Sub account

Sub accounts help you control data usage and manage user access to your logs.
By shipping different logs to different sub accounts,
you can define data volumes and retention periods for independent environments.

Sub accounts can also help you control access to sensitive data.
By default, all users of your main account have permission to view the data in other logging sub accounts and timeless accounts. You can route different logs to different sub accounts to limit access to data.


## Managing your accounts

If you're an admin for the main account,
you can manage the main account and sub accounts
from the [**Manage Accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts) page
(**<i class="li li-gear"></i> > Settings > Manage accounts** in the navigation menu).


### Main account settings

![Manage the main account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/accounts--manage-main-account2.png)


| Settings | Description |
|---|---|
| **Token** | The default log shipping [token](/user-guide/tokens/) for the account. It is used to configure shippers to send logs to your account. Keep this token secure. |
| **Account name** | Your account name. You can edit and update it at any time. |
| **Total daily volume** | The maximum volume of logs you can ship per calendar day, in GB. The index resets every day at midnight (00:00 UTC). |
| **Retention** | The number of days your logs are kept in storage and available in Kibana. |
| **Save account utilization metrics** | You can enable this option to log [account utilization metrics](/user-guide/accounts/manage-account-usage.html#what-are-account-utilization-metrics). Depending on the required granularity, metrics can be calculated every 10, 30, or 60 minutes. Utilization data is stored in a separate index as the log type: `logzio_account_utilization`. |
| **Save log size** | Adds a [new field](/user-guide/accounts/manage-account-usage.html#what-happens-when-i-save-log-size) to incoming logs. This new field is called `LogSize`, and it contains the log size in bytes. |
| **Use objects from the selected accounts** | Gives the account access to Kibana objects (dashboards, visualizations, saved searches) that are stored in other accounts under the same plan. |
{:.paramlist}

### Sub account settings

Sub accounts share the same setting options as the main account (See the list above). In addition, sub accounts have settings used to control access to the data.

![Sub account settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/fixed-sub-account-settings.png)

| Settings | Description |
|---|---|
| **Enable main account users to access this account** | If enabled, all main account users will automatically have user-role permissions to the sub account. This means they can view the log data in the sub account. If disabled, users will need to be explicitly added to the sub account to have access to it. |
| **Searchable from the main account** | If enabled, data stored in the sub account, can be searched directly from the main account in Kibana. |
{:.paramlist}
