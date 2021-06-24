---
layout: article
title: Who am I?
permalink: /api/cookbook/who-am-i.html
flags:
  logzio-plan: pro
tags:
  - api
  - api-cookbook
contributors:
  - imnotashrimp
  - nshishkin
---

If you've never used the Logz.io API before—or any API, for that matter—the `whoami` endpoint is a great way to dip your toes in.

Unfortunately, Logz.io can't respond to `whoami` with existential answers, like who you _really_ are and your purpose in life.
But the good news is you'll receive a response with the account name.

You can use `whoami` to test connectivity with Logz.io or to confirm you're using an API token from the right account.

#### Finding the account name

You can access the `whoami` endpoint with a simple curl request.

##### Sample request

{% include api-cookbook/replace-vars.html %}

```shell
curl -X GET \
  https://<<API-URL>>/v2/whoami \
  -H 'Content-Type: application/json' \
  -H 'X-API-TOKEN: <<API-TOKEN>>'
```

{% include api-cookbook/read-more-api-doc.html title="Retrieve this account" id="whoAmI" %}

###### ...and the response

```json
{
  "accountId": 12345,
  "accountName": "Jean Valjean"
}
```

If you see a status of 200 and a response body that includes accountId and accountName, congratulations! 🎉
You just made your first API call.

If you didn't receive the expected response, continue to the troubleshooting steps below. 👇

#### Troubleshooting

If you didn't receive the expected response, there could be a few reasons for that.
Let's see if we can figure this out together.

<div class="tasklist">

##### Check the status code

The status code indicates whether you sent the request to a valid Logz.io API endpoint.

###### If the status code is 200

You sent the request to a valid endpoint.
Continue to the next step.

###### If the status code is something else

You might have sent the request to an invalid endpoint.
Double-check the API URL, and make sure it matches an endpoint in the Logz.io [API docs]({{site.baseurl}}/api/).

##### Check the response body

Check the response body for an error message.

###### If you see `{"code":403,"message":"Insufficient privileges"}`

You might be using an invalid API token.
Copy a valid [API token](https://app.logz.io/#/dashboard/settings/manage-tokens/api) from Logz.io and try again.

###### If you see `Account region xx differs from current server region yy`

You're using a valid API token, but you sent the request to the wrong account region.
Change the API region to your account region and try again.

For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

</div>
