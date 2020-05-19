---
layout: article
title: Canary - testing the docs
permalink: /canary/
flags:
  admin: true
  beta: true
  logzio-plan: enterprise
open-source:
  - title: Logz.io docs
    github-repo: logz-docs
contributors:
  - imnotashrimp
---

☝️ Check along the top of the page.
You should see these things:

1. Page title
2. Beta flag
3. Admin flag
4. Slack community button
5. Contributors list
6. "Available for this plan" - Enterprise
7. A link to the Logz.io docs repo in GitHub

## Left toc expected behavior

* Expand/collapse on click
* Current page is highlighted (if it's actually represented in the toc)
  * If current page is level 3, parent is expanded
