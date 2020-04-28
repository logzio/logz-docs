---
layout: article
title: Share visualizations
permalink: /user-guide/kibana/share-import-export
description: Share Kibana dashboards, saved searches and visualizations among your team, or migrate between Kibana instances. Export and import Kibana dashboards, Kibana saved searches, and Kibana visualizations.
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - shalper
  - boofinka
---

You can share Kibana dashboards, saved searches and visualizations among your team. This is done by exporting and importing dashboards, saved searches, and Kibana visualizations.

The same process can also help you migrate from another Kibana instance to
 Logz.io, for example, if you're migrating from a self-hosted Kibana account to Logz.io.


###### On this page
{:.no_toc}

1. toc list
{:toc}


<div class="tasklist">

##### Export objects from Kibana 

The first step is to export your existing dashboards, searches and visualizations out of your Kibana instance.

1. In your Kibana instance, click on **<i class="li li-gear"></i> (Settings) > Saved objects** 
2. Select **Export ... objects** and de-select any categories you don't want to export.
3. Another way to do this is to hand-pick the objects you want to export, but this is less recommended.
4. Click **Select all**
5. A JSON file with your exported objects will be saved to your default location.


<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-videos/export_kibana_objects.mp4" type="video/mp4" />
</video>

The full export is highly recommended. That way you can be sure that you'll have everything, irrespective of any inter-dependencies. If you export a single object that happens to be dependant on another object, the export can fail.
 {:.info-box.note}


##### Import objects from a JSON

**Before you begin, you'll need**:
Make sure that the relevant logs are already shipped to your Logz.io account and that the Kibana mapping is refreshed

Assuming you've got a JSON with your exported objects, it's time to import them into your Logz.io account.

1. Open your Logz.io main account. Click **<i class="li li-gear"></i> (Settings) > Saved objects**.
2. Click ****Import** and select the relevant JSON file.
3. A toggle button has the option to **automatically overwrite all saved objects**. Enable it if you want the export to overwrite existing objects in case of conflict. Select the option that works for you.
4. Done! You are ready to use your newly imported Kibana dashboards, saved searches, and visualivations.

If any visualization or dashboard did not import, the issue is most likely a field that is referenced in the visualization but not indexed within Logz.io. Please make sure that you are shipping the correct logs and that the Kibana mapping is refreshed.
