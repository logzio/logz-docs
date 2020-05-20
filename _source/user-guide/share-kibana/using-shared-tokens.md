---
layout: article
title: Sharing externally
permalink: /user-guide/tokens/public-sharing-options.html
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

* **Snapshot** - If you select the snapshot option, your recipients will view the exact same dashboard and data that you are viewing right now. The relative datepicker selection will be converted to fixed times. So if you are looking at the last 24 hours, your  recipients will view the exact same data, even if they are viewing it when it's from Sunday of last week.

  Of course, this type of permalink is short lived, as it depends on your log retention policy. Once the logs are too old, they will no longer feed the dashboard and your recipients won't have anything to see.

* **Saved object** - If you share the dashboard as a saved object, your recipients will have a continual window into the current logs.
  
  The permalink will load the dashboard with its default time selection and filters. So if the dashboard automatically loads with the last 15 minutes, that is what it will do for your recipients too.
  
  The link will also reflect changes made to the dashboard in the future. So if someone saves changes to the dashboard, your recipients will see the updated default dashboard, without you having to resend them an updated link.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/dashboards/share-permalink.mp4" type="video/mp4" />
</video>


##### What your recipients will see

Your recipients will receive a link to the dashboard you've shared with them. The dashboard will appear without the top and side navigation bars, and without the Kibana time filtering options.

Note that your recipients will not see the time frame selected for the dashboard. You will need to communicate it to them in another way.
{:.info-box.note}

##### Testing your permalink

You can open your sharing link in an incognito browser window to try it out.
