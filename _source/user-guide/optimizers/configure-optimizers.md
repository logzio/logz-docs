---
layout: article
title: Configure optimizers
permalink: /user-guide/optimizers/configure-optimizers.html
flags:
  logzio-plan: pro
tags:
  - data-optimizers
contributors:
  - imnotashrimp
---

To create a new optimizer, you'll start in Kibana so you can test the query you want to use. After that, you'll continue to the **Create an optimizer** page, where you can configure the optimizer settings.

  Before creating an optimizer, you'll need a timeless account to send the data to. If you need help setting up a timeless account, see [Manage timeless accounts]({{site.baseurl}}/user-guide/accounts/manage-timeless-accounts.html).
  {:.info-box.note}

If you want help updating an existing optimizer, you can [skip the first part of this page](#to-configure-an-optimizer).

#### To create an optimizer

##### Set your query in Kibana

In Kibana, type a query in the query bar
and press **Enter**.

![Kibana query bar](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/kibana--query-bar.png)

Review the results in the histogram and the document table,
and make sure your query returned the expected results.

Click **Create Optimizer** (to the right of the query bar) to open the **Create an optimizer** page.

Continue with [To configure an optimizer](#to-configure-an-optimizer).


#### To configure an optimizer {#to-configure-an-optimizer}

![Configure an Optimizer](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts--configure-alert.png)

<div class="tasklist">

##### Name the optimizer

Type a **Name** and a detailed **Description**.

##### _(Optional)_ Edit the search settings

If you need to, change your optimizer **Query** and the **Accounts** that the query will search.

If you use an invalid query, the optimizer will be automatically disabled.
Run your query in Kibana so you can be sure you're getting the expected results.
{:.info-box.important}

##### _(Optional)_ Edit group by settings

To store aggregate results, group your search fields.

![Group alert fields](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alerts/alerts--group-by.png)

Click **Add group by** to add up to 3 groups.

In the **Select Field** list,
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

<video autoplay loop>
    <source src="{{site.baseurl}}/videos/alerts/alerts--custom-format.mp4" type="video/mp4" />
</video>

To send the raw JSON documents to your timeless account, choose **Default format**.
To send a summary table, choose **Custom format**.

  If you added any groups (in step 3), the custom format table will show the aggregated fields that you used. To change these fields, you'll need to change your Group by selection.
  {:.info-box.note}

If you choose **Custom format**, click <i class="li li-plus"></i> to add a column to the table, and then choose a field to show in the new column.

Click **Save** to save your optimizer. Logz.io will start sending your logs to the configured timeless account.

</div>
