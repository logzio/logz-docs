---
layout: article
title: Configure optimizers
contributors:
  - sboroda
---

To create a new optimizer, you'll start in Kibana so you can test the query you want to use. After that, you'll continue to the Create a New Optimizer page, where you can configure the optimizer settings.

<div class="info-box note">Before creating an optimizer, you'll need a timeless account to send the data to. If you need help setting up a timeless account, see <a href="{{site.baseurl}}/user-guide/accounts/manage-timeless-accounts.html">Manage timeless accounts</a>.</div>

If you want help updating an existing optimizer, you can [skip the first part of this page](#to-configure-an-optimizer).

###### To start a new optimizer

![Kibana query bar]({{site.baseurl}}/images/kibana/kibana--query-bar.png)

1. In Kibana, type a query in the query bar, and press Enter. Review the results in the histogram and the document table, and make sure your query returned the expected results.

2. Click **Create Alert** (to the right of the query bar). The Create Alert Definition page is shown. Continue with [To configure an optimizer](#to-configure-an-optimizer).

###### To configure an optimizer {#to-configure-an-optimizer}

![Configure an Optimizer]({{site.baseurl}}/images/alerts/alerts--configure-alert.png)

1. Type a **Name** and a detailed **Description**. 

2. If you need to, change your optimizer **Query** and the **Accounts** that the query will search.

    <div class="info-box gotcha">If you use an invalid query, the optimizer will be automatically disabled. Run your query in Kibana so you can be sure you're getting the expected results.</div>

3. _(Optional)_ If you want to store aggregate values:

    ![Group alert fields]({{site.baseurl}}/images/alerts/alerts--group-by.png)
    
    1. Click **Add group by** to add up to 3 groups.

    2. In the **Select Field** list, choose a field to group by. 
    
        To limit the available fields, choose a log type from the **Filter by type** list. To show fields for all log types, choose **Clear filter**.

4. In the **Type** section, click **Optimizer**.

5. In the **Trigger** section, choose how often this optimizer should run.

6. In the **Action** section, choose a timeless account to send to.

6. Choose an **Output**.

    ![Custom format]({{site.baseurl}}/videos/alerts/alerts-custom-format.gif)

    To send the raw JSON documents to your timeless account, choose **Default format**. To send a summary table, choose **Custom format**.

    <div class="info-box note">If you added any groups (in step 3), the custom format table will show the aggregated fields that you used. To change these fields, you'll need to change your Group by selection.</div>

    If you choose Custom format, click <i class="li li-plus"></i> to add a column to the table, and then choose a field to show in the new column.

Click **Save** to save your optimizer. Logz.io will start sending your logs to the configured timeless account.