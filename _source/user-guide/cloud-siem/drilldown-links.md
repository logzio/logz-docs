---
layout: article
title: Add drilldown links
permalink: /user-guide/cloud-siem/drilldown-links/
flags:
  logzio-plan: enterprise
tags:
  - logz.io-security
  - siem
contributors:
  - shalper
---

A drilldown link is a redirect link that takes users directly from an informative log field to another dashboard, already filtered by the selected field.

When investigating a security incident through the logs, drilldown links make it possible to simply click on an informative field (such as an IP address, username, or hostname) to open a dashboard filtered by the selected field to review it in a much wider context.

Adding Drilldown links to your security account will help you speed up and streamline investigations and structure your team's workflows and processes.

Drilldown links are configurable from the account settings. To get to this page,
select [**<i class="li li-gear"></i> > Tools > Drilldown settings**](https://app.logz.io/#/dashboard/settings/drilldowns) in the top menu.

![Security drilldown links](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/siem-drilldown-links.png)

### Add a drilldown link

1. Click **+ Add drilldown**.
2. Select the **source field** from the dropdown list. This is the field that will become a hyperlink.
3. Select a **dashboard** from the dropdown list. This is the target destination of the drilldown link. When users click the log field in a dashboard or Kibana Discover, it will direct them to this dashboard.
4. Click **Add** to confirm the new drilldown link.

### Edit or delete a drilldown link

* To edit a drilldown link, hover over the drilldown, click **edit** <i class="li li-pencil"></i>, make your changes, and click **Save** to confirm the changes.

* To delete a drilldown link, hover over the drilldown and click **delete** <i class="li li-trash"></i> to delete it. You'll be asked to confirm the deletion.


### Example

Your Logz.io Security account comes with a few drilldown links preconfigured by default.

For example, IP addresses in the [Threat Overview dashboard](https://app.logz.io/#/dashboard/security/threats/overview) function as drilldown links that direct you to the **IP Investigation** dashboard in your account. This helps to speed up the investigation and to structure your team's workflow.

Drilldown links maintain context, such that any filters and time range settings already applied, will be kept.

![IP addresses function as drilldown links](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/drilldown-example.png)