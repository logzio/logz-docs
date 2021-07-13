---
title: Ship Heroku metrics via Telegraf
logo:
  logofile: heroku-telegraf.png
  orientation: vertical
data-source: Heroku metrics over Telegraf
templates: ["docker"]
open-source:
  - title: heroku-buildpack-telegraf
    github-repo: heroku-buildpack-telegraf
contributors:
  - nshishkin
shipping-tags:
  - platform-service
order: 800
---

## Overview

Deploy this integration to install and launch Telegraf on the dynos of your Heroku app. This integration buildpack downloads the latest Telegraf release, extracts it on your dyno and starts it via a .profile.d script.

#### Configuring Telegraf to send your metrics data to Logz.io

**Before you begin, you'll need**:

* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

<div class="tasklist">

<!-- info-box-start:info -->
All commands in these instructions should be run from your Heroku app directory.
{:.info-box.note}
<!-- info-box-end -->

##### Download the Telegraf configuration file

``` shell

wget -O telegraf.conf https://raw.githubusercontent.com/logzio/heroku-buildpack-telegraf/master/telegraf.conf

```

##### Enable environment variable

``` shell

heroku labs:enable runtime-dyno-metadata -a <<HEROKU_APP_NAME>>

heroku config:set LOGZIO_LISTENER=https://<<LISTENER-HOST>>:8053   

heroku config:set LOGZIO_TOKEN=<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>

git add .

git commit -m "Telegraf config" 

git push heroku main

```

{% include general-shipping/replace-placeholders-prometheus.html %}
* Replace `<<HEROKU_APP_NAME>>` with the name of your Heroku app

##### Add the buildpack to the list of your Heroku buildpacks

``` shell

heroku buildpacks:add --index 1 https://github.com/logzio/heroku-buildpack-telegraf.git

git commit --allow-empty -m "Rebuild slug"

git push heroku main

```

##### Check Logz.io for your metrics

Give your data some time to get from your system to ours, then log in to your Logz.io Metrics account, and open [the Logz.io Metrics tab](https://app.logz.io/#/dashboard/metrics/).


</div>
