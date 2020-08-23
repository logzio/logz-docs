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


To maintain your account's security,
account admins can add and remove users as needed.
You can change user access permissions at any time.

Users who are part of the main account
will have access to all sub accounts and timeless accounts.
To limit user access,consider adding users
only to the sub accounts and timeless accounts that they will need to search.

To keep your data even more secure,
limit the number of admins in each account.

## Main account

| Permissions | Admin |  User |
|---|---|---|
| Read all sub accounts | <i class="fas fa-check"></i>| <i class="fas fa-check"></i> |
| Read all timeless accounts | <i class="fas fa-check"></i>| <i class="fas fa-check"></i> |

CRUD stands for Create, Read, Update, Delete.

| Permissions | Admin | User |
|---|---|---|
| Manage accounts | CRUD | <i class="fas fa-times"></i> |
| Sub accounts | CRUD | Read |
| Timeless accounts | CRUD | Read |
| Log shipping tokens | CRUD | <i class="fas fa-times"></i> |
| Shared tokens | CRUD | Read |
| Add filters to Shared tokens | <i class="fas fa-check"></i>  | <i class="fas fa-times"></i> |
| API tokens | CRUD | <i class="fas fa-times"></i> |
| Manage users | CRUD | <i class="fas fa-times"></i> |
| Notification channels | CRUD | CRUD |
| [Grant Support access](/user-guide/accounts/support-access.html) | <i class="fas fa-check"></i>  | <i class="fas fa-times"></i> |




## Sub account

| Permissions | Admin | User |
|---|---|---|
| Manage account | <i class="fas fa-times"></i> | <i class="fas fa-times"></i> |
| Other Sub accounts <br> under the same Main account | <i class="fas fa-times"></i> | <i class="fas fa-times"></i> | 
| Timeless accounts | CRUD | Read |
| Log shipping tokens | CRUD | <i class="fas fa-times"></i> |
| Shared tokens | CRUD | Read |
| Add filters to Shared tokens | <i class="fas fa-check"></i>  | <i class="fas fa-times"></i> |
| API tokens | CRUD | <i class="fas fa-times"></i> |
| Manage users | CRUD | <i class="fas fa-times"></i> |
| Notification channels | CRUD | CRUD |
| [Grant Support access](/user-guide/accounts/support-access.html) | <i class="fas fa-check"></i>  | <i class="fas fa-times"></i> |
