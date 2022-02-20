---
layout: article
title: Single sign-on
permalink: /user-guide/users/single-sign-on/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: SSO for Logz.io accounts
flags:
  admin: true
  logzio-plan: pro
tags:
  - sso
contributors:
  - imnotashrimp
  - hidan
---

Single sign-on (SSO) lets you manage access to your Logz.io account
from a single user and identity management tool.

## What is SSO?

SSO is a way to authenticate and sign in to different services
with the same credentials.
With SSO, users don't need to remember
different usernames and passwords for each service,
and you can manage access to all your services from one source.
Enabling SSO on your account is more convenient for your users
and more secure for your company.

### How is access managed with SSO? {#how-is-access-managed-with-sso}


To access Logz.io through your single sign-on account, **you'll first need to log in to your SSO identity provider**.
{:.info-box.note}

When you enable SSO on your account,
you're configuring Logz.io to hand off authentication
to your identity provider.
You'll be able to expand or restrict a user's access to Logz.io,
but not add or remove users from within Logz.io.

All authenticated users will have access to your account, and existing users will retain the permission levels they had before SSO was enabled, unless you configure groups.

###### How SSO groups work

SSO groups help you map, monitor, and edit access levels across multiple users in your organization. You can apply **User**, **Admin**, or **Read only** level permissions to all users in the group with a single set up, and change permission levels quickly and easily.
(Read more on permission levels [here](https://docs.logz.io/user-guide/accounts/permissions/)).

* Create a group in your SSO provider and add the users to the groups. 
* Add the group in your Logz.io account from **<i class="li li-gear"></i> Settings > [Manage users > Groups tab](https://app.logz.io/#/dashboard/settings/manage-users)**.
* Set the permission level for the group to **Read only**, **User**, or **Admin**.

###### If you don't have any groups

If you don't configure any groups,
all users who authenticate with your identity provider
will be able to access your Logz.io account.

The first time a new user logs in,
they get **User** access.
Existing admins can edit each user and change their access type to **Admin** or **Read only** access.

Existing users will retain their current level of access.

###### If you have groups

As soon as you configure your first group,
only users who are part of that SSO group will be able to log in to this account.

Each group can have **Admin**, **User**, **Read only**, or **Configured per user** permissions.

Permissions are set at the group level
unless a group setting is **Configured per user**.
If users are a part of   multiple groups,
they will get the highest permissions set.

For example:
If someone is a member of both a **User** group and an **Admin** group,
they'll receive **Admin** permissions.

Multiple accounts can use the same group, and the group needs to be added to each account separately.
The group members will have access to all of the accounts connected to the group.

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
