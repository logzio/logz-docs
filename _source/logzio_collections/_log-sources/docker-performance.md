---
title: Ship Docker performance logs
logo:
  logofile: docker.svg
  orientation: horizontal
data-source: Docker performance logs
logzio-app-url: https://app.logz.io/#/dashboard/data-sources/Perfagent
contributors:
  - imnotashrimp
shipping-tags:
  - container
---

#### Configuration

<div class="tasklist">

##### Pull the Docker image

Download the logzio/logzio-docker image:

```shell
docker pull logzio/logzio-perfagent
```

##### Run the Docker image

For a complete list of options, see the parameters below the code block.👇

```shell
docker run -d \
  --net="host" \
  -e LOGZ_TOKEN="<<SHIPPING-TOKEN>>" \
  -e LISTENER="<<LISTENER-HOST>>:5000" \
  -e USER_TAG="workers" \
  -e HOSTNAME=`hostname` \
  -e INSTANCE="10.1.2.3" \
  --restart=always \
  logzio/logzio-perfagent
```

###### Parameters

LOGZ_TOKEN <span class="required-param"></span>
: Your Logz.io account token.
  {% include log-shipping/replace-vars.html token=true %}
  <!-- logzio-inject:account-token -->

LISTENER <span class="default-param">`listener.logz.io:5000`</span>
: Your account's listener host and port.
  {% include log-shipping/replace-vars.html listener=true %}

USER_TAG
: Assigned to the `user_tag` field of each log entry.
  You can use this field to group various hosts into meaningful visualisations.
  One recommended use case for this variable is to denote the host role.

HOSTNAME
: Name of the host this container is monitoring.
  Assigned to the `syslog5424_host` field of each log entry.

INSTANCE
: The IP address that will be assigned to the `instance` field of each entry.

##### Check Logz.io for your logs

Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
