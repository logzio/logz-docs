---
layout: article
title: Restore archived logs
permalink: /user-guide/archive-and-restore/restore-archived-logs.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - s3
  - archive-and-restore
contributors:
  - shalper
  - imnotashrimp
  - danielberman
---

![Restore a new account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/restored-accounts.png)

When you restore archived logs,
those logs are re-ingested into a temporary restored account
that you can search from your main account.
Restoring archived logs allows you to see your data in its original detail,
so you can investigate events in Kibana that are older than your plan’s retention period.

#### To restore and view archived logs

**Before you begin, you'll need**:
[Archiving enabled](https://app.logz.io/#/dashboard/tools/archive-and-restore),
archived logs in your S3 bucket

<div class="tasklist">

##### Make your preparations

There are a few things you need to check before you begin the process.

1. Double-check your [Drop filters]({{site.baseurl}}/user-guide/accounts/drop-filters/) to make sure logs you need won't be filtered.

    If you're planning to restore logs that could be dropped by your drop-filters, you'll need to first make the necessary changes to your drop-filters before restoring. Otherwise the logs will just be dropped right after they are restored, and before   they reach your Logz.io account.

2. There's a **100 GB limit** on restoring from archive from the AWS side. If you exceed this limit, the restore will fail at the end of the process.

    To avoid this outcome, we recommend calculating the volume of logs you are about to restore to make sure it is under the limit. You can make a rough calculation by looking at the daily volume of logs you ship (BEFORE applying drop-filters) against the number of hours you intend to restore.

    You can look up your account's volume analysis [here](https://app.logz.io/#/dashboard/settings/usage-and-billing).

##### Restore your archives

In the _Restore_ tab, give your restored account a **Name**, choose a **Time range** of up to 24 hours, and click **Restore**.

The time it takes to restore your archives depends on a few factors,
so there's no way to know how long your re-ingestion will take.

You'll receive an email when the restored account is ready.

As an informal guideline, if you're restoring an hour's worth of data, go have a cup of coffee.
If you're restoring a day's worth of data, take a long lunch break.

##### Explore the restored account in Kibana

Open the email that says your restored account is ready for you and click **View in Kibana**.
This link takes you to Kibana in your main account, but a view that shows only the data from the restored account.

If you need to filter Kibana manually,
choose the new restored account in the **Selected Accounts** box,
and then select your data's original **Time Range**.
{:.info-box.tip}

Now you're ready to search your restored account!
Just be aware of the expiration—once the restored account expires, you'll have to restore it if you need it again.

</div>
