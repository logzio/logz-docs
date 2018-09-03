---
layout: article
title: Live Tail
permalink: /user-guide/live-tail/
flags:
  logzio-plan: community
contributors:
  - imnotashrimp
---

Live Tail gives you a live view of your logs as they come into Logz.io, eliminating the need to SSH into a remote machine.

![Live Tail]({{site.baseurl}}/images/live-tail/live-tail--live-tail-annotated.png)

{: .letter-labels }

  Search bar
  : Contains controls to filter log lines, start and stop Live Tail, and to quickly find a word or phrase in the logs

  Highlight bar
  : Lets you highlight specific terms in the logs

  Live Tail view
  : Shows live scrolling view of your logs

###### Start, stop, scroll, and clear

* To start Live Tail, choose to show **Raw data** or **Parsed data**, type a regex in the **Match** and **Ignore** boxes, and press <i class="li li-play"></i> (play). Log lines that meet your Match and Ignore criteria are shown in real time.

    Read more about [parsed data view](#customize-the-parsed-data-view) below. 👇

* To stop Live Tail and pause scrolling, press <i class="li li-stop"></i> (stop), or scroll with your mouse or trackpad.

* To go to the bottom of the Live Tail view and resume scrolling, press <i class="li li-scroll"></i> (scroll). Scroll is available if you're not already at the bottom line of Live Tail.

* To clear the Live Tail view, click <i class="li li-clear"></i> (clear).

###### Find and highlight terms

  <video autoplay loop>
    <source src="{{site.baseurl}}/videos/live-tail/live-tail--highlight-bar.mp4" type="video/mp4" />
  </video>

* To show all instances of a term in yellow, use the **Find** box.

* To highlight different phrases, click <i class="fas fa-ellipsis-h"></i> (settings), and then type the word or phrase you want to highlight. You can add as many highlighted terms as you need. To remove a highlight, click the highlighted term.

###### Customize the parsed data view {#customize-the-parsed-data-view}

If you show parsed data, Live Tail prases your log lines into columns. By default, the `@timestamp` and `message` columns are shown.

![Parsed data view]({{site.baseurl}}/images/live-tail/live-tail--parsed-data.png)

* To add a new column, click <i class="li li-plus"></i>, choose a log field to show in the new column, and click **Apply**.

<div class="info-box note">
  Live Tail resets the connection when you switch between parsed and raw data view, and when you add or remove a column.
</div>

* To remove a column, hover over the column header, and click <i class="li li-x"></i>.

* Hover over a column header and click <i class="li li-left-arrow"></i> or <i class="li li-right-arrow"></i> to move the column left or right.
