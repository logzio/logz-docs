---
layout: article
title: Give AWS access with IAM roles
permalink: /user-guide/give-aws-access-with-iam-roles/
flags:
  admin: true
  logzio-plan: community
contributors:
  - imnotashrimp
  - shalper
---

You can connect Logz.io to your AWS account more securely using IAM roles.

This gives Logz.io the appropriate level of access
while keeping your AWS account secure.

###### On this page
* [Connecting an S3 bucket to Logz.io](#grant-access-to-an-s3-bucket)
* [Migrating to a new External ID](#new-external-id)
* [Migrating to new IAM roles](#migrate-to-new-roles)

#### Connecting an S3 bucket to Logz.io {#grant-access-to-an-s3-bucket}

<div class="tasklist">

##### Create a Logz.io-AWS connector

In your Logz.io app, go to **Send your data**.
Select the relevant AWS resource from the left menu.

Click **+ Add a bucket** and select the option to **Authenticate with a role**

![Connect Logz.io to an AWS resource](https://dytvr9ot2sszz.cloudfront.net/logz-docs/access-and-authentication/configure-s3-bucket.png)

Copy and paste the **Account ID** and **External ID** in your text editor.

Fill in the form to create a new connector.

Enter the **S3 bucket name** and, if needed,
the **Prefix** where your logs are stored.

Click **Get the role policy**.
You can review the role policy to confirm the permissions that will be needed.
Paste the policy in your text editor.

Keep this information available so you can use it in AWS.

##### Create the IAM Role in AWS

Go to your [IAM roles](https://console.aws.amazon.com/iam/home#/roles) page in your AWS admin console.

Click **Create role**.
You're taken to the _Create role_ wizard.

![Create an IAM role for another AWS account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/iam--create-role.png)

Click **Another AWS account**.

Paste the **Account ID** you copied from Logz.io.

Select **Require external ID**,
and then paste the **External ID** from step 1.

Click **Next: Permissions** to continue.

##### Create the policy

In the  _Create role_ screen, click **Create policy**.
The _Create policy_ page loads in a new tab.

In the **JSON** tab,
replace the default JSON with the policy you copied from Logz.io.

Click **Review policy** to continue.

Give the policy a **Name** and optional **Description**,
and then click **Create policy**.

Remember the policy's name—you'll need this in the next step.

Close the tab to return to the _Create role_ page.

##### Attach the policy to the role

Click <i class="fas fa-sync-alt"></i> (refresh),
and then type your new policy's name in the search box.

Find your policy in the filtered list and select its check box.

Click **Next: Tags**,
and then click **Next: Review** to continue to the _Review_ screen.

##### Finalize the role

Give the role a **Name** and optional **Description**.
We recommend beginning the name with "logzio-"
so that it's clear you're using this role with Logz.io.

Click **Create role** when you're done.

##### Copy the ARN to Logz.io

In the _IAM roles_ screen, type your new role's name in the search box.

Find your role in the filtered list and click it to go to its summary page.

Copy the role ARN (top of the page).
In Logz.io, paste the ARN in the **Role ARN** field, and then click **Save**.

</div>

## Migrating to a new external ID {#new-external-id}

If you previously set up an IAM role with your own external ID,
we recommend updating your Logz.io and AWS configurations
to use a Logz.io-generated external ID.
This adds security to your AWS account
by removing the predictability
of any internal naming conventions
your company might have.

Before you migrate,
you'll need to know where the existing IAM role is used in Logz.io.
This is because you'll need to replace any
[S3 fetcher](https://app.logz.io/#/dashboard/data-sources/S3-Bucket)
and
[Archive & restore](https://app.logz.io/#/dashboard/tools/archive-and-restore)
configurations that use the existing role.

* **If the role is used in a single Logz.io account**:
  You can update the external ID
  and replace current Logz.io configurations.
  See
  [_Migrate to the Logz.io external ID in the same role_](#migrate-with-same-role)
  (below).
* **If the role is used with multiple Logz.io accounts**:
  You'll need to create a new role for each account
  and replace current Logz.io configurations.
  See
  [_Migrate to new IAM roles_](#migrate-to-new-roles)
  (below).

#### Migrate to the Logz.io external ID in the same role {#migrate-with-same-role}

In this procedure, you'll:

* Replace Logz.io configurations to use the new external ID
* Update the external ID in your IAM role's trust policy

Follow this process only if the IAM role is used in a single Logz.io account.

When you update your IAM role to the Logz.io external ID,
all Logz.io configurations that rely on that role
will stop working.
Before you begin,
make sure you know everywhere your existing IAM role is used in Logz.io.
{:.info-box.warning}

<div class="tasklist">

##### Delete an S3 configuration from Logz.io

Choose an
[S3 fetcher](https://app.logz.io/#/dashboard/data-sources/S3-Bucket)
or
[Archive & restore](https://app.logz.io/#/dashboard/tools/archive-and-restore)
configuration to replace.

Copy the **S3 bucket name** and **Role ARN** to your text editor,
and make a note of the **Bucket region**.
If this is an S3 fetcher, copy the path **Prefix** as well,
and make a note of the **Log type**.

Delete the configuration.

##### Replace the configuration

If this is for an S3 fetcher, click **Add a bucket**,
and click **Authenticate with a role**.

![S3 fetcher and archive configuration screens](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/s3-fetcher-and-archive-config-external-id.png)

Recreate your configuration with the values you copied in step 1,
and copy the **External ID** (you'll paste it in AWS in the next step).

##### Replace the external ID in your IAM role

Browse to the [IAM roles](https://console.aws.amazon.com/iam/home#/roles) page.
Open the role used by the configuration you deleted in step 1.

![IAM role summary page, trust relationships tab](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/iam-role-edit-trust-relationship.png)

Open the **Trust relationships** tab
and click **Edit trust relationship** to open the policy document JSON.

Find the line with the key `sts:ExternalId`,
and replace the value with the Logz.io external ID you copied in step 2.

For example,
if your account's external ID is
`logzio:aws:extid:example0nktixxe8q`,
you would see this:

```text
"sts:ExternalId": "logzio:aws:extid:example0nktixxe8q"
```

Saving the trust policy at this point
will immediately change your role's external ID.
Any other Logz.io configurations that use this role
will stop working until you update them.
{:.info-box.important}

Click **Update Trust Policy** to use the Logz.io external ID for this role.

##### Save the new S3 configuration in Logz.io

Save the configuration in Logz.io:

* **For an S3 fetcher**: Click **Save**
* **For Archive & restore**: Click **Start archiving**

You'll see a success message if Logz.io authenticated and connected to your S3 bucket.

If the connection failed,
double-check your credentials in Logz.io and AWS.

##### _(If needed)_ Replace other configurations that use this role

If there are other S3 fetcher or Archive & restore configurations
in this account that use the same role,
replace those configurations with the updated external ID.

Logz.io generates one external ID per account,
so you won't need to change the role again.

</div>

#### Migrate to new IAM roles {#migrate-to-new-roles}

In this procedure, you'll:

* Create a new IAM role with the new external ID
* Replace Logz.io configurations to use the new role

You'll repeat this procedure for each Logz.io account
where you need to fetch or archive logs in an S3 bucket.

<div class="tasklist">

##### Delete an S3 configuration from Logz.io

Choose an
[S3 fetcher](https://app.logz.io/#/dashboard/data-sources/S3-Bucket)
or
[Archive & restore](https://app.logz.io/#/dashboard/tools/archive-and-restore)
configuration to replace.

Copy the **S3 bucket name** to your text editor,
and make a note of the **Bucket region**.
If this is an S3 fetcher, copy the path **Prefix** as well,
and make a note of the **Log type**.

Delete the configuration.

##### Replace the configuration

If this is for an S3 fetcher, click **Add a bucket**,
and click **Authenticate with a role**.

![S3 fetcher and archive configuration screens](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-and-restore/s3-fetcher-and-archive-config-external-id.png)

Recreate your configuration with the values you copied in step 1,
and copy the **External ID** (you'll paste it in AWS later).

##### Set up your new IAM role

Using the information you copied in step 1,
follow the steps in
[_Grant access to an S3 bucket_](#grant-access-to-an-s3-bucket)
(near the top of this page).

Continue with this procedure when you're done.

##### _(If needed)_ Replace other configurations that use this role

If there are other S3 fetcher or Archive & restore configurations
in this account that use the same role,
repeat steps 1 and 2,
and use the role ARN from step 3.

For configurations in other Logz.io accounts,
repeat this procedure from the beginning.

</div>
