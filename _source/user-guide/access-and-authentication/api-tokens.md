---
layout: article
title: Manage API tokens
permalink: /user-guide/access-and-authentication/api-tokens.html
flags:
  admin: true
  logzio-plan: enterprise
contributors:
  - imnotashrimp
---

If you're an Enterprise plan subscriber, your account includes API access. You have full control over your API tokens—you can create and delete API tokens at any time.

You can delete a token at any time to revoke its permissions keep your account secure.

![Manage API tokens]({{site.baseurl}}/images/access-and-authentication/access-and-authentication--api-tokens.png)

To get to this page, select [**<i class="li li-gear"></i> > Tools > API tokens**](https://app.logz.io/#/dashboard/settings/api-tokens) in the top menu.

###### Working with shared tokens

* To create an API token, type a brief **token name** and click **Save**.

* To delete an API token, click the token's <i class="li li-x"></i>.

<div class="info-box gotcha">
  Deleting a token will affect any integrations that use that token. Make sure you update any integrations that use a token you deleted.
</div>
