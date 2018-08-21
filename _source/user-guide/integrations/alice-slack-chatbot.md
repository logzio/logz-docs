---
layout: article
title: Alice, Slack chatbot
permalink: /user-guide/integrations/alice-slack-chatbot.html
flags:
  logzio-plan: pro
contributors:
  - imnotashrimp
  - proudboffin
---

Alice is a chatbot who lives in your Slack workspace. You can ask Alice to perform Elasticsearch queries, see the alerts triggered in your environment, and get a snapshot of Kibana visualizations and dashboards.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dNPhfyjaBTw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

##### Assign an API token

If you're an Enterprise account admin, you can create an API token from [**<i class="li li-gear"></i> > Tools > API tokens**](https://app.logz.io/#/dashboard/settings/api-tokens). We recommend creating a token for use only with Alice.

If you're a Pro account admin, email [help@logz.io](mailto:help@logz.io) to request an API token for Alice. Plase note we can honor a request only from an account admin.

<div class="info-box important">
  Users with access to your Slack workspace will be able to ask Alice to report information on your account, even if they don't have access to Logz.io.
</div>

###### Install Alice

1. If you're a Slack workspace admin and you have admin access to your Logz.io account, go ahead and click this button to add Alice to Slack:

    <a href="https://slack.com/oauth/authorize?client_id=8241711843.335794452337&amp;scope=bot">
      <img class="no-border" src="https://platform.slack-edge.com/img/add_to_slack.png" alt="Add to Slack">
    </a>

2. Confirm Alice's permissions in your browser.

3. In Slack, enter your **Account region** and **API token**, and click **Save**.

    ![Configure Alice]({{site.baseurl}}/images/integrations/integrations--alice-configuration.png)

    If you’re not sure about your account region, check the URL you use to sign in Logz.io. If you sign in to `app.logz.io`, choose **US**. If you sign in to `app-eu.logz.io`, choose **EU**.

You can now ask Alice to help you with your Logz.io account. You can invite Alice to a specific channel (just tag `@Alice`) or issue commands from the app itself in Slack.

###### To change Alice's name

If you ever need to change Alice's name in your Slack workspace—for example, if you have a coworker named Alice—just go to the app's [management page](https://slack.com/apps/A9VPCDA9X-alice?next_id=0) and click the edit pencil in the **Bot User** section.

