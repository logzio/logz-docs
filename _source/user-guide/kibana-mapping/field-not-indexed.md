---
layout: article
title: Field not indexed
permalink: /user-guide/kibana/mapping/field-not-indexed/
flags:
  logzio-plan: community
tags:
  - kibana
contributors:
  - shalper
---

Sometimes, it will appear that a field in Kibana Discover is not mapped. The mapping icon will show a <i class="fas fa-question"></i> question mark, indicating that the field is not mapped in Kibana. 


![Kibana field not indexed](https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/field-not-indexed_aug2021.png)


Whenever you see the message **Field not indexed**, this is simply an indication that the field is not indexed because nothing in your Kibana account is dependent on it. It wasn't required for any of your account's alerts, filters, saved searches, visualizations, dashboards, or any other Kibana objects.

### If a field is not indexed

If a field is not mapped in Kibana, there are a few actions you won't be able to perform on it:

1. You can't visualize it.
2. You can't filter on it. It simply won’t appear in the drop-down filter list.


### Add a field to Kibana's default mapping

You can always add a field to Kibana's list of required fields.

In Kibana Discover, on the left preview menu, identify the unmapped field. Click on the unmapped field to select it and click on the button **Field not indexed**.

The field will now be added to your default Kibana mapping.

<video autoplay loop>
  <source src="https://dytvr9ot2sszz.cloudfront.net/logz-docs/kibana/refresh-kibana-mapping6.mp4" type="video/mp4" />
</video>
