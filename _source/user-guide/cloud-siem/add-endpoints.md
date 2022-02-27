---
layout: article
title: Adding notification and SOAR endpoints
permalink: /user-guide/cloud-siem/add-endpoints.html
flags:
  logzio-plan: pro
tags:
  - siem
contributors:
  - nshishkin
---

A notification endpoint defines where a notification of a rule execution needs to be sent to. Logz.io has a number of pre-configured endpoints, such as Slack or Opsgenie. Otherwise you can easily add any notification endpoint using the **Custom** feature. The latter option is currently used to integrate with SOARs.

### Add a pre-configured notification endpoint

To add a pre-configured notification endpoint:

1. Sign in to Logz.io as an administrator user.

2. Go to **Settings > Notification** endpoints.

3. Select your endpoint source from the **Type** menu.

   * Add a name for this endpoint.

   * If required, add a description for the endpoint.

   * Add the required connection data, e.g. API key or Instance URL.

   * If you want to test the connection, select **Run the test**.

4. Select **Add endpoint**.

### Add a custom notification endpoint

To add a custom notification endpoint:


1. Sign in to Logz.io as an administrator user.

2. Go to **Settings > Notification** endpoints.

3. Select **Custom from the Type** menu.

   * Add a name for this endpoint.

   * If required, add a description for the endpoint.

   * Add the webhook URL.

   * Select the required method.

   * Select the webhook header.

   * If you want to test the connection, select **Run the test**.

4. Select **Add endpoint**.