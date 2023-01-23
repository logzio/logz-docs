---
layout: article
title: Canary - testing the docs
permalink: /canary/
flags:
  admin: true
  beta: true
  logzio-plan: enterprise
sitemap: false 
noindex: true
open-source:
  - title: Logz.io docs
    github-repo: logz-docs
contributors:
  - imnotashrimp
---

#### Top of page

1. Page title is H1
2. Beta flag is present
3. Admin flag is present
4. Slack community button is present
5. Contributors list shows a contributor
6. "Available for this plan" is Enterprise
7. "Projects" shows a link to Logz.io docs repo in GitHub

#### Left toc

1. Expand/collapse on click
2. Current page is highlighted (if it's actually represented in the toc)
3. If current page is level 3, parent is expanded

#### Data

1. Data shown below is **logzio-regions**:

    Verify on these pages:

    * [{{site.baseurl}}/user-guide/log-shipping/listener-ip-addresses.html]({{site.baseurl}}/user-guide/log-shipping/listener-ip-addresses.html)
    * [{{site.baseurl}}/user-guide/accounts/account-region.html#regions-and-urls]({{site.baseurl}}/user-guide/accounts/account-region.html#regions-and-urls)
    * [{{site.baseurl}}/listener-ip-addresses.xml]({{site.baseurl}}/listener-ip-addresses.xml)

    {{site.data.logzio-regions | truncate: 500}}

2. Data shown below is the **toc**:

    Verify on any page.

    {{site.data.toc | truncate: 500}}

3. Data shown below is the shipping tabs & tags:

    Verify on [{{site.baseurl}}/shipping/]({{site.baseurl}}/shipping/)

    {{site.data.shipper-tabs |  truncate: 500}}

#### Logz.io icons

1. Each item in this list should contain a visible icon ({{site.data.logzio-icons | size }} icons): \\
  {% for icon in site.data.logzio-icons %} `{{icon.class}}` <i class="li {{icon.class}}"></i><br> {% endfor %}

#### Bottom of page

##### Below the article

1. Edit this page, links to this page on master branch in GitHub
2. Report an issue, links to new issue page in GitHub

##### Footer

1. "all" links to `/docs-admin/`, cursor is a cursor and not the pointing hand
2. Privacy policy & terms of use link to respective page on Logz.io main site
3. "Contributors" links to contributors list in the docs
