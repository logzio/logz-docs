---
layout: article
title: Regions
permalink: /user-guide/accounts/account-region.html
description: All services related to your Logz.io account are hosted in the same region. This means you'll ship logs, sign in, and access the API from the same region the account lives in.
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - account-region
contributors:
  - imnotashrimp
  - shalper
---

{%- assign regions = site.data.logzio-regions -%}

Logz.io maintains clusters worldwide so that it can host your account in a region that is closest to you.

You'll need to know your account's region to configure shippers to send data to Logz.io. It is also important if you're using the Logz.io API.

All services related to your account are hosted in the same region. This means you'll ship logs, sign in, and access the API from the same region as your account.


## How can I find my region?

To locate your region, sign in to Logz.io and look at the URL in the address bar.

If you see `app.logz.io`, your account is hosted in the US East (Northern Virginia).
All other regions have a two-letter region code.
For example, if you see `app-eu.logz.io`, then your account is in the Europe (Frankfurt).

Your listener host (where you ship logs) and API host will always be in the same region as your account.

Read on for a list of region codes and URLs.

## Regions and URLs

| Region | Cloud | App host | Listener host | API host | Region code |
|---|---|---|
{% for r in regions -%}
  {%- if r.suffix -%}
      {%- assign suffix = r.suffix | prepend: "-" -%}
    {%- else -%}
      {%- assign suffix = "" -%}
  {%- endif -%}
| {{r.title}} | {{r.cloud}} | app{{suffix}}.logz.io | listener{{suffix}}.logz.io | api{{suffix}}.logz.io | {{suffix | replace: "-", ""}} |
{% endfor -%}
