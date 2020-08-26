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
your account includes API access.

API tokens are unique to each account. The only exception are a subset of account counfiguration operations that must be run with the API token of the main account.

![Manage API tokens](https://dytvr9ot2sszz.cloudfront.net/logz-docs/access-and-authentication/access-and-authentication--api-tokens.png)

To get to this page,
select [**<i class="li li-gear"></i> > Tools > API tokens**](https://app.logz.io/#/dashboard/settings/api-tokens)
in the top menu.

#### Working with API tokens

You have full control over your API tokens, to create and delete them at any time.

* To create an API token,
  type a brief **token name** and click **Add**.

* To delete an API token,
  hover over the token and click the token's <i class="li li-x"></i>.

  To revoke a token's permissions, delete the token.
  
  Deleting a token affects any integrations that use that token. Make sure you update integrations that use a token you deleted.
