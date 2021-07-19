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
  - yberlinger
  - danielberman
---

Lookups are custom lists that you can use for simpler, easier query filtering in Kibana. 
Instead of adding a long list of elements to your query, you can create lookup lists and use them to filter results by adding the operator `in lookups` or `not in lookups`. 

For example, you can create lookups of allowlisted or blocklisted usernames, IP addresses, regions, or domains. 

Each list you create is added the main Lookups library: Because the lookup lists are centrally managed, any list can be easily updated and changed without requiring manually updating multiple dashboards, saved searches, security rules, and so on.

Configuring an expiration with the optional **Time to Live** (**TTL**) setting makes it possible to set a default time range for how long new lists should be actively used to filter queries, or to set a specific time range for a specific list. 


![Lookup lists](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/lookup_lists-existinglists.png)

To view and create lookup lists, from the **Cloud SIEM** menu, select [**More Options > Lookups**](https://app.logz.io/#/dashboard/security/rules/lookup).

![Lookup navigation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/lookups_newnav.png)


To create a large lookup list with up to 200 elements, we recommend that you use a CSV file to upload values. The [Lookup lists API endpoints](https://docs.logz.io/api/#tag/Lookup-lists) also let you independently create and update a large lookup list.
{:.info-box.tip} 



#### Create a lookup

<!-- You can use one of the following methods to create a lookup list: 

* Manual 
* CSV upload: For larger lists, you can upload a CSV with up to 200 elements. You can also use a CSV file to update elements in a lookup list. 
* Via API: To create a new list, use the [Create lookup lists API](https://docs.logz.io/api/#tag/Lookup-lists), and then add elements, either with a CSV file or with the [Add eleement to a lookup list API](https://docs.logz.io/api/#operation/createLookupListElement). -->

<!-- 
Time to live (TTL) displays the number of days remaining until the lookup list is expired: A lookup list with a TTL of 1 day expires within 24 hours from the time it was created and a list with a TTL of 2 days expires within 48 hours from the creation time.


  -->

* In the [Lookups](https://app.logz.io/#/dashboard/security/rules/lookup) page,
  click **+ New lookup**, and **Name** your lookup. You can also add a **Description**. 
  
  Click **+ New element** to add a new item to the lookup. 
    
  ![Lookups](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/add-record-lookup-blank.png)

* Enter a **Value**. For example, an IP address or domain. You can also add a reference. 

* Click **Add** to confirm and save the new record.

  ![Lookups](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem-lookups/add-record-lookup.png)

*     

* Repeat the above step to continue adding the relevant records to your lookup.

#### Update or delete a lookup

In the [Lookups](https://app.logz.io/#/dashboard/security/rules/lookup) page:

* To add, update, or remove items from the lookup, hover over the lookup, click **edit** <i class="li li-pencil"></i>, make your changes, and then click **Save**.

* To delete a lookup, hover over the item and click **delete** <i class="li li-trash"></i> to delete it. You'll be asked to confirm the deletion.


#### Upload a CSV file with lookup list elements

To create larger lists, you can upload a CSV with up to 200 elements, or use a CSV file to update elements in an existing lookup list.

Duplicate values are merged



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
