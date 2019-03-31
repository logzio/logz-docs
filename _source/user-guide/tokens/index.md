---
layout: article
title: Tokens
permalink: /user-guide/tokens/
flags:
  admin: true
  logzio-plan: community
tags:
  - tokens
  - api-tokens
  - account-tokens
  - shared-tokens
contributors:
  - imnotashrimp
---

Logz.io uses tokens to manage log shipping, sharing, and API access.
You need to be an account admin to create, delete, or access your tokens.

## Which token should I use?

The type of token you use depends on what you're trying to do.
Read on to see your options.

##### I want to ship logs to my account

The short answer: **Account token**

Your main account has an account token, as do each of your sub accounts.
When you ship logs, the account token tells Logz.io which account to send your data to.

To find your account tokens, log in to your main account, and then select [**<i class="li li-gear"></i> > Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts) in the top menu.
Click any account to see its token, and click **Token** to copy it.

##### I want to share visualizations and dashboards

The short answer: **Shared token**

Shared tokens allow you to share visualizations and dashboards with anyone, even if they don't have a login to your account.
To limit the data available to shared tokens, attach filters.
Keep your data secure by attaching a filter to every token and deleting tokens you no longer need.

To manage your shared tokens, select [**<i class="li li-gear"></i> > Tools > Shared tokens**](https://app.logz.io/#/dashboard/settings/shared-tokens) in the top menu.
Read [Manage shared tokens]({{site.baseurl}}/user-guide/tokens/shared-tokens.html) to learn more.

##### I want to make my own integrations

The short answer: **API token**

Use API tokens to authenticate integrations with your Logz.io account.
API tokens are available to Enterprise plan subscribers.
To manage your API tokens, select [**<i class="li li-gear"></i> > Tools > API tokens**](https://app.logz.io/#/dashboard/settings/api-tokens) in the top menu.

Read [Manage API tokens]({{site.baseurl}}/user-guide/tokens/api-tokens.html) to learn more.
If you want to build your own integration, visit the [Logz.io API 🦆🦆🦆]({{site.baseurl}}/api/).


## About token permissions

Tokens permissions are scoped to the account they're created in.
So if you create an API token in your main account, that token can be used to search your main account and sub accounts.

If you change your account permissions, tokens respect the updated permissions.
So if you set your sub account not to be searchable from the main account, an API token from the main account can't be used to search that sub account.