---
layout: article
title: Shared tokens
contributors:
  - imnotashrimp
  - proudboffin
---

Using shared tokens, you can share Kibana visualization and dashboard snapshots. If your plan includes API access, you can also use shared tokens for your integrations.

Token filters allow you to limit the data available to a shared token.

![Manage shared tokens]({{site.baseurl}}/images/access-and-authentication/access-and-authentication--shared-tokens.png)

You can get to this page by clicking [**Shared Tokens**](https://app.logz.io/#/dashboard/settings/shared-tokens) in your admin settings (<i class="li li-gear"></i> in the top menu).

###### Working with shared tokens

* To create a token, type a brief **token name** and click **Save**.

* To attach a filter, click **Attach filter**, choose a filter, and then click **Save**. (If you need help creating a filter, see [Working with token filters](#working-with-token-filters), below.)

* To remove a filter attached to a token, click the filter tag's <i class="li li-x"></i>.

* To delete a token, click the token's <i class="li li-x"></i>.

<div class="info-box gotcha">
  Changing the filters attached to a token, or deleting a token, will affect any integrations that use that token. Make sure you test your integrations when you make these changes.
</div>

###### Working with token filters {#working-with-token-filters}

* To create a filter, type a brief **description**, type the name of a **field** and the **value** to filter the field by, and then click **Save**. You can attach your new filter to any of your shared tokens.

<div class="info-box tip">
  Test new filters in Kibana to make sure you get the expected results.
</div>

* To delete a filter, click the filter's <i class="li li-x"></i>.