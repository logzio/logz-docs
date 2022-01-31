---
title: Sending traces from your browser using OpenTelemetry
logo:
  logofile: browser-logo.png
  orientation: vertical
data-source: Browser
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
{:.branching-tabs}

<!-- tab:start -->
<div id="overview">

Deploy this integration to send traces from your browser to Logz.io via the OpenTelemetry collector. 


</div>
<!-- tab:end -->


<!-- tab:start -->
<div id="local-host">

### Send traces from your browser to Logz.io using a locally hosted OpenTelemetry collector.

**Before you begin, you'll need**:

* An active account with Logz.io


<div class="tasklist">

##### Create a tracer file

In a dedicated directory, create a file called `tracer.js` and populate it with the following content:

```javascript
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const exporter = new OTLPTraceExporter({
 url: 'https://localhost:4318/v1/traces'
});
const provider = new WebTracerProvider({
 resource: new Resource({

   [SemanticResourceAttributes.SERVICE_NAME]: '<<YOUR-SERVICE-NAME>>',
 }),
});
provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register({
 contextManager: new ZoneContextManager()
});

registerInstrumentations({
 instrumentations: [
   getWebAutoInstrumentations({
     // load custom configuration for xml-http-request instrumentation
     '@opentelemetry/instrumentation-xml-http-request': {
       propagateTraceHeaderCorsUrls: [
           /.+/g,
         ],
     },
     // load custom configuration for fetch instrumentation
     '@opentelemetry/instrumentation-fetch': {
       propagateTraceHeaderCorsUrls: [
           /.+/g,
         ],
     },
   }),
 ],
});
```

* Replace `<<YOUR-SERVICE-NAME>>` with a required service name to identify your traces.

##### Download the required OpenTelemetry packages

Run the following command from the directory of the tracer file:
  
```shell
npm install --save @opentelemetry/api
npm install --save @opentelemetry/sdk-trace-web
npm install --save @opentelemetry/auto-instrumentations-web
npm install --save @opentelemetry/exporter-trace-otlp-http
npm install --save @opentelemetry/sdk-trace-base
npm install --save @opentelemetry/instrumentation
npm install --save @opentelemetry/context-zone
npm install --save @opentelemetry/instrumentation-document-load
```

##### Package the tracer file
  
Run the following command from the directory of the tracer file:

```shell
npx parcel tracer.js
```

##### Declare the tracer file in your browser

Add the following code to your browser, right before the body end tag:

```html
<script type="text/javascript" src="/dist/tracer.js" ></script>
```


##### Download and configure OpenTelemetry collector

Create a dedicated directory on your local host and download the **latest release** of the [OpenTelemetry collector](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/) that is relevant to the operating system of your host.

After downloading the collector, create a configuration file `config.yaml` with the following parameters:

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: "localhost:4318"
        cors:
          allowed_origins:
            - http://*

processors:
  batch:

exporters:
  logzio:
    account_token: "<<TRACING-SHIPPING-TOKEN>>"
    #region: "<<LOGZIO_ACCOUNT_REGION_CODE>>" - (Optional): Your logz.io account region code. Defaults to "us". Required only if your logz.io region is different than US East. https://docs.logz.io/user-guide/accounts/account-region.html#available-regions

service:
 pipelines:
   traces:
     receivers: [otlp]
     processors: [batch]
     exporters: [logzio]
```
{% include /tracing-shipping/replace-tracing-token.html %}


##### Start the collector

Run the following command:

```shell
<path/to>/otelcol-contrib --config ./config.yaml
```
* Replace `<path/to>` with the path to the directory where you downloaded the collector.



##### Check Logz.io for your traces

Give your traces some time to get from your system to ours, and then open [Tracing](https://app.logz.io/#/dashboard/jaeger).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
