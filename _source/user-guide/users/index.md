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

### Acess level per role

You can choose whether users will get **Read Only**, **User** or **Admin** roles. Each role has different access that helps you limit the data, visibility, and abilities shared with other users.

See the permission and access levels for Logz.io different products:

* [Logs]()
* [Metrics]()
* [Tracing]()
* [Cloud SIEM]()
* [General settings]()

##### Logs

| **Main features**                       | Read Only | User | Admin |
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
###### Additional restrictions

Some additional options that are limited per role:

* **Read Only** roles can't save searches
* **Read Only** and **User** roles can't create optimizers


##### Metrics

| **Main features**                       | Read Only | User | Admin |
|-----------------------------------------|-----------|------|-------|
| View dashboards                         | ✓         | ✓    | ✓     |
| Manage tokens                           |           |      | ✓     |
| Send your metrics                       | ✓         | ✓    | ✓     |
| Notification endpoints                  |           | ✓    | ✓     |
| View unified variables                  | ✓         | ✓    | ✓     |
| Create unified variables                |           |      | ✓     |

###### Additional restrictions

Metrics dashboards are visible and accisible to all roles, with some restrictions:

* **Read Only** roles can view dashboards. They can't create or duplicate them, however, they can edit existing user-made dashboards.

##### Tracing

| **Main features**                                 | Read Only | User | Admin |
|-----------------------------------------|-----------|------|-------|
| View dashboards                         | ✓         | ✓    | ✓     |
| Manage tokens                           |           |      | ✓     |
| Send your traces                        | ✓         | ✓    | ✓     |
| Notification endpoints                  |           | ✓    | ✓     |

###### Additional restrictions

ha
* ha
##### Cloud SIEM

| **Main features**                              | Read Only | User | Admin |
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

###### Additional restrictions

ha
* ha

##### General settings

| **Main features**                       | Read Only | User | Admin |
|-----------------------------------------|-----------|------|-------|
| Change personal password                | ✓         | ✓    | ✓     |
| Change dark/light theme                 | ✓         | ✓    | ✓     |
| View token                              |           |      | ✓     |
| Manage tokens                           |           |      | ✓     |
| View region                             |           |      | ✓     |
| Toggle support access                   |           |      | ✓     |
| Refresh Kibana mapping                  |           | ✓    | ✓     |
| View system status                      | ✓         | ✓    | ✓     |
| Notification endpoints                  |           | ✓    | ✓     |
| ELK apps                                |           | ✓    | ✓     |
| View Unified variables                  | ✓         | ✓    | ✓     |
| Edit Unified variables                  |           |      | ✓     |
| Manage users                            |           |      | ✓     |
| Audit trail                             |           |      | ✓     |
| Manage accounts                         |           |      | ✓     |
| Usage and billing                       |           |      | ✓     |


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