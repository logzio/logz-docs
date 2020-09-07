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

With flexible volume, you can reserve volume for accounts to guarantee a certain daily indexing capacity. But this is not required. You can also configure sub accounts with no reserved volume, with capacity that is dependent on the availability of shared volume.

After an account fills its reserved volume, it can go
on to use shared volume. Shared volume is used up as
needed by all accounts until they hit their caps or the
shared volume is gone for the day.

## Reserved vs. Shared volume

Reserved volume is earmarked for a particular account, no matter what happens with other accounts. This is great for high-priority data that you can't affort to lose. 
But it's expensive to reserve capacity for lesser accounts. This is where shared volume can afford you the flexibility to purchase capacity for your accounts, without tying it in to a particular account.

With flexible volume enabled, you can leave a portion of your plan volume unallocated. This is your plan's **shared volume**. Shared volume is available for accounts to use dynamically, as needed.

When accounts exhaust their reserved indexing capcity for the day, they will be able to tap into **shared volume** and continue to receive and index data as long as shared volume is available.

If you want to prevent an account from using up excessive shared volume, you have the option to cap it. That way it has a firm maximum daily volume that it cannot exceed.


![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/flexible-volume-sub-accounts.png)


![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/flexible-volume-enabled.png)

#### Flexible capacity planning

<div class="tasklist">

##### Enable flexible volume

Go to [**<i class="li li-gear"></i> > Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts) to manage your plan. This page is only available when logged in to the main account as an admin user.

To enable flexible volume, toggle the button **Use flexible volume** to turn it on.

##### Configure a sub account

Click **Add sub account**.

Name your account. Then set the account's daily capacity:

* **Reserved volume** - This is the volume that is guaranteed for the account per calendar day. It can be 1 GB or more.

* **Cap this account's volume**
    * If you leave this option unchecked, the account has unlimited access to shared volume.
    
      Once the account exhausts its daily volume, it can continue to receive and index data as long as shared volume is available.

   * If you enable this option, another field will appear:  **Volume cap**.
      
      This is the maximum volume that the account can index per calendar day. 
      
      It cannot be greater than the sum of the account's reserved volume and available shared volume.


![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/configure-sub-account-flexible-vol.png)
