---
layout: article
title: Archive & restore
permalink: /user-guide/archive-and-restore/
flags:
  admin: true
  logzio-plan: pro
tags:
  - s3
  - archive-and-restore
contributors:
  - imnotashrimp
---

Archiving provides a cost-effective solution for long-term storage of logs that don't need to be instantly searchable.

When you need to investigate old logs after they have expired from your account, you can restore them to a temporary account with no additional storage costs.

You can configure Logz.io to archive logs to an AWS S3 bucket or a Microsoft Azure Storage account.

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
