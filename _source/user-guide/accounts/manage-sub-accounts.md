---
layout: article
title: Manage sub accounts
permalink: /user-guide/accounts/manage-sub-accounts.html
contributors:
  - imnotashrimp
  - ayigal
---

Sub accounts help you control data usage and manage user access to your logs. By shipping different logs to different sub accounts, you can define data volumes and retention periods for different environments.

![Manage sub accounts]({{site.baseurl}}/images/accounts/accounts--manage-sub-account.png)

###### To create or manage a sub account

1. In the **Time based retention plan** panel, click the sub account you want to manage, or click **Add sub account**.

2. If you need to adjust the **Total daily volume** or **Retention**, either type in the text box, or use <i class="li li-plus"></i> and <i class="li li-minus"></i>.

    <div class="info-box note">
      Your plan allows for a maximum total daily volume (in GB) and retention period (in days). Keep these limits in mind when you allocate resources to your sub accounts—you won't be able to exceed the limits of your plan. 
      
      If you need to increase these limits, please reach out to your Logz.io account executive.
    </div>

2. To allow main account users to switch to this sub account, select **Enable main account users to access this account**. 

3. To allow main account users to search this account's logs, select **Searchable from the main account**.

4. To make account utilization metrics available in Kibana, select **Save account utilization metrics**, and choose a time interval (10, 30, or 60 minutes). If you select this check box, you can find utilization metrics in Kibana by searching for `type:logzio_account_utilization`.

5. To make the log size available in Kibana, select **Save log size**. If you select this check box, you can find log size in Kibana by searching for the `logSizeEnabled` field.

6. To use Kibana visualizations and dashboards from other accounts, add accounts to the **Use objects from the selected accounts** box.

7. Click **Apply** to save your changes.