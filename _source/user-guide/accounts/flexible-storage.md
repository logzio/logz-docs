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

With flexible volume, accounts can share indexing capacity and use it as needed, instead of reserving capacity in advance in a fixed manner.


![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/shared-volume.png)

Flexible volume is a global setting that applies to your time-based logging accounts. To reach it, go to [**<i class="li li-gear"></i> > Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts). This page is only available when logged in to the main account as an admin user.


## Reserved vs. Shared volume

* **Reserved volume**

  If you'd like to guarantee indexing capacity to high priority accounts, you can configure their reserved volume. You are not required to allocate reserved volume. If you prefer, you can set reserved volume at zero to add even more flexibility.

  After an account fills its daily reserved volume, it can continue to index data using shared volume until it hits its cap or shared volume is spent for the day.


* **Shared volume**

  With flexible volume enabled, you can leave a portion of your plan volume unallocated. This is your plan's shared volume. Shared volume is available for accounts to use dynamically, as needed.

* **Volume cap**

  If you'd like to avoid situations where daily capacity is over-used by certain accounts, you can cap them.

* **If reserved volume is zero**

  It is possible for an account to have zero reserved volume. In this case, data capacity is entirely dependent on the availability of shared volume. Keep in mind that this configuration does not guarantee indexing capacity for the account and subsequently could lead to data loss whenever shared volume is not available.


#### Configure flexible capacity accounts

<div class="tasklist">

##### Enable flexible volume for your plan

Go to [**<i class="li li-gear"></i> > Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts) to manage your plan. This page is only available when logged in to the main account as an admin user.

To enable flexible volume, toggle the button **Use flexible volume** to turn it on.

##### Configure account capacity

Click an account from your list to select it. Or, click **Add sub account** to create a new sub account.

Configure the account's daily capacity:

* **Reserved volume** - This is the volume that is guaranteed for the account per calendar day.

  For the main account, there is a 1 GB minimum. Otherwise, for sub accounts, it can be 0 as well.

* **Cap this account's volume** - This is optional.

    * If you leave this option unchecked, the account has unlimited access to shared volume.

      Once the account exhausts its daily volume, it can continue to receive and index data as long as shared volume is available.

   * If you enable this option, another field will appear:  **Volume cap**.

      This is the maximum volume that the account can index per calendar day.

      It cannot be greater than the sum of the account's reserved volume and available shared volume.

![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/configure-flexible-volume.png)