---
title: Ship AWS metrics
logo:
  logofile: aws.svg
  orientation: vertical
data-source: AWS metrics
contributors:
  - imnotashrimp
shipping-tags:
  - aws
---

#### Guided configuration

**Before you begin, you'll need**:
[Metricbeat 7](https://www.elastic.co/downloads/beats/metricbeat),
root access

<div class="tasklist">

##### Create a policy

Later in this process, you'll create a group and a user.
But before you do that, you'll need to create a policy
with the right permissions.

In the _Identity and Access Management_ page,
click **Policies** in the left menu,
then click **Create policy**.

![Create policy visual editor]({{site.baseurl}}/images/aws/create-policy-visual-editor.png)

You'll see a box titled _Select a service_.

In the _Service_ option, click **Choose a service**.

Search for a service you want to send metrics from.
For this example, we'll use EC2.

![Select EC2 actions]({{site.baseurl}}/images/aws/metrics--create-policy--ec2-actions.png)

Under _Access level_,
select **List** and **Read**.

In the _Resources_ option, select **All resources**.

To add more services,
click **Add additional permissions**,
and give each service **List** and **Read** access.
{:.info-box.note}

When you've added all the services you want to collect metrics from,
click **Review policy**.

![Review policy]({{site.baseurl}}/images/aws/metrics--create-policy--review-policy.png)

Give a **Name** that lets you know this is for Logz.io metrics,
such as "logzio-metrics-policy".

Click **Create policy**.

##### Attach the policy to a group

In the _Identity and Access Management_ page,
click **Groups** in the left menu,
then click **Create New Group**.

![Set group name]({{site.baseurl}}/images/aws/metrics--create-group--set-group-name.png)

Give a **Group Name** that lets you know this is for Logz.io metrics,
such as "logzio-metrics-group".

Click **Next Step** to continue to the _Attach Policy_ page.

Select the policy you created in step 1
("logzio-metrics-policy" in this example),
and then click **Next Step**.

Click **Create group**.

##### Attach the group to a user

In the _Identity and Access Management_ page,
click **Users** in the left menu,
then click **Add user**.

![Create a user]({{site.baseurl}}/images/aws/metrics--add-user-1.png)

Give a **User name** that lets you know this is for Logz.io metrics,
such as "logzio-metrics-user".

Select **Programmatic access** so we can give this user an access key and secret key later on.

Click **Next: Permissions** to continue.

![Set user permissions]({{site.baseurl}}/images/aws/metrics--add-user-2.png)

Under _Set permissions_, click **Add user to group**.

Under _Add user to group_,
select the group you created in step 2
("logzio-metrics-group" in this example).

Click **Next: Tags** to continue.

![Add user tags]({{site.baseurl}}/images/aws/metrics--add-user--add-tags.png)

Add any optional tags you want.
Click **Next: Review** to continue,
and then click **Create user**.

![New user details]({{site.baseurl}}/images/aws/metrics--add-user--copy-keys.png)

Copy the **Access key ID** and **Secret access key**.
You'll need these for your Metricbeat configuration file later.

##### Download the Logz.io certificate

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Configure Metricbeat

Clean the contents of the default Metricbeat configuration file
(`/etc/metricbeat/metricbeat.yml`).

The sample code block lays out the default options
for collecting metrics from EC2 and CloudWatch.

{% include log-shipping/replace-vars.html token=true %}

{% include log-shipping/replace-vars.html listener=true %}

```yaml
metricbeat.modules:
- period: 300s
  module: aws
  metricsets:
    - ec2
    - cloudwatch
  metrics:
    - namespace: AWS/Lambda
  access_key_id: <<YOUR-AWS-ACCESS-KEY>>
  secret_access_key: <<YOUR-AWS-SECRET-KEY>>
- period: 60s
  module: aws
  metricsets:
    - cloudwatch
  metrics:
    - namespace: AWS/Kinesis
    - namespace: AWS/Firehose
  access_key_id: <<YOUR-AWS-ACCESS-KEY>>
  secret_access_key: <<YOUR-AWS-SECRET-KEY>>
fields:
  logzio_codec: json
  token: <<SHIPPING-TOKEN>>
fields_under_root: true
ignore_older: 3hr
type: aws_metrics

#. Logz.io output
output.logstash:
  hosts: ["listener.logz.io:5015"]
  ssl.certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Check Logz.io for your metrics

Spin up your Docker containers if you haven't done so already.
Give your metrics a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

</div>