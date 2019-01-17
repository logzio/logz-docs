---
title: Ship Heroku logs
logo:
  logofile: heroku.svg
  orientation: vertical
shipping-summary:
  data-source: Heroku
  log-shippers:
    - Log drain
contributors:
  - imnotashrimp
---

## Heroku log drain setup

**You'll need:** Heroku CLI

{: .tasklist .firstline-headline }
1. Set up the log drain in Heroku CLI

    Run this command in a terminal window.

    {% include log-shipping/replace-vars.html token=true listener=true %}

    Replace `<HEROKU-APP-NAME>` with the name of the app in Heroku.

    ```shell
    heroku drains:add "http://<LISTENER-URL>:8081?token=<ACCOUNT-TOKEN>" -a <HEROKU-APP-NAME>
    ```

    You can add custom fields to each log message. To do this, add `&<KEY>=<VALUE>` to the end of the Logz.io URL. You can use custom fields to identify different Heroku apps, allowing you filter your data in Logz.io.

2. Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) to confirm you're shipping logs.

   If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).