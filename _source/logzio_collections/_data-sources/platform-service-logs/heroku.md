---
layout: article
title: Ship Heroku logs
logo:
  logofile: heroku.svg
  orientation: vertical
shipping-summary:
  data-source: Heroku
  log-shippers:
    - Logz.io add-on
    - Log drain
contributors:
  - imnotashrimp
---

<div class="branching-container">

{: .branching-tabs }
  * [Logz.io add-on](#logzio-add-on-config)
  * [Log drain](#log-drain-config)


<div id="logzio-add-on-config">

## Heroku + Logz.io add-on setup

If you've already installed Heroku CLI, the CLI installation is the simplest way to install the add-on. Otherwise, you can install directly from the add-on page.

###### Installation from the CLI

**You'll need:** Heroku CLI

{: .tasklist }
1. In a terminal window, run `heroku addons:create logzio:r2d2`.

2. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) to confirm you're shipping logs.

###### Installation from the add-on page

{: .tasklist }
1. Find the installation instructions on the [Logz.io add-on page](https://elements.heroku.com/addons/logzio) by clicking **Install Logz.io**.

2. After installation, give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) to confirm you're shipping logs.

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>


<div id="log-drain-config">

## Heroku log drain setup

**You'll need:** Heroku CLI

{: .tasklist }
1. Run this command in a terminal window.

    {% include log-shipping/your-account-token.html %}

    {% include log-shipping/your-listener-url.html %}

    Replace `{heroku-app-name}` with the name of the app in Heroku.

    ```shell
    heroku drains:add "http://{listener-url}:8081?token={account-token}" -a {heroku-app-name}
    ```

    You can add custom fields to each log message. To do this, add `&{key}={value}` to the end of the Logz.io URL. You can use custom fields to identify different Heroku apps, allowing you filter your data in Logz.io.

2. Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana) to confirm you're shipping logs.

   If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).


</div>

</div>