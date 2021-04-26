---
layout: article
title: Share Kibana objects
permalink: /user-guide/kibana/share-import-export
description: Share Kibana dashboards, saved searches and visualizations between accounts by exporting and importing them.
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - shalper
  - boofinka
---

You can share Kibana dashboards, saved searches and visualizations between accounts by exporting and importing them. This is helpful if you have multiple main accounts or accounts on multiple regions. You can also use this process to keep a local backup copy.


###### On this page
{:.no_toc}

1. toc list
{:toc}


<div class="tasklist">

##### Export objects from Kibana 

The first step is to export your existing dashboards, searches and visualizations out of your Kibana instance.

1. In your Kibana instance, click on **<i class="li li-gear"></i> (Settings) > Saved objects** 
2. Select **Export ____ objects**. 
3. You can un-select any categories you want to exclude from the export. Another way to do this is to hand-pick the objects you want to export, but this is less recommended.
4. Click **Export all**. 
5. A JSON file with your exported objects will be saved to your default location.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana-videos/export_kibana_objects1.mp4" type="video/mp4" />
</video>

The full export is highly recommended. That way you can be sure that you'll have everything, irrespective of any inter-dependencies. If you export a single object that happens to be dependant on another object, the export can fail.
 {:.info-box.note}


##### Import objects from a JSON

**Before you begin, you'll need**:
Make sure that the relevant logs have already shipped to your Logz.io account and refresh the Kibana mapping.

Assuming you've got a JSON with your exported objects, it's time to import them into your Logz.io account.

1. Open your Logz.io main account. Click **<i class="li li-gear"></i> (Settings) > Saved objects**.
2. Click **Import** and select the relevant JSON file.
3. You can toggle the option to **automatically overwrite all saved objects**. Enable it if you want the export to overwrite existing objects in case of conflict. Select the option that works for you.

You're done! You are ready to use your newly imported Kibana dashboards, saved searches, and visualivations.

If any visualization or dashboard did not import, the issue is most likely a field that is referenced in the visualization but not indexed in your Logz.io account. Check that the relevant logs are already in the account and refresh the Kibana mapping.
 {:.info-box.note}
