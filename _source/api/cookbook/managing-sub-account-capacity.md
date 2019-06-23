---
layout: article
title: Managing sub account capacity
permalink: /api/cookbook/managing-sub-account-capacity.html
flags:
  logzio-plan: enterprise
tags:
  - api
  - api-cookbook
contributors:
  - imnotashrimp
---

If you manage teams of Logz.io users in a large organization, you can use the Logz.io API to manage accounts.

One important thing to know: When you're managing sub account settings, you'll need an API token from your main account.

{% include api-cookbook/replace-vars.html multiCodeBlocks=true %}

##### In this tutorial

* [Making a new sub account](#making-a-new-sub-account)
* [Checking sub account capacity](#checking-sub-account-capacity)
* [Reallocating capacity between sub accounts](#reallocating-capacity-between-sub-accounts)


## Making a new sub account {#making-a-new-sub-account}

If you don't have sub accounts that you're ready to experiment with, go ahead and make one now.

### Sample request

  maxDailyGB default is `0`, meaning this account can accommodate 0 GB of logs per day.
  We recommend maxDailyGB ≥ `1` so the account can receive logs.
  {:.info-box.tip}

```shell
curl -X POST \
  https://<<API-URL>>/account-management/time-based-accounts \
  -H 'Content-Type: application/json' \
  -H 'X-API-TOKEN: <<API-TOKEN>>' \
  -d '{
    "email": "your@email.com",
    "accountName": "Jean Valjean",
    "retentionDays": 7,
    "maxDailyGB": 1
  }'
```

The email address has to belong to an existing Logz.io user, and that user has to be an admin user on your main account.

{% include api-cookbook/read-more-api-doc.html title="Create a sub account" id="createTimeBasedAccount" %}

#### ...and the response

In the response, you'll receive an account ID and the account token.
You'll use the account token when shipping logs.
No need to remember the account token—it's always available on the Logz.io [Manage Accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page.

```json
{
    "accountId": 24601,
    "accountToken": "xLbRPpsmbEIknBpgEGEbjAHBVLTWDcTV"
}
```

## Checking sub account capacity {#checking-sub-account-capacity}

To see information on your sub accounts, pass a request using an API token from your main account.

### Sample request

```shell
curl -X GET \
  https://<<API-URL>>/account-management/time-based-accounts/ \
  -H 'Content-Type: application/json' \
  -H 'X-API-TOKEN: <<API-TOKEN>>'
```

{% include api-cookbook/read-more-api-doc.html title="Retrieve all sub accounts" id="getAll" %}

#### ...and the response

This request receives an array of objects, with each account's properties contained in a single object.

Later in this tutorial, we'll reallocate the capacity between two sub accounts.

```json
[
    {
        "accountId": 24601,
        "email": null,
        "accountName": "Jean Valjean",
        "maxDailyGB": 1,
        "retentionDays": 7,
        "searchable": true,
        "accessible": false,
        "docSizeSetting": false,
        "sharingObjectsAccounts": [],
        "utilizationSettings": {
            "frequencyMinutes": null,
            "utilizationEnabled": false
        }
    },
    {
        "accountId": 183267,
        "email": null,
        "accountName": "Javert",
        "maxDailyGB": 5,
        "retentionDays": 7,
        "searchable": false,
        "accessible": false,
        "docSizeSetting": false,
        "sharingObjectsAccounts": [],
        "utilizationSettings": {
            "frequencyMinutes": null,
            "utilizationEnabled": false
        }
    }
]
```

So in the response above, we have two sub accounts: Jean Valjean (account ID 24601) and Javert (account ID 183267).

## Reallocating capacity between sub accounts {#reallocating-capacity-between-sub-accounts}

You'll use an HTTP PUT request when you update a sub account with the API.
This means you'll replace all account parameters with each request.

  Include all parameters with each PUT request.
  This way, you won't unintentionally overwrite parameters with their default values.
  {:.info-box.tip}

Reallocating maxDailyGB between sub accounts happens in two steps.
First you'll reduce the capacity of the account with higher maxDailyGB, and then you'll increase the capacity of the other account.

So using our sample accounts in this article, the process will look like this:

1.  Reduce maxDailyGB for _Javert_ from `5` to `3`
2.  Increase maxDailyGB for _Jean Valjean_ from `1` to `3`

### Sample request 1: Reduce maxDailyGB for _Javert_

Reducing _Javert_ maxDailyGB from `5` to `3` frees up 2 GB:

```shell
curl -X PUT \
  https://<<API-URL>>/account-management/time-based-accounts/183267 \
  -H 'X-API-TOKEN: <<API-TOKEN>>' \
  -H 'content-type: application/json' \
  -d '{
  "accountName": "Javert",
  "maxDailyGB": 3,
  "retentionDays": 7,
  "searchable": false,
  "accessible": false,
  "sharingObjectsAccounts": [],
  "docSizeSetting": false,
  "utilizationSettings": {
    "frequencyMinutes": null,
    "utilizationEnabled": false
  }
}'
```

#### ...and the response

If the request was successfully received, you'll see a 200 response from Logz.io.

Later in this tutorial, we'll double-check that the sub account capacity is what we expect it to be.

### Sample request 2: Increase maxDailyGB for _Jean Valjean_

We can use the space we took from _Javert_ and apply it to _Jean Valjean_:

```shell
curl -X PUT \
  https://<<API-URL>>/account-management/time-based-accounts/24601 \
  -H 'X-API-TOKEN: <<API-TOKEN>>' \
  -H 'content-type: application/json' \
  -d '{
  "accountName": "Jean Valjean",
  "maxDailyGB": 5,
  "retentionDays": 7,
  "searchable": true,
  "accessible": false,
  "sharingObjectsAccounts": [],
  "docSizeSetting": false,
  "utilizationSettings": {
    "frequencyMinutes": null,
    "utilizationEnabled": false
  }
}'
```

#### ...and the response

If the request was successfully received, you'll see a 200 response from Logz.io.

Later in this tutorial, we'll double-check that the sub account capacity is what we expect it to be.

### Sample request 3: Check sub account capacity

To double-check that you did everything correctly, run another request to get sub account information:

```shell
curl -X GET \
  https://<<API-URL>>/account-management/time-based-accounts/ \
  -H 'Content-Type: application/json' \
  -H 'X-API-TOKEN: <<API-TOKEN>>' \
```

#### ...and the response

In this example, we'll know we everything went according to plan when:

* Account settings are the same as before we changed maxDailyGB
* maxDailyGB on both accounts is set to `3` GB

```json
[
    {
        "accountId": 24601,
        "email": null,
        "accountName": "Jean Valjean",
        "maxDailyGB": 3,
        "retentionDays": 7,
        "searchable": true,
        "accessible": false,
        "docSizeSetting": false,
        "sharingObjectsAccounts": [],
        "utilizationSettings": {
            "frequencyMinutes": null,
            "utilizationEnabled": false
        }
    },
    {
        "accountId": 183267,
        "email": null,
        "accountName": "Javert",
        "maxDailyGB": 3,
        "retentionDays": 7,
        "searchable": false,
        "accessible": false,
        "docSizeSetting": false,
        "sharingObjectsAccounts": [],
        "utilizationSettings": {
            "frequencyMinutes": null,
            "utilizationEnabled": false
        }
    }
]
```