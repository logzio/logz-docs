---
layout: article
title: Single sign-on
permalink: /user-guide/users/single-sign-on/
flags:
  admin: true
  logzio-plan: pro
tags:
  - sso
contributors:
  - imnotashrimp
---

Single sign-on (SSO) allows you to manage access to your Logz.io account
from a single user and identity management tool.

## What is SSO?

SSO is a way to authenticate and sign in to different services
with the same credentials.
With SSO, users won't need to remember
different usernames and passwords for each service,
and you can manage access to all your services from one service.
Enabling SSO on your account is more convenient for your users
and more secure for your company.

### How is access managed with SSO? {#how-is-access-managed-with-sso}

When you enable SSO on your account,
you're configuring Logz.io to hand off authentication
to your identity provider.
You'll be able expand or restrict a user's access to Logz.io,
but not add or remove users from within Logz.io.

All authenticated users will have access to your account, unless you configure groups.

###### If you don't have any groups

If you don't configure any groups,
all users who authenticate with your identity provider
will be able to access your Logz.io account.

The first time a new user logs in,
they're given "User" access.
You can edit a user to change them to "Admin" access.

Existing users will retain their current level of access.

###### If you have groups

As soon as you configure your first group,
only users who are part of that SSO group will be able to log in to this account.

Each group can be given "Admin", "User", or "Configured per user" permissions.

Permissions are set at the group level
unless a group is set to "Configured per user".
If a user is part of multiple groups,
they will get the highest permissions set.

For example:
If someone is part of an "User" group and an "Admin" group,
they'll receive admin permissions.

## Available identity providers

Logz.io can integrate with a number of SSO providers.
To get started, follow the instructions for your provider:

{%- assign ssoPages = site.html_pages |
  where_exp: "page", "page.url contains '/user-guide/users/single-sign-on/'" |
  where_exp: "page", "page.url != '/user-guide/users/single-sign-on/'" |
  sort: "title" %}

{% for page in ssoPages -%}
* [{{page.title}}]({{page.permalink | prepend: site.baseurl }})
{% endfor %}

Logz.io can integrate with other SSO providers.
If you don't see your provider on the list,
send an email to [help@logz.io](mailto:help@logz.io).
Write that you want to set up SSO for Logz.io,
and include your Logz.io account ID in the message.
