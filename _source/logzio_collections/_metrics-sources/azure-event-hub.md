---
title: Ship Azure Event Hub metrics
logo:
  logofile: azure-event-hubs.svg
  orientation: vertical
data-source: Azure Event hub
contributors:
  - yotamloe
  - shalper
  - imnotashrimp
shipping-tags:
  - azure
order: 770
---
#### NEW BUTTON
456
<!-- logzio-inject:install:grafana:dashboards ids=['4Tk1cgkBEnyrOjTuhKILto','4F0PJis1p02ZyMtuMflYyo'] -->

You can ship Azure Event Hub metrics using Metricbeat to monitor your Azure services.
First, you'll need to configure your services
to send their metrics to Azure Monitor.
Next, you'll configure Metricbeat
to collect metrics from Azure Event Hub
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
az account show | grep '"id"\\|"tenantId"'
```

The response shows the subscription ID (the `id` field)
and tenant ID (the `tenantId` field).
You'll need this information later on, so paste it in your text editor.

###### sample response

```shell
"id": "b3a47bd3-5197-58c2-aeb0-c8c65de8765e",
"tenantId": "22a49a95-4cac-573d-903e-b8915fdce438",
```

##### Create a new Azure AD application

The Metricbeat configuration needs to include credentials for an AD application with reader permissions.

If you don't already have an AD application with reader permissions,
run this command to create one.
Replace `<<SUBSCRIPTION-ID>>` with the `id` value from step 2:

```shell
az ad sp create-for-rbac --role reader \\
--scopes /subscriptions/<<SUBSCRIPTION-ID>> \\
-n logzio-metricbeat \\
| grep '"appId"\\|"password"'
```

The response shows the client ID (the `appId` field)
and client secret (the `password` field).
You'll need this information later on, so paste it in your text editor.

###### sample response

```shell
"appId": "5928684d-ce1f-55e5-b7f0-1b161c982109",
"password": "85a75902-e75a-5b55-9142-bbb317e0eb5a",
```

{% include metric-shipping/certificate.md %}

##### (_Optional_) Disable the system module

By default, Metricbeat ships system metrics from its host.
Disable this module so you don't unintentionally send host metrics.

```
sudo metricbeat modules disable system
```

##### Add Logz.io configuration

Now you'll set up the Metricbeat
to collect metrics from Azure Event hub.

You'll need to replace the values surrounded by angle brackets
`<< >>`
using the parameters below the code block. 👇

```yml
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
  refresh_list_interval: 600s
  resources:
    # 👇 Duplicate this code block for each resource type whose metrics you want to ship.
    - resource_query: "resourceType eq 'Microsoft.EventHub/namespaces'"
      metrics:
      - name: ["*"]
        namespace: "Microsoft.EventHub/namespaces"

fields:
  logzio_codec: json
  token: <<METRICS-SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: metrics
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

{% include metric-shipping/azure-params.md %}

{:.paramlist}

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

{% include metric-shipping/open-dashboard.md title="Azure Event hubs monitor" %}


</div>
