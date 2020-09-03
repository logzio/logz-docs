---
layout: article
title: Log shipping tokens
permalink: /user-guide/tokens/log-shipping-tokens/
flags:
  admin: true
  logzio-plan: pro
tags:
  - tokens
  - account-tokens
contributors:
  - shalper
---

Log shipping tokens are used in shipper configurations to direct data to the relevant Logz.io account.

Every account has its own set of tokens. Only account admins have permissions to access the account tokens, view them and manage them.

To manage your log shipping tokens, select an account. Then select [**<i class="li li-gear"></i> > Tools > Manage tokens**](https://app.logz.io/#/dashboard/settings/manage-tokens/log-shipping) in the top menu and select the **Log shipping tokens** tab.



#### Managing log shipping tokens

You can have up to 5 tokens enabled simultaneously.

* To create a token, click **+ New log shipping token**, type in a **name**, then click **Add**. The new token will be enabled by default.

* To rename a token, hover over the token, click **edit** <i class="li li-pencil"></i> and type in a new name. Then click **Save**.

* To delete a token, hover over it, and click **delete** <i class="li li-trash"></i> to delete it. A confirmation module will ask you to confirm the action.

* To enable or disable a token, toggle the control. <br> Every account is required to have at least one enabled token at any given time.

  If there is only one token, it can't be disabled or deleted.


#### Using log shipping tokens

Log shipping tokens are used in the shipping configuration to send data to the relevant Logz.io account.

To view your default token, go to [**<i class="li li-gear"></i> > Settings > General**](https://app.logz.io/#/dashboard/settings/general). You can click the token to copy it.

The default token is auto-populated in the [configuration instructions](https://app.logz.io/#/dashboard/data-sources/) in the app. You can replace the token with another enabled token.

If you prefer to view the configuration instructions outside the app, note that you will need to replace the the `<<SHIPPING-TOKEN>>` parameter with one of your enabled log shipping tokens. See more in the [log shipping guide]({{site.baseurl}}/shipping/).


#### Security advantages

Having multiple log shipping tokens gives you greater control to manage your tokens and to decide when and how to reset them for regulatory compliance reasons or for security best-practices.

For example, you'll be able to cycle your tokens following changes to your team, after members join or leave, or when collaborating with contractors outside of your organization. If you're working on an integration with a partner organization, you'll be able to give them a temporary log shipping token and delete it once the project is complete.
