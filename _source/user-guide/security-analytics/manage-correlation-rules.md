---
layout: article
title: Manage correlation rules
permalink: /user-guide/security-analytics/manage-correlation-rules.html
flags:
  logzio-plan: pro
tags:
  - security-analytics
  - correlation-rules
contributors:
  - imnotashrimp
  - proudboffin
---

Correlation rules help you connect the dots between your data sources and events that could indicate a security threat or breach.
Your Security Analytics account comes preconfigured with correlation rules for different types of attack types and security use cases.

You can create new correlation rules to supplement the built-in rules.
You can also update any preconfigured correlation rule at any time, including adding a notification endpoint (like email or Slack) or changing trigger thresholds.

###### To create a new correlation rule

![Query bar in the Research page]({{site.baseurl}}/images/security-analytics/security-analytics--research-query-bar.png)

1. In the [Research](https://app.logz.io/#/dashboard/security/research) page, type a query in the query bar, and press Enter.
  Review the results in the histogram and the document table, and make sure your query returned the expected results.

2. Click **Create Rule** (to the right of the query bar).
  The Create Correlation Rule page is shown.
  Continue with [To configure a correlation rule](#to-configure-a-correlation-rule).


###### To configure a correlation rule {#to-configure-a-correlation-rule}

![Configure correlation rule]({{site.baseurl}}/images/security-analytics/security-analytics--configure-correlation-rule.png)

1. Type a **Name** and a detailed **Description**.

2. If you need to, change your **Query**.

    <div class="info-box important">
      If you use an invalid query, the correlation rule will be automatically disabled. Run your query in Kibana so you can be sure you're getting the expected results.
    </div>

3. _(Optional)_ If you want to group logs in the notification:

    ![Correlation rule group by settings]({{site.baseurl}}/images/security-analytics/security-analytics--correlation-rule-group-by.png)

    1. Click **Add group by** to add up to 3 groups.

    2. In the **Select Field** list, choose a field to group by.

    3. To limit the available fields, choose a log type from the **Filter by type** list.
      To show fields for all log types, choose **Clear filter**.

4. Set your threshold and severity levels in the **Trigger** section.

    ![Correlation rule trigger settings]({{site.baseurl}}/images/security-analytics/security-analytics--correlation-rule-trigger-settings.png)

5. _(Optional)_ If you want to receive notifications or emails when the rule is triggered, choose an endpoint.
  If you don’t choose an endpoint, events will still be logged:

    1. Choose the endpoints or email addresses to notify.
      If you need help adding a new endpoint, see [Alert endpoints]({{site.baseurl}}/user-guide/alerts/alert-endpoints.html).

    2. Choose a time period to suppress notifications.

Click **Save** to save your correlation rule.
If the threshold is passed and the rule is triggered, Logz.io logs the event and sends the configured notifications.