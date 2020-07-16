---
title: Ship metrics using Azure Monitor
logo:
  logofile: azure-monitor.svg
  orientation: vertical
data-source: Azure Monitor
templates: ["no-template"]
contributors:
  - imnotashrimp
  - yotamloe
shipping-tags:
  - azure
---

To monitor your Azure service metrics,
we recommend configuring your services
to send their metrics to Azure Monitor.
When you set up Metricbeat using the configuration on this page,
Metricbeat will collect metrics from Azure Monitor
and forward them to Logz.io.

#### Metricbeat setup

{% include metric-shipping/azure-services-requirements.html %}

<div class="tasklist">

##### Log in to Azure with the CLI

Run this command in the command line:

```shell
az login
```

To complete the process, sign in through your browser.

##### Get your subscription details

Run this command:

```shell
az account show | grep '"id"\|"tenantId"'
```

The response shows the subscription ID (the `id` field)
and tenant ID (the `tenantId` field).
You'll need this information later on, so paste it in your text editor.

###### Sample response

```shell
"id": "d94b1fba-0289-557e-b063-0b6bfc1bdca0",
"tenantId": "9ae0715a-0689-56e8-bb88-2b22f1fa7299",
```

##### Create a new Azure AD application

The Metricbeat configuration needs to include credentials for an AD application with reader permissions.

If you don't already have an AD application with reader permissions,
run this command to create one.
Replace `<<SUBSCRIPTION-ID>>` with the `id` value from step 2:

```shell
az ad sp create-for-rbac --role reader \
--scopes /subscriptions/<<SUBSCRIPTION-ID>> \
-n logzio-metricbeat \
| grep '"appId"\|"password"'
```

The response shows the client ID (the `appId` field)
and client secret (the `password` field).
You'll need this information later on, so paste it in your text editor.

###### Sample response

```shell
"appId": "3dcdf53e-f93f-5902-8df2-235c8635aa4d",
"password": "e6ab6d24-4907-5d11-a132-a171ef55355d",
```

##### Download the Logz.io public certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.
You'll need to run this command on the server that hosts Metricbeat:

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

##### _(Optional)_ Disable the system module

By default, Metricbeat ships system metrics from its host.
Disable this module so you don't unintentionally send host metrics:

```shell
sudo metricbeat modules disable system
```

##### Add Logz.io configuration

Now you'll set up the Metricbeat
to collect metrics from Azure Monitor.

You'll need to replace the values surrounded by angle brackets
`<< >>`
using the parameters below the code block. 👇

```yaml
metricbeat.modules:
- module: azure
  metricsets:
  - monitor
  enabled: true
  period: 300s
  client_id: '${AZURE_CLIENT_ID:"<<CLIENT-ID>>"}' # `appId` from step 3
  client_secret: '${AZURE_CLIENT_SECRET:"<<CLIENT-SECRET>>"}' # `password` from step 3
  tenant_id: '${AZURE_TENANT_ID:"<<TENANT-ID>>"}' # `tenantId` from step 2
  subscription_id: '${AZURE_SUBSCRIPTION_ID:"<<SUBSCRIPTION-ID>>"}' # `id` from step 2
  resources:
    # 👇 Duplicate this code block for each resource whose metrics you want to ship.
    - resource_query: "resourceType eq '<<RESOURCE-TYPE>>'"
      metrics:
      - name: ["*"]
        namespace: "<<RESOURCE-TYPE>>"

fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: metrics
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

###### Parameters

| Parameter | Description |
|---|---|
| client_id | Azure client ID. Replace `<<CLIENT-ID>>` with the `appId` value from step 3. |
| client_secret | Azure client secret. Replace `<<CLIENT-SECRET>>` with the `password` value from step 3. |
| tenant_id | Azure tenant ID. Replace `<<TENANT-ID>>` with `tenantId` from step 2. |
| subscription_id | Azure subscription ID. Replace `<<SUBSCRIPTION-ID>>` with `id` from step 2. |
| resources _and_ namespace | Replace `<<RESOURCE-TYPE>>` with the Azure services you want to monitor. You can find these values in the _Resource type_ column in [_Metrics and Dimensions Supported_](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/alerts-metric-near-real-time#metrics-and-dimensions-supported) from Microsoft. |
| fields.token | {% include metric-shipping/replace-metrics-token.html %} |
| output.logstash.hosts | {% include log-shipping/replace-vars.html listener=true %} |

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.html title="Azure Monitor" %}


</div>
