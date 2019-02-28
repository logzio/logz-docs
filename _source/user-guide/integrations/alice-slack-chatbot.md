---
layout: article
title: Alice, Slack chatbot
description: Use Alice to work with your Logz.io accounts. Search your logs, see triggered alerts, and get snapshots of visualizations and dashboards—all right from Slack.
permalink: /user-guide/integrations/alice-slack-chatbot.html
flags:
  logzio-plan: pro
tags:
  - integrations
  - slack
  - alice
contributors:
  - imnotashrimp
  - danielberman
---

Alice is a chatbot who lives in your Slack workspace.
You can ask Alice to search your logs, see the alerts triggered in your environment, and get a snapshot of Kibana visualizations and dashboards.

<div class="info-box important">
  Users in your Slack workspace can use Alice to interact with your account, even if they don't have access to Logz.io.
</div>

###### Set up Alice

{: .tasklist .firstline-headline }
1. Get an API token

    If you're a Logz.io account admin, get an API token for the account you want to add to Slack.
    Keep your API token handy—you'll need to paste it in Slack later.

    **For Enterprise accounts** \\
    Create an [API token](https://app.logz.io/#/dashboard/settings/api-tokens) in Logz.io.
    We recommend creating a token for use only with Alice.

    **For Pro accounts** \\
    Email [help@logz.io](mailto:help@logz.io) to request an API token for Alice.

2. Add Alice to Slack

    If you're an admin in your Slack workspace, go ahead and click this button to add Alice to Slack.
    Otherwise, ask an admin to do this step for you.

    <a href="https://slack.com/oauth/authorize?client_id=8241711843.335794452337&amp;scope=bot">
      <img class="no-border" src="https://platform.slack-edge.com/img/add_to_slack.png" alt="Add to Slack">
    </a>

    When prompted, confirm Alice's permissions.

3. Add an account to Slack

    When you set up Alice for the first time, she'll send a Slack message asking you if you want to add a new account.
    Click **Add the account** to continue.

    ![Alice configuration]({{site.baseurl}}/images/alice/alice-config.png)

    Choose your **Account region** (more on that [here]({{site.baseurl}}/user-guide/accounts/account-region.html) if you need help) and paste the **API token** (from step 1).

    Give the account an **Alias** that contains only letters, numbers, underscores, or dashes.
    You'll use the account alias to tell Alice which account you want to interact with.

    Click **Save**.

You can now ask Alice to help you with your Logz.io account and invite her to a specific channel—just remember to tag `@Alice` when you need something from her.

If you want to add another account, type `@Alice add account`.

###### To change Alice's name

If you ever need to change Alice's name in your Slack workspace—for example, if you have a coworker named Alice—just go to the app's [management page](https://slack.com/apps/A9VPCDA9X-alice?next_id=0) and click the edit pencil in the **Bot User** section.