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

![Archive settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/archive-settings.png)

The Logz.io archiver copies incoming logs to your Amazon S3 bucket.
This allows you to save data for as long as you require,
without needing extended retention from Logz.io.
Instead, you can determine your own requirements
and choose the right S3 object storage class for your needs.

If you need long-term storage for your logs
but don't need to keep those logs searchable at all times,
S3 archiving is a cost-effective solution.

Buckets set to cold storage (**S3 Glacier** and **S3 Glacier Deep Archive** storage classes) cannot be restored from, as the files within them are not available for real-time access. For more information on S3 object storage classes,
see [Storage Classes](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html)
and [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
from Amazon.
{:.info-box.important}

#### To set up archiving

**Before you begin, you'll need**:
`PutObject`, `ListBucket`, and `GetObject`
permissions for an S3 bucket

<div class="tasklist">

##### Enter your bucket information and S3 credentials

You can choose to authenticate with an IAM role
or an access key.

For stronger security,
we recommend authenticating with an IAM role.

* To set up an IAM role, see
  [_Give AWS access with IAM roles_]({{site.baseurl}}/user-guide/give-aws-access-with-iam-roles/).
* To set up an access key, see
  [_Give AWS access with access keys_]({{site.baseurl}}/user-guide/give-aws-access-with-access-keys/)

##### Test your connection and save

Click **Test connection** to make sure your bucket name and credentials
are valid and have the right permissions.

If everything checks out, click **Start archiving** to save your settings.
From now on, Logz.io will archive your logs as they come in.
You can stop archiving at any time.

</div>

## Managing your S3 credentials

If you need to change your S3 configuration —
including switching between access key and IAM role authentication —
make the changes in the _Settings_ tab and click **Update settings**.

You can remove your credentials from Logz.io at any time
by clicking **Stop archiving**
and selecting **Remove my S3 settings** in the confirmation box.
