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
  - imnotashrimp
  - danielberman
---

![Restore a new account]({{site.baseurl}}/images/archive-and-restore/restored-accounts.png)

When you restore archived logs,
those logs are re-ingested into a temporary restored account that you can search from your main account.
Restoring archived logs allows you to see your data in its original detail,
so you can investigate events in Kibana that are older than your plan’s retention period.

###### To restore and view archived logs

**You'll need**:
[Archiving enabled](https://app.logz.io/#/dashboard/tools/archive-and-restore),
archived logs in your S3 bucket

{: .tasklist .firstline-headline }
1.  Restore your archives

    In the _Restore_ tab, give your restored account a **Name**, choose a **Time range** of up to 24 hours, and click **Restore**.

    The time it takes to restore your archives depends on a few factors.
    For this reason, we can't give an estimate for how long your re-ingestion will take.

    As an informal guideline, if you're restoring an hour's worth of data, go have a cup of coffee.
    But if you're restoring a day's worth of data, have some lunch.

    Logz.io sends an email when the restored account is ready.

2.  Explore the restored account in Kibana

    Open the email that says your restored account is ready for you and click **View in Kibana**.
    This link takes you to Kibana in your main account, but a view that shows only the data from the restored account.

      If you need to filter Kibana manually,
      choose the new restored account in the **Selected Accounts** box,
      and then select your data's original **Time Range**.
      {: .info-box.tip }

    Now you're ready to search your restored account!
    Just be aware of the expiration—once the restored account expires, you'll have to restore it if you need it again.