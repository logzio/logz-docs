---
layout: article
title: Using Inspect feature on Kibana UI
permalink: /api/cookbook/inspect.html
flags:
  logzio-plan: pro
tags:
  - api
  - api-cookbook
contributors:
  - nshishkin
---

If you want to search logs using our [Search API](https://docs.logz.io/api/#operation/search), an easy way to construct your query is to use the Kibana UI.


<div class="tasklist">

##### Construct the search query

Enter the search query into the search bar on your Kibana UI.

![Search](https://dytvr9ot2sszz.cloudfront.net/logz-docs/api-cookbook/Search_1.png)

For example, you can filter by the log type: `type:eventHub`. This search query will retrieve all log entries that match the log type.

![Search query](https://dytvr9ot2sszz.cloudfront.net/logz-docs/api-cookbook/Search_2.png)



##### Navigate to the Inspect window

Select **Inspect** to open the inspection window.

![Inspection](https://dytvr9ot2sszz.cloudfront.net/logz-docs/api-cookbook/Search_3.png)


In the inspection window, select **Request**.

![Request](https://dytvr9ot2sszz.cloudfront.net/logz-docs/api-cookbook/Search_4.png)


##### Copy the query object

The `query` object of the JSON file displayed, contains the query that you can use in your request via our [Search API](https://docs.logz.io/api/#operation/search).

![JSON object](https://dytvr9ot2sszz.cloudfront.net/logz-docs/api-cookbook/Search_4.png)



</div>
