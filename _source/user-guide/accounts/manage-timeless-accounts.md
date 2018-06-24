---
layout: article
title: Manage timeless accounts
contributors:
  - sboroda
  - ayigal
---

While your main account and sub accounts are better suited for short-term monitoring of your log data, they're not really a cost-effective way to view long-term patterns and trends. That's where timeless accounts come in.

Timeless accounts work with optimizers, allowing you to save a subset of your logs for as long as you need them. You can store key metrics that you want to track in your timeless accounts. Each timeless account contains its own Elasticsearch index, which you can search from your main account.

![Timeless accounts]({{site.baseurl}}/images/accounts/accounts--timeless-accounts.png)

###### To create or manage a timeless account

1. In the **Timeless account plan** panel, click the timeless account you want to manage, or click **Add timeless account**.

    ![Manage a timeless account]({{site.baseurl}}/images/accounts/accounts--manage-timeless-account.png)

2. If you need to adjust the **Timeless account volume**, either type in the text box, or use <i class="li li-plus"></i> and <i class="li li-minus"></i>.

    <div class="info-box note">Your plan allows for a maximum volume (in GB). Keep this limit in mind when you allocate resources to your timeless accounts—you won't be able to exceed the limits of your plan. If you need to increase this limit, please reach out to your Logz.io sales representative.</div>

3. If you want your sub accounts to be able to search this account, add the intended accounts to the **Read & write permissions** box.

4. Click **Apply** to save your changes.
