---
layout: article
title: Roles 
permalink: /user-guide/user-permissions/
flags:
  admin: true
  logzio-plan: community
tags:
  - users
contributors:
  - shalper
---

User roles determine their permissions and access level.

There are 4 permission levels: Main account Admin / User, Sub account Admin / User.
Below is a list of user permissions by account type and user rule.

As always, limit the number of admins in each account, to keep your data even more secure.

## Main account

| Permissions | Admin |  User |
|---|---|---|
| Read all sub accounts | <i class="fas fa-check"></i>| <i class="fas fa-check"></i> |
| Read all timeless accounts | <i class="fas fa-check"></i>| <i class="fas fa-check"></i> |

Anyone with a User role in the main account has access to all sub accounts and timeless accounts. You can limit access to sub account data , consider adding users
only to the sub accounts and timeless accounts that they will need to search.

The acronym CRUD stands for Create, Read, Update, Delete.
{:.info-box.important}

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
| System status | Read | Read |
| Livetail | <i class="fas fa-check"></i> | <i class="fas fa-check"></i> |


## Sub account

| Permissions | Admin | User |
|---|---|---|
| Manage account | <i class="fas fa-times"></i> | <i class="fas fa-times"></i> |
| Other Sub accounts <br> the same Main account | <i class="fas fa-times"></i> | <i class="fas fa-times"></i> |
| Timeless accounts | Read | Read |
| Log shipping tokens | CRUD | <i class="fas fa-times"></i> |
| Shared tokens | CRUD | Read |
| Add filters to Shared tokens | <i class="fas fa-check"></i>  | <i class="fas fa-times"></i> |
| API tokens | CRUD | <i class="fas fa-times"></i> |
| Manage users | CRUD | <i class="fas fa-times"></i> |
| Notification channels | CRUD | CRUD |
| [Grant Support access](/user-guide/accounts/support-access.html) | <i class="fas fa-check"></i>  | <i class="fas fa-times"></i> |
