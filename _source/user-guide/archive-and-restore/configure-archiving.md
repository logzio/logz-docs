---
layout: article
title: Configure archiving
permalink: /user-guide/archive-and-restore/configure-archiving.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - s3
  - archive-and-restore
contributors:
  - imnotashrimp
  - ayigal
  - schwin007
---

![Archive settings]({{site.baseurl}}/images/archive-and-restore/archive-settings.png)

The Logz.io archiver copies incoming logs to your Amazon S3 bucket.
This allows you to save data for as long as you require,
without needing extended retention from Logz.io.
Instead, you can determine your own requirements and choose the right S3 object storage class for your needs.

If you need long-term storage for your logs but you don't need to keep those logs searchable at all times,
S3 archiving is a cost-effective solution.

<div class="info-box read">
  For more information on S3 object storage classes, see [Storage Classes](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html) and [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/) from Amazon.
</div>

###### To set up archiving

**You'll need**:
`PutObject`, `ListBucket`, and `GetObject` permissions for an S3 bucket

{: .tasklist .firstline-headline }
1. Enter your bucket name and S3 credentials

    Paste your S3 **Bucket name**, **AWS access key**, and **AWS secret key**.
    Make sure your access key and secret key belong to a user with `PutObject`, `ListBucket`, and `GetObject` permissions for the S3 bucket.

2. Test your connection and save

    Click **Test connection** to make sure your bucket name and credentials are valid and have the right permissions.

    If everything checks out, click **Start archiving** to save your settings.
    From now on, Logz.io will archive your logs as they come in.
    You can stop archiving at any time.

## Managing your S3 credentials

If you need to change your S3 name, access key, or secret key, make the changes in the _Settings_ tab and click **Update settings**.

You can remove your credentials from Logz.io at any time by clicking **Stop archiving** and selecting **Remove my S3 settings** in the confirmation box.