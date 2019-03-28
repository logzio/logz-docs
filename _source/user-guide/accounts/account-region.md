---
layout: article
title: Account region
permalink: /user-guide/accounts/account-region.html
description: Every Logz.io account is hosted in an account region. All services related to your account are colocated—so you'll ship logs, sign in, and access the API from the same region the account lives in.
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

## How can I find my account region?

Glad you asked!

To find your account region, sign in to Logz.io and look at the URL in the address bar.
If you see `app.logz.io`, then your account is in the {{regions.us.title}}.
All other regions have a hypen and then a two-letter region code.
For example, if you see `app-eu.logz.io`, then your account is in the {{regions.eu.title}}.

Your listener URL (where you ship logs) and API URL will always be in the same region.
This means they'll always have the same two-letter code that you see in the address bar when you're logged in.

Read on for a list of region codes and URLs.

## Regions and URLs

| Region | App URL | Listener URL | API URL |
|---|---|---|
{% for r in regions -%}
{%- assign attribs = r[1] -%}
{%- case attribs.suffix -%}
  {%- when false -%}
    {%- assign suffix = "" -%}
    {%- assign regionCode = "" -%}
  {%- else -%}
    {%- assign suffix = r[0] | prepend: "-" -%}
    {%- assign regionCode = r[0] | prepend: " (" | append: ")" -%}
{%- endcase -%}
| {{attribs.title}}{{regionCode}} | app{{suffix}}.logz.io | listener{{suffix}}.logz.io | api{{suffix}}.logz.io |
{% endfor -%}