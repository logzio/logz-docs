---
layout: article
title: Manage your threat feeds
permalink: /user-guide/cloud-siem/manage-feeds.html
flags:
  logzio-plan: pro
tags:
  - siem
contributors:
  - nshishkin
---

There are two types of threat feeds in SIEM:

* Logz.io threat feed is a predefined threat feed that cannot be edited. It is included by default and cannot be edited. Logz.io threat feeds have a **Logz.io feed** tag.

* Private threat feed is a feed that you can add to the SIEM. You can add, edit or delete a private feed. Private feeds have a **Private feed** tag.


### View threat intelligence feeds

To access the threat intelligence feeds table:


1. Sign in to Logz.io.

2. Go to **SIEM > Threats overview > Threat intelligence feeds**.


Here you can search for a feed using a search bar at the top of the list.


### Create a private feed

To create a private feed:

1. Select **+ Add private feed**.

2. Give the feed a name.

3. Select the feed type from the **IOC type** menu. This is the data that the feed will contain.

4. Select whether the feed will be a straight list of use STIX.

5. Select the confidence level for the feed.

6. If required, add a description to the feed.

7. Add the connection URL.

8. Add the connection method.

9. If required, add the connection header.

10. Select **Save**.