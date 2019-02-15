---
title: Kibana 6 Upgrade
---

Logz.io has upgraded your account to Kibana 6.3, and we want to ensure that you are enabled to take advantage of the new and enriched features that will be available to you so that you and your teams can plan accordingly.

You’ll immediately notice some UI changes in Kibana which will be reviewed here, but the most impactful change will likely be the improvement of the search experience with the addition of autocomplete and Kuery.

## UI Upgrades

The main UI changes being made available include new colors for better contrast, and improved screen reading and keyboard navigation. Dashboarding also has a new “Full-Screen Mode” was added when viewing dashboards that allow users to enjoy all the Kibana goodness in full-screen mode. 

## Autocomplete Search

Logz.io rolled out support for autocomplete and the option to use Kuery, a functional querying syntax that is simpler than Lucene introduced in Kibana 6.0. The focus is to make searches easier, and you can read up on how to use this syntax [here](https://www.elastic.co/guide/en/kibana/6.3/kuery-query.html).

Autocomplete improves the search experience by helping you easily build the query you want. When beginning a search in Kibana, Logz.io provides suggestions for fields, values and query operators, based on the data you are searching (the Elasticsearch index you are querying).

Please note that we are still working to fully support Kuery in alerts. To make an alert or optimizer, you will need to use a Lucene search.

## We’ve Got You Covered

You may have heard or read about various breaking changes when migrating existing Kibana installations, including the need to re-index your Kibana Index. With Logz.io we’ve taken care of all of these details for you as part of our managed upgrade process, so you can continue to work worry-free and simply enjoy the new features as they come.

Any of your existing dashboards will move over with the upgrade, so you should not expect any disruptions. If you do notice any problems please reach out to your customer success engineer or solutions architect.
