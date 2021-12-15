---
title: Ship traces with Jaeger
logo:
  logofile: jaeger.svg
  orientation: vertical
data-source: Jaeger
description: Here's how you can use Logz.io as data storage for Jaeger traces.
sitemap: false
open-source:
  - title: Jaeger-Logz.io Trace Storage
    github-repo: jaeger-logzio
contributors:
  - imnotashrimp
  - yyyogev
shipping-tags:
  - traces
---

Jaeger-Logz.io is a storage option for Jaeger.
It allows Jaeger to store distributed traces on your Logz.io account.

This integration requires Logz.io API access.
The Logz.io API is available for Pro and Enterprise accounts.
{:.info-box.note}

### Limitations

When you use the Jaeger UI to find traces stored in Logz.io,
there are a couple limitations.
For most users, these won't be an issue,
but they're still good to know:

* **Lookback** must be 48 hours or less
* **Limit Results** must be 1000 traces or less

<!-- tabContainer:start -->
<div class="branching-container">

* [Deploy a single container](#single-container-config)
* [Deploy separate containers](#separate-containers-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="single-container-config">

These instructions cover deployment
of all the necessary pieces
(Jaeger agent, collector, and query service)
in a single, all-in-one Docker container.

#### Deploy everything in a single container

<div class="tasklist">

##### Create a Docker network

```shell
docker network create net-logzio
```

##### Run the container

You can configure the Logz.io extension with shell variables or environment variables.

For a complete list of options, see the parameters below the code block. 👇

```shell
docker run -d \
  -e ACCOUNT_TOKEN=<<SHIPPING-TOKEN>> \
  -e API_TOKEN=<<API-TOKEN>> \
  --name=jaeger-logzio \
  --network=net-logzio \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 9411:9411 \
logzio/jaeger-logzio:latest
```

###### Environment variables

| Parameter | Description |
|---|---|
| ACCOUNT_TOKEN (Required) | Required when using as a collector to ship traces to Logz.io. <br> {% include log-shipping/replace-vars.html token=true %} |
| API_TOKEN (Required) | Required to read back traces from Logz.io. <br> Replace `<<API-TOKEN>>` with an [API token](https://app.logz.io/#/dashboard/settings/manage-tokens/api) from the account you want to use. |
| REGION <span class="default-param">_Blank (US East)_</span> | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to) and API URL. <br> You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. |
| GRPC_STORAGE_PLUGIN_LOG_LEVEL <span class="default-param">`warn`</span> | The lowest log level to send. From lowest to highest, log levels are `trace`, `debug`, `info`, `warn`, `error`. <br> Controls logging for Jaeger Logz.io Collector only (not Jaeger components). |
| COLLECTOR_ZIPKIN_HTTP_PORT | If you're using a Zipkin implementation to create traces, set this environment variable to the HTTP port for the Zipkin collector service. |
{:.paramlist}

##### Check Jaeger for your traces

Give your traces some time to get from your system to ours,
and then open your Jaeger UI.

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="separate-containers-config">

These instructions cover deployment
of all the necessary pieces
(Jaeger agent, collector, and query service)
in separate containers.

#### Deploy Jaeger components in separate containers

<div class="tasklist">

##### Create a Docker network

```shell
docker network create net-logzio
```

##### Run Jaeger Logz.io Collector

You can configure the Logz.io extension with shell variables or environment variables.

For a complete list of options, see the parameters below the code block. 👇

```shell
docker run -e ACCOUNT_TOKEN=<<SHIPPING-TOKEN>> \
  --network=net-logzio \
  --name=jaeger-logzio-collector \
  -p 14268:14268 \
  -p 9411:9411 \
  -p 14267:14267 \
  -p 14269:14269 \
  -p 14250:14250 \
logzio/jaeger-logzio-collector:latest
```

###### Environment variables

| Parameter | Description |
|---|---|
| ACCOUNT_TOKEN (Required) | Required when using as a collector to ship traces to Logz.io. <br> {% include log-shipping/replace-vars.html token=true %} |
| REGION <span class="default-param">_Blank (US East)_</span> | Two-letter region code, or blank for US East (Northern Virginia). This determines your listener URL (where you're shipping the logs to). <br> You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. |
| GRPC_STORAGE_PLUGIN_LOG_LEVEL	<span class="default-param">`warn`</span> | The lowest log level to send. From lowest to highest, log levels are `trace`, `debug`, `info`, `warn`, `error`. <br> Controls logging for Jaeger Logz.io Collector only (not Jaeger components). |
| COLLECTOR_ZIPKIN_HTTP_PORT | If you're using a Zipkin implementation to create traces, set this environment variable to the HTTP port for the Zipkin collector service. |
{:.paramlist}

##### Run Jaeger query

```shell
docker run --rm -e API_TOKEN=<<API-TOKEN>> \
  --network=net-logzio \
  -p 16686:16686 \
  -p 16687:16687 \
  --name=jaeger-logzio-query \
logzio/jaeger-logzio-query:latest
```

###### Environment variables

| Parameter | Description |
|---|---|
| API_TOKEN	(Required) | Required to read back traces from Logz.io. <br> Replace `<<API-TOKEN>>` with an [API token](https://app.logz.io/#/dashboard/settings/manage-tokens/api) from the account you want to use. |
| REGION <span class="default-param">_Blank (US East)_</span> | Two-letter region code, or blank for US East (Northern Virginia). This determines your API URL. <br> You can find your region code in the [Regions and URLs](https://docs.logz.io/user-guide/accounts/account-region.html#regions-and-urls) table. |
| GRPC_STORAGE_PLUGIN_LOG_LEVEL <span class="default-param">`warn`</span> | The lowest log level to send. From lowest to highest, log levels are `trace`, `debug`, `info`, `warn`, `error`. <br> Controls logging for Jaeger Logz.io Collector only (not Jaeger components). |
{:.paramlist}

##### _(If needed)_ Run Jaeger agent

You can run your own instance of Jaeger agent.
If you're not already running Jaeger agent,
start it up with this command:

```shell
docker run --rm --name=jaeger-agent --network=net-logzio \
  -p5775:5775/udp \
  -p6831:6831/udp \
  -p6832:6832/udp \
  -p5778:5778/tcp \
  jaegertracing/jaeger-agent:latest \
  --reporter.tchannel.host-port=jaeger-logzio-collector:14267
```

##### Check Jaeger for your traces

Give your traces some time to get from your system to ours,
and then open your Jaeger UI.

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
