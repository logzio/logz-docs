---
layout: article
title: Configure optimizers
permalink: /user-guide/optimizers/configure-optimizers.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Learn how to create and configure optimizers
flags:
  logzio-plan: pro
tags:
  - data-optimizers
contributors:
  - imnotashrimp
  - yberlinger
---

To create a new optimizer, start in Kibana so you can test the query you want to use. 

Before creating an optimizer, you'll need a timeless account to send the data to. If you need help setting up a timeless account, see [Manage timeless accounts]({{site.baseurl}}/user-guide/accounts/manage-timeless-accounts.html).

After you've created your account, navigate back to **Kibana** > **Create an optimizer**, where you can configure the optimizer settings.

Once a log is pulled to your Logz.io account, it takes up to **2 hours** until it appears in your timeless account.
{:.info-box.note}


If you want help updating an existing optimizer, you can [skip the first part of this page](#to-configure-an-optimizer).

#### To create an optimizer

##### Set your query in Kibana

In Kibana, type a query in the query bar
and press **Enter**.


![Kibana query bar](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/kibana--query-bar_aug2021.png)

Review the results in the histogram and the document table,
and make sure your query returned the expected results.

Click **Create Optimizer** (above the query bar) to open the **Create an optimizer** page. <br>
Continue with [To configure an optimizer](#to-configure-an-optimizer).


#### To configure an optimizer {#to-configure-an-optimizer}

![Configure an Optimizer](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/create-optimizer_aug2021.png)

<div class="tasklist">

##### Name the optimizer

Type a **Name** and a detailed **Description**.

##### _(Optional)_ Edit the search settings

If you need to, change your optimizer **Query** and the **Accounts** that the query searches.

<!-- info-box-start:info -->
If you use an invalid query, the optimizer will automatically be disabled.
Run your query in Kibana so you can be sure you're getting the expected results. <br><br>
The filter tags that are displayed in the Optimizer **Query** section indicate which filters you used for the query in **Discover**. 
To update the filters, you'll need to add them to your search in **Discover**.
{:.info-box.important}
<!-- info-box-end -->

##### _(Optional)_ Edit group by settings

To store aggregate results, group your search fields.

![Group optimizer fields](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/optimizer-groupby_aug2021.png)

Click **Group by** to add up to 3 groups.

In the **Choose fields** list,
choose a field to group by.

To limit the available fields,
choose a log type from the **Filter by type** list.
To show fields for all log types,
choose **Clear filter**.

##### Set the frequency

In the **Trigger** section, choose how often this optimizer should run.

##### Choose a timeless account

In the **Action** section, choose a timeless account to send to.

##### Choose an output format

Choose an **Output**.


To send the raw JSON documents to your timeless account, choose **Full log**.


To send a summary table, choose **Aggregations**.

  If you added any groups (in step 3), the aggregations table will show the aggregated fields that you used. To change these fields, you'll need to change your Group by selection.
  {:.info-box.note}

If you choose **Aggregations**, click <i class="li li-plus"></i> to add a column to the table, and then choose a field to show in the new column.

![Optimizer aggregation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/optimizr-aggreg2_aug2021.png)

Click **Save** to save your optimizer. Logz.io will start sending your logs to the configured timeless account.

</div>
