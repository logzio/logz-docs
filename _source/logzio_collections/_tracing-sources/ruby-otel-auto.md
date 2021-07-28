---
title: Sending traces from Ruby applications via auto instrumentation with OpenTelemetry
logo:
  logofile: ruby.svg
  orientation: vertical
data-source: Automatic Ruby instrumentation
templates: ["network-device-filebeat"]
contributors:
  - nshishkin
shipping-tags:
  - new-instrumentation
order: 1380
---

<!-- tabContainer:start -->
<div class="branching-container">

* [Overview](#overview)
* [Local host](#local-host)
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to enable automatic instrumentation of your Ruby application using OpenTelemetry.

### Architecture overview

This integration includes:

* Installing the OpenTelemetry Ruby instrumentation packages on your application host
* Installing the OpenTelemetry collector with Logz.io exporter
* Running your Ruby application in conjunction with the OpenTelemetry instrumentation

On deployment, the Ruby instrumentation automatically captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">


### Setup auto-instrumentation for your locally hosted Ruby application and send traces to Logz.io

**Before you begin, you'll need**:

* A Ruby application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service


<div class="tasklist">


##### Download instrumentation packages

Run the following command from the application directory:

```shell
gem install opentelemetry-sdk
gem install opentelemetry-exporter-otlp
gem install opentelemetry-instrumentation-all
```

##### Enable instrumentation in the code

Add the following configuration to the `Gemfile`:

```ruby
require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'
require 'rubygems'
require 'bundler/setup'
```

Add the following configuration to the application file:

```ruby
Bundler.require

OpenTelemetry::SDK.configure do |c|
 c.service_name = '<YOUR-SERVICE-NAME>'
 c.use_all
end
```

Replace `<YOUR-SERVICE-NAME>` with the name of your tracing service defined earlier.


##### Install the Bundler

Run the following command:

```shell

bundle install

```

##### Configure data exporter

Run the following command:

```shell

export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:55681

```

##### Download and configure OpenTelemetry collector

<!-- info-box-start:info -->
**Known Issue, June 2021**: OpenTelemetry collector version 0.24 and above does not function as expected when deployed with the Logz.io exporter. To remediate this issue, if you’re currently using version 0.24 or above, replace your  OpenTelemetry collector with version 0.23 or lower.
The resolution for this issue is in development.
{:.info-box.important}
<!-- info-box-end -->

Create a dedicated directory on the host of your Ruby application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.23.0) that is relevant to the operating system of your host.


After downloading the collector, create a configuration file `config.yaml` with the following parameters:

{% include /tracing-shipping/collector-config.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Start the collector

Run the following command:

```shell
<path/to>/otelcontribcol_<VERSION-NAME> --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.
* Replace `<VERSION-NAME>` with the version name of the collector applicable to your system, e.g. `otelcontribcol_darwin_amd64`.

##### Run the application

Run the application:

```shell

ruby <NAME-OF-YOUR-APPLICATION-FILE>.rb

```

<!-- info-box-start:info -->
When running the application, you may receive an error message regarding a package missing from the application code. This is normal, as the opentelemetry-instrumentation-all searches for all Ruby packages by default.
{:.info-box.note}
<!-- info-box-end -->


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
