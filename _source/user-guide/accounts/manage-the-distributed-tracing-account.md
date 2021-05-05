---
layout: article
title: Manage a Distributed Tracing account
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


You manage your Distributed Tracing accounts
in the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page.
You'll need to be signed in to the main account in your Operations workspace to view it.

The Distributed Tracing Account plan panel is located in the middle of the [Manage accounts](https://app.logz.io/#/dashboard/settings/manage-accounts) page. 

This is where you can view your Distributed Tracing Account plan and the specific details and options that can be updated for each account within the plan.

If you don't have a Distributed Tracing account yet, start a trial in the Distributed Tracing tab.
<!-- reach out to your account manager or email [the Sales team](mailto:sales@logz.io).-->
{:.info-box.note}

#### What can I do on the Manage accounts page?
{:.no_toc}

1. toc list
{:toc}

{:.no_toc}

<div class="tasklist">

##### View the plan summary and account allocations

This is where you can see the monthly available spans and data retention time for your plan, with a breakdown of the allocations and usage percentages for each account for the current month. 

![Tracing account summary](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/seetracingaccounts1.png)

##### View details and options for a specific account

To see the detailed information and the configurable options for each account, click the account name in the table or pie chart. 

![View account details](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/seeaccount-details.png)

You can view the following details...

* Account name and creation date 
* Account token
* Summary and breakdown of the spans sent to the account over the last 7 days

...and change the following account options: 

* Tracing account name
* Which Logz.io main account and sub accounts can access the data in any of the multiple tracing accounts (which are data sources)
* Total spans allocated from the Distributed Tracing plan to this specific data source, which defines how many spans per calendar month can be ingested into this data source
* Remaining portion of the overall Distributed Tracing plan that can still be allocated to additional tracing data sources (accounts) 

##### Update the account name

Enter a new **Tracing account name** and **Save** to update your changes, or **Cancel** to discard them.

![Rename a tracing account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/newtracingname.png)

##### Configure which accounts can access a tracing data source

Each Distributed Tracing account can function as a data source for other Logz.io accounts.
To manage access to your tracing data, you create an access list of the Logz.io main account and sub accounts that can view the span data for each tracing account. You can see the list of all the sub accounts (and main account) in the top right of the application page, in the account selector.

When users are logged in to an account in the access list,
they can choose the tracing account as a data source in the Jaeger interface of the Tracing tab.
![Pick a data source](https://dytvr9ot2sszz.cloudfront.net/logz-docs/distributed-tracing/tracing-data-source.gif)

**To grant access to the data in a tracing account**

  1. Click the account name to open its account details. 
  ![Manage tracing account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/accounts-manage-tracing-subaccts4.png)


  2. To enable access to a Distributed Tracing data source for other accounts, in the field below the **Tracing account name**, click **Add an account**, and select the relevant accounts. 
  ![Access to tracing account data for other accounts](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/accounts-access-4tracing-subaccts3.gif)


##### Add a tracing account to your plan

You can configure up to 5 tracing accounts for your Distributed Tracing plan. If you need the ability to add more tracing accounts, reach out to your account manager or [the Sales team](mailto:sales@logz.io)
{:.info-box.note}

**To create a new account**

1. Click **Add Tracing account** in the upper left of the Distributed Tracing Account plan panel.
2. Name the new account
3. Set which accounts can use it as a data source in the Tracing tab. 
4. Configure the **Total monthly spans** to allocate to the new account. 
   If you don't have spans available to allocate to the new plan, you'll be prompted to reduce the allocation of another account.
   ![Reduce existing span allocation](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/reduce-allocation.png)

   
5. Click **Save** to apply your changes.

![Adding a new tracing account](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/add-new-tracingacct.gif)

##### Delete a tracing account from your plan
 
1. In the account details, click the **Delete** icon next to the account name.
  ![delete](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/delete-tracing1.png)   

2. Confirm (or **Cancel**) the action. 
  ![Confirm delete](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/confirm-delete-tracingacct2.png)


##### Change how many spans are allocated to each Distributed Tracing account within your plan

Juggle the allocated spans per month of your Distributed Tracing account plan between the different tracing accounts according to each account's current usage details. Each data source has its quota defined in the **Spans** column. 

![overview of allocated spans](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/spanscolumn.png)

To change how many spans are allocated to a tracing account, pick the relevant account, increase or decrease the **Total monthly spans** and click **Save** to apply your changes.

In the example below, **New Tracing Account 2**  is not using its allocated spans: It would be reasonable to reduce it's monthly allocation and increase the allocation for the **Tracing** account. 
![juggle allocated spans](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/shiftspans-betweenaccts2.png)


</div>





