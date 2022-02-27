---
layout: article
title: Working with lookups
permalink: /user-guide/cloud-siem/work-lookups.html
flags:
  logzio-plan: pro
tags:
  - siem
contributors:
  - nshishkin
---

A lookup is a reference that is used in the lookup table, which you can include in your rule or Kibana query. For example, you can use lookups to include or exclude certain IP addresses from a rule query.


### View the lookup table

To access the lookup table:

1. Sign in to Logz.io.

2. Go to **SIEM > Event Lookups**.


Here you can add a lookup to the table manually or export it from a CSV file.



##### Add a lookup manually

To manually add a lookup:

1. Select **+ New lookup**.

2. Add a lookup name.

3. If required, add a lookup description.

4. Select **+ New element**.

5. Add a value that defines the lookup, e.g. an IP address.

6. If required, add a comment for this lookup.

7. Add expiration time for the lookup.

8. Select **Add**.




##### Add a lookup list from a CSV file

To add a list of lookups from a CSV file:


1. Select **Upload from CSV file**.

2. Add expiration time to the lookup.

3. Select **Upload CSV file**.

4. Select the CSV file from your machine and confirm the selection.




##### Add a single lookup definition

To add a definition for a single lookup from a CSV file:


1. Select **+ New lookup**.

2. Add a lookup name.

3. If required, add a lookup description.

4. Select **Upload from CSV file**.

5. Add expiration time to the lookup.

6. Select **Upload CSV file**.

7. Select the CSV file from your machine and confirm the selection.


##### Reference a lookup in a security rule

To refer to a lookup when creating a security rule:

1. Navigate to the **Create a rule** window as described in **How to create a security rule**.

2. In the first step, select **Add a filte**r.

3. Select the filter field.

4. Select whether the filter is included in or excluded from a lookup.

5. Select the lookup you are referring to.

6. Select **Save**.