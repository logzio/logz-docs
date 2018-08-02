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

If you're an Enterprise plan subscriber, your account includes API access. You have full control over your tokens—you can create and delete them at any time.

To revoke a token's permissions, delete the token.

![Manage API tokens]({{site.baseurl}}/images/access-and-authentication/access-and-authentication--api-tokens.png)

To get to this page, select [**<i class="li li-gear"></i> > Tools > API tokens**](https://app.logz.io/#/dashboard/settings/api-tokens) in the top menu.

###### Working with API tokens

* To create an API token, type a brief **token name** and click **Save**.

* To delete an API token, click the token's <i class="li li-x"></i>.

<div class="info-box gotcha">
  Deleting a token affects any integrations that use that token. Make sure you update integrations that use a token you deleted.
</div>
