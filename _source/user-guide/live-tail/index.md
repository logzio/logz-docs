---
layout: article
title: Live Tail
permalink: /user-guide/live-tail/
flags:
  logzio-plan: community
tags:
  - live-tail
contributors:
  - imnotashrimp
---

Live Tail gives you a live view of your logs as they come into Logz.io, eliminating the need to SSH into a remote machine.

#### Start, stop, scroll, and clear

* Click **Logs > Live tail**
* To start Live Tail, press <i class="li li-play"></i> (play).
* To display only filtered results,
  type a regex in the **Match** and **Ignore** boxes and press Enter.
  Log lines that meet your Match and Ignore criteria are shown in real time.
  More on the [parsed data view](#work-in-parsed-data-view) below.&nbsp;👇
* To end the Live Tail session,
  press <i class="li li-stop"></i> (stop).
* To pause, scroll with your mouse or trackpad.
  The session remains active and logs continue to load, but scrolling is paused.
  To go to the bottom of the tail and resume scrolling,
  press <i class="li li-scroll"></i> (scroll).
* To clear the Live Tail view,
  click <i class="li li-clear"></i> (clear).

#### Find and highlight terms

  <video autoplay controls loop class="no-border">
    <source src="{{site.baseurl}}/videos/live-tail/live-tail--highlight-bar.mp4" type="video/mp4" />
  </video>

* To show all instances of a term in yellow,
  use the **Find** box.
* To highlight different phrases,
  click <i class="fas fa-ellipsis-h"></i> (settings),
  and then type the word or phrase you want to highlight.
  Click <i class="li li-x"></i> on a highlighted term to remove it.

#### Work in parsed data view {#work-in-parsed-data-view}

The parsed data view divides logs into columns, saving you from having to visually scan entire lines of raw text.
When you first switch to parsed data view, you'll see the `@timestamp` and `message` columns.

<video autoplay controls loop class="no-border">
  <source src="{{site.baseurl}}/videos/live-tail/live-tail--filters.mp4" type="video/mp4" />
</video>

* To add a new column,
  click <i class="li li-plus"></i> (to the right of the table heading row),
  choose a field to show in the new column, and click **Apply**.
* To remove a column,
  hover over the column header and click <i class="li li-x"></i>.
* To move a column left or right,
  hover over the column header and click <i class="li li-left-arrow"></i> or <i class="li li-right-arrow"></i>.
* To add a new filter to your session,
  click **Add a filter**,
  choose a field and filter condition,
  and then click **Apply**.
  Click a filter to edit it,
  or click <i class="li li-x"></i> on that filter to remove it.
