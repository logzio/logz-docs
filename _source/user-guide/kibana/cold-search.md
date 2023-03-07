---
layout: article
title: Cold Search
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Cold Search
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

Cold search lets you seamlessly search inside your archived S3 bucket, provides a preview of up to 100 raw logs that match your search query, and help you understand if it's the right data that you're looking for. Once you find the needle in your haystack, only then you can re-ingest the data into your Logz.io account, so it becomes searchable and actionable.

With Cold search you can optimize your data restoration process, reduce costs, speed up the restore process and minimize risks associated with restoring unnecessary data.

To get started with Cold search, navigate to [Log analytics > Cold search](https://app.logz.io/#/dashboard/osd/discover/).

<!-- [image] -->

**On this page:**

* toc list
{:toc}

<!-- ### Cold search overview

Once you've [set up an AWS S3 archive](/user-guide/archive-and-restore/configure-archiving.html) and granted the relevant Cold search permissions, you can start using the feature from the main Log analytics dashboard.

Click on the Cold search button to open the relevant screen. 

-->

### Setting up Cold search


Cold search can be used for archive accounts in AWS S3 bucket.
{:.info-box.note}

To get started with Cold search, you'll need:

* Ensure that you have [AWS S3 bucket permissions & storage class required for archiving](/user-guide/archive-and-restore/set-s3-permissions.html).
* An AWS S3 bucket that's archiving data from Logz.io.
* Set up Cold search permissions inside your S3 bucket.


#### Cold search permissions

{% include log-shipping/cold-power-search.md %}


### Troubleshooting Cold search

Here are some issues you might encounter when using Cold search and their suggested solutions.





<!-- ###### Additional resources
{:.no_toc}

* [Read more](https://logz.io/blog/kibana-advanced/) about creating and running advanced searches in OpenSearch Dashboards.  -->