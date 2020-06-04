---
layout: article
title: Grafana data source
permalink: /integrations/grafana-data-source-plugin.html
flags:
  logzio-plan: pro
open-source:
  - title: Logz.io datasource for Grafana
    github-repo: grafana-logzio-datasource
tags:
  - grafana
  - integration
contributors:
  - imnotashrimp
---

If you're self-hosting Grafana
or using a hosted Grafana service,
you can ship your metrics to your Logz.io account
and use Logz.io as your Grafana datasource.

To make this work,
you'll need an API token for your Logz.io account.

If you're running Grafana 6.5 or lower,
you can use our legacy plugin
[Logz.io datasource for Grafana](https://github.com/logzio/grafana-logzio-datasource).
Hower, this plugin is deprecated,
and we recommend upgrading to Grafana 6.7 or higher.
{:.info-box.note}

#### Set up Logz.io as a datasource for Grafana

**Before you begin, you'll need**:
Grafana 6.7 or higher,
Logz.io API access

<div class="tasklist">

##### Install the plugin

Download the plugin to your Grafana server.

```shell
grafana-cli plugins install logzio-datasource
```

##### Configure the plugin

In the Grafana main menu,
select **<i class="fas fa-cog"></i> > Data Sources**.

Click **Add data source** (upper right of the window)
and choose **Logz.io**.
You're taken to the Logz.io _Settings_ page.

In **Logz.io Url**, type your region's base API URL.
For more information on finding your account's region,
see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

In **Logz.io API Key**,
paste an [API token](https://app.logz.io/#/dashboard/settings/api-tokens)
from the account you want to use.

Leave the _Elasticsearch details_ section as is.
Logz.io overrides these settings.

Click **Save & Test**.
If the test passes, you can now use Logz.io as a data source.

</div>
