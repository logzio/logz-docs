---
layout: article
title: User permissions
permalink: /user-guide/user-permissions/
flags:
  admin: true
  logzio-plan: community
sitemap: false
tags:
  - users
contributors:
  - shalper
---

User permissions are determined by their role and the account to which they belong.

There are 4 permission levels: Main account Admin / User, Sub account Admin / User. Below is a list of user permissions by account type and user rule.


## Main account

Anyone with a User role in the main account has read-only access to the logs in all sub accounts and timeless accounts.

Anyone with an Admin role in the main account has Admin permissions to all sub accounts and timeless accounts. You can limit access by adding users only to sub accounts and timeless accounts rather than the main account.


The acronym CRUD stands for Create, Read, Update, Delete.
{:.info-box.important}

| Permissions | Admin | User |
|---|---|---|
| Manage the main account | CRUD | <i class="fas fa-times"></i> |
| Manage sub accounts | CRUD | <i class="fas fa-times"></i> |
| Read sub accounts | <i class="fas fa-check"></i>  | <i class="fas fa-check"></i>  |
| Manage timeless accounts | CRUD | <i class="fas fa-times"></i> |
| Read timeless accounts | <i class="fas fa-check"></i>  | <i class="fas fa-check"></i>  |
| Log shipping tokens | CRUD | <i class="fas fa-times"></i> |
| Add filters to Shared tokens | <i class="fas fa-check"></i>  | <i class="fas fa-times"></i> |
| API tokens | CRUD | <i class="fas fa-times"></i> |
| Manage users | CRUD | <i class="fas fa-times"></i> |
| Notification channels | CRUD | CRUD |
| [Grant Support access](/user-guide/accounts/support-access.html) | <i class="fas fa-check"></i>  | <i class="fas fa-times"></i> |
| Shared tokens | CRUD | Read |


## Sub account

You can add users directly to a sub account and assign them either an Admin or User role.

Users belonging to a sub account do not have access to any other accounts, unless explicitely added to them.