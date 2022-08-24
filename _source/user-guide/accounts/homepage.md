---
layout: article
title: Set a custom Logz.io landing page
permalink: /user-guide/accounts/homepage.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Choose your main Logz.io landing page
flags:
  logzio-plan: community
tags:
  - accounts
  - sub-accounts
  - main-account
  - timeless-accounts
contributors:
  - hidan
---

You can set a custom landing page to view whenever you log into your Logz.io account.

The landing page can be any dashboard, service, and object from your Logs, Metrics, or Tracing accounts.

#### Set up your landing page

Log into your Logz.io account and navigate to **[Settings > General Settings](https://app.logz.io/#/dashboard/settings/general)**. 

Your default landing page is the [Logs Discover](https://app.logz.io/#/dashboard/kibana) page. 

![Main landing page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/main-landing-page.png)

To change it, open the drop-down list to view all the available pages you can choose from. You can either scroll through the various options or use the text box to search for a specific page or elements.

![Search for landing page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/choose-landing-page.png)

Each item on the list includes:

* An **icon** representing what the item is or where it's located. It can be an alert, or a page inside Logs, Metrics, Tracing, or your settings.
* The **name** of the page or object.
* A **short description** to provide more information about the page or object.

##### Icon dictionary

|**Icon**|**Location**|
|![logs](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/logs.svg)|Logs|
|![metrics](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/metrics.svg)|Metrics|
|![tracing](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/tracing.svg)|Tracing|
|![alert](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/alert.svg)|Alerts|
|![settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/cog.svg)|Settings|

For example, **api-gateway** has the Tracing logo and a short description, stating it's part of the Tracing environment.

![Landing page info](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/api-gateway.png)

Once you choose a new landing page, a popup will appear asking you to approve the change. Clicking on **Set landing page** will confirm the change.

![Popup confirmation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/set-page-popup.png)

That's it! Your new landing page will appear whenever you log into Logz.io, or when you click on the Logz.io icon at the top left corner of the screen.

#### Reset your landing page

If you want to reset your chosen Landing page, navigate to **[Settings > General Settings](https://app.logz.io/#/dashboard/settings/general)**. Clicking on the **Reset to default** option next to the landing page will open a popup asking you to confirm the change. Once confirmed, your landing page will be the [Logs Discover](https://app.logz.io/#/dashboard/kibana) page.

![Reset landing page](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/landing-page/restore-to-default.png)
