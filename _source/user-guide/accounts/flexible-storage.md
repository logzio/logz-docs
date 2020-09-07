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

With flexible volume, you can reserve volume for accounts to guarantee . Reserved volume is earmarked for each account, no matter what happens with other accounts.

Any volume that isn't reserved is shared between all accounts. Shared volume can be consumed as it's needed. You can set a cap to limit how much shared volume an individual account can use.


![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/flexible-volume-sub-accounts.png)


### Capacity planning: Flexible storage & shared volume

You have the option to enable flexible volume so that accounts can share indexing capacity.

This option allows you to utilize more of your indexing capacity and make the most of your logging capacity in Logz.io.

With flexible volume enabled, you can leave a portion of your plan volume unallocated. This is your plan's **shared volume**. Shared volume is available for accounts to utilize dynamically, as needed.

When accounts exhaust their reserved indexing capcity for the day, they will be able to tap into **shared volume** and continue receiving and indexing data. If you want to prevent an account from using up excessive shared volume, you have the option to cap it. That way it has a firm maximum daily volume that it cannot exceed.


![Enable flexible storage](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/flexible-volume-enabled.png)

#### Configure accounts to use flexible volume

<div class="tasklist">

##### Enable flexible volume

You can manage your accounts
from [**<i class="li li-gear"></i> > Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts). This page is only available when you are logged into the main account for your Logz.io plan.

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


Each Logz.io plan starts off with a main account.
If you're on a Pro or Enterprise plan,
you can create sub accounts to help manage user access to your data.

## Data sharing and control

All users in your main account have read access to the data in all logging sub accounts and timeless accounts. This means they can search logs, view and create dashboards, configure alerts, etc.

To limit data visibility,
you can route different logs to different sub accounts.
(More on [sub accounts](#sub-accounts) and [managing your accounts](#managing-your-accounts) below.)


## Sub accounts {#sub-accounts}

Sub accounts help you control data usage and manage user access to your logs.
By shipping different logs to different sub accounts,
you can configure different data volumes for independent environments.

## Managing your accounts {#managing-your-accounts}

If you're an admin for the main account,
you can manage the main account and sub accounts
from the [**Manage Accounts**](https://app.logz.io/#/dashboard/settings/manage-users) page
(**<i class="li li-gear"></i> > Settings > Manage accounts** in the top menu).

Click an account in the _Time based retention plan_ panel to see its settings.

![Manage the main account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/accounts--manage-main-account.png)

### Time-based account settings

| Setting name | Description |
|---|---|
| Token | This is your account [token]({{site.baseurl}}/user-guide/tokens/), which you use when shipping logs to route them to your account. Keep this token secure. |
| Account name | A descriptive name for this account. |
| Total daily volume | The maximum volume of logs you can ship in a day, in GB. |
| Retention | The number of days to retain your logs. |
| Enable main account users to access this account | For sub accounts only. If selected, users who have access to the main account can also log in to this account.|
| Searchable from the main account | For sub accounts only. If selected, this account's logs can be searched from the main account. |
| Save account utilization metrics | Logs [account utilization metrics]({{site.baseurl}}/user-guide/accounts/monitor-account-usage.html#what-are-account-utilization-metrics) in regular increments—every 10, 30, or 60 minutes—depending on your settings. Stored as `logzio_account_utilization` type. |
| Save log size | Adds a [new field]({{site.baseurl}}/user-guide/accounts/monitor-account-usage.html#what-happens-when-i-save-log-size) to incoming logs. This new field is called `LogSize`, and it contains the size of the log line in bytes or kilobytes. |
| Use objects from the selected accounts | Allows this account to access Kibana objects (dashboards, visualizations, searches) stored in other accounts. |