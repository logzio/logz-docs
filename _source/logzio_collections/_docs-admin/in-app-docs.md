---
layout: article
title: Pulling log shipping docs into the app
---

## Manifest

[Manifest file for this deploy]({{site.baseurl}}/data/shipping-manifest.json)

<!-- tabContainer:start -->
<div class="branching-container">

* [Tabs](#tabs)
* [paramlists](#paramlists)
* [tasklists](#tasklists)
* [Info boxes](#info-boxes)
* [Accordions](#accordions)
{:.branching-tabs}

<!-- tab:start -->
<div id="tabs">

## Tabs

Tabs come in 3 parts:

* A container (uses `.branching-container` class)
* The list of tabs (uses `.branching-tabs` class). Each list item is a link to a tab's `div`.
* Each tab is a separate `div` with an id from the tab list.

### Some regex that works

`^(\*.+\n)+{:.branching-tabs}` captures the tab list.

### Sample

```html
<!-- tabContainer:start -->
<div class="branching-container">

* [Tab 1 config <span class="sm ital">(recommended)</span>](#tab-1-config)
* [Tab 2 config](#tab-2-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="tab-1-config">

## Tab 1 content

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="tab-2-config">

## Tab 2 content

</div>
<!-- tab:end -->


</div>
<!-- tabContainer:end -->
```

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="paramlists">

## paramlists

Paramlists are two-column `.paramlist` tables.

* `thead` is there so I can easily copy to GitHub without having to think about it.
  The CSS should be written so `thead` isn't displayed.
* CSS should render the table as a list, where the second column is indented below the first column.
  This way, the list works on smaller viewports.
* Line breaks use `br` tags.
* Required params are empty `.required-param` spans.
  CSS renders with "Required".
* Default params use `.default-param` class.
  CSS renders with "Default:".

### Sample

```md
###### Parameters

| Parameter | Description |
|---|---|
| token (Required) | Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). <br> {% include log-shipping/replace-vars.html token=true %} <br> Begin with `$` to use an environment variable or system property with the specified name. <br> For example, `$LOGZIO_TOKEN` uses the LOGZIO_TOKEN environment variable. |
| logzioUrl <span class="default-param">`https://listener.logz.io:8071`</span> | Listener URL and port. <br> {% include log-shipping/listener-var.html %}  |
{:.paramlist}
```

### Output

###### Parameters

| Parameter | Description |
|---|---|
| token (Required) | Your Logz.io [account token](https://app.logz.io/#/dashboard/settings/general). <br> {% include log-shipping/replace-vars.html token=true %} <br> Begin with `$` to use an environment variable or system property with the specified name. <br> For example, `$LOGZIO_TOKEN` uses the LOGZIO_TOKEN environment variable. |
| logzioUrl <span class="default-param">`https://listener.logz.io:8071`</span> | Listener URL and port. <br> {% include log-shipping/listener-var.html %}  |
{:.paramlist}


</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="tasklists">

## tasklists

Anatomy of a tasklist:

* Always introduced with `h4`
* Prereqs are a single paragraph, starting with `**Before you begin, you'll need**:`
* The steps themselves are inside a `.tasklist` div.
* Each step starts with a `h5` headline. CSS should render this with a number.
* The body of each step is indented to align with the heading.
* Subheads within steps are `h6`.

### Sample

```md
#### Configuration

**Before you begin, you'll need**:
`s3:ListBucket` and `s3:GetObject` [permissions](https://docs.logz.io/user-guide/give-aws-access-with-iam-roles/) for the required S3 bucket

<div class="tasklist">

##### Send your logs to an S3 bucket

Logz.io fetches your CloudTrail logs from an S3 bucket.

For help with setting up a new trail, see [Overview for Creating a Trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) from AWS.

##### Add the S3 bucket information

{% include log-shipping/in-app-configuration.html toolId="s3-config" %}

<!-- logzio-inject:s3-config -->

Logz.io fetches logs that are generated after configuring an S3 bucket.
Past logs are not sent to Logz.io.
{:.info-box.important}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [OpenSearch Dashboards](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
```

### Output

#### Configuration

**Before you begin, you'll need**:
`s3:ListBucket` and `s3:GetObject` [permissions](https://docs.logz.io/user-guide/give-aws-access-with-iam-roles/) for the required S3 bucket

<div class="tasklist">

##### Send your logs to an S3 bucket

Logz.io fetches your CloudTrail logs from an S3 bucket.

For help with setting up a new trail, see [Overview for Creating a Trail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html) from AWS.

##### Add the S3 bucket information

{% include log-shipping/in-app-configuration.html toolId="s3-config" %}

<!-- logzio-inject:s3-config -->

Logz.io fetches logs that are generated after configuring an S3 bucket.
Past logs are not sent to Logz.io.
{:.info-box.important}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [OpenSearch Dashboards](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="info-boxes">

## Info boxes

Info boxes are `.info-box` div with one additional class:

* Note (`.note`)
* Important note (`.important`)
* Warning (`.warning`)
* Pro tip (`.tip`)
* Read more (`.read`)

CSS handles heading styling.

### Note

```md
This is a note.
{:.info-box.note}
```

This is a note.
{:.info-box.note}

### Important note

```md
This is an important note.
{:.info-box.important}
```

This is an important note.
{:.info-box.important}

### Warning

```md
This is a warning.
{:.info-box.warning}
```

This is a warning.
{:.info-box.warning}

### Pro tip

```md
This is a tip.
{:.info-box.tip}
```

This is a tip.
{:.info-box.tip}

### Read more

```md
This is an invitation to read more.
{:.info-box.read}
```

This is an invitation to read more.
{:.info-box.read}

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="accordions">

## Accordions

Accordions use the native `details` and `summary` tags.

### Sample

```md
<details>

<summary>
Configuration tl;dr
</summary>

| Item | Description |
|---|---|
| Files | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br> [Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt) |
| Log type _\(for preconfigured parsing\)_ | `apache`, `apache_access`, or `apache-access`|
{:.paramlist}

</details>
```

### Output

<details>

<summary>
Configuration tl;dr
</summary>

| Item | Description |
|---|---|
| Files | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br> [Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt) |
| Log type _\(for preconfigured parsing\)_ | `apache`, `apache_access`, or `apache-access`|
{:.paramlist}

</details>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->