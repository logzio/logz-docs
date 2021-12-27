---
layout: article
title: Metrics shipping token
permalink: /user-guide/accounts/finding-your-metrics-account-token/
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
contributors:
  - shalper
  - yberlinger
---

When you're setting up data shipping to your Metrics account, you'll need to include your Metrics shipping token. The token routes your data to the right account in Logz.io.


Here's how to get the metrics token:

<!-- tabContainer:start -->
<div class="branching-container">

* [Via the Manage Tokens page](#manage-token)
* [Via the Manage accounts page](#manage-accounts)
{:.branching-tabs}

<!-- tab:start -->
<div id="manage-token">

### Via the Manage Tokens page

{% include general-shipping/manage-tokens-nav.md %}
{% include general-shipping/data-shipping-tokens_vars.md product="Metrics" %}



</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="manage-accounts">

### Via the Manage accounts page

You must have admin permissions for the Logz.io Infrastructure Monitoring account to view the **Manage accounts** page. If you're not an admin user for the account, consult with an account admin to get the Infrastructure Monitoring token information. 

From your main account, go to the <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage accounts** page</a>. It can be reached by selecting **<i class="li li-gear"></i> > Settings > Manage accounts**.

Scroll down to the Metrics account section,
and click the account you want to ship to.
The account's token and other settings are displayed.

![Metrics Shipping Token](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/metrics-token-resized.png)


</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->