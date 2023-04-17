---
title: Ship Docker performance logs
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
short-description: Ship performance logs of your Docker containers to Logz.io. 
logo:
  logofile: docker.svg
  orientation: horizontal
data-source: Docker performance logs
data-for-product-source: Logs
templates: ["docker"]
contributors:
  - imnotashrimp
shipping-tags:
  - container
order: 500
---
Docker is a set of platform as a service products that deliver software in containers. This integration allows you to ship performance logs of your Docker containers to your Logz.io account. 

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
  -e LOGZ_TOKEN="<<LOG-SHIPPING-TOKEN>>" \
  -e LISTENER="<<LISTENER-HOST>>:5000" \
  -e USER_TAG="workers" \
  -e HOSTNAME=`hostname` \
  -e INSTANCE="10.1.2.3" \
  --restart=always \
  logzio/logzio-perfagent
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| LOGZ_TOKEN  | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %} | Required |
| LISTENER | Your account's listener host and port. {% include log-shipping/listener-var.html %} | `listener.logz.io:5000` |
| USER_TAG | Assigned to the `user_tag` field of each log entry. You can use this field to group various hosts into meaningful visualisations. One recommended use case for this variable is to denote the host role. | -- |
| HOSTNAME | Name of the host this container is monitoring. Assigned to the `syslog5424_host` field of each log entry. | -- |
| INSTANCE | The IP address that will be assigned to the `instance` field of each entry. | -- |


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Open Search Dashboards](https://app.logz.io/#/dashboard/osd).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
