---
layout: article
title: Manage shared tokens
permalink: /user-guide/access-and-authentication/shared-tokens.html
flags:
  admin: true
  logzio-plan: community
contributors:
  - imnotashrimp
  - proudboffin
---

Using shared tokens, you can share Kibana visualization and dashboard snapshots. You can limit the data available to a shared token with token filters.

![Manage shared tokens]({{site.baseurl}}/images/access-and-authentication/access-and-authentication--shared-tokens.png)

To reach this page, click [**<i class="li li-gear"></i> > Tools > Shared tokens**](https://app.logz.io/#/dashboard/settings/shared-tokens) in the top menu.

###### Working with shared tokens

* To create a token, type a brief **token name** and click **Save**.

* To attach a filter, click **Attach filter**, choose a filter, and then click **Save**. (See [Working with token filters](#working-with-token-filters), below)

* To remove a filter attached to a token, click the filter tag's <i class="li li-x"></i>.

* To delete a token, click the token's <i class="li li-x"></i>.

###### Working with token filters {#working-with-token-filters}

* To make a new filter, type a brief **description**, type the name of a **field** and the **value** to filter the field by, and then click **Save**. You can attach your new filter to any of your shared tokens.

<div class="info-box tip">
  Test new filters in Kibana to make sure you get the expected results.
</div>

* To delete a filter, click the filter's <i class="li li-x"></i>.