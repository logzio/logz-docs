---
layout: article
title: Distributed Tracing shipping token
permalink: /user-guide/accounts/finding-your-tracing-account-token/
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
contributors:
  - yberlinger
---

When you're setting up data shipping to your Distributed Tracing account, you'll need to include your Distributed Tracing shipping token. The token routes your data to the right account in Logz.io. 

Here's how to get the tracing token: 
<!-- tabContainer:start -->
<div class="branching-container">

* [Via the Manage Tokens page](#manage-token)
* [Via the Manage accounts page](#manage-accounts)
{:.branching-tabs}

<!-- tab:start -->
<div id="manage-token">

### Via the Manage Tokens page

{% include general-shipping/manage-tokens-nav.md %}
{% include general-shipping/data-shipping-tokens_vars.md product="Tracing" %}

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="manage-accounts">
### Via the Manage accounts page

{% include tracing-shipping/tracing-token.md %}


</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->


<!--You must have admin permissions for the Logz.io Distributed Tracing account to view the **Manage accounts** page. If you're not an admin user for the account, consult with an account admin to get the Distributed Tracing token information. 

From your main account, go to the <a href="https://app.logz.io/#/dashboard/settings/manage-accounts" target ="_blank"> **Manage accounts** page</a> of your Operations workspace. It can be reached by selecting **<i class="li li-gear"></i> > Settings > Manage accounts**. 

![Distributed Tracing token location](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing-token1.png)

Scroll to the Distributed Tracing account section and click the account you want to ship to.

The account's token and other settings are displayed when you click the relevant tracing account name at the bottom of the section.
![Reveal Distributed Tracing Token](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/trace-acct-tokeninfo11.gif)  -->

