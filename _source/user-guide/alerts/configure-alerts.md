---
layout: article
title: Configure alerts
permalink: /user-guide/alerts/configure-alerts.html
contributors:
  - imnotashrimp
---

To create a new alert, you'll start in Kibana so you can test the query you want to use. After that, you'll continue to the Create a New Alert page, where you can configure the alert and notification settings.

If you want help updating an existing alert, you can [skip the first part of this page](#to-configure-an-alert).

###### To start a new alert

![Kibana query bar]({{site.baseurl}}/images/kibana/kibana--query-bar.png)

1. In Kibana, type a query in the query bar, and press Enter. Review the results in the histogram and the document table, and make sure your query returned the expected results.

2. Click **Create Alert** (to the right of the query bar). The Create Alert Definition page is shown. Continue with [To configure an alert](#to-configure-an-alert)

###### To configure an alert {#to-configure-an-alert}

![Configure an Alert]({{site.baseurl}}/images/alerts/alerts--configure-alert.png)

1. Type a **Name** and a detailed **Description**. 

2. If you need to, change your alert **Query** and the **Accounts** that the query will search.

    <div class="info-box gotcha">
      If you use an invalid query, the alert will be automatically disabled. Run your query in Kibana so you can be sure you're getting the expected results.
    </div>

3. _(Optional)_ If you want to group logs in the alert notification:

    ![Group alert fields]({{site.baseurl}}/images/alerts/alerts--group-by.png)
    
    1. Click **Add group by** to add up to 3 groups.

    2. In the **Select Field** list, choose a field to group by. 
    
        To limit the available fields, choose a log type from the **Filter by type** list. To show fields for all log types, choose **Clear filter**.

4. Set your threshold and severity levels in the **Trigger** section. Click **Add multiple conditions** to add up to 3 threshold levels.

    ![Alert trigger thresholds]({{site.baseurl}}/images/alerts/alerts--trigger-settings.png)

5. _(Optional)_ If you want to receive notifications or emails when the alert is triggered, choose an alert endpoint. If you don't choose an endpoint, triggered alerts will still be logged:

    ![Alert notification actions]({{site.baseurl}}/images/alerts/alerts--notification-action.png)

    1. Choose the endpoints or email addresses to notify. If you need help adding a new endpoint, see [Alert endpoints]({{site.baseurl}}/user-guide/alerts/alert-endpoints.html).

    2. Choose a time period to suppress notifications.

        <div class="info-box note">
          When notifications are suppressed, Logz.io will continue to log triggered alerts without sending notifications. You can search triggered alert logs at any time.
        </div>

6. Choose an **Output**.

    <video autoplay loop>
        <source src="{{site.baseurl}}/videos/alerts/alerts--custom-format.mp4" type="video/mp4" />
    </video>

    To send raw JSON documents to your alert endpoints, choose **Default format**. To send a summary table, choose **Custom format**.

    <div class="info-box note">
      If you added any groups (in step 3), the custom format table will show the aggregated fields that you used. To change these fields, you'll need to change your **Group by** selection.
    </div>

    If you choose Custom format, click <i class="li li-plus"></i> to add a column to the table, and then choose a field to show in the new column.

Click **Save** to save your alert. If the thresholds are passed and the alert is triggered, Logz.io will log the alert and send the configured notifications.