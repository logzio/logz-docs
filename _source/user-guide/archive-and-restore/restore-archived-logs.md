---
layout: article
title: Restore archived logs
permalink: /user-guide/archive-and-restore/restore-archived-logs.html
image:  https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Restore and search your archived logs to a temporary account
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
  - hidan
---

![Restore a new account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/restored-accounts-overview.png)

When you restore archived logs,
those logs are re-ingested into a temporary account. You can search restored accounts directly from your main Logs account.
Restoring archived logs allows you to see your data in its original detail,
so you can investigate events in OpenSearch Dashboards that are older than your plan’s retention period.


### Known limitations

* The maximum data to restore is equivalent to your account's **daily reserved volume**, no more than 100 GB.
* If the restore process exceeds the max, the process will fail.
* Data can be restored from the **root of an S3 bucket**, but not a sub-bucket path.

#### To restore and view archived logs

**Before you begin, you'll need**:
[Archiving enabled](https://app.logz.io/#/dashboard/tools/archive-and-restore),
archived logs in your S3 bucket

<div class="tasklist">

<!-- ##### Make your preparations

There are a few things you need to check before you begin the process.

<!-- 1. Double-check your [Drop filters]({{site.baseurl}}/user-guide/accounts/drop-filters/) to make sure logs you need won't be filtered.

    If you're planning to restore logs that could be dropped by your drop-filters, you'll need to first make the necessary changes to your drop-filters before restoring. Otherwise the logs will just be dropped right after they are restored, and before   they reach your Logz.io account. 

2. The max data you can restore per restore process is equivalent to your account's daily **reserved volume**, and no more than 100 GB.
  
    If the limit is exceeded, the restore will **fail at the end of the process**.

    It's best to restore data for the smallest time frame, to ensure that the volume of data to be restored will not approach the max limit.
    {:.info-box.important} -->

##### Restore your archives


Your existing drop filters **will not apply** when restoring data. Instead, use the optional filters to control which data to restore.
{:.info-box.note}


In the _Restore data_ tab, give your restored account a **Name**, and choose a **Time range** of up to 24 hours.

Next, you can use filters to control and limit which data you'd like to restore by applying filters. Your restored logs will only include data that matches all of your filters.

To add a filter, click on **Add a filter** and choose the relevant field, operator, and value.

Note that you can add **up to 7 filters** per restore process. 

![Add filters](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/add-a-filter.png)

If you want to remove one of the filters you've created, click on the **X** next to its name.

![Delete filters](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/delete-filter.png)

Click on **Restore** to begin the restoring process. It might take a while to restore your archived data, according to the number of logs and size. For example, an hour's worth of data might take a few minutes, while a day's worth of data could take up to a few hours.

Once the restored account is ready, you'll receive a notification via email. 

Your restored account will remain available for 5 days. If you want to explore the data after the restore has expired, you'll have to restore it again.

##### Explore the restored account in OpenSearch Dashboards

Open the email that says your restored account is ready for you and click **View in OpenSearch Dashboards**.
This link takes you to OpenSearch Dashboards in your main account, but a view showing only the restored account's data.


If you need to filter OpenSearch Dashboards manually, choose the newly restored account in the **Selected Accounts** box,
and then select your data's original **Time Range**.
{:.info-box.tip}

Now you're ready to search your restored account!

</div>
