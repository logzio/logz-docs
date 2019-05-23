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

Archive and Restore helps you reconstruct past events that are out of your plan's retention period.
You can configure Logz.io to archive logs to your S3 bucket by providing your AWS credentials.
Logz.io continuously archives your logs as they come into the system—so you'll be able to restore your data when you need it.

![Archive and restore]({{site.baseurl}}/images/archive-and-restore/archive-and-restore-annotated.png)

You can get to this page by selecting
[**<i class="li li-gear"></i> > Tools > Archive and restore**](https://app.logz.io/#/dashboard/tools/archive-and-restore) in the top menu.


{: .letter-labels }

<!-- TODO letter labels -->
  Archive settings
  : You can configure Logz.io to archive your logs to an S3 bucket, keeping your overall costs down.

  Restore archived logs
  : Re-ingest up to 24 hours of out-of-retention logs from S3.

  Restored accounts
  : Shows a list of all the data restored to this account—including who made the request and its status.