---
layout: article
title: Regions
permalink: /user-guide/accounts/account-region.html
description: Every Logz.io account is hosted in a region. All services related to your account are colocated—so you'll ship logs, sign in, and access the API from the same region the account lives in.
flags:
  admin: true
  logzio-plan: community
tags:
  - accounts
  - account-region
contributors:
  - imnotashrimp
---

{%- assign regions = site.data.logzio-regions -%}

Every Logz.io account is hosted in an account region.
All services related to your account are colocated—so you'll ship logs, sign in, and access the API from the same region the account lives in.

## How can I find my region?

Glad you asked!

To find your region, sign in to Logz.io and look at the URL in the address bar.
If you see `app.logz.io`, then your account is in the {{regions.us.title}}.
All other regions have a hypen and then a two-letter region code.
For example, if you see `app-eu.logz.io`, then your account is in the {{regions.eu.title}}.

Your listener host (where you ship logs) and API host will always be in the same region.
This means they'll always have the same two-letter code that you see in the address bar when you're logged in.

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
