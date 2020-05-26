---
layout: article
title: Lookups
description: Lookups are reference lists that you can use to filter Kibana results or to power your security rules. Using lookups, you can maintain lists of anything you want to filter by, such as users, IP addresses, regions, or domains.
permalink: /user-guide/lookups/
flags:
  logzio-plan: enterprise
tags:
  - security-analytics
  - lookups
  - kibana-filters
  - security-rules
contributors:
  - imnotashrimp
  - danielberman
---

Lookups let you easily manage sets of data, which you can use in multiple Kibana searches or security rules.
Lookups can hold whitelisted or blacklisted values like usernames, IP addresses, regions, or domains.

For example, if you create a lookup that contains a list of company IP addresses, you can update the lookup as your IP addresses change over time.
All searches and security rules that use this lookup will compare logs to the updated list—so you'll avoid the mistake-prone process of maually copying your data everywhere it's used.

![Lookups](https://dytvr9ot2sszz.cloudfront.net/logz-docs/lookups/lookups.png)

You can find lookups by selecting
[**Rules > Lookups**](https://app.logz.io/#/dashboard/security/rules/lookup)
from the top menu of your Cloud SIEM account.

#### Create or delete a lookup

* In the [Lookups](https://app.logz.io/#/dashboard/security/rules/lookup) page,
  click **New lookup** to create an untitled lookup.
  Give your new lookup a **Name** and optional **Description**.
  Your changes are automatically saved when you press Tab to advance to the next form field.
* To delete a lookup,
  click **Delete** for that lookup.

#### Update a lookup

* In the [Lookups](https://app.logz.io/#/dashboard/security/rules/lookup) page,
  click **Edit** for the lookup you want to update.
* To add a new item,
  type a **Value** and an optional **Note**, and then click **Add**.
* Click **Edit** to change an item's value or note and then **Save** your changes,
  or click **Cancel** to revert your changes.
* Click **Delete** to delete an item from the lookup.

#### Use lookups in Kibana filters and security rules

<div class="tasklist">

##### Add a Kibana filter with your lookup

In the [Research](https://app.logz.io/#/dashboard/security/research) page,
click **Add a filter** to show the filter dialog box.

<video autoplay controls loop width="500">
  <source src="{{site.baseurl}}/videos/lookups/add-lookup-in-kibana.mp4" type="video/mp4" />
</video>

Choose a field to filter by.

Choose **in lookup** or **not in lookup** from the **Operators** list,
and then choose the lookup you want to filter by.

##### _(Optional)_ Create a security rule

Click **Create Alert** (to the right of the search bar)
to make a new security rule with your filter.
Your new security rule will contain the lookup you used in step 1.

If you need help with creating a new security rule,
see [Manage security rules]({{site.baseurl}}/user-guide/cloud-siem/manage-security-rules.html).
