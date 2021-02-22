---
layout: article
title: Migrating accounts between hosting regions
permalink: /user-guide/accounts/migration.html
description: Migrate your Logz.io accounts to another hosting region.
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - account-region
contributors:
  - shalper
---

You can migrate your Logz.io Log Management accounts to another hosting region.

### Implications

When the account is migrated to a new hosting region, it's important to note:

* Pre-migration data can’t be transferred
* Pre-migration data can't be restored from the archive
* The migration will reset your account's data shipping tokens. Consequently, you will need to update your data shipping configurations with the new token and listener host/region details.


<div class="tasklist">

#### Migration checklist


##### Create a new account in the target region

Open a new Logz.io trial account in your region of choice.
[Upgrade your new account](https://app.logz.io/#/dashboard/settings/plan-and-billing/plan) to suit your needs.

##### (Re-)Create your sub-accounts

This step is only relevant if your pre-migration account has sub-accounts and you want to recreate them in your new, post-migration account.

Use the Logz.io API endpoints as follows:

1. In your pre-migration account, [retrieve the settings for all of your Log Management accounts](https://docs.logz.io/api/#operation/getAllDetailedTimeBasedAccount).
2. In your post-migration account:
  1. [Create a new sub-account](https://docs.logz.io/api/#operation/createTimeBasedAccount) with the matching settings. Repeat for each sub account.
  2. [Update your main account](https://docs.logz.io/api/#operation/updateTimeBasedAccount) with the appropriate settings and daily capacity.

If you prefer, the above process can be performed by API or manually. You may also consider writing a script to expedite the process.


##### Export & Import your Kibana objects

Export any and all Kibana objects you want to keep and import them into your new account. These include saved searches, visualizations, and dashboards. [Export & import guide](https://docs.logz.io/user-guide/kibana/share-import-export)


##### Contact support to request help migrating your custom parsing pipelines

If you have custom parsing, contact Support to copy your parsing pipelines before deleting the account.

[Email our support](mailto:help@logz.io?subject=Requesting%20help%20migrating%20parsing%20pipelines&body=Hi!%20Please%20be%20in%20touch%20with%20further%20instructions%20for%20migrating%20parsing%20pipelines%20following%20our%20account%20migration.%20Thanks!) to request help copying your parsing pipelines to your new accounts.


##### Drop filters

Manually or can use API to retrieve all drop filters and then create one-by-one (or they can write a script for that)

If the filtered were made at the backend, ask support to copy them before deleting the account


##### Export & import logging alerts

This process can be performed manually or using the API to retrieve all alerts and then create one-by-one (or they can write a script for that)




##### Create your endpoints

 create your notification endpoints.
This can be done manually or by API. 

##### Optimizers

Manually


##### Scheduled Reports
Manually


##### Users
Manually or can use API to retrieve all users and then create one-by-one (or they can write a script for that)

IF SSO enabled - ask support to set up the connection


##### Archiving settings

Update your archiving settings. This can be done manually or by API.

</div>
