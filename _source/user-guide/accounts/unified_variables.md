---
layout: article
title: Getting started with Unified variables
permalink: /user-guide/accounts/unified_variables.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Getting started with Logz.io Unified variables
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
contributors:
  - hidan
---

Unified variables represent a collection of fields from within your code. It allows the normalization of data type names from multiple data sources combined into one parameter.

These variables are the engine behind [Unified filters](https://docs.logz.io/user-guide/accounts/unified_filters.html), an additional feature that provides a comprehensive overview of your systems and applications.

<p class="info-box note">Only account admins can create and edit Unified variables. Account users can view the variables and the fields it includes.</p>

#### Create a Unified variable

<div class="tasklist">

##### Open your Metrics account

Navigate to your **[Metrics](https://app.logz.io/#/dashboard/metrics)** account, and click the **Unified variables** on the left side navigation. Alternatively, you can click the **<i class="li li-gear"></i>Edit variables** button located at the Filters top-navigation menu.


##### Name your new variable

Click on the **New variable** button to open the setup window, and choose a name for the Unified variable. Since variables are accessible to everyone in your organization, it's best to pick a name representing its inner fields.

![Unified Filters variables list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/variable-definition.png)

##### Add fields

Click on the **Add field** button to start adding your fields:
1. Field name should be the fields used in your code.
2. Data sources are the accounts using this field, and from which you'd like to aggregate the fields.
3. Click **Add** to add the fields.


![Adding fields to Unified variables](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/adding-fields-uv.gif)


To add additional fields, repeat the steps above. 

**Please note:** at this time, each data source can only be used once per Unified variable.

</div>


#### Create, edit and toggle

The main Unified variables screen includes all existing variables, as configured by account admins. 

Each variable can be toggled on/off, and **on hover**, you get the additional options to edit, duplicate or delete.

![Toggle unified filters](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/toggle-filters.gif)

You can use your Unified variables as part of Logz.io **[Unified filters](https://docs.logz.io/user-guide/accounts/unified_filters.html)** feature.