---
layout: article
title: Adding a private feed
permalink: /user-guide/cloud-siem/private-feeds.html
flags:
  logzio-plan: pro
tags:
  - security-analytics
  - security-rules
contributors:
  - shalper
---

You can enrich log threat detection by adding your own private feeds to those provided by Logz.io. To do so, you'll need to maintain files with lists of IOCs and host them online to make them accessible by HTTP/HTTPS to Logz.io.


#### Configure Logz.io to pull your private feed

**Before you begin**

You'll need to maintain a list of IOCs and host it where it can be fetched by Logz.io. See more details [here](/user-guide/siem/ioc-types/).

<div class="tasklist">

##### Add a new feed

Go to **Threats > Threat Intelligence Feeds** from the top menu, and select the option **+ Add private feed**.

##### Configure the connection

Fill in the form to configure the connection.   <!--UPDATE THE SCREEN  -->

![Configure a private feed](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/configure-private-feed-alpha.png)   

**About the feed**

1. **IOC type** - Select one type. Supported types include IPs, DNSs (domain), URLs, md5/sha1/sha256 hash-based signatures, user-agent HTTP headers, and custom indicators of your choice.
2. **Use STIX** - Toggle the option on to use STIX format. _Structured Threat Information Expression_ (STIX™) is a language and serialization format used to exchange cyber threat intelligence (CTI). <br>   Logz.io currently supports a single IOC type per feed for this format. We recommend that you define a separate private feed for each relevant IOC type that exists in your STIX feed.
3. **Confidence** - Select a reliability score for your feed.
4. **Description** - Give some context for your feed. It's a good idea to add contact info for the person who owns the feed.

**Configure the feed connection**

1. **URL** - Type in the URL where your feed is hosted. It provides the base URL for the HTTP/HTTPS request.
2. **Method** - Select the request method for the HTTP/HTTPS request. Available methods: GET / POST / PUT.
3. **Headers** - Add headers to the HTTP/HTTPS request if they are needed.

    Send 1 header per line. (In other words, separate headers with line breaks.)
  
    If your feed is password protected, you'll need to encode the credentials (username:password in base64) and pass them as an authorization header. See [this page](/user-guide/encoding-authorization-header.html) for further instructions.


##### Give the sync some time

The first time Logz.io connects to your private feed, it will validate the connection and download the list within an hour.

After that, Logz.io will sync the feed once every 24 hours to look for updates.

If the connection fails at some point in the future, say if the feed is migrated to another hosting site or authorization headers are changed, you will be prompted to make the necessary changes.


##### To manage private feeds

To edit or delete a private feed, hover over the feed in the list,
  and click <i class="li li-pencil"></i> (edit)
  or <i class="li li-trash"></i> (delete).

If you delete a private feed, Logz.io will immediately stop using it to enrich logs.

![Configure a private feed](https://dytvr9ot2sszz.cloudfront.net/logz-docs/siem/feed-info.png)
