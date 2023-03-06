When mapping errors occur in your account, you can only assign one data type per specific field.

However, sometimes you might want to assign multiple data types to the same field, which isn’t supported with OpenSearch configuration. For these cases, you can create **sub accounts**.

You can use sub accounts to send the same field that’s already sent to any of your accounts but map it as a different data type.

For example, suppose you have a `metadata` field assigned as an `Object` in your production environment. In that case, you can assign it as a `String` in your testing environment by creating a sub account to which you’ll send the same logs.

Use sub accounts to adjust your mapping based on your monitoring needs.

Learn more about **[creating and managing sub accounts](/user-guide/accounts/manage-the-main-account-and-sub-accounts.html#add-and-manage-a-log-management-sub-account)** and about **[field mapping](/user-guide/kibana/mapping/)** in your account.