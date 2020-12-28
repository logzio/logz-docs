---
layout: article
title: Flexible volume
permalink: /user-guide/accounts/flexible-volume.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - accounts
  - main-account
  - sub-accounts
contributors:
  - shalper
---

Flexible volume gives you more control over how you allocate space between your accounts.

With flexible volume, accounts can share indexing capacity and use it as needed. Instead of reserving capacity in advance, you can rely on shared volume to cover your indexing needs across accounts. When properly configured, shared volume can help to optimize distribution and minimize the risk of running out of space.


<iframe width="560" height="315" src="https://www.youtube.com/embed/piVcrL90Ij4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Flexible volume is a global setting that applies to your time-based logging accounts. To reach it, go to [**<i class="li li-gear"></i> > Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts). This page is only available when logged in to the main account as an admin user.


## Volume settings

* **Reserved volume**

  If you'd like to guarantee indexing capacity to high priority accounts, you can configure their reserved volume. You are not required to allocate reserved volume. If you prefer, you can set reserved volume at zero to add even more flexibility.

  After an account fills its daily reserved volume, it can continue to index data using shared volume until it hits its cap or shared volume is spent for the day.


* **Shared volume**

  With flexible volume enabled, you can leave a portion of your plan volume unallocated. This is your plan's shared volume. Shared volume is available for accounts to use dynamically, as needed.

  Notification emails are sent to account admins to alert them when utilization of shared volume reaches 80% and 100%.


* **Volume cap**

  If you'd like to avoid situations where daily capacity is over-used by certain accounts, you can cap them.

  Notification emails are sent to account admins to alert them when account utilization reaches 80% and 100% of its cap.

* **If reserved volume is zero**

  It is possible for an account to have zero reserved volume. In this case, data capacity is entirely dependent on the availability of shared volume. Keep in mind that this configuration does not guarantee indexing capacity for the account and subsequently could lead to data loss whenever shared volume is not available.

### Account utilization notifications

When flexible volume is enabled, your plan's shared volume helps to protect against data loss. Still, to help prevent surprises and help you avoid data loss, Logz.io sends out notification emails to account admins to alert them of the following:

| Notifications | Low risk  | High risk |
|---|----|---|
| Shared volume | 80% of shared volume is spent for the day. | 100% of shared volume is spent for the day. Only accounts with available reserved volume can continue to index logs. No shared capacity will be available until the index switches at 00:00 UTC tonight. |
| Account cap | Account has reached 80% of its daily cap. | Account has reached 100% of its daily cap. It will no longer accept data until the index switches at 00:00 UTC. |

[Account utilization metrics](/user-guide/accounts/manage-account-usage.html) are less accurate when flexible volume is enabled. This is because utilization is dynamic and constantly reshuffling between accounts, on an as-needed basis.

If you prefer to rely on utilization logs as an accurate measure, consider sticking to the fixed volume plan instead.

#### Configure flexible capacity accounts

<div class="tasklist">

##### Enable flexible volume for your plan

Go to [**<i class="li li-gear"></i> > Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts) to manage your plan. This page is only available when logged in to the main account as an admin user.

Toggle the button **Use flexible volume** to enable it.

![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/shared-volume.png)

##### Configure account capacity

Click an account from your list to select it. Or, click **Add sub account** to create a new sub account.

Configure the account's daily capacity:

* **Reserved volume** - This is the volume that is guaranteed for the account per calendar day.

  For the main account, there is a 1 GB minimum. Otherwise, for sub accounts, it can be 0 as well.

* **Cap this account's volume** (Optional)

    * If you leave this option unchecked, the account has unlimited access to shared volume.

      Once the account exhausts its daily volume, it can continue to receive and index data as long as shared volume is available.

   * If enabled, provide the **Volume cap**, in GB.

      This is the maximum volume that the account can index per calendar day. The **Volume cap** will need to be equal or less than the sum of the account's reserved volume and available shared volume.

![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/configure-flexible-volume.png)
