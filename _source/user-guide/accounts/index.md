---
layout: article
title: Accounts
permalink: /user-guide/accounts/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Manage your Logz.io accounts and sub accounts
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - sub-accounts
  - main-account
  - timeless-accounts
contributors:
  - shalper
  - imnotashrimp
  - hidan
---


Each Logz.io plan starts with a main account, and you can expand your account to send additional logs, data, metrics, and so on.

The following guide will help you get familiarized with your Logz.io account, understand how to use it, and provide some additional tips and tricks.

In this guide:


* [Configuration options](/user-guide/accounts/#configuration-options)
  * [Access control](/user-guide/accounts/#access-control-pro-and-enterprise-plans)
  * [Flexible volume](/user-guide/accounts/#flexible-volume)
  * [Long-term storage](/user-guide/accounts/#long-term-storage)
  * [Archive and restore](/user-guide/accounts/#archive-and-restore-data)
* [Your account dictionary](/user-guide/accounts/#your-account-dictionary)
* [Main vs. sub account](/user-guide/accounts/#main-vs-sub-account)
  * [Configuring your Sub account](/user-guide/accounts/#manage-your-sub-account)
* [Manage your accounts](/user-guide/accounts/#manage-your-accounts)


### Configuration options

There are several different configurations you can apply to your account, including:

##### **Access control** (Pro and Enterprise plans)

You can control access to different sets of data by shipping your logs to sub accounts, each with its own set of users. You can also use account default permissions to determine who can access and read the data. [Manage sub accounts](https://docs.logz.io/user-guide/accounts/manage-the-main-account-and-sub-accounts.html).

##### **Flexible volume**

You can make the most of your plan’s indexing capacity by switching to flexible volume. Flexible volume makes it easier to ensure that accounts don’t max out their indexing capacity. [Explore flexible volume options](https://docs.logz.io/user-guide/accounts/flexible-volume.html).


You can include up to 200 sub accounts when flexible volume is enabled. To add more sub accounts, you’ll have to disable the flexible volume option.
{:.info-box.note}

##### **Long-term storage**

Optimizers are great for analyzing long-term patterns and trends on aggregated data.

You can use [data optimizers](https://docs.logz.io/user-guide/optimizers/configure-optimizers.html) to copy select data from your logs and store them long-term in a timeless account. Data stored in timeless accounts is easily searched and continuously available without requiring additional steps to restore the data. [Explore timeless accounts](https://docs.logz.io/user-guide/accounts/manage-timeless-accounts.html).

##### **Archive and restore data**

You can connect your Logz.io accounts to an S3 bucket or Azure Blob Storage to archive your logs. [Explore archiving options](https://docs.logz.io/user-guide/archive-and-restore/).

Before searching archived data, you’ll need to restore it to its own temporary account. [Explore data restoring options](https://docs.logz.io/user-guide/archive-and-restore/restore-archived-logs.html).

### Your account dictionary


| Settings | Description |
|---|---|
| **Token** | The default [token](/user-guide/tokens/) for the account. Each account has a set of different tokens which you can use to configure shippers, send data to your account, allow access, and more. Keep these tokens secure. |
| **Account name** | Your account name. You can edit and update it at any time. |
| **Total daily volume** | The maximum volume of logs/data you can ship per calendar day. The index resets every day at midnight (00:00 UTC). |
| **Retention** | The number of days your data is kept in storage. |
| **Save account utilization metrics** | You can enable this option to log [account utilization metrics](/user-guide/accounts/monitor-account-usage.html#what-are-account-utilization-metrics). Depending on the required granularity, metrics can be calculated every 10, 30, or 60 minutes. Utilization data is stored in a separate index as the log type: `logzio_account_utilization`. |
| **Save log size** | Adds a [new field](/user-guide/accounts/monitor-account-usage.html#what-happens-when-i-save-log-size) to incoming logs. This new field is called `LogSize`, and it contains the log size in bytes. |
| **Use objects from the selected accounts** | Gives the account access to Kibana objects (dashboards, visualizations, saved searches) stored in other accounts under the same plan. |
{:.paramlist}


### Main vs. sub account

If you're on a Pro or Enterprise plan, you can create sub accounts to help manage user access to your data.

Sub accounts help you control data usage and manage user access to your logs.

You can define data volumes and retention periods for independent environments by shipping different logs to different sub accounts.

Sub accounts can also help you control access to sensitive data.

By default, all users of your main account have permission to view the data in other logging sub accounts and timeless accounts. You can route different logs to different sub accounts to limit access to data.

### Manage your Sub account

Sub accounts share the same setting options as the main account (See the list above). In addition, sub accounts have settings used to control access to the data.

To add a sub account, navigate to the [Manage accounts]() page, choose the plan to which you'd like to add a sub account, and click on the **Add sub account** button located at the top right section of each plan.

![Add sub account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/add-sub-account.png)

Choose the sub account name, retention, and volume options if relevant. On the right hand side, you'll have additional options for this sub account, including:


| Settings | Description |
|---|---|
| **Enable main account users to access this account** | If enabled, all main account users will automatically have user-role permissions to the sub account. This means they can view the log data in the sub account. If disabled, users will need to be explicitly added to the sub account to have access to it. |
| **Searchable from the main account** | If enabled, data stored in the sub account, can be searched directly from the main account in Kibana. |
| **Save account utilization metrics** | Logs metrics on your account utilization, such as used and expected data volume at current indexing rate (GB). |
| **Save log size** | Adds the logSizeEnabled field to each log, stating the log's size. |
| **Use dashboards, visualizations, and saved searches from these accounts** | Choose the main account from which these elements will be visible on the sub account. Useful if you want to be able to access your main account's data from this sub account. |
{:.paramlist}


If you already have a sub account and you'd like to re-configure it, choose the relevant sub account from the list and click on **Advanced options** to access these settings.

![Manage existing sub accounts](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/manage-sub-account.gif)

### Manage your accounts

Learn more about managing your **Log Management**, **Distributed Tracing**, **Infrastructure Monitoring**, and **Cloud SIEM** accounts, [here](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html). 