---
layout: article
title: Single sign-on
permalink: /user-guide/users/single-sign-on/
flags:
  admin: true
  logzio-plan: enterprise
tags:
  - sso
contributors:
  - imnotashrimp
---

Single sign-on (SSO) allows you to manage access to your Logz.io account from a single user and identity management tool.
SSO is available for Enterprise plans.
If you're not on an Enterprise plan yet, contact your account manager to discuss upgrading.

## What is SSO?

SSO is a way to authenticate and sign in to Logz.io with the same credentials that you use for different services.
With SSO, users won't need remember different usernames and passwords for each service, and you can manage access to all your services from one service.
Enabling SSO on your account is more convenient for your users and more secure for your company.

## Available identity providers

Logz.io can integrate with a number of SSO providers. To get started, follow the instructions for your provider:

{%- assign ssoPages = site.html_pages |
  where_exp: "page", "page.url contains '/user-guide/users/single-sign-on/'" |
  where_exp: "page", "page.url != '/user-guide/users/single-sign-on/'" |
  sort: "title" -%}

{%- for page in ssoPages %}
* [{{page.title}}]({{page.permalink | prepend: site.baseurl }})
{% endfor %}

Logz.io can integrate with other SSO providers. If you don't see your provider on the list, send an email to [help@logz.io](mailto:help@logz.io).
Write that you want to set up SSO for Logz.io, and include your Logz.io account ID in the message.