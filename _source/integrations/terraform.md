---
layout: article
title: Terraform API integration
permalink: /integrations/terraform/
flags:
  logzio-plan: pro
open-source:
  - title: Logz.io-Terraform-Provider
    github-repo: logzio_terraform_provider
tags:
  - integrations
contributors:
  - yyyogev
  - shalper
---

Logz.io Terraform Provider offers a great way to build integrations with Logz.io's API. Terraform is an infrastructure orchestrator written in Hashicorp Language (HCL). It is a popular IAC tool that converts manual configuration processes to code.

### Supported endpoints

You can use Terraform to run any of the following Logz.io API endpoints:

* [User management](https://docs.logz.io/api/#tag/Manage-users) - CRUD operations (The acronym CRUD stands for Create, Read, Update, Delete.)
* [Notification channels](https://docs.logz.io/api/#tag/Manage-notification-endpoints) - custom and pre-configured integrations.
* [Log-based alerts](https://github.com/logzio/public-api/tree/master/alerts)
* [Sub accounts](https://docs.logz.io/api/#tag/Manage-sub-accounts)

#### Working with Terraform

<div class="tasklist">

##### Get the Terraform provider

The easiest way to get the provider and the JetBrains IDE HCL meta-data is to run [the script provided in our GitHub repo](https://github.com/logzio/logzio_terraform_provider/blob/master/scripts/update_plugin.sh). It is found under `./scripts/update_plugin.sh`.

```bash
./scripts/build.sh
```

You'll need to edit the variable: `PROVIDER_VERSION` and put the latest provider version.

If you're using a *nix style system, you can build from the project root. This will copy it into your [plugins directory](https://www.terraform.io/docs/configuration/providers.html#third-party-plugins).  Otherwise, you can copy it into your Terraform templates folder instead.

##### Using the provider

The Terraform provider works with any of the supported Logz.io endpoints listed at the top of this page.

```bash
provider "logzio" {
  api_token = "${var.api_token}"
  base_url = "${var.your_api_endpoint}" #e.g. https://api-au.logz.io
}
```

Note that the base url includes a 2-letter region code that differs depending on where your Logz.io account is hosted. See [this page](https://docs.logz.io/user-guide/accounts/account-region.html) for further information. The default base_url is `api.logz.io` for accounts hosted by US East (Northern Virginia).

Replace {var.api_token} with the API token of your account. Note that every log account, including sub accounts, has its own set of dedicated API tokens.

Here's an example for the provider parameters:

```
provider "logzio" {
  api_token = "${f0ce8690-06ea-5dab-aa4f-5016555aebb1}"
  base_url = "${https://api-au.logz.io}"
}
```

### Example - Create Slack notification endpoint

It is very easy to get up and running quickly with Logz.io's Terroafrom Provider.

This example will create a Logz.io Slack notification endpoint for an existing alert. This example assumes you have an alert that will trigger whenever Logz.io records 10 loglevel:ERROR messages in 5 minutes.

If you want to try out this example, you will need to fill in the specifics for your account, and provide your Logz.io API token and base_url.

```
provider "logzio" {
  api_token = "${var.api_token}"
}

resource "logzio_endpoint" "my_endpoint" {
  title = "my_endpoint"
  description = "hello"
  endpoint_type = "slack"
  slack {
    url = "${var.slack_url}"
  }
}

resource "logzio_alert" "my_alert" {
  title = "my_other_title"
  query_string = "loglevel:ERROR"
  operation = "GREATER_THAN"
  notification_emails = []
  search_timeframe_minutes = 5
  value_aggregation_type = "NONE"
  alert_notification_endpoints = ["${logzio_endpoint.my_endpoint.id}"]
  suppress_notifications_minutes = 5
  severity_threshold_tiers {
      severity = "HIGH",
      threshold = 10
  }
}
```

### Example - Create user endpoint

```
variable "api_token" {
  type = "string"
  description = "Your logzio API token"
}

variable "account_id" {
  description = "The account ID where the new user will be created"
}

provider "logzio" {
  api_token = var.api_token
}

resource "logzio_user" "my_user" {
  username = "test.user@this.test"
  fullname = "test user"
  roles = [ 2 ]
  account_id = var.account_id
}
```