---
layout: article
title: Sharing links
permalink: /user-guide/tokens/sharing-links.html
flags:
  logzio-plan: community
tags:
  - tokens
  - shared-tokens
contributors:
  - shalper
---

You can use shared tokens to share Kibana dashboards and visualizations with
stakeholders who don't have access to your Logz.io account.

This can be useful for communicating with clients outside your organization
or internally, to communicate with other teams in your organization.

#### Sharing dashboards

<div class="tasklist">

##### Decide what to share

Open the dashboard you would like to share.
When you share a dashboard, you can decide whether to share the dashboard with a relative or fixed timeframe.

* **Snapshot** - Converts the time selection to absolute dates. Your recipients will view the exact same data that you are viewing right now. For example, if you send out a snapshot when viewing the dashboard for the last 24 hours, your  recipients will receive the dashboard with a fixed date range selection.

  Of course, this type of permalink is short lived, as it depends on your log retention policy. Once the logs are too old, they will no longer feed the dashboard and your recipients won't have anything to see.

* **Saved object** - Shares the dashboard with a relative time selection.

  The permalink will load the dashboard with its default time selection and filters. So if the dashboard is set for the last 15 minutes, this is what it will do for your recipients as well.

  This option means the sharing link will automatically be updated to reflect any changes made to the dashboard in the future. So if someone saves changes to the dashboard after the sharing link was sent out, your recipients will see the updated version without you having to resend them a new link.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/dashboards/share-permalink_aug2021.mp4" type="video/mp4" />
</video>


##### What your recipients will see

Your recipients will receive a link to the dashboard you've shared with them. The dashboard will appear without the top and side navigation bars, and without the Kibana time filtering options.

Note that your recipients will not see the time frame selected for the dashboard. You will need to communicate it to them in another way.
{:.info-box.note}

##### Testing your permalink

You can open your sharing link in an incognito browser window to try it out.
