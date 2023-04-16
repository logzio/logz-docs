---
layout: article
title: Cold search
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Search your archived data before re-ingesting it with Cold search
permalink: /user-guide/logs/cold-search.html
sitemap: false 
noindex: true
flags:
  logzio-plan: community, pro
tags:
  - kibana
  - opensearchdashboards
  - logs
  - cold search
  - search in archive
contributors:
  - hidan
---


Archived data usually contains a lot of information, and it can take time and resources to sift through it and find what you're looking for.  

Cold search lets you seamlessly search inside your archived S3 bucket, provides a preview of up to 100 raw logs that match your search query, and helps you understand if it's the right data you're looking for. Once you find the needle in your haystack, you can re-ingest the data into your Logz.io account, making it searchable and actionable.

With Cold search you can optimize your data restoration process, reduce costs, speed up the restore time, and minimize risks associated with restoring unnecessary data.

![cold search fetched logs](https://dytvr9ot2sszz.cloudfront.net/logz-docs/cold-search/fetched-raw-logs.png)

To start using Cold search, navigate to [Log analytics > Cold search](https://app.logz.io/#/dashboard/osd/discover/).



**On this page:**

* toc list
{:toc}

<!-- ### Cold search overview

Once you've [set up an AWS S3 archive](/user-guide/archive-and-restore/configure-archiving.html) and granted the relevant Cold search permissions, you can start using the feature from the main Log analytics dashboard.

Click on the Cold search button to open the relevant screen. 

-->

#### Setting up Cold search


Cold search can **only** be used on AWS S3 bucket archived accounts.
{:.info-box.note}

To get started with Cold search, you'll need the following:

* Ensure you have [AWS S3 bucket permissions & storage class required for archiving](/user-guide/archive-and-restore/set-s3-permissions.html).
* An AWS S3 bucket that's archiving data from Logz.io.
* Set up Cold search permissions inside your S3 bucket.


##### Cold search permissions

{% include log-shipping/cold-power-search.md %}


Once the new policy is updated, you can use Cold search to retrieve and re-ingest logs. 


#### Using Cold search

All users can fetch raw logs from Cold search. However, **re-ingesting logs requires admin permissions**.
{:.info-box.note}

To start using Cold Search, navigate to [Log analytics](https://app.logz.io/#/dashboard/osd/discover/) and choose Cold search from the navigation menu, or click the the **Cold Search** button.

![cold search nav](https://dytvr9ot2sszz.cloudfront.net/logz-docs/cold-search/cold-search-nav.png)

Type the search term or query you'd like to use, and choose the relevant time frame. Your restored logs will only include data matching your exact search term.

Next, choose the time frame for your search. You can select a time frame of up to 24 hours.

Click on **Fetch raw logs** to generate a preview of the logs that match your criteria. If these logs are the ones you want to retrieve, click the **Re-ingest** button to re-ingest the logs. 

The confirmation message includes important information, including the name of the new account, the chosen time frame, your query, and the estimated size of the re-ingested data. Note that the data will count against your daily quota and may **result in an additional charge** if you exceed your account's limit.

Click **Confirm** to approve and continue. 

This process might take a few minutes, during which you can continue using Logz.io. You'll get a notification via email once the process is complete, with a link to the relevant account in OpenSearch Dashboards.

These logs will be available to search and analyze from your OpenSearch Dashboards for a period of X days. 


#### Troubleshooting Cold search

You might encounter an issue while fetching raw logs or re-ingesting them. Here are some common issues that can arise and how you can quickly resolve them:

##### Issue: Exceeded max limit of restored accounts

Cold search works with your archived accounts and has similar limitations. To re-ingest Cold search logs, you must have at least 1 available slot in your restored accounts. 

###### Suggested remedy
{:.no_toc}

Ensure you have at least 1 available slot in your restored account. Navigate to [Data Hub > Archive and restore > Restored account](https://app.logz.io/#/dashboard/tools/archive-and-restore) to review if you've exceeded your limit.

If you have exceeded your restored accounts limit, you'll need to delete at least one account to use Cold search. 

If you wish to upgrade your existing quota, you can contact [Logz.io's support team](mailto:help@logz.io).

##### Issue: Missing permissions

Can't fetch raw logs due to missing permissions.

###### Suggested remedy
{:.no_toc}

Ensure you've set up the proper permissions for [AWS S3 bucket and storage class data](/user-guide/archive-and-restore/set-s3-permissions.html), and for [Cold search](/user-guide/logs/cold-search.html#cold-search-permissions). 


##### Issue: Storage class not supported

Re-ingesting logs process failed due to an unsupported object storage class. This can happen if the object/file is of the Glacier storage class. 

###### Suggested remedy
{:.no_toc}


Buckets set to cold storage (S3 Glacier and S3 Glacier Deep Archive storage classes) cannot be restored from, as the files within them are not available for real-time access. Learn more about [Amazon S3 Storage classes](https://aws.amazon.com/s3/storage-classes/), [storage classes in general and how to transition your S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html).

##### Issue: Limit exceeded

Re-ingesting logs process failed since you've exceeded your account's limit. This happens when you've reached your daily quota.

###### Suggested remedy
{:.no_toc}

If your account has a [flexible volume](/user-guide/accounts/flexible-volume.html), you can allocate available GB from one of the existing sub accounts.

Otherwise, you can update your plan and adjust your daily volume on the [Plan and usage](https://app.logz.io/#/dashboard/settings/plan-and-billing/plan) page.


<!-- ###### Additional resources
{:.no_toc}

* [Read more](https://logz.io/blog/kibana-advanced/) about creating and running advanced searches in OpenSearch Dashboards.  -->