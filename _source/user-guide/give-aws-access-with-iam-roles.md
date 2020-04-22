---
layout: article
title: Give AWS access with IAM roles
permalink: /user-guide/give-aws-access-with-iam-roles/
flags:
  admin: true
  logzio-plan: community
contributors:
  - imnotashrimp
---

Connect Logz.io to your AWS account using IAM roles.
This gives Logz.io the appropriate level of access
while keeping your AWS account secure.

#### To grant access to an S3 bucket

<div class="tasklist">

##### Copy Logz.io details

Paste the **Account ID** and **External ID** in your text editor.

Enter the **S3 bucket name** and, if needed,
the **Prefix** where your logs are stored.

Click **View and copy role policy**.
You can review the role policy to confirm the permissions we need.
Paste the policy in your text editor.

Keep this information available so you can paste in AWS in step 2.

##### Create the role

Browse to the [IAM roles](https://console.aws.amazon.com/iam/home#/roles)
and click **Create role**.
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

Give the role a **Name** and optional **Description**,
and then click **Create role**.

##### Copy the ARN to Logz.io

In the _IAM roles_ screen, type your new role's name in the search box.

Find your role in the filtered list and click it to go to its summary page.

Copy the role ARN (top of the page).
In Logz.io, paste the ARN in the **Role ARN** field, and then click **Save**.

</div>
