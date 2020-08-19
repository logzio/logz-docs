---
layout: article
title: Adding an alert
permalink: /user-guide/alerts/new-alert.html
flags:
  logzio-plan: community
tags:
  - alerts
contributors:
  - shalper
---

There are several ways to create an alert:

* In Kibana Discover, click the button **Create alert**. The form will automatically be filled in with the search query, filters, and selected accounts.

  <video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/create-alert.mp4" type="video/mp4" />
  </video>

* From the top menu, select **Alerts & Events > New alert**

* From the top menu, select **Alerts & Events > Alert definitions** and click the button **+ New alert**.

* You also have an option to create an alert based on an **Application Insight** or **Cognitive Insight** suggested by Logz.io.

  From the top menu, select **Insights**. Click the **Menu button <i class="li li-ellipsis-v"></i>** for the relevant Insight and select **Create an alert**.

* You can duplicate an existing alert in the same account when you want to reuse its configuration without creating it from scratch.

  To duplicate an alert, go to the [**Alert definitions**](https://app.logz.io/#/dashboard/triggers/alert-definitions) page, hover over the alert, click its action menu (<i class="li li-ellipsis-v"></i>) and select **Duplicate**.

  ![Duplicate alert](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/duplicate-alert.png)
