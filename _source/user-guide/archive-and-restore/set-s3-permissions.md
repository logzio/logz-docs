---
layout: article
title: AWS S3 bucket permissions & storage class required for archiving
permalink: /user-guide/archive-and-restore/set-s3-permissions.html
tags:
  - s3
  - archive-and-restore
contributors:
  - imnotashrimp
  - schwin007
  - shalper
---

Your AWS S3 bucket must grant Logz.io the right permissions to support Logz.io archiving and data restore.

## Minimal permissions

* **Archiving** - Logz.io requires `s3:PutObject` and `s3:GetBucketLocation` permissions to archive logs to an AWS S3 bucket.
* **Restoring data from archive** - Logz.io requires `s3:ListBucket`, `s3:GetBucketLocation` and `s3:GetObject` permissions to restore data from an AWS S3 bucket.

You'll set these permissions for an AWS IAM user or role,
depending on which authentication method you choose in Logz.io.

We recommend allowing all the mentioned permissions
so you won't run into any issues when you need to restore.
{:.info-box.tip}

## AWS S3 bucket storage classes

You can determine your own requirements
and choose the right S3 object storage class for your needs.

Buckets set to cold storage (**S3 Glacier** and **S3 Glacier Deep Archive** storage classes) cannot be restored from, as the files within them are not available for real-time access. See AWS documentation to learn more about [storage classes in general](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html)
and [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/).

## Sample policy

This code block shows a policy with all three permissions enabled:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::<BUCKET-NAME>",
        "arn:aws:s3:::<BUCKET-NAME>/*"
      ]
    }
  ]
}
```

## Testing your configuration

To test `PutObject` permissions,
you can fill in your credentials on the
[Archive & restore](https://app.logz.io/#/dashboard/tools/archive-and-restore) page,
and then click **Test connection**.

To test for `ListBucket` and `GetObject` permissions,
you can run tests directly from the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

#### To test your IAM permissions

**Before you begin, you'll need**:
[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
configured with the IAM credentials you're testing

<div class="tasklist">

##### Create a test file

Make a new dummy file for testing purposes.

```shell
touch DELETE-logzio-test.txt
```

##### Run the tests

Test `PutObject` permissions by moving your dummy file to the bucket:

```shell
aws s3 mv DELETE-logzio-test.txt s3://<BUCKET-NAME>/
```

Test `ListBucket` permissions by listing the bucket contents:

```shell
aws s3 ls s3://<BUCKET-NAME>/
```

Test `GetObject` permissions by copying your dummy file to the bucket:

```shell
aws s3 cp s3://<BUCKET-NAME>/DELETE-logzio-test.txt SUCCESSFUL-GetObject-perms.txt
```

If all the commands are successful,
Logz.io can archive and restore your logs with these credentials.

</div>
