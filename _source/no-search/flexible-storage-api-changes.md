---
layout: article
title: API changes following the release of flexible volume
permalink: /user-guide/accounts/flexible-volume-announcement/
flags:
sitemap: false
tags:
  - accounts
  - main-account
  - sub-accounts
contributors:
  - shalper
---

The new flexible volume plan configuration supports capacity sharing between multiple accounts.

With flexible volume enabled, you can reserve a portion of your plan for specific accounts and cap the total volume an account can use per day.

As a result, there have been some updates affecting existing API endpoints described in detail below. 


#### What's changed in the API

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


###### Potential issues

If you've added a validation on the number of fields arriving in the response API, the API could fail.

Please update the validation to account for the 2 new fields, or consider canceling the validation.

##### Added main account information to some responses

The response list for the following endpoints now includes the main account as an additional object. Previously, the list of objects included only sub accounts, but not the main account.

Affected endpoints:

* Retrieve all sub accounts
* Retrieve detailed information on all sub accounts

###### Potential issues

If you are using the API output to perform any calculations or actions, the API might break or yield incorrect results.

Please update your implementation to take into consideration the main account details included in the response. You can avoid issues by selecting for sub account objects from the call output before applying any downstream actions.