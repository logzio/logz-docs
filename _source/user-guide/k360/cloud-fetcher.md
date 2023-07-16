---
layout: article
title: Configure Cloud Fetcher
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Step by step guide to configuring Cloud Fetcher
permalink: /user-guide/cloud-fetcher.html
flags:
tags:
  - cloud
  - cloud fetcher
  - ship data
  - Azure
contributors:
  - hidan
---


Azure Cloud Fetcher offers a fast and efficient way to sync your Azure data with Logz.io, providing visibility and allowing you to monitor and troubleshoot your environments. With Azure Cloud Fetcher, you can monitor the performance and health of your systems in real-time, and quickly identify the root cause of issues and problems.


#### Set up Azure Cloud Fetcher

<div class="tasklist">

##### Create a new app in Azure

Enter your Azure portal and navigate to App registrations > New registration. 

Give your app a name, choose Accounts in this organizational directory only (**Single tenant**), and click the Register button.

![create an app](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/register-azure.png)

##### Create a certificate

In your main app screen, click on **Add a certificate or secret**. 

![certificate or secret](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/azure-certificate.png)

Next, create a **New client secret**. Give it a description and choose the expiration date, such as the 730 days option. Click **Add** to create the secret.

<!-- ![add a secret](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/add-client-secret.png)-->

Copy your secret's **Value** and save if for later use. This is needed to complete the setup process with Logz.io.

Client secret values **cannot be viewed except immediately after creation**. Be sure to save the secret when created before leaving the page. If you didn't keep the value, you'll need to create a new client secret to continue with the setup process.
{:.info-box.important}

![secret value](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/secret-value-copy.png)

##### Assign a role

Navigate to **Subscriptions > Access control (IAM)** and click on the Role assignments tab. 

![assign role](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/role-assignment.png)

Click on **Add** and choose **Add role assignment**.

![role assignment](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/add-role-dropdown.png)

Search for the **Monitor reader** role, select it, and click next. 

![monitor reader](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/monitor-role.png)

Ensure that the **User, group, or service principal** option is checked in the Members tab, and click on **+ Select members**.

![add role from list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/add-role-from-list.png)

Click **Select** to choose the app, and click **Review + assign** to confirm. Click on **Review + assign** again to apply the role.

##### Send your details to Logz.io

To connect your Azure Cloud Fetcher with Logz.io you'll need to send the following information:

* **Client secret value** - that you created and copied in the [Create a certificate](/user-guide/cloud-fetcher.html#create-a-certificate) section.

Navigate to App registration and click on the app you created. There, you'll be able to find the following information:

* **Application (client) ID**
* **Directory (tenant) ID**

![app ids](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/app-id-for-logz.png)

Next, navigate to Subscriptions and copy the **Subscription ID**:

![subscription id](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/subscription-id.png)

And lastley, navigate to **Resource groups** and copy the name of the group that's assicoated with the app you created.

![resource group](https://dytvr9ot2sszz.cloudfront.net/logz-docs/fetcher/resource-group-copy.png)


</div>