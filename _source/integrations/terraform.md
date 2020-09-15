---
layout: article
title: Terraform Logz.io Provider
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

The Logz.io provider for Terraform offers a great way to build integrations using Logz.io APIs.

Terraform is an infrastructure orchestrator written in Hashicorp Language (HCL). It is a popular Infrastructure-as-Code (IaC) tool that does away with manual configuration processes. You can take advantage of the Terraform Logz.io provider to really streamline the process of integrating observability into your dev workflows.

This guide assumes working knowledge of HashiCorp Terraform. We have a great blog [introduction to Terraform](https://logz.io/blog/terraform-vs-ansible-vs-puppet/) if you're in for one. We also recommend the official [Terraform guides and tutorials](https://www.terraform.io/guides/index.html) for general guidelines.

### 




You can use Terraform to run any of the following Logz.io API endpoints. All CRUD (CRUD stands for Create, Read, Update, Delete) operations are supported:

* [User management](https://docs.logz.io/api/#tag/Manage-users)
* [Notification channels](https://docs.logz.io/api/#tag/Manage-notification-endpoints)
* [Log-based alerts](https://github.com/logzio/public-api/tree/master/alerts)
* [Sub accounts](https://docs.logz.io/api/#tag/Manage-sub-accounts)

#### Working with Terraform

<div class="tasklist">

**Before you begin, you'll need**:

* [Terrafrom CLI](https://learn.hashicorp.com/tutorials/terraform/install-cli)
* [Logz.io API token]()

##### Get the Terraform provider

The easiest way to get the provider and the JetBrains IDE HCL meta-data is to run the script provided in our [GitHub repo](https://github.com/logzio/logzio_terraform_provider/blob/master/scripts/update_plugin.sh). It is found under `./scripts/update_plugin.sh`.

```bash
./scripts/build.sh
```

If you have a need to update the version, edit the variable: `PROVIDER_VERSION`. Otherwise, run the script as is.


##### Using the provider

The Terraform provider works with any of the supported Logz.io endpoints listed above.

```bash
provider "logzio" {
  api_token = "${var.api_token}"
  region= "${var.your_api_region}" #e.g. https://api-au.logz.io
}
```

The region variable is needed if your account is hosted anywhere other than Note that the base url includes a 2-letter region code that differs depending on where your Logz.io account is hosted. See [this page](https://docs.logz.io/user-guide/accounts/account-region.html) for further information. The default base_url is `api.logz.io` for accounts hosted by US East (Northern Virginia).

Replace {var.api_token} with the API token of your account. Note that every log account, including sub accounts, has its own set of dedicated API tokens.



### Example - Create Slack notification endpoint

It is very easy to get up and running quickly with Logz.io's Terroafrom Provider.

This example adds a Slack notification for an existing alert. This example assumes you have an alert that will trigger whenever Logz.io records 10 loglevel:ERROR messages in 10 minutes.


If you want to try out this example, you will need to first fill in the specifics for your account, including and provide your Logz.io API token and base_url.

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
  search_timeframe_minutes = 10
  value_aggregation_type = "NONE"
  alert_notification_endpoints = ["${logzio_endpoint.my_endpoint.id}"]
  suppress_notifications_minutes = 30
  severity_threshold_tiers {
      severity = "HIGH",
      threshold = 10
  }
}
```

### Example - Create user

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
  region = var.region
}

resource "logzio_user" "my_user" {
  username = "user_name@fun.io"
  fullname = "John Doe"
  roles = [ 2 ]
  account_id = var.account_id
}
```

You'll run the above plan using this bash script:
First replace the variables with your specifics: ${LOGZIO_API_TOKEN},

```
export TF_LOG=DEBUG
terraform init
TF_VAR_api_token=${LOGZIO_API_TOKEN} TF_VAR_region=${LOGZIO_REGION} terraform plan -out terraform.plan
terraform apply terraform.plan
```