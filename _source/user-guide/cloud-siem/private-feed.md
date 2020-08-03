---
layout: article
title: Add a private feed
permalink: /user-guide/cloud-siem/private-feeds.html
flags:
  logzio-plan: enterprise
  alpha: true
tags:
  - security-analytics
  - security-rules
contributors:
  - shalper
---

This feature is in Alpha. Contact Support to request early access.
{:.info-box.note}

Your can enrich threat detection with your own private feed of malicious IPs. To do so, you'll need to maintain an IOC-specific feed for IPs and make it accessible by API to Logz.io.

![Configure a private feed](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/configure-private-feed-alpha.png)


#### Configure a private feed

Configuring Logz.io to fetch a private feed is very much like configuring a custom notification endpoint.

<div class="tasklist">

##### Prerequisites

Before you begin, you'll need to maintain a private feed of malicious or suspected IPs and host it where it can be fetched by Logz.io.

Other requirements:

* The feed must be limited to 10K entities or fewer. (No more than 10,000 IPs).
* Every IP must appear on a new line. Don't use separators or add explanations or comments.
  Here's an example:

  ```
  1.1.1.1
  2.2.2.2
  3.3.3.3
  ```

##### Configure the connection

Go to **Threats > Threat Intelligence Feeds** from the top menu, and select the option **+ Add private feed**.

Fill in the form to configure the connection.

**About the feed**

1. **IOC type** - IPs are auto-selected. Currently only IPs are supported. In the future, the option to add private feeds for malicious URLs and Domains will be added.
2. **Confidence** - Select a reliability score for your feed.
3. **Description** - Give some context for your feed. It's a good idea to add contact info for the person who owns the feed.

**Configure the feed connection**

1. **URL** - Type in the URL where your feed is hosted. It provides the base URL for the API request.
2. **Method** - Select the request method for the API request. Available methods: GET / POST / PUT.
3. **Headers** - Send 1 header per line. (Separate headers on a new line.)
  If your feed is password protected, you’ll need to encrypt the credentials (64 bit) and pass them as authentication headers. See the placeholder for an example.

##### Give the sync some time

The first time Logz.io connects to your private feed, it will validate the connection and download the list within an hour.

After that, Logz.io will sync the feed once every 24 hours to look for updates.

If the connection fails at some point in the future, say if the feed is migrated to another hosting site or authorization headers are changed, you will be prompted to make the necessary changes.


##### To manage private feeds

* To edit or delete a private feed,
  hover over the feed in the list,
  and click <i class="li li-pencil"></i> (edit)
  or <i class="li li-trash"></i> (delete).

If you delete a private feed, Logz.io will stop using it to enrich logs immediately.

