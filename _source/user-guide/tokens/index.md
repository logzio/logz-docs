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
  - shalper
---

Logz.io uses tokens to manage log shipping, permissions for dashboard sharing links, and API authorization.

You will need to be an account admin to create, delete, or access your tokens.

## Which token should I use?

The type of token you use depends on what you're trying to do.
Read on to see your options.

### Send logs to your account

The short answer: **Log shipping token**

The Log shipping token tells Logz.io which account to send your data to.
Every account has its own set of tokens.

To manage your log shipping tokens, select an account. Then select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping) in the top menu and select the **Log shipping tokens** tab.

You can click any **Token** to copy it with one-click.

* For more information on [managing log shipping tokens]({{site.baseurl}}/user-guide/tokens/log-shipping-tokens/)

### Share dashboards and more

The short answer: **Shared token**

Shared tokens allow you to share visualizations and dashboards with anyone, even if they don't have a login to your account.

To limit the data available to shared tokens, attach filters.
Keep your data secure by attaching a filter to every token and deleting tokens you no longer need.

To manage your shared tokens, select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/shared) in the top menu and select the **Shared tokens** tab.

* For more information on [managing shared tokens]({{site.baseurl}}/user-guide/tokens/shared-tokens.html).

### Develop an integration

The short answer: **API token**

Use API tokens to authenticate integrations with your Logz.io account.
API tokens are available to Enterprise and Pro plan subscribers.

To manage your API tokens, select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/api) in the top menu and select the **API tokens** tab.

* For more information on [managing API tokens]({{site.baseurl}}/user-guide/tokens/api-tokens.html).
* If you want to build your own integration, visit the [Logz.io API Developer Guide]({{site.baseurl}}/api/).

## About token permissions

Token permissions are scoped to the account they're created in.
If you change your account permissions, tokens respect the updated permissions.

For example, if you create an API token in your main account, it can be used to search the data indexed in the main account and any of the sub accounts by default.

If you change the account permissions so that the sub account is not searchable from the main account, the main account's API token can no longer be used to search the sub account's data.
