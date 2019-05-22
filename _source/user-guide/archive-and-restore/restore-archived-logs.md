---
layout: article
title: Restore an archive
permalink: /user-guide/archive-and-restore/restore-archived-logs.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - s3
  - archive-and-restore
contributors:
  - imnotashrimp
  - danielberman
---

When you restore archived logs,
those logs are re-ingested into a temporary restored account that you can search from your main account.
Restoring archived logs allows you to see your data in its original detail,
so you can investigate events in Kibana that are older than your plan’s retention period.

<div class="fpo fpo-1"> </div>
<!-- TODO screen shot -->

You can find Archive & Restore by selecting [**<i class="li li-gear"></i> > Tools > Archive & restore**](https://app.logz.io/#/dashboard/tools/archive-and-restore) in the top menu.

###### To restore and view archived logs

**You'll need**:
[Archiving enabled](https://app.logz.io/#/dashboard/tools/archive-and-restore),
archived logs in your S3 bucket

{: .tasklist .firstline-headline }
1. Restore your archives

    In the _Restore_ tab, give your restored account a **Name**, choose a **Time range** of up to 24 hours, and click **Restore**.

    The time it takes to restore your archives depends on a few factors.
    For this reason, we can't give an estimate for how long your re-ingestion will take.

    As an informal guideline, if you're restoring an hour's worth of data, go have a cup of coffee.
    But if you're restoring a day's worth of data, have some lunch.

    Logz.io sends an email when the restored account is ready.

2. Explore the restored account in Kibana

    Open the email that says your restored account is ready for you and click **View in Kibana**.
    This link takes you to Kibana in your main account, but a view that shows only the data from the restored account account.

    <div class="info-box tip">

      If you need to filter Kibana manually,
      choose the new restored account in the **Selected Accounts** box,
      and then select your data's original **Time Range**.

    </div>

    Now you're ready to search your restored account!
    You can search your restored account the same as any other logs in Kibana.
    Just be aware of your restored account's expiration—
    once the account expires, you'll have to restore it if you need it again.