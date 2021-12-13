---
layout: article
title: Archive & Restore
permalink: /user-guide/archive-and-restore/
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

![Archive and restore](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/new-annotated-archive.png)

You can get to this page by selecting
[**<i class="li li-gear"></i> > Tools > Archive & restore**](https://app.logz.io/#/dashboard/tools/archive-and-restore) in the top menu.


## Overview

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
