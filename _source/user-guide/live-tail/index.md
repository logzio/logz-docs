---
layout: article
title: Live Tail
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

###### To start, stop, scroll, and clear

* To start Live Tail, type a regex in the **Match** and **Ignore** boxes, and press **Play** (<i class="li li-play"></i>). Log lines that meet your Match and Ignore criteria are shown in real time.

* To stop Live Tail and pause scrolling, press **Stop** (<i class="li li-stop"></i>), or scroll with your mouse or trackpad.

* To go to the bottom of the Live Tail view and resume scrolling, press **Scroll**. Scroll is available only if you're not already at the bottom line of Live Tail.

* To clear the Live Tail view, click **Clear** (<i class="li li-clear"></i>).

###### To find and highlight terms

  <video autoplay loop>
    <source src="{{site.baseurl}}/videos/live-tail/live-tail--highlight-bar.mp4" type="video/mp4" />
  </video>

* To show all instances of a term in yellow, use the **Find** box.

* To highlight different phrases, click **Settings** (<i class="fas fa-ellipsis-h"></i>), and then type the word or phrase you want to highlight. You can add as many highlighted terms as you need. To remove a highlight, click the highlighted term.