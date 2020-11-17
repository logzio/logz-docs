---
layout: article
title: Lookups
permalink: /user-guide/lookups/
flags:
  logzio-plan: enterprise
tags:
  - security-analytics
  - lookups
  - kibana-filters
  - security-rules
contributors:
  - shalper
  - imnotashrimp
  - danielberman
---

Lookups are custom lists that allow you to easily filter by large lists in Kibana.
Instead of adding a long list of elements to your query, you can create lookup lists and filter by them with the operator `in lookups` or `not in lookups`.

For example, you can create lookups of whitelisted or blacklisted usernames, IP addresses, regions, or domains. 

Since the lookup list is centrally managed, it can be easily updated and changed without requiring manually updating multiple dashboards, saved searches, security rules, etc.

![Lookups](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/siem-lookups.png)

To create a lookup list, select [**Rules > Lookups**](https://app.logz.io/#/dashboard/security/rules/lookup) from the top menu of your Cloud SIEM account.

If you would like to create a lookup list with a large number of elements, please <a class="intercom-launch" href="mailto:help@logz.io">contact the Support team</a> so they can create it for you. A new lookups API is coming soon to allow you to create and update a large lookup list independently.
{:.info-box.tip} 

#### Create a lookup

* In the [Lookups](https://app.logz.io/#/dashboard/security/rules/lookup) page,
  click **+ New lookup**. **Name** your lookup. You can also add a **Description**. 
  
  Click **+ Add record** to add a new element to the lookup. 
    
  ![Lookups](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/add-record-lookup-blank.png)

*  Type in a **Value**. For example, an IP address or domain. You can also add a reference **Note**. Click **Add** to confirm and save the new record.

  ![Lookups](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/add-record-lookup.png)

* Repeat the above step to continue adding the relevant records to your lookup.

#### Update or delete a lookup

In the [Lookups](https://app.logz.io/#/dashboard/security/rules/lookup) page:

* To add, update, or remove items from the lookup, hover over the lookup, click **edit** <i class="li li-pencil"></i>, make your changes, and then click **Save**.

* To delete a lookup, hover over the item and click **delete** <i class="li li-trash"></i> to delete it. You'll be asked to confirm the deletion.

#### Filter by lookups in Kibana

You can filter by lookups in Kibana dashboards, security rules, and searches.

For example, go to the [Research](https://app.logz.io/#/dashboard/security/research) page or open a Dashboard. Click **Add a filter** to show the filter dialog box.

![Filter by lookup](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/filter-by-lookup.png)

* **Field** - Select a field to filter by.
* **Operator** - Select the operator **in lookups** or **not in lookups**.
* **Value** - Select the lookup you want to filter by.

#### Add a lookup filter to a security rule

Security rules can filter by a lookup. [Learn more about managing security rules]({{site.baseurl}}/user-guide/cloud-siem/manage-security-rules.html).

![Filter by lookup in Logz.io security rule](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/filter-by-lookup-rules.png)
