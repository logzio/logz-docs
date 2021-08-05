---
layout: article
title: Accounts
permalink: /user-guide/accounts/
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
---

Each Logz.io plan has one main account, from which admin users can create and manage sub accounts.

![Manage accounts](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/flexible-volume-sub-accounts.png)

You can find the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page by clicking **Settings > ADMIN ZONE > Manage accounts** in the navigation menu.

## Configuration options

* **Access control** (Pro and Enterprise plans)

    You can control access to different sets of data by shipping your logs to different sub accounts, each with its own set of users. You can also use account default permissions to determine who can access and read the data. [Manage sub accounts](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html)

* **Flexible volume**

    You can make the most of your plan's indexing capacity by switching to flexible volume. Flexible volume makes it easier to ensure that accounts don't max out their indexing capacity. [Explore flexible volume options](/user-guide/accounts/flexible-volume.html)


{% include /account-info/flexible-account-50subs.md %}


* **Long-term storage**

    Optimizers are great for analyzing long-term patterns and trends on aggregated data.
    
    You can use [data optimizers](/user-guide/optimizers/configure-optimizers.html) to copy select data from your logs and store them long term in a timeless account. Data stored to timeless accounts is easily searched and continuously available without requiring additional steps to restore the data. [Explore timeless accounts](/user-guide/accounts/manage-timeless-accounts.html)

* **Archive and restore data**

    You can connect your Logz.io accounts to an S3 bucket or Azure Blob Storage to archive your logs. [Explore archiving options](/user-guide/archive-and-restore/)

    Before searching archived data, you'll need to restore it to its own temporary account. [Explore data restoring options](/user-guide/archive-and-restore/restore-archived-logs.html)
