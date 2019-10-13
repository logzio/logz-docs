---
title: Ship Stackdriver logs
open-source:
  - title: Pub/Sub to Logz.io
    github-repo: logzio-pubsub
logo:
  logofile: gcp-stackdriver.svg
  orientation: vertical
data-source: Google Cloud Stackdriver
contributors:
  - ronish31
  - imnotashrimp
shipping-tags:
  - log-shipper
  - gcp
---

Google Cloud Platform (GCP) Stackdriver collects logs and metrics from your cloud services.
You can use Google Cloud Pub/Sub to forward your logs from Stackdriver to Logz.io.

#### Configuration

**Before you begin, you'll need**:
[Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts),
[a GCP project](https://console.cloud.google.com/projectcreate),
[a GCP Pub/Sub topic and subscribers](https://cloud.google.com/pubsub/docs/quickstart-console) to your GCP project

<div class="tasklist">

##### Export your logs to Pub/Sub

Set up a sink to export your logs to Pub/Sub.

For more information, see [Exporting with the Logs Viewer](https://cloud.google.com/logging/docs/export/configure_export_v2) from Google Cloud.

##### Build your credentials file

Make a folder for the files you'll be working with.

```shell
mkdir logzio-pubsub && cd logzio-pubsub
```

Build your credentials file using your Google Cloud project ID.

```shell
wget https://raw.githubusercontent.com/logzio/logzio-pubsub/master/Makefile \
&& make PROJECT_ID=<project_id>
```

Run this command for each project you're working with.

##### Build your Pub/Sub input YAML file

Make `pubsub-input.yml`, which will hold your Pub/Sub input configuration.

```shell
touch pubsub-input.yml
```

Open `pubsub-input.yml` in your text editor, and paste this code block.

Complete configuration instructions are below the code block. 👇

```yaml
logzio-pubsub:
    listener: <<LISTENER-HOST>>

    pubsubs:
    - project_id: PROJECT-1_ID
      credentials_file: ./credentials-file.json
      token: <<SHIPPING-TOKEN>>
      topic_id: TOPIC-1_ID
      subscriptions: ["SUB1_ID", "SUB2_ID", "SUB3_ID"]
      type: stackdriver

    - project_id: PROJECT-1_ID
      credentials_file: ./credentials-file.json
      token: <<SHIPPING-TOKEN>>
      topic_id: TOPIC-2_ID
      subscriptions: ["SUB1_ID", "SUB2_ID", "SUB3_ID"]
      type: stackdriver

    - project_id: PROJECT-3_ID
      credentials_file: ./credentials-file.json
      token: <<SHIPPING-TOKEN>>
      topic_id: TOPIC-1_ID
      subscriptions: ["SUB1_ID", "SUB2_ID", "SUB3_ID"]
      type: stackdriver
```

###### Configuration instructions

listener
: The Logz.io listener host. \\
  {% include log-shipping/replace-vars.html listener=true %}

pubsubs
: This is an array of one or more GCP subscriptions.
  For each subscription, provide topic and subscriptions IDs, as given from Pub/Sub.

token
: Your Logz.io shipping token.
  Include this with each project under `pubsubs`. \\
  {% include log-shipping/replace-vars.html token=true %}

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
-v ./pubsub-input.yml:/var/lib/filebeat/pubsub-input.yml \
-v ./credentials-file.json:/var/lib/filebeat/credentials-file.json \
logzio/logzio-pubsub
```

##### Check Logz.io for your logs

Spin up your Docker containers if you haven’t done so already.

Give your logs some time to get from your system to ours,
and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>