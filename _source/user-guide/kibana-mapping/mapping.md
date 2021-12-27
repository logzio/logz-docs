---
layout: article
title: Field mapping
permalink: /user-guide/kibana/mapping/
flags:
  admin: true
  logzio-plan: community
tags:
  - kibana
contributors:
  - shalper
---

Kibana mappings are important whenever you want to perform any sort of action on a field, such as visualize it, aggregate by it, or use it in an alert.

Kibana maps each field by value type so it knows how to display it according to its capabilities.

For example:

* If it’s a string, Kibana won’t allow you to run any mathematical queries on the field.
* If it's an analyzed field, such as `message`, `tags`, or `geoip_location`, Kibana won't let you use it in an alert, a visualization or a `group by` rule.


### How to identify when a field is not mapped in Kibana

If you are trying to filter by a field but the field doesn't appear in the dropdown list, this is a good indication that the field is not mapped in Kibana. 

Kibana's capabilities are most powerful for mapped fields.
Fields that aren't mapped in Kibana can be searched and queried. 
But they will not appear in filters and do not support 1-click visualizations.

| Action | Mapped field | Unmapped field |
|---|---|
| Filtering | <i class="fas fa-check"></i> | <i class="fas fa-times"></i> |
| Appears in filtering menu | <i class="fas fa-check"></i> | <i class="fas fa-times"></i> |
| Can be visualized | <i class="fas fa-check"></i> | <i class="fas fa-times"></i> |
| Searchable | <i class="fas fa-check"></i> | <i class="fas fa-check"></i> |


#### Manage your Kibana mapping

<div class="tasklist">

##### Refresh Kibana mapping

If you find that many of the fields you are interested in exploring aren't mapped, you can refresh your Kibana mapping.

To refresh your mapping,
click [<i class="li li-gear"></i> Settings> General settings > Kibana mapping > Refresh mapping](https://app.logz.io/#/dashboard/settings/general)
via the navigation menu.


##### Add specific fields to your default Kibana mapping

Instead of refreshing the mapping in bulk, you can add specific fields to your default Kibana mapping. Click **Field not indexed** on an unmapped field. [Learn more](/user-guide/kibana/mapping/field-not-indexed/)

##### Explicitly map a field 

To manually edit a field mapping,
Select [Logs > MANAGE DATA > Field mappings](https://app.logz.io/#/dashboard/tools/field-mapping)
from the navigation menu. 

To change the field mapping type, hover over the field, click **edit** <i class="li li-pencil"></i>, make your changes, and click **Save**.

</div>

### Default Kibana mapping

You might have noticed that the particular fields mapped by Kibana tend to vary. This is because your Kibana mapping is dynamic and responds to the particular dataset you've selected. The larger the dataset, the more likely it is for fields to be unmapped by Kibana.

By default, Kibana maps only 1000 fields to keep querying and filtering performance at top speed.

Here's how Kibana does it. First, it finds every field that your account is actively using - in visualizations, dashboards, saved searches, alerts, and optimizers - and makes sure that those fields are mapped.

Let's say you have 10k fields in your database index, but are actively using 300 fields. Then Kibana will first map your 300 required fields and then map another 700 random fields.

Kibana will always make sure that all of your required fields are mapped by default. So even if you have more than 1000 required fields, Kibana will cover them all and ensure that _all_ of them are mapped every time.


### Kibana vs. Elasticsearch mapping

Your log fields are determined by the parsing schema for your data. Depending on the complexity of your log data and the parsing it undergoes, your data set may include thousands of fields. Logz.io ensures that _all_ of your log fields are mapped in the database _at all times_.

There is (effectively) no limit on the number of active fields in your database.
If for any reason, an error occurs, and Elasticsearch hits an error that there are too many fields, Logz.io Support will be immediately notified automatically.

Kibana's field mapping has no bearing on your Elasticsearch index and won't prevent any logs from being analyzed and parsed.