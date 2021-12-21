---
layout: article
title: Archive & Restore
permalink: /user-guide/archive-and-restore/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Learn about long term log archiving to an AWS S3 bucket or a Microsoft Azure Storage account
flags:
  admin: true
  logzio-plan: pro
tags:
  - s3
  - archive-and-restore
contributors:
  - imnotashrimp
  - yberlinger
---

Archiving provides a cost-effective solution for long-term storage of logs that don't need to be instantly searchable. You can configure Logz.io to archive logs to an AWS S3 bucket or a Microsoft Azure Storage account.

When you need to investigate old logs after they have expired from your account, you can restore them to a temporary account with no additional storage costs.

<!--info-box-start:info -->
Restored accounts are complimentary, and do not count against your daily log volume.
{:.info-box.tip}
<!--info-box-end -->

To get to the **Archive and restore** page, select **Logs > Archive and restore**, (in **MANAGE DATA**).

![Navigate to Archive and Restore](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/archive-restore_nav.png)






## Overview


![Archive and restore](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/arch-res_config.gif)

Archive settings
: You can configure Logz.io to archive your logs to either an AWS S3 bucket or a Microsoft Azure Storage container. [Learn more](/user-guide/archive-and-restore/configure-archiving.html)

Restore archived logs
: Re-ingest up to 24 hours of archived logs.

Restored accounts
: Data is restored to a temporary account. The list of Restored accounts includes information about who made the request and its status. [Learn more](/user-guide/archive-and-restore/restore-archived-logs.html)
{:.letter-labels}


### Known limitations

Each account (or sub-account) should archive to a separate S3 bucket.

The maximum amount of data that can be restored is equal to your account’s daily reserved volume and is capped at 100 GB for all accounts (including accounts with a daily reserved volume greater than 100 GB).

If the restore process exceeds this maximum, the process fails.

<!--
* Each account (or sub-account) should archive to a **separate S3 bucket**.
* If the restore process exceeds the max, the process will fail.
* The max data to restore is equivalent to your account's daily **reserved volume**, and no more than 100 GB.
* Restore processes are capped at 100 GB. This maximum applies to accounts with a daily reserved volume greater than 100 GB. -->
