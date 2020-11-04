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
  - shalper
---

![Archive settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/archive-settings-112020.png)

You can archive logs to either an Amazon S3 bucket or a Microsoft Azure Storage account.

This allows you to save data for as long as you require,
without needing extended retention from Logz.io. Archiving provides a cost-effective solution for long-term storage of logs that don't need to be instantly searchable.

The Logz.io archiver copies incoming logs to your selected storage container.

## Archiving to an AWS S3 bucket

You can determine your own requirements
and choose the right S3 object storage class for your needs.

Buckets set to cold storage (**S3 Glacier** and **S3 Glacier Deep Archive** storage classes) cannot be restored from, as the files within them are not available for real-time access. See AWS documentation to learn more about [storage classes in general](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html)
and [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/).
{:.info-box.important}

#### To set up archiving

**Before you begin, you'll need**:

* An AWS S3 bucket with appropriate permissions. The recommended permissions are `PutObject`, `ListBucket`, and `GetObject`. [Learn more](/user-guide/archive-and-restore/set-s3-permissions.html)

<div class="tasklist">

##### Enter your bucket information and S3 credentials

Select an authentication method. You can choose to authenticate with an IAM role
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
