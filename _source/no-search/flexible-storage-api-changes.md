---
layout: article
title: API changes following the release of flexible volume capability
permalink: /user-guide/accounts/flexible-volume-announcement/
flags:
tags:
  - accounts
  - main-account
  - sub-accounts
contributors:
  - shalper
---

Giving customers greater and better flexibility to manage their account capacity has been a central goal on our readmap. A central capability toward this goal has been updated account management capcabilities that support the option to configure shared volume and flexible storage.


In a cloud-native world, log volumes are extremely dynamic, changing often on even a daily basis. The plan is to phase out our fixed daily allocation plan and allow users to reserve a portion of their plan for each specific account and to cap the total allocation an account can have.

The new flexible retention policy supports capacity sharing between multiple accounts.

#### API changes accompanying this version update

<div class="tasklist">

##### New fields

The updated response API for managing sub accounts has 2 additional fields:

1. `reservedDailyGB` (Float)
2. `isFlexible` (Boolean)


All the API endpoints for managing sub accounts are affected by this change:

* Retrieve all sub accounts
* Create a sub account
* Retrieve detailed information on all sub accounts
* Retrieve detailed account information by ID
* Retrieve sub account by ID
* Update a sub account
* Delete a sub account

Please reference the post-update API documentation for the relevant endpoints [here](/beta-api-flexible-storage/).

###### Potential issues and proposed solution

If you've added a validation on the number of fields arriving in the response API, the API could fail.

Please update the validation to account for the 2 new fields, or consider canceling the validation.

###### Adding the main account as another object to the response list

Some APIs return a list of sub accounts as a list of objects. We’ll be adding the main account to that list as an additional object. Currently, the list of objects includes only sub accounts, but not the main account.

API endpoints affected by the change:

* Retrieve all sub accounts
* Retrieve detailed information on all sub accounts

###### Potential issues and proposed solution

Any calculations and actions using the API output might be broken or yield incorrect results if they are defined without taking into consideration the main account details.

If you are using the response, you will need to make the necessary adjustments to avoid running into issues. Please select only the sub accounts from the call output before applying any downstream actions.