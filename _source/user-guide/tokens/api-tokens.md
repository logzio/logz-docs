---
layout: article
title: Manage API tokens
permalink: /user-guide/tokens/api-tokens.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - tokens
  - api-tokens
contributors:
  - imnotashrimp
  - yberlinger
---

If you're an Enterprise or Pro plan subscriber,
your account includes API access. You can reference the [API guide](/api/) and [Terraform Logz.io Provider guide](/integrations/terraform/) to help you build integrations with Logz.io.

API tokens are unique to each account. The only exception is a subset of account configuration operations that must be run with the API token of the main account.

{% include general-shipping/manage-tokens-nav.md %}

Click the **API tokens** tab. 

The token for each account is listed in the table along with the date it was created.

<!-- 

![Manage API tokens](https://dytvr9ot2sszz.cloudfront.net/logz-docs/tokens/api-tokens.png)

select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/api) in the top menu and select the **API tokens** tab.
-->
Community plans do not currently include API tokens. See the official [pricing page](https://logz.io/pricing/) for details.
{:.info-box.note}


#### Working with API tokens

You have full control over your API tokens, to create and delete them at any time.

* To create an API token, click **+ New API token**. Type a brief **token name** and click **Add**.
* To delete an API token, hover over it, and click **delete** <i class="li li-trash"></i> to delete it.

  Deleting a token affects any integrations that use that token. Make sure you update integrations that use a token you deleted.

### Each account has its own set of API tokens

| Account type | How to get the API token |
|---|---|
| Log Management main account | Log into the Main Log Management account, select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/api) in the top menu and select the **API tokens** tab. |
| Log Management sub account | Log into the Log Management sub account, select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/api) in the top menu and select the **API tokens** tab. |
| Metrics account | Metrics accounts do not have their own API tokens. Instead, use the API tokens belonging to the Log Management main account associated with the Metrics account.|
| Security account | Log into the security account, select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/api) in the top menu and select the **API tokens** tab. |
