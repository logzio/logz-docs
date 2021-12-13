---
layout: article
title: Getting started with Unified filters
permalink: /user-guide/accounts/unified_filters.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Getting started with Logz.io Unified filters
flags:
  admin: false
  logzio-plan: community
tags:
  - accounts
contributors:
  - hidan
---

**Unified Filters** are part of the Logz.io [Unified Dashboard](https://docs.logz.io/user-guide/accounts/unified_dashboards.html) feature, letting you narrow down logs, metrics, and traces data across your Metrics dashboards by creating a functional overview of your data. 

Each user can create their own list of filters, which apply to all Metrics dashboards.

<p class="info-box note">To use Unified Filters, you’ll first need to configure <a href="https://docs.logz.io/user-guide/accounts/unified_variables.html" target="_blank">Unified Variables</a>.</p>

#### Create a Unified filter

<div class="tasklist">

##### Open your Metrics account

Navigate to **[Metrics](https://app.logz.io/#/dashboard/metrics)** > **Filters** > **Add a filter**.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/unified-filters-menu.mp4" type="video/mp4" />
  </video>


##### Select the Unified variable

Filters use [Unified Variables](https://docs.logz.io/user-guide/accounts/unified_variables.html), and the drop-down list includes all of the existing variables in your account, showing the number of fields included in each one. 

Once you select a Unified Variable, you'll be able to view which fields it contains.

![Unified Filters variables list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/uf-fields.png)

##### Choose condition

Logz.io offers some conditions you can apply to your filters. Choose the one that matches your needs, and **Save**. The filter is automatically applied across your Metrics dashboards.

![Unified Filters condition list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/choose-condition.png)


</div>


#### Remove/toggle filters

You can **remove** filters by clicking the X located next to them. To disable all active filters, use the toggle in the upper right.

![Toggle unified filters](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/toggle-filters.gif)

<p class="info-box note">Navigating to the Logs, Tracing, or SIEM Logz.io platforms automatically disables all filters.</p>


