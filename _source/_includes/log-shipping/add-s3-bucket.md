###### Adding an S3 bucket using the Logz.io wizard


1. Click **+ Add a bucket**
2. Select your preferred method of authentication - an IAM role or access keys.

The configuration wizard will open.

3. Select the hosting region from the dropdown list.
4. Provide the **S3 bucket name**
5. _Optional_ You have the option to add a prefix.
6. **Save** your information.

![S3 bucket configuration wizard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/s3-configuration-wizard.png)


<!-- info-box-start:info -->
Logz.io cannot fetch logs retroactively. Logz.io will begin fetching logs generated after the S3 bucket was configured.
{:.info-box.important}
<!-- info-box-end -->