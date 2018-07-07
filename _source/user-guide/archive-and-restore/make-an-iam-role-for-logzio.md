---
layout: article
title: Make an IAM role for Logz.io
permalink: /user-guide/archive-and-restore/make-an-iam-role-for-logzio.html
contributors:
  - davidyer
  - imnotashrimp
---

To archive your data, Logz.io needs access to your AWS S3 bucket. Using Identity & Access Management (IAM) role delegation, you can grant the right level of access while keeping your account secure.

###### To create an IAM role for Logz.io:

1. Sign in to the AWS Management Console as an administrator of the Production account.

2. Create a custom role:

    ![Create a custom role]({{ site.baseurl }}/images/aws/iam-1-another-aws-account.png)

    1. Open the **Identity & Access Management** console. The "Create role" page is displayed.

    2. Choose **Another AWS** account as your trusted entity.

    3. In the **Account ID** box, type `406095609952`. This is the Logz.io AWS account ID that will access your S3 buckets.

    4. Select **Require external ID**, and type an **External ID**. The external ID can be anything you want.

3. Click **Next: Permissions** to continue.

    ![Attach permissions to a role]({{ site.baseurl }}/images/aws/iam-2-attach-permissions.png)

4. If you already have a policy that has read and write permissions to your S3 buckets, use that policy and skip to step 5. Otherwise, click **Create policy**.

    1. Click **Create policy**, and then click the **JSON** tab.

    2. Paste this JSON, and replace _\<bucket name>_ with the name of the intended S3 bucket:

      ``` json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": "s3:ListAllMyBuckets",
            "Resource": "*"
          },
          {
            "Effect": "Allow",
            "Action": [
              "s3:ListBucket",
              "s3:GetBucketLocation"
            ],
            "Resource": "arn:aws:s3::<bucket name>"
          },
          {
            "Effect": "Allow",
            "Action": [
              "s3:GetObject",
              "s3:PutObject",
              "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3::<bucket name>/*"
          }
        ]
      }
      ```

5. Click **Next: Review** to continue.

    ![Review the IAM role]({{ site.baseurl }}/images/aws/iam-3-review.png)

6. Type a **Role name** and **Role description**, and then click **Create role**.

Your new role and permissions are ready. You can use this new role with your Logz.io account.