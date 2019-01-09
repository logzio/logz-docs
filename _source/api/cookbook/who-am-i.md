---
layout: article
title: Who am I?
permalink: /api/cookbook/who-am-i.html
flags:
  logzio-plan: enterprise
tags:
  - api
  - api-cookbook
contributors:
  - imnotashrimp
---

If you've never used the Logz.io API before—or any API, for that matter—the `whoami` endpoint is a great way to dip your toes in.

Unfortunately, Logz.io can't respond to `whoami` with existential answers, like who you _really_ are and your purpose in life.
But the good news is you'll receive a response with the account name.

You can use `whoami` to test connectivity with Logz.io or to confirm you're using an API token from the right account.

#### Sample request

{% include api-cookbook/replace-vars.html %}

```shell
curl -X GET \
  https://<API-URL>/account-management/whoami \
  -H 'Content-Type: application/json' \
  -H 'X-API-KEY: <API-TOKEN>'
```

##### ...and the response

```json
{
  "accountName": "Jean Valjean"
}
```