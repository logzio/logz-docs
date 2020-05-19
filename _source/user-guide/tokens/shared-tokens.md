---
layout: article
title: Manage shared tokens
permalink: /user-guide/tokens/shared-tokens.html
flags:
  admin: true
  logzio-plan: community
tags:
  - tokens
  - shared-tokens
contributors:
  - shalper
  - imnotashrimp
  - danielberman
---

Shared tokens give you the option to share Kibana dashboards and visualizations with stakeholders who don't have access to your Logz.io account. If your account has other users, any of them will also be able to share objects with these tokens, including non-admin users.

Shared tokens access your logging database (because they are Elasticsearch tokens). In other words, they exist outside of Kibana filters. This means you can't rely on the filters you'll apply to the dashboards or visualizations you are sharing. Instead, you'll need to control what you're sharing using token filters.

#### Best-practice recommendations

These best-practice recommendations will help you keep your data secure when using shared tokens:

* Shared tokens can potentially give read-only access to all logs in your account. It is therefore strongly recommended that you apply **token filters** to every token.

* Shared tokens do not expire. Always make sure to cancel them once they are no longer needed. Rotating your Shared tokens often is a good idea in general and another way to make sure old tokens get canceled.

  For example, even if you've shared a snapshot, and the logs of the snapshot are no longer in retention, the link you've sent using the Shared token is still active and has access to the logging database. Always make sure to delete the token once it has fulfilled its purpose.

* Changes in token filters always take effect immediately and apply to Shared token links, regardless of when they were created.

  This means that you can add or remove token filters to a Shared token at any time to change access permissions. This can be done both before or after the sharing link has been sent out. For example, if you've accidentally shared too much, you can add token filters to tighten control and your recipients' links will be updated accordingly.
  Of course, this works the other way as well. If you delete a sharing token, any existing sharing links that were previously sent out, will reflect the updated permissions.
  
  It is always a good idea to double-check token filters before using the public sharing option to make sure they are up-to-date.

* When possible, opt for in-app sharing options wherever applicable. Always exercise caution and take note of who you're sharing with
  when sharing dashboards and visualizations using Shared tokens.
  

#### Managing shared tokens

To reach this page, click [**<i class="li li-gear"></i> > Tools > Shared tokens**](https://app.logz.io/#/dashboard/settings/shared-tokens) in the top menu.

![Manage shared tokens](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/token-filters.png)

<div class="tasklist">

##### Working with shared tokens

* To create a token, click **+Add shared token**
  type a brief **token name**, selected **filters** and click **Add**.
* To attach filters to a token, hover over the token, click **edit** <i class="li li-pencil"></i>, select filters from the dropdown list, and click **Save**.
* To remove filters from a token, hover over the token, click **edit** <i class="li li-pencil"></i>, <i class="li li-x"></i> out the filters you want to remove, and click **Save**.
* To delete a token, hover over it, and click **delete** <i class="li li-trash"></i> to delete it.

##### Working with token filters

Each token filter is a `field: value` key-value pair. The value needs to be an exact match. Wildcards are not supported.

* To add a new filter,
  type a brief **description**,
  copy in the name of a **log field** and the exact **value**. Then click **Add**.
  You can add your new token filter to any of your shared tokens.

    For example, your could add a filter for a particular environment, with a field `env` and the value `test`.

* To delete a filter, hover over it, and click **delete** <i class="li li-trash"></i> to delete it. You'll be asked to confirm the deletion. If the filter you just deleted was used in any sharing links, they will be immediately updated with the new access permissions once you've deleted the filter.

##### Testing token filters

It's simple to test shared tokens. You can open your sharing link in an incongnito browser window to try it out. For example, if you're trying to share a dashboard, you can add or remove token filters and refresh the view to see how the filters affect what your recipients will see.

Remember, the Kibana filters at the dashboard or visualization level affect what your recipients can view. However, they don't control access tightly enough from a security point of view. Make sure to apply the token filters you need to keep your data secure.
{:.info-box.warning}

</div>