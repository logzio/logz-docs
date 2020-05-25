---
title: Ship Heroku logs
logo:
  logofile: heroku.svg
  orientation: vertical
data-source: Heroku
contributors:
  - imnotashrimp
shipping-tags:
  - platform-service
---

#### Set up a Heroku log drain

**Before you begin, you'll need**:
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

<div class="tasklist">

##### Set up the log drain in Heroku CLI

Run this command in the command line.

```shell
heroku drains:add "http://<<LISTENER-HOST>>:8081?token=<<SHIPPING-TOKEN>>" -a <<HEROKU-APP-NAME>>
```

{% include log-shipping/replace-vars.html token=true %}

{% include log-shipping/replace-vars.html listener=true %}

Replace `<<HEROKU-APP-NAME>>` with the name of the app in Heroku.

You can add custom fields to each log message, allowing you to identify different Heroku apps and filter your data in Logz.io.
To do this, add `&<<KEY>>=<<VALUE>>` to the end of the Logz.io URL.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) to confirm you're shipping logs.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>