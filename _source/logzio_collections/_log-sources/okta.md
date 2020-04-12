---
title: Ship Okta logs
logo:
  logofile: okta.png
  orientation: vertical
data-source: Okta
contributors:
  - imnotashrimp
shipping-tags:
  - security
---

To ship Okta logs,
you'll deploy a Docker container
to collect the logs and forward them to Logz.io.

#### Configuration

**Before you begin, you'll need**:
Okta administrator privileges

<div class="tasklist">

##### Get the API token and issuer URI from Okta

In the Okta developer console,
navigate to **API > Tokens**.
Create a token and paste it in your text editor.

![Create Okta API token](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/okta-create-token.png)

Click the **Authorization Servers** tab.
Copy your Okta subdomain from the **Issuer URI** column,
and paste it in your text editor.

![Okta URL](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/okta-issuer-uri.png)

In the example above, you'd have copied "dev-123456".

##### Pull the Docker image

Download the logzio/logzio-okta image.

```shell
docker pull logzio/logzio-okta
```

##### Run the Docker image

For a complete list of options, see the parameters below the code block.👇

```shell
run docker \
--detach \
--restart always \
--name Okta \
--env LOGZIO_TOKEN=<<SHIPPING-TOKEN>> \
--env LOGZIO_LISTENER_HOST=<<LISTENER-HOST>> \
--env OKTA_API_KEY=<<OKTA-API-KEY>> \
--env OKTA_TENANT=<<OKTA-ISSUER-URI>> \
-t logzio/logzio-okta
```

###### Parameters

| Parameter | Description |
|---|---|
| LOGZIO_TOKEN <span class="required-param"></span> | Your Logz.io account token. {% include log-shipping/replace-vars.html token=true %} <!-- logzio-inject:account-token --> |
| LOGZIO_LISTENER_HOST <span class="required-param"></span> | Logz.io listener URL to ship the logs to. {% include log-shipping/replace-vars.html listener=true %} |
| OKTA_API_KEY <span class="required-param"></span> | The Okta API key you copied in step 1. |
| OKTA_TENANT <span class="required-param"></span> | The Okta issuer URI you copied in step 1. |
{:.paramlist}

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>
