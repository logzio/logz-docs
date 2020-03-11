---
title: Ship RDS metrics
logo:
  logofile: aws-rds.svg
  orientation: vertical
data-source: RDS
contributors:
  - imnotashrimp
shipping-tags:
  - aws
---

#### Guided configuration

**Before you begin, you'll need**:
[Metricbeat 7](https://www.elastic.co/downloads/beats/metricbeat)

<div class="tasklist">

##### Set up your IAM user

You'll need an [IAM user](https://console.aws.amazon.com/iam/home)
with these permissions:
`cloudwatch:GetMetricData`,
`ec2:DescribeRegions`,
`iam:ListAccountAliases`,
`rds:DescribeDBInstances`,
`sts:GetCallerIdentity`

If you don't have one, set that up now.

Create an **Access key ID** and **Secret access key** for the IAM user,
and paste them in your text editor.

You'll need these for your Metricbeat configuration later.

##### Get your metrics region

You'll need to specify the AWS region you're collecting metrics from.

![AWS region menu](https://dytvr9ot2sszz.cloudfront.net/logz-docs/aws/region-menu.png)

Find your region's slug in the region menu
(in the top menu, on the right side).

For example:
The slug for US East (N. Virginia)
is "us-east-1",
and the slug for Canada (Central) is "ca-central-1".

Paste your region slug in your text editor.
You'll need this for your Metricbeat configuration later.

##### Download the Logz.io certificate

For HTTPS shipping,
download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### _(Optional)_ Disable the system module

By default, Metricbeat ships system metrics from its host.
If you don't need these metrics,
disable the system module:

```shell
sudo metricbeat modules disable system
```

##### Configure Metricbeat

If you're working with the default configuration file,
(`/etc/metricbeat/metricbeat.yml`).
clear the contents and start with a fresh file.

This code block lays out the default options
for collecting metrics from
RDS.
Paste the code block.
You can adjust it to match your AWS environment.

```yml
# ...
metricbeat.config.modules.path: ${path.config}/modules.d/*.yml
metricbeat.modules:
- period: 60s # Must be multiples of 60
  module: aws
  metricsets:
    - rds
  access_key_id: <<YOUR-ACCESS-KEY-ID>>
  secret_access_key: <<YOUR-SECRET-KEY>>
  default_region: <<YOUR-AWS-REGION>
```

##### Add Logz.io to the configuration

If Logz.io information isn't in the file, set it now.

Metricbeat can have one output only, so remove any other `output` entries.

{% include log-shipping/replace-vars.html token=true %}

{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ...
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: aws_metrics

#. Logz.io output
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.

##### Check Logz.io for your metrics

Give your metrics a few minutes to get from your system to ours, and then open [Logz.io](https://app.logz.io/#/dashboard/kibana).

You can view your metrics on the
AWS RDS
dashboard in Grafana.
Just click **<i class="fas fa-th-large"></i> > Manage** in the left menu,
then click
**Logz.io Dashboards >**
**AWS RDS**.

</div>
