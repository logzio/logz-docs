---
layout: article
title: Lookups
description: Lookups are reference lists that you can use to filter Kibana results or to power your security rules. Using lookups, you can maintain lists of anything you want to filter by, such as users, IP addresses, regions, or domains.
permalink: /user-guide/security-analytics/lookups.html
flags:
  logzio-plan: pro
tags:
  - security-analytics
  - lookups
  - security-rules
contributors:
  - imnotashrimp
  - proudboffin
---

Lookups are reference lists that you can use to filter Kibana results or to power your security rules.
Using lookups, you can maintain lists of anything you want to filter by, such as users, IP addresses, regions, or domains.

You can use lookups in multiple Kibana searches and security rules.
For example, you can create a lookup that contains a list of company IP addreses and update the lookup as your list of IP addresses changes over time.
All security rules that include this lookup will use the updated list, saving you the effort of managing this list everywhere it's used and avoiding copy-and-paste mistakes.

![Lookups]({{site.baseurl}}/images/lookups/lookups.png)

You can find lookups by selecting [**Rules > Lookups**](https://app.logz.io/#/dashboard/security/rules/lookup) from the top menu of your Security Analytics account.

###### Create or delete a lookup

* Click **New lookup** to create an untitled lookup.
  Give your new lookup a **Name** and optional **Description**.
  Your changes are automatically saved when you press Tab to advance to the next form field.
* To delete a lookup, **Delete** for that lookup.

###### Update a lookup

* To add a new item to your lookup, type a **Value** and an optional **Note**, and then click **Add**.
* Click **Edit** to change an item's value or note and then **Save** your changes, or click **Cancel** to revert your changes.
* Click **Delete** to delete an item from the lookup.

###### Using lookups in Kibana and security rules

<video autoplay controls loop width="500">
  <source src="{{site.baseurl}}/videos/lookups/add-lookup-in-kibana.mp4" type="video/mp4" />
</video>

{: .tasklist .firstline-headline }
1. Add a Kibana filter with your lookup

    In the [**Research**](https://app.logz.io/#/dashboard/security/research) tab, click **Add a filter**.

    Choose a field to filter by.

    Choose **in lookup** or **not in lookup** from the **Operators** list, and then choose the lookup your want to filter by.

2. _(Optional)_ Create a security rule

    Click **Create Alert** to make a new security rule with your filter.
    If you need help with creating a new security rule, see [Manage security rules]({{site.baseurl}}/user-guide/security-analytics/manage-security-rules.html).