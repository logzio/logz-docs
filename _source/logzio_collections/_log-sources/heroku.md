---
title: Ship Heroku logs
logo:
  logofile: heroku.svg
  orientation: vertical
shipping-summary:
  data-source: Heroku
contributors:
  - imnotashrimp
shipping-tags:
  - platform-service
---

## Heroku log drain setup

**You'll need**:
[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

{: .tasklist .firstline-headline }
1.  Set up the log drain in Heroku CLI

    Run this command in a terminal window.

    ```shell
    heroku drains:add "http://<LISTENER-URL>:8081?token=<ACCOUNT-TOKEN>" -a <HEROKU-APP-NAME>
    ```

    {% include log-shipping/replace-vars.html token=true listener=true %}

    Replace `<HEROKU-APP-NAME>` with the name of the app in Heroku.

    You can add custom fields to each log message, allowing you to identify different Heroku apps and filter your data in Logz.io.
    To do this, add `&<KEY>=<VALUE>` to the end of the Logz.io URL.

2.  Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) to confirm you're shipping logs.

   If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).