---
layout: article
title: PCI compliance and log redaction
permalink: /user-guide/accounts/pci-compliance.html
flags:
  admin: true
  logzio-plan: enterprise
tags:
  - accounts
contributors:
  - shalper
---

Minimize the risk of exposing sensitive customer data with Logz.io's log redaction function and benefit from a logging management solution that offers
automated sensitive-data scrubbing.

Event logs are no exception when it comes to PCI compliance and Logz.io makes it simpler to prevent logging vulnerabilities and minimize the possibility of data breaches in your raw log files.
Best practice is always to mask or redact sensitive information before writing it to the logs, but Logz.io PCI compliance offers an extra layer of protection that can scrutinize your logs for sensitive PPI such as customer credit card data. 

If enabled, Logz.io PCI compliance runs a regex pattern on select fields in your logs in search of matches and scrubs them of any sensitive customer data before they are indexed by Logz.io. The process occurs before the data is indexed in Elasticsearch and does not affect data archiving.

Logz.io's PCI compliance solution is compatible with all levels,
including the most stringent PCI level 1 requirements.

For more information on PCI compliance and DDS (Data Security Standard), see the PCI Security Standards Council's [resources](https://www.pcisecuritystandards.org/).
{:.info-box.read}

#### To enable PCI compliance

<div class="tasklist">

##### Select an account

You can control PCI compliance from [**<i class="li li-gear"></i> > Settings > General**](https://app.logz.io/#/dashboard/settings/general) in the navigation menu.

![Account settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/pci-activate.png)


If you have more than one account or a combination of sub accounts, you'll need to repeat this process for each of them.

##### Request activation and accept the terms

Once you accept the legal terms and click `activate`, Logz.io Support will be automatically notified and your ticket will be created.

![Account settings](https://dytvr9ot2sszz.cloudfront.net/logz-docs/accounts/pci.png)

##### Vetting the regex pattern

Support will get in touch to process your request. You'll be asked to submit an appropriate regex pattern and specify which fields to apply it to.

Logz.io Support will test the regex expression to verify that it doesn't interfere with the account’s normal operation and log ingestion. This might take several iterations.

Logiz.io Support cannot intervene with the creation of the appropriate regex pattern for reasons of liability.
{:.info-box.note}

##### Activate/Deactivate PCI compliance

Once the regex pattern is approved, the changes will be applied to your data parsing patterns and take effect on your account.

You can deactivate PCI compliance at any time. Go to [**<i class="li li-gear"></i> > Settings > General**](https://app.logz.io/#/dashboard/settings/general) in the navigation menu and click `deactivate`.

</div>
