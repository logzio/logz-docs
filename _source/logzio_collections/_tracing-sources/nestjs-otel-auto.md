---
title: Sending traces from NestJS applications via auto instrumentation with OpenTelemetry
logo:
  logofile: nest-logo.svg
  orientation: vertical
data-source: Automatic NestJS instrumentation
data-for-product-source: Tracing
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
* [Docker](#docker)
* [Kubernetes](#kubernetes)
* [Troubleshooting](#troubleshooting)
{:.branching-tabs} 

<!-- tab:start -->
<div id="overview">

{% include /general-shipping/agent-note.md %}


Deploy this integration to enable automatic instrumentation of your NestJS application using OpenTelemetry. 

### Architecture overview

This integration includes:

* Installing the OpenTelemetry NestJS instrumentation packages on your application host
* Installing the OpenTelemetry collector with Logz.io exporter
* Running your NestJS application in conjunction with the OpenTelemetry instrumentation

On deployment, the NestJS instrumentation automatically captures spans from your application and forwards them to the collector, which exports the data to your Logz.io account.

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">


### Setup auto-instrumentation for your locally hosted NestJS application and send traces to Logz.io

**Before you begin, you'll need**:

* A NestJS application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service. You will need it to identify the traces in Logz.io.

<!-- info-box-start:info -->
This integration uses OpenTelemetry Collector Contrib, not the OpenTelemetry Collector Core.
{:.info-box.note}
<!-- info-box-end -->


<div class="tasklist">


##### Download instrumentation packages

Run the following command from the application directory:

```shell
npm install --save @opentelemetry/api
npm install --save @opentelemetry/instrumentation
npm install --save @opentelemetry/tracing
npm install --save @opentelemetry/exporter-collector
npm install --save @opentelemetry/resources
npm install --save @opentelemetry/semantic-conventions
npm install --save @opentelemetry/auto-instrumentations-node
npm install --save @opentelemetry/sdk-node
```

##### Create a tracer file

In the directory of your application file, create a file named `tracer.ts` with the following configuration:

```javascript
"use strict";

const {
    BasicTracerProvider,
    ConsoleSpanExporter,
    SimpleSpanProcessor,
} = require("@opentelemetry/tracing");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const {
    SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const opentelemetry = require("@opentelemetry/sdk-node");
const {
    getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");


const exporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces"
});

const provider = new BasicTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]:
            "YOUR-SERVICE-NAME", // add the name of your service
    }),
});
// export spans to console (useful for debugging)
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
// export spans to opentelemetry collector
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register();
const sdk = new opentelemetry.NodeSDK({
    traceExporter: exporter,
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk
    .start()
    .then(() => {
        console.log("Tracing initialized");
    })
    .catch((error) => console.log("Error initializing tracing", error));

process.on("SIGTERM", () => {
    sdk
        .shutdown()
        .then(() => console.log("Tracing terminated"))
        .catch((error) => console.log("Error terminating tracing", error))
        .finally(() => process.exit(0));
});
	
```

##### Refer your application to the tracer file

Add the following to the function of your application code:

```javascript
require('<<PATH-TO-YOUR-FILE>>/tracer.ts');
```

Replace `<<PATH-TO-YOUR-FILE>>` with the path to your tracer file.


##### Download and configure OpenTelemetry collector

Create a dedicated directory on the host of your NestJS application and download the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector/releases/tag/v0.59.0) that is relevant to the operating system of your host.


After downloading the collector, create a configuration file `config.yaml` with the following parameters:

{% include /tracing-shipping/collector-config.md %}

{% include /tracing-shipping/replace-tracing-token.html %}


##### Start the collector

Run the following command from the directory of your application file:

```shell
<path/to>/otelcontribcol_<VERSION-NAME> --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.
* Replace `<VERSION-NAME>` with the version name of the collector applicable to your system, e.g. `otelcontribcol_darwin_amd64`.

##### Run the application

Run the following command from the application directory to generate traces:

```shell
npm run start
```


##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="docker">


### Setup auto-instrumentation for your NestJS application using Docker and send traces to Logz.io

This integration enables you to auto-instrument your NestJS application and run a containerized OpenTelemetry collector to send your traces to Logz.io. If your application also runs in a Docker container, make sure that both the application and collector containers are on the same network.

**Before you begin, you'll need**:

* A NestJS application without instrumentation
* An active account with Logz.io
* Port `4317` available on your host system
* A name defined for your tracing service. You will need it to identify the traces in Logz.io.

<div class="tasklist">


##### Download instrumentation packages

Run the following command from the application directory:

```shell
npm install --save @opentelemetry/api
npm install --save @opentelemetry/instrumentation
npm install --save @opentelemetry/tracing
npm install --save @opentelemetry/exporter-collector
npm install --save @opentelemetry/resources
npm install --save @opentelemetry/semantic-conventions
npm install --save @opentelemetry/auto-instrumentations-node
npm install --save @opentelemetry/sdk-node
```

##### Create a tracer file

In the directory of your application file, create a file named `tracer.ts` with the following configuration:

```javascript
"use strict";

const {
	BasicTracerProvider,
	ConsoleSpanExporter,
	SimpleSpanProcessor,
} = require("@opentelemetry/tracing");
const { CollectorTraceExporter } = require("@opentelemetry/exporter-collector");
const { Resource } = require("@opentelemetry/resources");
const {
	SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const opentelemetry = require("@opentelemetry/sdk-node");
const {
	getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const exporter = new CollectorTraceExporter({});

const provider = new BasicTracerProvider({
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]:
			"YOUR-SERVICE-NAME", // add the name of your service
	}),
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();
const sdk = new opentelemetry.NodeSDK({
	traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk
	.start()
	.then(() => {
		console.log("Tracing initialized");
	})
	.catch((error) => console.log("Error initializing tracing", error));

process.on("SIGTERM", () => {
	sdk
		.shutdown()
		.then(() => console.log("Tracing terminated"))
		.catch((error) => console.log("Error terminating tracing", error))
		.finally(() => process.exit(0));
});

```

##### Refer your application to the tracer file

Add the following to the function of your application code:

```javascript
require('<<PATH-TO-YOUR-FILE>>/tracer.ts');
```

Replace `<<PATH-TO-YOUR-FILE>>` with the path to your tracer file.


{% include tracing-shipping/docker.md %}
{% include /tracing-shipping/replace-tracing-token.html %}


##### Run the application

{% include /tracing-shipping/collector-run-note.md %}


Run the following command from the application directory to generate traces:

```shell
npm run start
```



##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="kubernetes">

### Overview

You can use a Helm chart to ship Traces to Logz.io via the OpenTelemetry collector. The Helm tool is used to manage packages of pre-configured Kubernetes resources that use charts.

**logzio-otel-traces** allows you to ship traces from your Kubernetes cluster to Logz.io with the OpenTelemetry collector.

<!-- info-box-start:info -->
This chart is a fork of the [opentelemtry-collector](https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector) Helm chart. The main repository for Logz.io helm charts are [logzio-helm](https://github.com/logzio/logzio-helm).
{:.info-box.note}
<!-- info-box-end -->

<!-- info-box-start:info -->
This integration uses OpenTelemetry Collector Contrib, not the OpenTelemetry Collector Core.
{:.info-box.note}
<!-- info-box-end -->

#### Standard configuration

<div class="tasklist">

##### Deploy the Helm chart
 
Add `logzio-helm` repo as follows:
 
```shell
helm repo add logzio-helm https://logzio.github.io/logzio-helm
helm repo update
```
	
##### Run the Helm deployment code

```
helm install  \
--set config.exporters.logzio.region=<<LOGZIO_ACCOUNT_REGION_CODE>> \
--set config.exporters.logzio.account_token=<<TRACING-SHIPPING-TOKEN>> \
logzio-otel-traces logzio-helm/logzio-otel-traces
```

{% include /tracing-shipping/replace-tracing-token.html %}
`<<LOGZIO_ACCOUNT_REGION_CODE>>` - Your Logz.io account region code. [Available regions](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions).

##### Define the logzio-otel-traces service dns

In most cases, the service dns will be `logzio-otel-traces.default.svc.cluster.local`, where `default` is the namespace where you deployed the helm chart and `svc.cluster.name` is your cluster domain name.
  
If you are not sure what your cluster domain name is, you can run the following command to look it up: 
  
```shell
kubectl run -it --image=k8s.gcr.io/e2e-test-images/jessie-dnsutils:1.3 --restart=Never shell -- \
sh -c 'nslookup kubernetes.default | grep Name | sed "s/Name:\skubernetes.default//"'
```
  
It will deploy a small pod that extracts your cluster domain name from your Kubernetes environment. You can remove this pod after it has returned the cluster domain name.
  

##### Download instrumentation packages

Run the following command from the application directory:

```shell
npm install --save @opentelemetry/api
npm install --save @opentelemetry/instrumentation
npm install --save @opentelemetry/tracing
npm install --save @opentelemetry/exporter-collector
npm install --save @opentelemetry/resources
npm install --save @opentelemetry/semantic-conventions
npm install --save @opentelemetry/auto-instrumentations-node
npm install --save @opentelemetry/sdk-node
```

##### Create a tracer file

In the directory of your application file, create a file named `tracer.ts` with the following configuration:

```javascript
"use strict";

const {
	BasicTracerProvider,
	ConsoleSpanExporter,
	SimpleSpanProcessor,
} = require("@opentelemetry/tracing");
const { CollectorTraceExporter } = require("@opentelemetry/exporter-collector");
const { Resource } = require("@opentelemetry/resources");
const {
	SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const opentelemetry = require("@opentelemetry/sdk-node");
const {
	getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const exporter = new CollectorTraceExporter({});

const provider = new BasicTracerProvider({
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]:
			"YOUR-SERVICE-NAME", // add the name of your service
	}),
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();
const sdk = new opentelemetry.NodeSDK({
	traceExporter: new opentelemetry.tracing.ConsoleSpanExporter(),
	instrumentations: [getNodeAutoInstrumentations()],
});

sdk
	.start()
	.then(() => {
		console.log("Tracing initialized");
	})
	.catch((error) => console.log("Error initializing tracing", error));

process.on("SIGTERM", () => {
	sdk
		.shutdown()
		.then(() => console.log("Tracing terminated"))
		.catch((error) => console.log("Error terminating tracing", error))
		.finally(() => process.exit(0));
});

```

##### Refer your application to the tracer file

Add the following to the function of your application code:

```javascript
require('<<PATH-TO-YOUR-FILE>>/tracer.ts');
```

Replace `<<PATH-TO-YOUR-FILE>>` with the path to your tracer file.



##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, then open [Logz.io](https://app.logz.io/).

</div>

####  Customizing Helm chart parameters

##### Configure customization options

You can use the following options to update the Helm chart parameters: 

* Specify parameters using the `--set key=value[,key=value]` argument to `helm install`.

* Edit the `values.yaml`.

* Overide default values with your own `my_values.yaml` and apply it in the `helm install` command. 

###### Example

```
helm install logzio-otel-traces logzio-helm/logzio-otel-traces -f my_values.yaml 
```

#### Uninstalling the Chart

The uninstall command is used to remove all the Kubernetes components associated with the chart and to delete the release.  

To uninstall the `logzio-otel-traces` deployment, use the following command:

```shell
helm uninstall logzio-otel-traces
```

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="troubleshooting">

{% include /tracing-shipping/otel-troubleshooting.md %}

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->