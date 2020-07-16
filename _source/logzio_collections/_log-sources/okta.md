---
title: Ship Okta logs
logo:
  logofile: okta.png
  orientation: vertical
data-source: Okta
templates: ["docker"]
open-source:
  - title: logzio-okta
    github-repo: logzio-okta
contributors:
  - imnotashrimp
  - ronish31
  - shalper
shipping-tags:
  - security
---

To ship Okta logs,
you'll deploy a Docker container
to collect the logs and forward them to Logz.io using Logstash.

You can send logs from multiple Okta tenants and any Okta domain.

If you want to ship from multiple Okta tenants with the same docker, you'll need to use the latest configurtion using a tenants-credentials.yml file.
{:.info-box.note}

#### Configuration

**Before you begin, you'll need**:

* Okta administrator privileges

<div class="tasklist">

##### Get the API token and Okta domain from Okta

In the Okta developer console,
navigate to **API > Tokens**.
Create a token and paste it in your text editor.

![Create Okta API token](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/okta-create-token.png)

Click the **Authorization Servers** tab.
Copy your Okta domain from the **Issuer URI** column,
and paste it in your text editor. In the following example, you'd have copied "dev-123456.okta.com".

![Okta URL](https://dytvr9ot2sszz.cloudfront.net/logz-docs/log-shipping/okta-issuer-uri.png)


##### Create your tenants-credentials YAML

Build your tenants-credentials.yml:

```
touch tenants-credentials.yml
```

Insert your tenants credentials into the YAML file in the following format:

```yml
tenants_credentials:
    - okta_api_key: <<OKTA-API-KEY>>
      okta_domain: <<OKTA-DOMAIN>>
```

This shipper supports up to 50 tenants. For multiple tenants, add your Okta API key and domain for each tenant. See the following example:

```yml
tenants_credentials:
    - okta_api_key: 123456a
      okta_domain: logzio-dev-123.okta.com
    - okta_api_key: 123456b
      okta_domain: logzio-dev-123.okta.com
    - okta_api_key: 123456c
      okta_domain: logzio-dev-123.oktapreview.com
```

###### Parameters

| Parameter | Description |
|---|---|
| OKTA_API_KEY <span class="required-param"></span> | The Okta API key copied in step 1. |
| OKTA_DOMAIN <span class="required-param"></span> | The Okta domain copied in step 1. It is found under the **Issuer URI column** in your Okta developer console. <br> Supports these [Okta domains](https://developer.okta.com/docs/guides/find-your-domain/findorg/): <br> example.oktapreview.com, example.okta.com, example.okta-emea.com |


YAML files are sensitive to spaces and tabs. It's a good idea to run your code through a YAML validator to make sure that its structure is correct.
{:.info-box.tip}

Save the file in your working directory. That's the same one you're running the docker from.


##### Pull the Docker image

Download the logzio/logzio-okta image:

```shell
docker pull logzio/logzio-okta
```

##### Run the Docker image

Replace the placeholders in the code sample below before running it. Then run:

```shell
docker run \
--restart always \
--name Okta \
--env LOGZIO_TOKEN=<<SHIPPING-TOKEN>> \
--env LOGZIO_LISTENER_HOST=<<LISTENER-HOST>> \
-v $(pwd)/tenants-credentials.yml:/usr/share/logstash/tenants-credentials.yml \
-t logzio/logzio-okta
```

###### Parameters

| Parameter | Description |
|---|---|
| LOGZIO_TOKEN <span class="required-param"></span> | {% include log-shipping/replace-vars.html token=true %} |
| LOGZIO_LISTENER_HOST <span class="required-param"></span> | {% include log-shipping/replace-vars.html listener=true %} |


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
