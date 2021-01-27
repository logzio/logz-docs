---
layout: article
title: Grafana data source plugin
permalink: /integrations/grafana-data-source-plugin.html
flags:
  logzio-plan: enterprise
open-source:
  - title: Logz.io datasource for Grafana
    github-repo: grafana-logzio-datasource
tags:
  - grafana
  - integration
contributors:
  - imnotashrimp
---

Supported versions: Grafana 6.5 or older.
{:.info-box.note}


Logz.io is an official Grafana data source plugin.
The plugin allows you to view your Logz.io-stored metrics
in a Grafana instance that you manage.

#### Install Logz.io datasource for Grafana

**Before you begin, you'll need**:
Write access to Grafana,
Logz.io API access

<div class="tasklist">

##### Install the plugin

Download the plugin to your Grafana server.

```shell
grafana-cli plugins install logzio-datasource
```

##### Configure the plugin

1. In the Grafana main menu,
select **<i class="fas fa-cog"></i> > Data Sources**.

2. Click **Add data source** (upper right of the window)
and choose **Logz.io**.
You're taken to the Logz.io _Settings_ page.

3. In **Logz.io Url**, type your region's base API URL.
For more information on finding your account's region,
see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

4. In **Logz.io API Key**,
paste an [API token](https://app.logz.io/#/dashboard/settings/api-tokens)
from the account you want to use.

5. Leave the _Elasticsearch details_ section as it is. Logz.io overrides these settings.

6. Click **Save & Test**. If the test passes, you can now use Logz.io as a data source.

</div>
