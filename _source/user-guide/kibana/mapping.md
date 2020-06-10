---
layout: article
title: Refresh Mapping
permalink: /user-guide/kibana/mapping/
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - shalper
---

Kibana maps each field by value type so it knows how to display it according to its capabilities. For example:

* If it’s a string, Kibana won’t allow you to run any mathematical queries on the field.
* If it's an analyzed field, such as `message`, `tags`, or `geoip_location`, Kibana won't let you use it in an alert, a visualization or a `group by` rule.

Kibana mappings are important whenever you want to perform any sort of action on a field, such as visualize it, aggregate by it, or use it in an alert.


### Refresh Kibana mapping

If you find that many of the fields you are interested in exploring aren't mapped, you can always refresh your Kibana mapping.

To refresh your mapping,
select [<i class="li li-gear"></i> > General > Refresh mapping](https://app.logz.io/#/dashboard/settings/general)
from the top menu.


### Mapped vs. unmapped fields

Kibana's capabilities are most powerful for mapped fields. 
Fields that aren't indexed, are fully searchable and can be queried. 
But they will not appear in filters and don't support 1-click visualizations. 

| Action | Mapped field | Unmapped field |
|---|---|
| Filtering | <i class="fas fa-check"></i> | <i class="fas fa-times"></i> |
| Appears in filtering menu | <i class="fas fa-check"></i> | <i class="fas fa-times"></i> |
| Can be visualized | <i class="fas fa-check"></i> | <i class="fas fa-times"></i> |
| Searchable | <i class="fas fa-check"></i> | <i class="fas fa-check"></i> |



### Kibana mapping explained

You might have noticed that the particular fields mapped by Kibana tend to vary. This is because your Kibana mapping is dynamic and responds to the particular dataset you've selected. The larger the dataset, the more likely it is for fields to be unmapped by Kibana.

By default, Kibana maps only 1000 fields to keep querying and filtering performance at top speed.

Here's how Kibana does it. First, it finds every field that your account is actively using - in visualizations, dashboards, saved searches, alerts, and optimizers - and makes sure that those fields are mapped.

Let's say you have 10k fields in your database index, but are actively using 300 fields. Then Kibana will first map your 300 required fields and then map another 700 random fields.

Kibana will always make sure that all of your required fields are mapped by default. So even if you have more than 1000 required fields, Kibana will cover them all and ensure that _all_ of them are mapped every time.


### Kibana Mapping vs. Elasticsearch mapping

Your log fields are determined by the parsing schema for your data. Depending on the complexity of your log data and the parsing it undergoes, your data set may include thousands of fields. Logz.io ensures that _all_ of your log fields are mapped in the database _at all times_.

There is (effectively) no limit on the number of active fields in your database.
If for any reason, an error occurs, and Elasticsearch hits an error that there are too many fields, Logz.io Support will be immediately notified automatically.

Kibana's field mapping has no bearing on your Elasticsearch index and won't prevent any logs from being analyzed and parsed.