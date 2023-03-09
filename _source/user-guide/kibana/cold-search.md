---
layout: article
title: Cold search
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Search your archived data before re-ingesting it with Cold search
permalink: /user-guide/logs/cold-search.html
sitemap: false 
noindex: true
flags:
  logzio-plan: pro
tags:
  - kibana
  - opensearchdashboards
  - logs
contributors:
  - hidan
---


Archived data usually contains a lot of information, and it can take time and resources to sift through it and find what you're looking for.

Cold search lets you seamlessly search inside your archived S3 bucket, provides a preview of up to 100 raw logs that match your search query, and helps you understand if it's the right data you're looking for. Once you find the needle in your haystack, you can re-ingest the data into your Logz.io account, making it searchable and actionable.

With Cold search you can optimize your data restoration process, reduce costs, speed up the restore time, and minimize risks associated with restoring unnecessary data.

To start using Cold search, navigate to [Log analytics > Cold search](https://app.logz.io/#/dashboard/osd/discover/).

<!-- [image] -->

**On this page:**

* toc list
{:toc}

<!-- ### Cold search overview

Once you've [set up an AWS S3 archive](/user-guide/archive-and-restore/configure-archiving.html) and granted the relevant Cold search permissions, you can start using the feature from the main Log analytics dashboard.

Click on the Cold search button to open the relevant screen. 

-->

### Setting up Cold search


Cold search can be used on AWS S3 bucket archived accounts.
{:.info-box.note}

To get started with Cold search, you'll need:

* Ensure you have [AWS S3 bucket permissions & storage class required for archiving](/user-guide/archive-and-restore/set-s3-permissions.html).
* An AWS S3 bucket that's archiving data from Logz.io.
* Set up Cold search permissions inside your S3 bucket.


#### Cold search permissions

{% include log-shipping/cold-power-search.md %}


### Troubleshooting Cold search

Here are some issues you might encounter when using Cold search and their suggested solutions:

#### Issue: Missing permissions

Can't fetch raw logs due to missing permissions.

##### Suggested remedy
{:.no_toc}

Ensure you've set up the proper permissions for [AWS S3 bucket and storage class data](/user-guide/archive-and-restore/set-s3-permissions.html), and for [Cold search](/user-guide/logs/cold-search.html#cold-search-permissions). 


#### Issue: Storage class not supported

Re-ingesting logs process failed due to an unsupported object storage class. This can happen if the object/file is of the Glacier storage class. 

##### Suggested remedy
{:.no_toc}


Buckets set to cold storage (S3 Glacier and S3 Glacier Deep Archive storage classes) cannot be restored from, as the files within them are not available for real-time access. Learn more about [Amazon S3 Storage classes](https://aws.amazon.com/s3/storage-classes/), [storage classes in general and how to transition your S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html).

#### Issue: Limit exceeded

Re-ingesting logs process failed since you've exceeded your account's limit. This happens when you've reached your daily quota.

##### Suggested remedy
{:.no_toc}

If your account has a [flexible volume](/user-guide/accounts/flexible-volume.html), you can allocate available GB from one of the existing sub accounts.

Otherwise, you can update your plan and adjust your daily volume on the [Plan and usage](https://app.logz.io/#/dashboard/settings/plan-and-billing/plan) page.


<!-- ###### Additional resources
{:.no_toc}

* [Read more](https://logz.io/blog/kibana-advanced/) about creating and running advanced searches in OpenSearch Dashboards.  -->