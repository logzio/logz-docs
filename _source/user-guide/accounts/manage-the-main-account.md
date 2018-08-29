---
layout: article
title: Manage the main account
permalink: /user-guide/accounts/manage-the-main-account.html
flags:
  admin: true
  logzio-plan: community
contributors:
  - imnotashrimp
---

Users in your main account have access to your data in sub accounts and timeless accounts. Admin users of the main account also have these permissions:

* Create, view, update, and delete users in the main account and sub accounts, including other admin users

* Create, view, update, and delete sub accounts

* Create, view, update, and delete timeless accounts

* Create and delete shared tokens, token filters, and API tokens

![Manage the main account]({{site.baseurl}}/images/accounts/accounts--manage-main-account.png)

Because of the high level of permissions, we recommend limiting the number of admin users in the main account.

###### To manage your main account

1. In the **Time based retention plan** panel, click the main account. The main account is the first account in the list.

2. To make account utilization metrics available in Kibana, select **Save account utilization metrics**, and choose a time interval (10, 30, or 60 minutes). If you select this check box, you can find utilization metrics in Kibana by searching for `type:logzio_account_utilization`.

3. To make the log size available in Kibana, select **Save log size**. If you select this check box, you can find log size in Kibana by searching for the `logSizeEnabled` field.

4. To use Kibana visualizations and dashboards from other accounts, add accounts to the **Use objects from the selected accounts** box.

5. Click **Apply** to save your changes.