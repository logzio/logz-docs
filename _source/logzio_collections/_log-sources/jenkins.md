---
title: Ship Jenkins logs
logo:
  logofile: jenkins.png
  orientation: vertical
data-source: Jenkins
open-source:
  - title: Jenkins Logstash Plugin
    github-repo: logstash-plugin
contributors:
  - amosd92
  - imnotashrimp
shipping-tags:
  - ci-cd
---

This page covers methods for shipping Jenkins system logs and build console output.

* To ship build console output (build logs), use the Jenkins plugin.
* To ship Jenkins system logs, use Filebeat.

<!-- tabContainer:start -->
<div class="branching-container">

* [Filebeat](#filebeat-config)
* [Jenkins plugin](#jenkins-plugin-config)
{:.branching-tabs}

<!-- tab:start -->
<div id="filebeat-config">

## Filebeat setup for Jenkins

<details>

<summary>
Configuration tl;dr
</summary>

**Action required**:
Starting May 26, 2020, we'll transition our listener servers
to a new public SSL certificate.
Before that time,
you'll need to include both the old and new certificates
in your configurations. \\
\\
**If you send encrypted data without using both certificates after May 26,
that data might not arrive at your Logz.io account or be archived.** \\
\\
You can safely remove the old certificate
after June 5, 2020.
{:.info-box.warning}

| Item | Description |
|---|---|
| Files | [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) <br> **Use both certificates**: [New public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt) and [Old public certificate (_until June 5, 2020_)](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt) |
| Listener | Port 5015. For help finding your region's listener host, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html). |
| Default log location | `/var/log/jenkins/jenkins.log` |
| Log type _\(for preconfigured parsing\)_ | `jenkins` |
{:.paramlist}

</details>

#### Guided configuration

**Before you begin, you'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

<div class="tasklist">

##### Download the Logz.io public certificate

**Action required**:
Starting May 26, 2020, we'll transition our listener servers
to a new public SSL certificate.
Before that time,
you'll need to include both the old and new certificates
in your configurations. \\
\\
**If you send encrypted data without using both certificates after May 26,
that data might not arrive at your Logz.io account or be archived.** \\
\\
You can safely remove the old certificate
after June 5, 2020.
{:.info-box.warning}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Add Jenkins as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Jenkins to the filebeat.inputs section.

{% include log-shipping/replace-vars.html token=true %}

```yaml
# ...
filebeat.inputs:
- type: log
  paths:
  - /var/log/jenkins/jenkins.log
  fields:
    logzio_codec: plain

    # Your Logz.io account token. You can find your token at
    #  https://app.logz.io/#/dashboard/settings/manage-accounts
    token: <<SHIPPING-TOKEN>>
    type: jenkins
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h
  multiline:
    pattern: '^[A-Z]{1}[a-z]{2} {1,2}[0-9]{1,2}, [0-9]{4} {1,2}[0-9]{1,2}:[0-9]{2}:[0-9]{2}'
    negate: true
    match: after
```

If you're running Filebeat 7, paste this code block.
Otherwise, you can leave it out.

```yaml
# ... For Filebeat 7 only ...
filebeat.registry.path: /var/lib/filebeat
processors:
- rename:
    fields:
    - from: "agent"
      to: "filebeat_agent"
    ignore_missing: true
- rename:
    fields:
    - from: "log.file.path"
      to: "source"
    ignore_missing: true
```

If you're running Filebeat 6, paste this code block.

```yaml
# ... For Filebeat 6 only ...
registry_file: /var/lib/filebeat/registry
```

##### Set Logz.io as the output

If Logz.io is not an output, add it now.
Remove all other outputs.

{% include log-shipping/replace-vars.html listener=true %}

```yaml
# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities:
      - '/etc/pki/tls/certs/SectigoRSADomainValidationSecureServerCA.crt'
      - '/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt'
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

<!-- tab:start -->
<div id="jenkins-plugin-config">

## Jenkins Logstash Plugin setup

This is a temporary fork of a Jenkins-maintained project named Jenkins Logstash Plugin.
We're working toward merging our implementation in the Jenkins repo.
For full documentation and all configuration options, see the original [Jenkins Logstash Plugin](https://github.com/jenkinsci/logstash-plugin) repo on GitHub.
{:.info-box.note}

Jenkins Logstash Plugin sends Jenkins build logs to your Logz.io account.
The plugin is configured per project.
You can choose to stream a project's build logs or to send only the last logs of each build.

#### To configure Jenkins Logstash Plugin

**Before you begin, you'll need**:
[JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html),
[Maven](https://maven.apache.org/install.html)

<div class="tasklist">

##### Clone the Jenkins Logstash Plugin repo

Clone the Jenkins Logstash Plugin repo and `cd` into the logstash-plugin folder.

```shell
git clone https://github.com/logzio/logstash-plugin
cd logstash-plugin
```

##### Load the plugin in Jenkins

Set Maven to use JDK 8, and then build the plugin.

```shell
JAVA_HOME=/path/to/jdk/8/ mvn package
```

Copy `logstash-plugin/target/logstash.hpi` to your Jenkins plugins folder on your Jenkins server.

```shell
cp /path/to/repo/logstash-plugin/target/logstash.hpi $JENKINS_HOME/plugins
```

Restart Jenkins for the changes to take effect.
You can do this by browsing to `http://<<JENKINS-SERVER>>/restart` or `http://<<JENKINS-SERVER>>/safeRestart`.

##### Configure the plugin in Jenkins

Log in to the Jenkins UI and navigate to **Manage Jenkins > Configure System**.

In the _Logstash_ section, select **Enable sending logs to an Indexer**, and then set these options:

* In the **Indexer Type** list, choose **Logz.io**.
* **Logz.io Host**: Your region's listener host.
  For more information on finding your account's region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).
* **Logz.io Token**: The [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.

Click **Save**.

##### Enable the plugin in your Jenkins jobs

In each Jenkins job, click **Configure** in the left menu to set your logging preferences.

Make sure you enable only one of these options.
If both options are enabled, Jenkins Logstash Plugin will send duplicate logs Logz.io.
{:.info-box.important}

###### To stream all logs

In the _General_ section, select **Send console log to Logstash**, and click **Save**.

###### To send only the last logs of each build

In the _Post-build Actions_ section (at the bottom of the page), select **Add post-build action > Send console log to Logstash**.
In the **Max lines** box, type the number of logs you want to send per build, and then click **Save**.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>
<!-- tab:end -->

</div>
<!-- tabContainer:end -->
