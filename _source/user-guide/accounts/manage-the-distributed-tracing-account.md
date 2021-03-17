---
layout: article
title: Manage the Distributed Tracing account
permalink: /user-guide/accounts/manage-the-distributed-tracing-account.html
flags:
  admin: true
  logzio-plan: pro
tags:
  - accounts
  - tracing-account
  - distributed tracing
contributors:
  - imnotashrimp
  - yberlinger
---


You can manage your Distributed Tracing account
from the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page.
You'll need to be signed in to the main account in your Operations workspace.

If you don't have a Distributed Tracing account yet, start a trial in the Distributed Tracing tab.
<!-- reach out to your account manager or email [the Sales team](mailto:sales@logz.io).-->
{:.info-box.note}

#### To manage your Distributed Tracing account

<div class="tasklist">

##### Select your Distributed Tracing account

You'll find your Distributed Tracing account
in the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page
of your Operations workspace,
in the middle of the page.

If you want, change the **Account name** here.


<!--Step 2:  temporarily redacted 17Mar2021
##### Create a new Tracing account

`_<< comment: need to see how this works in app >>_`

-->

<!-- Step 3:  temporarily redacted 17 Mar2021
##### Allocate spans to each Distributed Tracing account

Set how many spans are allocated to each account from the overall Distributed Tracing plan. 
`_<< comment: need to see how this works in app >>_`
-->

##### Grant access to a tracing data source


Your Distributed Tracing account can serve as a data source which can be accessed by main and sub accounts.

To manage access to your tracing account, configure which Logz.io main and sub accounts can access or view Distributed Tracing data source.

When users are logged in to the accounts you add here,
they'll be able to access or view the data in the data source.

###### Grant access to the data in a tracing account

  a. To display the account information for a specific tracing account, click your Distributed Tracing account. 
  ![Manage tracing account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/accounts-manage-tracing-subaccts3.png)


  b. To enable access to a Distribute Tracing data source for other accounts, in the field below the **Tracing account name**, click **Add an account**, and select the relevant main and sub accounts. 
  ![Access to tracing account data for other accounts](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/accounts-access-4tracing-subaccts3.gif)




##### Save your changes

Click **Save** to apply your changes.

</div>
