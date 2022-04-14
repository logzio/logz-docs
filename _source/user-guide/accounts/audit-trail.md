---
layout: article
title: Audit trail
permalink: /user-guide/accounts/audit-trail.html
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Logz.io's Audit trail
search: false
sitemap: false
flags:
  logzio-plan: community
tags:
  - accounts
contributors:
  - hidan
---

Audit trail offers account admins an easy dashboard to monitor account activity. You can view various actions in the dashboard, including logging, saving a search, creating alerts, adding users, updating dashboards, and more.

Each action includes information about the user who performed it, such as user ID, name, server IP, geolocation, and the time and date in which the action took place.

![Audit trail dashboard](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/audit-trail-dashboard.png)

To access the page, navigate to **Settings > [Audit trail](https://app.logz.io/#/dashboard/settings/general/audit-trail)**.

![Audit trail location](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/audit-trail.png)

##### View and filter Audit trail

The Audit trail dashboard lets you focus on specific **actions** or **users** in a certain timeframe. 

The **User Name** dropdown menu includes all users connected to the account, and the **Actions** menu shows all of the actions done inside the account. These actions include:

|**User related actions**|**Admin related actions**|
|Saving/deleting an object (visualization/dashboard/search)|Adding/creating users|
|Installing ELK apps|Editing user roles|
|Creating/editing tokens|Managing access and permissions|
|Creating/editing alerts|Creating/editing sub accounts|
|Creating/editing endpoints|Enabling/disabling Logz.io support access permissions|
|Creating/editing buckets||
|Creating/editing S3 archives||
|Creating/editing field mapping||

<!-- * **User related actions:** Saving or deleting an object (visualization/dashboard/search), installing ELK app, creating/editing tokens, alerts, endpoints, buckets, S3 archiving, field mapping, etc.
* **Admin related actions:** Adding/editing users and users' roles, access management, creating/editing sub accounts, enabling/disabling Logz.io support access permissions, etc. -->

Currently, you can only choose one user and/or one action when filtering.
{:.info-box.note}

In addition, you can change your view based on a particular time range to optimize your view. You can also edit the table by adding/removing different columns - click the Columns button and choose the relevant fields.

![Audit trail location](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/edit-audit-trail-view.png)

To export the data, click on the CSV button. The file would include all available fields, including those filtered out in your current view.