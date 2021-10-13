---
title: Ship Heroku logs
logo:
  logofile: heroku.svg
  orientation: vertical
data-source: Heroku
templates: ["no-template"]
contributors:
  - imnotashrimp
shipping-tags:
  - platform-service
order: 530
---

#### Set up a Heroku log drain

**Before you begin, you'll need**:
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

<div class="tasklist">
  
##### Enable the runtime metrics 

Optional - run the following command to include application run time metrics in your logs (for example, http status code, customer's IP, and more):

```shell
heroku labs:enable log-runtime-metrics -a <<HEROKU-APP-NAME>>
```

##### Set up the log drain in Heroku CLI

Run this command in the command line.

```shell
heroku drains:add "https://<<LISTENER-HOST>>:8081?token=<<LOG-SHIPPING-TOKEN>>" -a <<HEROKU-APP-NAME>>
```

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %}

Replace `<<HEROKU-APP-NAME>>` with the name of the app in Heroku.

You can add custom fields to each log message, allowing you to identify different Heroku apps and filter your data in Logz.io.
To do this, add `&<<KEY>>=<<VALUE>>` to the end of the Logz.io URL.

For example:

```shell
heroku drains:add "https://<<LISTENER-HOST>>:8081?token=<<LOG-SHIPPING-TOKEN>>&<<KEY>>=<<VALUE>>" -a <<HEROKU-APP-NAME>>
```


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) to confirm you're shipping logs.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
