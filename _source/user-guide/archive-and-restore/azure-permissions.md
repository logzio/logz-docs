---
layout: article
title: Setting Azure Blob Storage permissions
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Azure permissions for log archiving
permalink: /user-guide/archive-and-restore/azure-blob-permissions/
tags:
  - Azure Blob Storage
  - archive-and-restore
contributors:
  - shalper
---

You can archive your logs for long-term storage by sending them to a Microsoft Azure Storage container.

### Minimal permissions

Logz.io will need:

* **Storage Blob Data Contributor** permissions to archive data to a Microsoft Azure Storage account.
* **Storage Blob Data Reader** permissions to restore data from a Microsoft Azure Storage account.


#### Setting up a Storage container and App registration in Microsoft Azure {#grant-access-to-azure-storage}

**Before you begin, you'll need**: Permissions to manage a Storage container and App registration in Microsoft Azure.

<div class="tasklist">

##### Create an App registration

Open your [Azure Portal](https://portal.azure.com/).
Select **Azure Active Directory** > **App registrations** from the left-menu.

![Create Azure Storage account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/azure-app-registration.png)

If you have an existing App registration you can use, select it. Otherwise create a new one.

Click **+ New registration** to create an **App registration**. Name it, leave the default settings and click **Register**.

![Create new App registration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/azure-new-app.png)

##### Copy the App registration parameters

The App **Overview** page provides 2 of the credentials required to fill-in the form in Logz.io: **Application (client) ID** & **Directory (tenant) ID**.

Copy them for future reference.

![Create Azure Storage account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/azure-app-id.png)

##### Create & copy the Client secret password

On the same **App registration** page, select **Certificates & secrets** from the left-menu.
Click **+ New client secret** to create a new one. Select a time frame for its expiration, add a description, and click **Add**.

Copy the secret for future reference. (Note that the password value will not be available once you leave the page.)

![Create Azure App Client secret](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/azure-certificates-secrets.png)

If the secret is set to expire, you will need to remember to renew the credentials and reconfigure archiving in Logz.io!
{:.info-box.note}

##### Create a Storage account

Click the **main menu <i class="fas fa-bars"></i>** in the top-left corner, and select **Storage account**.

If you have an existing Storage account you can use, select it. Otherwise create a new one.

Click **+ Create** to create a new account.

![Create Azure Storage account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/create-azure-storage-account.png)

##### Create a Storage container

In the Storage account, create a storage container (or select an existing one).

![Create Azure Storage container](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/azure-container.png)

##### Assign App & role to your Storage container

Still on the Storage container page, select **Access Control (IAM)** from the left-menu.

![Assign App & Role to your Storage container](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/azure-container-access.png)

Select **Add role assignments**.

![Add role assignment to your Storage container](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/azure-container-add-role-assignment.png)

Fill in the form:

* **Role** - Select **Storage Blob Data Contributor**.
* **Assign access to** - Leave the defaults unchanged. They should be **User, group, or service principal**
* **Select** - Start typing in the name of the app and select it from the dropdown list.
* Click **save**.

![Add role assignment to your Storage container](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/azure-container-add-role-assignment1.png)

##### Configure Logz.io Archive & Restore

Open your [Logz.io app](https://app.logz.io/#/dashboard/tools/archive-and-restore).

In the **Archive configuration** tab, select the **Azure** tab, and fill in the form with the credentials you created and copied in the previous steps.

![Configure Logz.io connection to Azure](https://dytvr9ot2sszz.cloudfront.net/logz-docs/archive-azure/archive-to-azure.png)

</div>

