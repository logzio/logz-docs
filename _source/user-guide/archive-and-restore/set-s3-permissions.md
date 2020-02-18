---
layout: article
title: Setting S3 permissions in AWS
permalink: /user-guide/archive-and-restore/set-s3-permissions.html
tags:
  - s3
  - archive-and-restore
contributors:
  - imnotashrimp
  - schwin007
---

To archive and restore your logs to a S3 bucket,
Logz.io needs these permissions:

* To **archive** to a bucket,
  we need `s3:PutObject` permissions
* To **restore** archives,
  we need `s3:ListBucket` and `s3:GetObject` permissions

You'll set these permissions for an AWS IAM user or role,
depending on which authentication method you choose in Logz.io.

We recommend allowing all three permissions
so you won't run into any issues when you need to restore.
{:.info-box.tip}

## Sample policy

This code block shows a policy with all three permissions enabled:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:PutObject",
        "s3:GetObject"
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

To confirm `PutObject` permissions,
you can fill in your credentials on the
[Archive & restore](https://app.logz.io/#/dashboard/tools/archive-and-restore) page,
and then click **Test connection**.

To test for `ListBucket` and `GetObject` permissions,
you can use [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

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
