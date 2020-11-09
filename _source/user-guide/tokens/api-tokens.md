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
---

If you're an Enterprise or Pro plan subscriber,
your account includes API access. You can reference the [API guide](/api/) and [Terraform Logz.io Provider guide](/integrations/terraform/) to help you build integrations with Logz.io.

API tokens are unique to each account. The only exception is a subset of account configuration operations that must be run with the API token of the main account.


![Manage API tokens](https://dytvr9ot2sszz.cloudfront.net/logz-docs/tokens/api-tokens.png)

To get to this page,
select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/api) in the top menu and select the **API tokens** tab.

Community plans do not currently include API tokens. See the official [pricing page](https://logz.io/pricing/) for details.
{:.info-box.note}


#### Working with API tokens

You have full control over your API tokens, to create and delete them at any time.

* To create an API token, click **+ New API token**. Type a brief **token name** and click **Add**.
* To delete an API token, hover over it, and click **delete** <i class="li li-trash"></i> to delete it.

  Deleting a token affects any integrations that use that token. Make sure you update integrations that use a token you deleted.