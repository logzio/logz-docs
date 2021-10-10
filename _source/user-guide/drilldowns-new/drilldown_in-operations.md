---
layout: article
title: Add drilldown links to logs
permalink: /user-guide/drilldown-logs/
flags:
  logzio-plan: pro
tags:
  - logz.io-security
  - siem
contributors:
  - yberlinger
  - shalper
---

A drilldown link is a redirect link that takes users directly from an informative log field to another dashboard, already filtered by the selected field.

When investigating the logs, drilldown links make it possible to simply click on an informative field (such as an IP address, username, or hostname) to open a related dashboard, filtered by the selected field, enabling you to review the event in a wider context.

Adding Drilldown links to your account will help you speed up and streamline investigations and structure your team's workflows and processes.

Drilldown links are configurable via your Log Management account. To open the **Drilldown settings**,
click [**Logs > (MORE OPTIONS) Drilldowns**](https://app.logz.io/#/dashboard/settings/drilldowns) in the navigation menu.
<!-- link placeholder for drilldowns -->

![Log Management drilldown links](https://dytvr9ot2sszz.cloudfront.net/logz-docs/placeholderxxxx.png)
_create video of creating drilldown, then using a drilldown link to open a dashboard_ 

### Add a drilldown link

/comment _- _is it "Start from",  "Lead to", or "Correlate with"?_

1. Click **+ Add drilldown** and provide a name for the link.
1. In **Start from**, select the **log field** from the dropdown list. This is the field that will become a hyperlink.
1. In **Correlate with**, select a **Dashboard** from the dropdown list. This is the target destination of the drilldown link. When users click the log field in a dashboard or Kibana Discover, it will direct them to this dashboard.
1. Click **Save drilldown** to confirm the new drilldown link.

![Adding a Log Management drilldown](https://dytvr9ot2sszz.cloudfront.net/logz-docs/drilldowns/logdrilldown_oct2021.png)  _this is a placeholder_

### Edit or delete a drilldown link

* To edit a drilldown link, hover over the drilldown, click **Edit** <i class="li li-pencil"></i>, make your changes, and click **Save drilldown** to confirm the changes.

* To delete a drilldown link, hover over the drilldown and click **Delete** <i class="li li-trash"></i> to delete it. You'll be asked to **Confirm** the deletion.


### Example

<!-- Your Logz.io account comes with a few drilldown links preconfigured by default.

For example, IP addresses in the [Threat Overview dashboard](https://app.logz.io/#/dashboard/security/threats/overview) function as drilldown links that direct you to the **IP Investigation** dashboard in your account. This helps to speed up the investigation and to structure your team's workflow. -->

Drilldown links maintain context: The filters and time range settings that are already applied for the starting field are retained when the drilldown link is opened.

![IP addresses function as drilldown links](https://dytvr9ot2sszz.cloudfront.net/logz-docs/placeholder.png) _this is a placeholder_
