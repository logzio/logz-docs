---
title: Ship traces with Zipkin
logo:
  logofile: zipkin.svg
  orientation: vertical
data-source: Zipkin
templates: ["no-template"]
description: Here's how you can use Logz.io as data storage for Zipkin traces.
sitemap: false
open-source:
  - title: Zipkin-Logz.io Trace Storage
    github-repo: zipkin-logzio
contributors:
  - yyyogev
  - imnotashrimp
shipping-tags:
  - traces
---

Zipkin-Logz.io Trace Storage is a storage option for Zipkin distributed traces on your Logz.io account.
It functions as both a collector and a span store.

This integration requires Logz.io API access.
The Logz.io API is available for Pro and Enterprise accounts.
{:.info-box.note}

### Limitations

When you use the Zipkin UI to find traces stored in Logz.io, there are a couple limitations.
For most users, these won't be an issue, but they're still good to know:

* **Lookback** must be 2 days or less
* **Limit** must be 1000 traces or less

#### To integrate Zipkin server and Logz.io

<div class="tasklist">

##### Download Zipkin server and Zipkin-Logz.io Trace Storage

Download Zipkin server.

```shell
curl -sSL https://zipkin.io/quickstart.sh | bash -s
```

Download the latest Zipkin-Logz.io Trace Storage jar to the same directory.

```shell
curl -sSL https://jitpack.io/com/github/logzio/zipkin-logzio/zipkin-autoconfigure-storage-logzio/master-SNAPSHOT/zipkin-autoconfigure-storage-logzio-master-SNAPSHOT-module.jar > logzio.jar
```

##### Run Zipkin server with the Logz.io extension

You can configure the Logz.io extension with shell variables or environment variables.

For a complete list of options, see the parameters below the code block.👇

```bash
STORAGE_TYPE=logzio \
LOGZIO_ACCOUNT_TOKEN=<<SHIPPING-TOKEN>> \
LOGZIO_LISTENER_HOST=<<LISTENER-HOST>> \
LOGZIO_API_TOKEN=<<API-TOKEN>> \
LOGZIO_API_HOST=<<API-URL>> \
java -Dloader.path='zipkin-logzio.jar,zipkin-logzio.jar!lib' -Dspring.profiles.active=logzio -cp zipkin.jar org.springframework.boot.loader.PropertiesLauncher
```

  You can optionally run two discrete Zipkin-Logzio Trace Storage instances if you want to separate shipping and reading of your traces. \\
  \\
  If you do, then the required fields change a bit from what's shown in the Parameters list: \\
  • The **shipping instance** uses `STORAGE_TYPE=logzio`, `LOGZIO_ACCOUNT_TOKEN`, and `LOGZIO_LISTENER_HOST`. \\
  • The **reading instance** uses `STORAGE_TYPE=logzio`, `LOGZIO_API_TOKEN`, and `LOGZIO_API_HOST`.
  {:.info-box.tip}

###### Parameters

| Parameter | Description |
|---|---|
| STORAGE_TYPE=logzio (Required) | We wish there was a way to include this as a default. Alas, Zipkin requires it, so you'll need to include this bit. |
| LOGZIO_ACCOUNT_TOKEN (Required) | Required when using as a collector to ship logs to Logz.io. {% include log-shipping/log-shipping-token.html %} |
| LOGZIO_API_TOKEN (Required) | Required to read back traces from Logz.io. <br> Replace `<<API-TOKEN>>` with an [API token](https://app.logz.io/#/dashboard/settings/manage-tokens/api) from the account you want to use. |
| LOGZIO_LISTENER_HOST <span class="default-param">`listener.logz.io`</span> | {% include log-shipping/listener-var.html %} |
| LOGZIO_API_HOST <span class="default-param">`api.logz.io`</span> | Required to read back spans from Logz.io. <br> Replace `<<API-URL>>` with your region's base API URL. For more information on finding your account's region, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| STRICT_TRACE_ID <span class="default-param">`true`</span> | Use `false` if your version of Zipkin server generates 64-bit trace IDs (version 1.14 or lower). If `false`, spans are grouped by the rightmost 16 characters of the trace ID. For version 1.15 or later, we recommend leaving the default. |
| SENDER_DRAIN_INTERVAL <span class="default-param">`5`</span> | Time interval, in seconds, to send the traces accumulated on the disk. |
| CLEAN_SENT_TRACES_INTERVAL <span class="default-param">`30`</span> | Time interval, in seconds, to clean sent traces from the disk. |
{:.paramlist}

##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open your Zipkin UI.

</div>