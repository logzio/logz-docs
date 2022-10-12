---
layout: article
title: Alice, your Slack chatbot
description: Use Alice to work with your Logz.io accounts. Search your logs, see triggered alerts, and get snapshots of visualizations and dashboards—all right from Slack.
permalink: /integrations/alice-slack-chatbot.html
flags:
  logzio-plan: pro
sitemap: false
open-source:
  - title: Alice
    github-repo: slack-integration
tags:
  - integrations
  - slack
  - alice
contributors:
  - imnotashrimp
  - danielberman
  - yberlinger
---

<!-- info-box-start:info -->
Alice doesn't live here anymore. <br> 
The Alice Slack chatbot was disabled in February 2021 and will not return.
{:.info-box.important}
<!-- info-box-end -->

If you use Slack for office communication and workflows,
Alice will fit right in.

Alice is a chatbot that lets you query your Logz.io data from Slack.
This gives you a mobile-friendly way to work with OpenSearch Dashboards
and to share information without leaving your team's chat.

For example, you can send a `search` or `snapshot` command
to see the results in your conversation's flow in real time.

You can ask Alice to search your logs, see triggerd alerts,
and get visualization and dashboard snapshots.

## Getting started with Alice

#### Set up Alice

<div class="tasklist">

##### Get an API token

If you're a Logz.io account admin,
get an API token for the account you want to add to Slack.
Keep your API token handy—you'll need to paste it in Slack later.

###### For Enterprise accounts

Create an [API token](https://app.logz.io/#/dashboard/settings/manage-tokens/api) in Logz.io.
We recommend creating a token for use only with Alice.

###### For Pro accounts

Email [help@logz.io](mailto:help@logz.io) to request an API token for Alice.

##### Add Alice to Slack

👇 If you're an admin in your Slack workspace,
go ahead and click this button to add Alice to Slack.
Otherwise, ask an admin to do this step for you.

[![Add to Slack](https://platform.slack-edge.com/img/add_to_slack.png)](https://slack.com/oauth/authorize?client_id=8241711843.335794452337&amp;scope=bot)
{:.override.btn-img}

When prompted, confirm Alice's permissions.

##### Add an account to Slack

When you set up Alice for the first time,
she'll send a Slack message asking you if you want to add a new account.
Click **Add the account** to continue.

![Alice configuration](https://dytvr9ot2sszz.cloudfront.net/logz-docs/alice/alice-config.png)

Choose your **Account region**
(more on that [here]({{site.baseurl}}/user-guide/accounts/account-region.html) if you need help)
and paste the **API token** from step 1.

Give the account an **Alias**
that contains only letters, numbers, underscores, or dashes.
You'll use the account alias to tell Alice
which account you want to interact with.

Users in your Slack workspace can use Alice to interact with your account, even if they don't have access to Logz.io.
{:.info-box.important}

Click **Save**.

</div>

You can now ask Alice to help you with your Logz.io account
and invite her to a specific channel—just remember to tag `@Alice`
when you need something from her.

If you want to add another account, type `@Alice add account`.

#### To change Alice's name

What if you have a coworker named Alice?
Good news on this front—you can change Alice's name in your Slack workspace.
To do this,
go to the app's [management page](https://slack.com/apps/A9VPCDA9X-alice?next_id=0)
and click the edit pencil in the **Bot User** section.

After you change Alice's name,
`@Alice` won't work anymore—you'll need to use the new name you set.
Make sure you communicate this change to all your Slack users
so nobody feels offended that Alice is ignoring them.

## Working with sub accounts

If you're adding a few accounts to Alice,
you can set default accounts per channel
or for the whole Slack workspace—and you can override these settings
by giving an alias in a command.

### How does Alice know which account to use?

Alice looks for the account in this order: \\
<span class="bold border background">Alias used in the command</span> ➜
<span class="bold border background">Channel account</span> ➜
<span class="bold border background">Workspace account</span>

| Alias used in the command | If you used an account alias in the command, Alice searches that account. This overrides the channel or workspace account settings. |
| Channel account | If you didn't use an alias in the command, Alice looks to see if there's a default account for the channel you ran the command from. |
| Workspace account | If there isn't a channel account set, Alice uses the workspace account. |
{:.paramlist}

If you need help with how to write your commands, type `@Alice help` in Slack.
<!--Check back in 1 month -->