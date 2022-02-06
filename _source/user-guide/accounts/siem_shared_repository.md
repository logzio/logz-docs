---
layout: article
title: Manage the shared SIEM Repository account
permalink: /user-guide/accounts/shared_repository.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - security
  - security-account
  - accounts
  - logz.io-security
  - siem
contributors:
  - yberlinger
---

## About the shared SIEM Repository account

Build, prepare, and test your security content in a single sub account, and then share it with your other SIEM accounts when you define a Security Repository account.

The Repository account acts as a centralized resource for all your SIEM content. When you set up a shared Repository account, you can configure your other SIEM accounts to pull dashboards, visualizations, saved searches, and private security feeds from it. 

All new SIEM accounts automatically pull from the shared Repository account: You can manually disable access to the shared Repository account for any SIEM account.

When you change which account is defined as the Repository, by default, the change creates an automatic dependency for all the existing SIEM accounts. 

If you don't have a Repository set, the Repository account status is greyed out, with a link to **Set repository account**. 

<!--WIP placeholder for shared Repository topic WIIFM  -->

### Set a shared Repository account
To define a Repository account, you must have at least two related Cloud SIEM accounts.

To configure the shared Repository, in **Settings > Manage accounts**, navigate to your Cloud SIEM Plan, and **Set repository account**.


![Set a shared SIEM Repository account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/repo_set-account.png)

Select an existing account to be the shared Repository account.
![Pick a designated Repo account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/repo_picklist.gif) 

Configure the accounts that can pull SIEM content from the shared Repository account and **Save** or **Cancel** your change. 
![Set a shared SIEM Repository account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/repo_dependent_accts.png)

After you set the Repository account it's flagged with the Repository icon in the list of Security accounts, and the Repository account status changes to display the Repository name.  
![Configured account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/repo_all_set.png)



### Check account dependencies

Open the account details to check if the account is associated with a Repository account. 


### Reset and replace a Repository account

When you replace the Repository account, you automatically create dependencies for all your other SIEM accounts: They will pull content from the new Repository account unless you manually remove the dependency for the Repository.


### Set dependent accounts

[placeholder text]



### Private feeds in the shared Security Repository account

Define a private feed once in your SIEM Repository and share it with the relevant Security accounts.


### Remove access to the Repository account

[placeholder ]


### Reset a Repository account

To remove the defined status of a shared Repository account, use the Reset operation. Dependent accounts will no longer be able to pull content from the Repository

![Reset the existing Repository account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/repo_reset.png)

### Delete a Repository account

If your current Repository account is set as the repository for other SIEM accounts, you must first reset it to remove the dependencies for the other SIEM accounts. Once the Repository status is removed, the account can be deleted.
