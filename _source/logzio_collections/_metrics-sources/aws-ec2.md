---
title: Ship EC2 metrics
logo:
  logofile: aws-ec2.svg
  orientation: vertical
data-source: Amazon EC2
templates: ["docker-metricbeat"]
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
shipping-tags:
  - aws
order: 350
---


<!-- tabContainer:start -->
<div class="branching-container">
#### NEW BUTTON
789
<!-- logzio-inject:grafana:dashboards-installation ids=['7GOPHucWSajA5pptILGV8G'] -->

* [Ship EC2 over Docker container](#ec2-docker)
* [Ship over self-hosted Metricbeat](#ec2-vanilla)
{:.branching-tabs}



<!-- tab:start -->
<div id="ec2-docker">

To simplify shipping metrics from one or many sources,
we created a Docker Metrics Collector. The
Docker Metrics Collector is a container
that runs Metricbeat with the modules you enable at runtime.

{% include /metric-shipping/docker-metricbeat-version.md %}


{% include metric-shipping/ec2-cloudwatch.md %}

#### Configuration

If you're not already running Docker Metrics Collector,
follow these steps.

Otherwise, stop the container, add
`aws`
to the `LOGZIO_MODULES` environment variable, and restart.
You can find the `run` command and all parameters
in this procedure.

<div class="tasklist">

##### Set up your IAM user

You'll need an [IAM user](https://console.aws.amazon.com/iam/home)
with these permissions:

* `cloudwatch:GetMetricData`
* `cloudwatch:ListMetrics`
* `ec2:DescribeInstances`
* `ec2:DescribeRegions`
* `iam:ListAccountAliases`
* `sts:GetCallerIdentity`

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

##### Pull the Docker image

Download the Docker Metrics Collector image:

```shell
docker pull logzio/docker-collector-metrics
```


{% include metric-shipping/aws-run-container.md %}

{% include metric-shipping/aws-metrics.md namespace="EC2" %}

##### Monitor advanced EC2 metrics (_Optional_)

If you want, you can also monitor advanced EC2 metrics, including disk memory and swap memory. 

To enable this option, you’ll need to install and configure a CloudWatch agent on your machine and specify the **CWAgent** namespace under the AWS_NAMESPACES parameter. For example:

```shell
--env AWS_NAMESPACES="CWAgent,AWS/EC2"
```

For additional instructions, see more about [installing the CloudWatch agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html) and [configuring it](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-cloudwatch-agent-configuration-file-wizard.html).


{% include metric-shipping/open-dashboard.md title="Cloudwatch AWS/EC2" %}

</div>
</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="ec2-vanilla">

You have the option to ship CloudWatch metrics directly over Metricbeat, without a Docker container.

**Recommended version**: Metricbeat version 7.5.x

{% include metric-shipping/ec2-cloudwatch.md %}

#### Configuration

<div class="tasklist">

##### Set up your IAM user

You'll need an [IAM user](https://console.aws.amazon.com/iam/home)
with these permissions:

* `cloudwatch:GetMetricData`
* `cloudwatch:ListMetrics`
* `ec2:DescribeInstances`
* `ec2:DescribeRegions`
* `iam:ListAccountAliases`
* `sts:GetCallerIdentity`

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

{% include metric-shipping/certificate.md %}

##### _(Optional)_ Disable the system module

By default, Metricbeat ships system metrics from its host.
If you don't need these metrics,
disable the system module:

```shell
sudo metricbeat modules disable system
```

##### Configure Metricbeat

If you're working with the default configuration file,
(`/etc/metricbeat/metricbeat.yml`), clear the contents and start with a fresh file.

This code block lays out the default options
for collecting metrics from EC2.
Paste the code block.
Then adjust it to match your AWS environment.

```yml
metricbeat.modules:
- module: aws
  period: 300s
  metricsets:
    - cloudwatch
  metrics: #specify aws namespaces you want to monitor, just add namspaces from AWS list
    - namespace: AWS/EC2

  access_key_id: '<<access_key_id>>'
  secret_access_key: '<<secret_access_key>>'

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

{% include /general-shipping/replace-placeholders-metrics.html %}

* {% include metric-shipping/replace-metrics-token.html %} 




One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.


##### Monitor advanced EC2 metrics (_Optional_)

If you want, you can also monitor advanced EC2 metrics, including disk memory and swap memory. 

To enable this option, you’ll need to install and configure a CloudWatch agent on your machine and specify the **CWAgent** namespace under the metrics section. For example:

```yml
metricsets:
    - cloudwatch
  metrics: #specify aws namespaces you want to monitor, just add namspaces from AWS list
    - namespace: AWS/EC2
    - namespace: CWAgent
```

For additional instructions, see more about [installing the CloudWatch agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Agent-on-EC2-Instance.html) and [configuring it](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-cloudwatch-agent-configuration-file-wizard.html).

##### Start Metricbeat

Start or restart Metricbeat for the changes to take effect.


{% include metric-shipping/open-dashboard.md title="Cloudwatch AWS/EC2" %}

</div>
<!-- tab:end -->


</div>
