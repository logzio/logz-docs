---
layout: article
title: Troubleshooting AWS IAM Configuration for retrieving logs from a S3 Bucket 
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: AWS IAM configuration to retrieve logs from S3
permalink: /user-guide/log-shipping/troubleshooting-aws
flags: 
  logzio-plan: community
tags:
  - log-shipping
contributors:
  - hidan
---

To get your logs from an s3 bucket, you'll need to provide access to the following:

* `s3:ListBucket` - Allows sharing the files in your bucket, and keeps track of which ones are already ingested.
* `s3:GetObject` - To allow downloading and ingesting your files into your account.

Below is the IAM policy required for Logz.io to fetch logs from your bucket:

```yaml
{"Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::<BUCKET_NAME>"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::<BUCKET_NAME>/*"
            ]
        }
    ]
}
```

Once access is granted, you'll need to test your configuration.

First, make sure that you have **s3cmd** installed. **s3cmd** will prefer your locally-configured s3 credentials over those you provide as parameters. Either backup your current s3 access settings or use a new instance or Docker container to resolve this.

Run **s3cmd** -- configure and enter your Logz.io IAM user access and secret keys. Then:

1. List the bucket:
  
    ```yaml
   s3cmd ls s3://<BUCKET_NAME>/<BUCKET_PREFIX>/ #(<BUCKET_PREFIX> is optional)
   ```

2. Get a file from the bucket (one of those you received from the "ls" command):
  
    ```yaml
    s3cmd get s3://<BUCKET_NAME>/<BUCKET_PREFIX>/<OBJECT_NAME>
    ```

If both commands are executed successfully, Logz.io will be able to pull your logs without a problem.

If you're still encountering an issue, contact the [Support team](mailto:help@logz.io) for further assistance.

Note that the ListBucket permission is set to the entire bucket and the GetObject permission ends with a /* suffix, so we can get files in subdirectories.
{:.info-box.note}