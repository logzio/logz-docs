---
layout: article
title: Set a custom Logz.io landing page
permalink: /user-guide/accounts/homepage.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Choose your main Logz.io landing page
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - sub-accounts
  - main-account
  - timeless-accounts
contributors:
  - hidan
---

To help you focus on the things that are critical to you, you can choose a custom landing page to view whenever you log into Logz.io. Your landing page can be any dashboard, service, object, or any other element - from either Logs, Metrics, or Tracing.

To set your custom landing page, navigate to **Settings > General settings**. The default setting 

This will be the default page when you sign in or press the Logz.io symbol on the top left of the navigation bar.


Each Logz.io plan starts with a main account, and you can expand your account to send additional logs, data, metrics, and so on.

The following guide will help you get familiarized with your Logz.io account, understand how to use it, and provide some additional tips and tricks.

In this guide:


* [Configuration options](/user-guide/accounts/#configuration-options)
  * [Access control](/user-guide/accounts/#access-control-pro-and-enterprise-plans)
  * [Flexible volume](/user-guide/accounts/#flexible-volume)
  * [Long-term storage](/user-guide/accounts/#long-term-storage)
  * [Archive and restore](/user-guide/accounts/#archive-and-restore-data)
* [Your account dictionary](/user-guide/accounts/#your-account-dictionary)
* [Manage your accounts](/user-guide/accounts/#manage-your-accounts)
  * [Manage your **Log Management** account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#logs)
  * [Manage your **Cloud SIEM** account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#siem)
  * [Manage your **Infrastructure Monitoring** (Metrics) account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#metrics)
  * [Manage your **Distributed Tracing** account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#tracing)
  * [Manage your **Timeless** account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#timeless)


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
| **Save account utilization metrics** | You can enable this option to log [account utilization metrics](/user-guide/accounts/manage-account-usage.html#what-are-account-utilization-metrics). Depending on the required granularity, metrics can be calculated every 10, 30, or 60 minutes. Utilization data is stored in a separate index as the log type: `logzio_account_utilization`. |
| **Save log size** | Adds a [new field](/user-guide/accounts/manage-account-usage.html#what-happens-when-i-save-log-size) to incoming logs. This new field is called `LogSize`, and it contains the log size in bytes. |
| **Use objects from the selected accounts** | Gives the account access to Kibana objects (dashboards, visualizations, saved searches) stored in other accounts under the same plan. |
{:.paramlist}

### Manage your accounts

Account admins have various options when it comes to managing the account. For further information, check out the following guides:

* [Manage your **Log Management** account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#logs)
* [Manage your **Cloud SIEM** account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#siem)
* [Manage your **Infrastructure Monitoring** (Metrics) account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#metrics)
* [Manage your **Distributed Tracing** account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#tracing)
* [Manage your **Timeless** account](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#timeless)