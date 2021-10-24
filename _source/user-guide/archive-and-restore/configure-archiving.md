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

You can archive logs to either an Amazon S3 bucket or a Microsoft Azure Storage container.

The Logz.io archiver copies incoming logs to your selected storage container. The data is archived in its "raw" state ~ pre-indexing and pre-mapping.

###### On this page
{:.no_toc}

1. toc list
{:toc}

#### To set up archiving in AWS


<!--info-box-start:info -->
Archiving with AWS S3 is only available for accounts in the following AWS regions: US East (Northern Virginia), Asia Pacific (Sydney), Canada (Central), Europe (Frankfort), Europe (London)
{:.info-box.note}
<!--info-box-end -->

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

<!--info-box-start:info -->
Select a path to the **root of an S3 bucket**, to support data restore options. Data cannot be restored from a sub-bucket path.
{:.info-box.important}
<!--info-box-end -->

##### Test your connection and save

Click **Test connection** to make sure your bucket name and credentials
are valid and have the right permissions.

If everything checks out, click **Start archiving** to save your settings.
From now on, Logz.io will archive your logs as they come in.
You can stop archiving at any time.

##### Switching between IAM roles and Access keys

If you need to change your S3 configuration —
including switching between access key and IAM role authentication —
make the changes in the _Settings_ tab and click **Update settings**.

You can remove your credentials from Logz.io at any time
by clicking **Pause archiving**
and selecting **Remove my S3 settings** in the confirmation box.

</div>

#### To set up archiving in Microsoft Azure

<!--info-box-start:info -->
Archiving with Microsoft Azure is only available for accounts in the following Azure regions: West Europe (Netherlands) and West US 2 (Washington) 
{:.info-box.note}
<!--info-box-end -->

**Before you begin, you'll need**:

* A Storage container with an App registration with appropriate permissions. [Learn more](/user-guide/archive-and-restore/azure-blob-permissions/#minimal-permissions)

<div class="tasklist">

##### Enter your container information and credentials

Fill in the form with the requested container information and IDs. [Detailed instructions](/user-guide/archive-and-restore/azure-blob-permissions/)

##### Test your connection and save

Click **Test connection** to make sure Logz.io can connect to your container and has the right permissions.

If everything checks out, click **Start archiving** to save your settings.
From now on, Logz.io will archive your logs as they come in.
You can stop archiving at any time.

</div>
