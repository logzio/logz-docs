---
layout: article
title: User permissions
permalink: /user-guide/user-permissions/
flags:
  admin: true
  logzio-plan: community
tags:
  - users
contributors:
  - shalper
---

User permissions are determined by their role and the account to which they belong.

There are 4 permission levels: Main account Admin / User, Sub account Admin / User. Below is a list of user permissions by account type and user rule.





### Permissions for main account admins

Admin users of the main account have these permissions:

* Create, read, update, and delete users in the main account and sub accounts,
  including other admin users
* Create, read, update, and delete sub accounts
* Create, read, update, and delete timeless accounts
* Create and delete shared tokens and API tokens

Because of the high level of permissions,
we recommend limiting the number of admin users in the main account.

Anyone with an Admin role in the main account has Admin permissions to all sub accounts and timeless accounts. You can limit access by adding users only to sub accounts and timeless accounts rather than the main account.


### Permissions for main account users

Anyone with a User role in the main account has read-only access to the logs in all sub accounts and timeless accounts.


### Permissions for sub account admins

Admin users of a sub account have these permissions:

* Create, read, update, and delete users in the sub account, including other admin users.
* Create, read, update, and delete log shipping tokens, shared tokens, and API tokens.

### Permissions for sub account users

Anyone with a user role in a sub account has access to the sub account.

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
