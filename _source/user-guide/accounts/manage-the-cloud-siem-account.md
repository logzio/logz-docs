---
layout: article
title: Manage Cloud SIEM accounts
permalink: /user-guide/accounts/manage-the-cloud-siem-account.html
flags:
  admin: true
  logzio-plan: enterprise
tags:
  - accounts
  - security-account
  - security-analytics
contributors:
  - shalper
  - imnotashrimp
  - yberlinger
---

You can manage your Cloud SIEM accounts
from the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page.
You'll need to be signed in to the main account in your Operations workspace.

Each Security account is a separate entity, with its own users, rules, and feeds.
Security accounts can only access each other's dashboards, rules, private feeds, or data if you enable and configure how these objects can be shared.

If you're interested in adding a Cloud SIEM plan,
reach out to your account manager
or email [the Sales team](mailto:sales@logz.io).
{:.info-box.note}

#### What can I do on the Manage accounts page?
{:.no_toc}

1. toc list
{:toc}

{:.no_toc}

<div class="tasklist">

##### Add a Cloud SIEM account

You'll find your Cloud SIEM accounts
in the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page
of your Operations workspace. Scroll down towards the bottom of the page to see them.

Click **Add Security account** to open the form.
The number of accounts you can create is listed.

![Add a Cloud SIEM account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/add-security-account11.png)


##### Configure or update a Cloud SIEM account

![Configure a Cloud SIEM account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/config-security-account.png)


Fill in the form:

1. **Name** (or rename) the account.
2. **Enable Cloud SIEM on these accounts** - Select the log accounts to be secured. You'll be giving the security account **read permissions** so it can monitor and enrich the logs.

    Logs are not shipped directly to your Cloud SIEM accounts. Instead, you'll grant read-access to log accounts you want a security account to monitor.

    You can add the same log account to multiple Security accounts. It will be monitored by each   Security account independently.
    {:.info-box.note}

3. **Automatically pull dashboards, visualizations, and saved searches from these Security accounts** - Select which security accounts you can automatically pull shared objects from. 

  ![Shared security objects](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/
add_new-account.gif)

  The security account you're configuring will automatically be able to access the Kibana dashboards, visualizations, and saved searches from the source accounts you add to this list, but will *not* have access to the data in these accounts.  
  
  This is helpful if you have multiple main accounts. 
  
  For example: 

  + Instead of creating the same objects for each account, you can just share them! 
  + You can use this process to keep a local backup copy of these data objects. 
  + Create a library of data objects in your main Security account, and then enable client accounts to use objects from your main account.  

##### Configure a repository account

This topic is currently in development, pending the release of the Repository account feature for Logz.io Cloud SIEM.
<!--placeholder -->


##### Save your changes

Click **Create**/**Apply** to save your changes.

When you first add a new account, give it a few minutes to finish setting up.


##### Delete a Cloud SIEM account from your plan 
 
1. In the account details, click the **Delete** icon next to the account name.
  ![delete](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/delete-SIEM.png)   

2. Confirm (or **Cancel**) the action. 
  ![Confirm delete](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/confirm-delete-siem-acct.png)
</div>
