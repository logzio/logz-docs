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

**Unified filters** allow you to narrow down logs, metrics, and traces data across your Metrics dashboards by creating a functional overview of your data.

Filters apply to all dashboards, and are saved per user, per account, which means that changing views or logging out will not affect your filters, and their current state will be saved.

<p class="info-box note">To use Unified filters, you’ll first need to configure <a href="https://docs.logz.io/user-guide/accounts/unified_variables.html" target="_blank">Unified variables</a>.</p>

#### Create Unified filters

<div class="tasklist">

##### Open your Metrics account

Navigate to your **Metrics** account. Click the **Filters** button located at the header, and click on **Add a filter**.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/unified-filters-menu.mp4" type="video/mp4" />
  </video>

##### Select the Unified Variable

Select the field you want to use in your filter. The drop-down list includes all of your existing [Unified Variables](), and once chosen, you'll be able to review the variables included in the field.

![Unified Filters variables list](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/uf-fields.png)

##### Configure and save

Add the condition you'd like to apply to your filter from the drop-down menu, and click Save. Once saved, the filter will automatically apply across your Metrics dashboards.


</div>


#### Remove/toggle filters

To **remove** a specific filter, click on the X located next to it. 

To disable/enable all of your filters, use the toggle button located on the right side of the menu.

![Toggle unified filters](https://dytvr9ot2sszz.cloudfront.net/logz-docs/Infrastructure-monitoring/toggle-filters.gif)

**Please note**: navigating to the Logs, Tracing or SIEM Logz.io platforms automatically disables all filters.