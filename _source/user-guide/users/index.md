---
layout: article
title: Manage users
permalink: /user-guide/users/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Managing account users
flags:
  admin: true
  logzio-plan: community
tags:
  - users
contributors:
  - shalper
  - imnotashrimp
  - hidan
---

Account Admins can manage users and change user access permissions at any time.

![Manage users](https://dytvr9ot2sszz.cloudfront.net/logz-docs/access-and-authentication/manage-users-demo.png)

You can get to this page
by selecting [**<i class="li li-gear"></i> > Settings > User management**](https://app.logz.io/#/dashboard/settings/manage-users)
in the top menu.

Community plans have a maximum of 50 users.
{:.info-box.note}

### Meet the different roles

You can choose whether users will get **Read Only**, **User** or **Admin** roles. Each role has different access that helps you limit the data, visibility, and abilities shared with other users. 

##### Access levels: Logs

| **Logs**                                    | Read Only | User | Admin |
|-----------------------------------------|-----------|------|-------|
| View dashboards                         | ✓         | ✓    | ✓     |
| View alerts                             | ✓         | ✓    | ✓     |
| Create an alert                         |           | ✓    | ✓     |
| View triggered alerts                   | ✓         | ✓    | ✓     |
| Live tail                               | ✓         | ✓    | ✓     |
| Optimizers                              |           | ✓    | ✓     |
| Insights                                |           | ✓    | ✓     |
| Reports                                 |           | ✓    | ✓     |
| Send your logs                          | ✓         | ✓    | ✓     |
| Data parsing                            |           | ✓    | ✓     |
| Field mapping                           |           | ✓    | ✓     |
| Archive and restore                     |           | ✓    | ✓     |
| Drop filters                            |           | ✓    | ✓     |
| Incident reports                        |           | ✓    | ✓     |

###### Additional restrictions: Logs

There are a few additional abilities that are ristrected:

* **Read Only** roles can't save searches
* **Read Only** and **User** roles can't create optimizers

##### Access levels: Metrics

| **Metrics**                                 | Read Only | User | Admin |
|-----------------------------------------|-----------|------|-------|
| View dashboards                         | ✓         | ✓    | ✓     |
| Manage tokens                           |           |      | ✓     |
| Send your metrics                       | ✓         | ✓    | ✓     |
| Notification endpoints                  |           | ✓    | ✓     |
| View unified variables                  | ✓         | ✓    | ✓     |
| Create unified variables                |           |      | ✓     |

##### Access levels: Tracing

| **Tracing**                                 | Read Only | User | Admin |
|-----------------------------------------|-----------|------|-------|
| View dashboards                         | ✓         | ✓    | ✓     |
| Manage tokens                           |           |      | ✓     |
| Send your traces                        | ✓         | ✓    | ✓     |
| Notification endpoints                  |           | ✓    | ✓     |

##### Access levels: Cloud SIEM

| **Cloud SIEM**                              | Read Only | User | Admin |
|-----------------------------------------|-----------|------|-------|
| View summary                            | ✓         | ✓    | ✓     |
| Event management                        | ✓         | ✓    | ✓     |
| View rules                              | ✓         | ✓    | ✓     |
| Create rules                            |           | ✓    | ✓     |
| Dashboards                              | ✓         | ✓    | ✓     |
| Threats overview                        | ✓         | ✓    | ✓     |
| Threats intelligent field               | ✓         | ✓    | ✓     |
| Kibana                                  | ✓         | ✓    | ✓     |
| Reports                                 |           | ✓    | ✓     |
| Send your data                          | ✓         | ✓    | ✓     |
| Drilldowns                              |           |      | ✓     |
| Lookups                                 |           | ✓    | ✓     |
| Incident reports                        |           | ✓    | ✓     |


#### User management

#### Add or remove a user

* To add a user,
  click the button **+New user** at the top of the page.

* To delete a user, hover over the item and click **delete** <i class="li li-trash"></i> to delete it. You'll be asked to confirm the deletion.

### Suspend or unsuspend a user

* To suspend or unsuspend a user, hover over the user,
click the **Menu button <i class="li li-ellipsis-v"></i>**
and then click **Suspend** or **Unsuspend**. The user's status will change.

### Edit role or rename a user

* To change the user's role (Admin/User)rename, hover over the user, click **edit** <i class="li li-pencil"></i>, make your changes, and then click **Save**.

* To rename a user, hover over the user, click **edit** <i class="li li-pencil"></i>, make your changes, and then click **Save**.