---
title: Ship Stackdriver logs
open-source:
  - title: Pub/Sub to Logz.io
    github-repo: logzio-pubsub
logo:
  logofile: gcp-stackdriver.svg
  orientation: vertical
data-source: Stackdriver
templates: [""]
contributors:
  - ronish31
  - imnotashrimp
shipping-tags:
  - gcp
---

Google Cloud Platform (GCP) Stackdriver collects logs and metrics from your cloud services.
You can use Google Cloud Pub/Sub to forward your logs from Stackdriver to Logz.io.

#### Configuration

{% include trust-chain-warning.html msg='docker' %}

**Before you begin, you'll need**:
[Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts),
[a GCP project](https://console.cloud.google.com/projectcreate),
[a GCP Pub/Sub topic and subscribers](https://cloud.google.com/pubsub/docs/quickstart-console) to your GCP project

<div class="tasklist">

##### Export your logs to Stackdriver

Set up a sink to export your logs to Stackdriver.

For more information, see
[Exporting with the Logs Viewer](https://cloud.google.com/logging/docs/export/configure_export_v2)
from Google Cloud.

##### Build your credentials file

Create a working directory for this step and `cd` into it.

```shell
mkdir logzio-stackdriver && cd logzio-stackdriver
```

You'll need to build a credentials file so Pub/Sub can authenticate
and get the right permissions.

This is simpler through the command line,
but if you don't have the right permissions,
you can use the Cloud Console.

###### Option 1: In the command line

Build your credentials file using your Google Cloud project ID.

```shell
wget https://raw.githubusercontent.com/logzio/logzio-pubsub/master/Makefile \
&& make PROJECT_ID=<project_id>
```

Run this command for each project you're working with.

###### Option 2: In the Cloud Console

Go to your project's page in [GCP Console](https://console.cloud.google.com).
In the left menu, select **IAM & admin > Service accounts**.

At the top of the _Service accounts_ page, click **+ CREATE SERVICE ACCOUNT**.

Give a descriptive **Service account name**, such as "credentials file".
Click **CREATE** to continue to the _Service account permissions_ page.

Add these roles:

* "Pub/Sub Editor"
* "Pub/Sub Publisher"
* "Pub/Sub Subscriber"

Click **CONTINUE** to continue to _Grant users access to this service account_.

Click **+ CREATE KEY** to open the _Create key_ panel.
Select **JSON** and click **CREATE** to save the private key to your machine.

Copy it to the `logzio-stackdriver/` folder you created
at the beginning of this step.

Click **DONE** to return to teh _Service accounts_ page.

##### Build your Pub/Sub input YAML file

Make `pubsub-input.yml`, which will hold your Pub/Sub input configuration.

```shell
touch pubsub-input.yml
```

Open `pubsub-input.yml` in your text editor, and paste this code block.

Complete configuration instructions are below the code block. 👇

```yaml
listener: <<LISTENER-HOST>>
pubsubs:
- project_id: PROJECT-1_ID
  topic_id: TOPIC-1_ID
  token: <<SHIPPING-TOKEN>>
  credentials_file: ./credentials-file.json
  subscriptions: ["SUB1_ID", "SUB2_ID", "SUB3_ID"]
  type: stackdriver

- project_id: PROJECT-1_ID
  topic_id: TOPIC-2_ID
  token: <<SHIPPING-TOKEN>>
  credentials_file: ./credentials-file.json
  subscriptions: ["SUB1_ID", "SUB2_ID", "SUB3_ID"]
  type: stackdriver

- project_id: PROJECT-3_ID
  topic_id: TOPIC-1_ID
  token: <<SHIPPING-TOKEN>>
  credentials_file: ./credentials-file.json
  subscriptions: ["SUB1_ID", "SUB2_ID", "SUB3_ID"]
  type: stackdriver
```


###### Configuration instructions

| Parameter | Description |
|---|---|
| listener | The Logz.io listener host. <br> {% include log-shipping/replace-vars.html listener=true %} |
| pubsubs | This is an array of one or more GCP subscriptions. For each subscription, provide topic and subscriptions IDs, as given from Pub/Sub. |
| token | Your Logz.io shipping token. Include this with each project under `pubsubs`. <br> {% include log-shipping/replace-vars.html token=true %} |
{:.paramlist}

##### Pull the Docker image

Download the logzio/logzio-pubsub image:

```shell
docker pull logzio/logzio-pubsub
```

##### Run the container

Run this command from `logzio-pubsub/`,
where you stored `pubsub-input.yml`
and `credentials-file.json`.

```shell
docker run --name logzio-pubsub \
-v $(pwd)/pubsub-input.yml:/logzio-pubsub/pubsub-input.yml \
-v $(pwd)/credentials-file.json:/logzio-pubsub/credentials-file.json \
logzio/logzio-pubsub
```

##### Check Logz.io for your logs

Spin up your Docker containers if you haven’t done so already.

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>
