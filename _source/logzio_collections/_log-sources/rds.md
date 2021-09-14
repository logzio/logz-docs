---
title: Ship RDS logs
logo:
  logofile: rds.svg
  orientation: horizontal
data-source: RDS
templates: [beats-logs, "docker"]
open-source:
  - title: mysql-logs
    github-repo: logzio-mysql-logs#rds-usage-docker-run
contributors:
  - nshishkin
shipping-tags:
  - database
order: 280
---

Deploy this integration to ship logs from your MySQL database hosted on Amazon RDS to Logz.io using Docker.

#### Configuration

**Before you begin, you'll need**:

* MySQL database hosted on Amazon RDS
* An active account with Logz.io


<div class="tasklist">

##### Pull Docker image

```shell
docker pull logzio/mysql-logs
```

##### Run the container

```
docker run -d --name logzio-mysql-logs -e LOGZIO_TOKEN=<<LOG-SHIPPING-TOKEN>> [-e LOGZIO_LISTENER=<<LISTENER-HOST>>] \
          -e AWS_ACCESS_KEY=<<AWS-ACCESS-KEY>> -e AWS_SECRET_KEY=<<AWS-SECRET-KEY>> -e RDS_IDENTIFIER=<<RDS-IDENTIFIER>> [-e AWS_REGION=<<AWS-REGION>>] \
          [-e RDS_ERROR_LOG_FILE=<<RDS-ERROR-LOG-FILE>>] [-e RDS_SLOW_LOG_FILE=<<RDS-SLOW-LOG-FILE>>] [-e RDS_LOG_FILE=<<RDS-LOG-FILE>>] \
          -v path_to_directory:/var/log/logzio -v path_to_directory:/var/log/mysql \
          logzio/mysql-logs:latest
```

###### Parameters

| Parameter | Description | Required/Default |
|---|---|---|
| `<<LOG-SHIPPING-TOKEN>>` | Your Logz.io account token. {% include log-shipping/log-shipping-token.html %}   | Required |
| `<<LISTENER-HOST>>` | Your Logz.io account listener URL. {% include log-shipping/listener-var.html %} | Required. Default: `listener.logz.io` |
| `<<AWS-ACCESS-KEY>>` | A proper AMI credentials for RDS logs access (permissions for `download-db-log-file-portion` and `describe-db-log-files` are needed). | Required |
| `<<AWS-SECRET-KEY>>` | A proper AMI credentials for RDS logs access (permissions for `download-db-log-file-portion` and `describe-db-log-files` are needed). | Required |
| `<<RDS-IDENTIFIER>>` |  The RDS identifier of the host from which you want to read logs from. | Required |
| `<<AWS-REGION>>` | AWS region of your account. | Optional. Default: `us-east-1` |
| `RDS-ERROR-LOG-FILE` | The path to the RDS error log file. | Optional. Default: `error/mysql-error.log` |
| `<<RDS-SLOW-LOG-FILE>>` | The path to the RDS slow query log file. | Optional. Default: `slowquery/mysql-slowquery.log` |
| `<<RDS-LOG-FILE>>` | The path to the RDS general log file. | Optional. Default: `general/mysql-general.log` |
| `<<INTERVAL-SECONDS>>` | RDS Sync interval. | Optional. Default: `60 seconds` |


##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).
