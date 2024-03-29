---
layout: article
title: Cold tier
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Search your archived data before re-ingesting it with Cold tier
permalink: /user-guide/logs/cold-tier.html
sitemap: false 
noindex: true
flags:
  logzio-plan: community, pro
tags:
  - kibana
  - opensearchdashboards
  - logs
  - cold search
  - cold tier
  - search in archive
contributors:
  - hidan
---


Archived data usually contains a lot of information, and it can take time and resources to sift through it and find what you’re looking for.

With Cold tier, you can seamlessly search cold storage data you've archived, view up to 1,000 raw logs that match your search query, and get the information you want. You can also re-ingest these logs to your Logz.io account to further analyze and investigate them.


![cold tier fetched logs](https://dytvr9ot2sszz.cloudfront.net/logz-docs/cold-search/cold-search-close-up.png)

To start using Cold tier, navigate to [Log analytics > Cold tier](https://app.logz.io/#/dashboard/osd/discover/).



**On this page:**

* toc list
{:toc}

#### Accessing Cold tier

To get started with Cold tier, contact your account manager or [Logz.io's support team](mailto:help@logz.io).

#### Using Cold tier

All users can fetch raw logs from Cold tier. However, only **account admins** can re-ingest logs into the account.
{:.info-box.important}

To use Cold tier, navigate to [Log analytics](https://app.logz.io/#/dashboard/osd/discover/), choose Cold tier from the navigation menu, or click the **Cold tier** button.

![cold tier nav](https://dytvr9ot2sszz.cloudfront.net/logz-docs/cold-search/cold-tier-from-menu.png)


Type the search term or query you'd like to use, and choose the relevant time frame. Your search result will only include data matching your exact search term.

The search is **case sensitive** and supports `“`, `AND`, `OR`, and `()` operators, but you can’t use nested brackets `(())`.

For example, you can run any of the following searches:

* ("blue sky" OR clouds) AND rain OR "thunder storms"
* "ATLAS" AND "Error"
* "bucketName" AND ("Error" OR "Warning")


Next, choose the time frame for your search. You can select a time frame of up to 7 days.

Click on **Fetch raw logs** to receive the logs that match your query criteria. You can click on each result to get more information about each log, including:

* Event ID
* AWS region
* Event version
* Source IP address
* Event source
* Error message
* Error code
* User agent 
* User identity
* Event type
* Type
* Tags
* Timestamp

And more.

![cold tier log overviee](https://dytvr9ot2sszz.cloudfront.net/logz-docs/cold-search/cold-search-log-results.png)

To investigate the logs further, you can re-ingest them to your Logz.io account by clicking the **Re-ingest** button.


**Note that the re-ingested data will count against your daily quota and may result in an additional charge if you exceed your account's limit.**

You can check your account usage and daily limit by navigating to [**Settings > Manage accounts**](https://app.logz.io/#/dashboard/settings/manage-accounts).

Once you click the **Re-ingest** button, you'll be asked to confirm your action. You can review the name of the account that will hold these re-ingested logs, the chosen time frame, your query, and the estimated size of re-ingested data. 

Click **Confirm** to approve and continue with the process. 

![cold tier confirm](https://dytvr9ot2sszz.cloudfront.net/logz-docs/cold-search/confirmation-message.png)

This process might take a few minutes, during which you can continue using Logz.io. You'll get a notification via email once the process is complete, with a link to the relevant account in OpenSearch Dashboards.

Your re-ingested logs will be available to search and analyze from OpenSearch Dashboards for a period of **5 days**.
{:.info-box.note}


#### Troubleshooting Cold tier

You might encounter an issue while fetching raw logs or re-ingesting them. Here are some common issues that can arise and how you can quickly resolve them:

##### Issue: Exceeded max limit of restored accounts

Cold tier works with your cold storage archived accounts and has similar limitations. To re-ingest Cold tier logs, you must have at least 1 available account in your restored accounts. Note that you can restore up to 5 accounts at a time.

###### Suggested remedy
{:.no_toc}

Ensure you have at least 1 available account to which you can restore the data. To check how many accounts you use, navigate to [Data Hub > Archive and restore > Restored account](https://app.logz.io/#/dashboard/tools/archive-and-restore) to review if you've exceeded your limit.

If you have exceeded your restored accounts limit, you can delete one or more accounts to use Cold tier. 

If you wish to upgrade your existing quota, you can contact [Logz.io's support team](mailto:help@logz.io).


##### Issue: Limit exceeded

Re-ingesting logs process failed since you've exceeded your account's limit. This happens when you've reached your daily quota.

###### Suggested remedy
{:.no_toc}

If your account has a [flexible volume](/user-guide/accounts/flexible-volume.html), you can allocate available GB from one of the existing sub accounts.

Otherwise, you can update your plan and adjust your daily volume on the [Plan and usage](https://app.logz.io/#/dashboard/settings/plan-and-billing/plan) page.


<!-- ###### Additional resources
{:.no_toc}

* [Read more](https://logz.io/blog/kibana-advanced/) about creating and running advanced searches in OpenSearch Dashboards.  -->