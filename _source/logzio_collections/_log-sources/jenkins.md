---
title: Ship Jenkins logs
logo:
  logofile: jenkins.png
  orientation: vertical
shipping-summary:
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

<div class="branching-container">

{: .branching-tabs }
  * [Jenkins plugin](#jenkins-plugin-config)
  * [Filebeat](#filebeat-config)

<div id="filebeat-config">

## Filebeat setup for Jenkins

<div class="accordion">

### Configuration tl;dr

<div>

Files
: [Sample configuration](https://raw.githubusercontent.com/logzio/logz-docs/master/shipping-config-samples/logz-filebeat-config.yml) \\
  [Encryption certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt)

Listener
: Port 5015.
  For help finding your region's listener host, see [Account region]({{site.baseurl}}/user-guide/accounts/account-region.html).

Default log location
: `/var/log/jenkins/jenkins.log`

Log type _\(for preconfigured parsing\)_
: `jenkins`

</div>

</div>

###### Guided configuration

**You'll need**:
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html) or
[Filebeat 6](https://www.elastic.co/guide/en/beats/filebeat/6.7/filebeat-installation.html),
root access

{: .tasklist .firstline-headline }
1.  Download the Logz.io certificate

    For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

    ```shell
    sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
    ```

2.  Add Jenkins as an input

    In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Jenkins to the filebeat.inputs section.

    {% include log-shipping/replace-vars.html token=true %}

    <div class="branching-container">

    {: .branching-tabs }
    * [Filebeat 7](#filebeat-7-code)
    * [Filebeat 6](#filebeat-6-code)

    <div id="filebeat-7-code">

    ```yaml
    # Filebeat 7 configuration

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

    </div>

    <div id="filebeat-6-code">

    ```yaml
    # Filebeat 6 configuration

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

    registry_file: /var/lib/filebeat/registry
    ```

    </div>

3.  Add Logz.io as an output

    If Logz.io is not an output, add it now.

    {% include log-shipping/replace-vars.html listener=true %}

    ```yaml
    output.logstash:
      hosts: ["<<LISTENER-HOST>>:5015"]
      ssl:
        certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
    ```

4.  Start Filebeat

    Start or restart Filebeat for the changes to take effect.

5.  Check Logz.io for your logs

    Give your logs a few minutes to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

    If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

<div id="jenkins-plugin-config">

## Jenkins Logstash Plugin setup

<div class="info-box note">

  This is a temporary fork of a Jenkins-maintained project named Jenkins Logstash Plugin.
  We're working toward merging our implementation in the Jenkins repo.
  For full documentation and all configuration options, see the original [Jenkins Logstash Plugin](https://github.com/jenkinsci/logstash-plugin) repo on GitHub.

</div>

Jenkins Logstash Plugin sends Jenkins build logs to your Logz.io account.
The plugin is configured per project.
You can choose to stream a project's build logs or to send only the last logs of each build.


###### Configuration

**You'll need**:
[JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html),
[Maven](https://maven.apache.org/install.html)

{: .tasklist .firstline-headline}
1.  Clone the Jenkins Logstash Plugin repo

    Clone the Jenkins Logstash Plugin repo and `cd` into the logstash-plugin folder.

    ```shell
    git clone https://github.com/logzio/logstash-plugin
    cd logstash-plugin
    ```

2.  Load the plugin in Jenkins

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

3.  Configure the plugin in Jenkins

    Log in to the Jenkins UI and navigate to **Manage Jenkins > Configure System**.

    In the _Logstash_ section, select **Enable sending logs to an Indexer**, and then set these options:

    * In the **Indexer Type** list, choose **Logz.io**.
    * **Logz.io Host**: Your region's listener host.
      For more information on finding your account's region, see [Account region](https://docs.logz.io/user-guide/accounts/account-region.html).
    * **Logz.io Token**: The [token](https://app.logz.io/#/dashboard/settings/general) of the account you want to ship to.

    Click **Save**.

4.  Enable the plugin in your Jenkins jobs

    In each Jenkins job, click **Configure** in the left menu to set your logging preferences.

    <div class="info-box important">

      Make sure you enable only one of these options.
      If both options are enabled, Jenkins Logstash Plugin will send duplicate logs Logz.io.

    </div>

    {: .inline-header }
    To stream all logs

    In the _General_ section, select **Send console log to Logstash**, and click **Save**.

    {: .inline-header }
    To send only the last logs of each build

    In the _Post-build Actions_ section (at the bottom of the page), select **Add post-build action > Send console log to Logstash**.
    In the **Max lines** box, type the number of logs you want to send per build, and then click **Save**.

5.  Check Logz.io for your logs

      Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

      If you still don't see your logs, see [log shipping troubleshooting](https://docs.logz.io/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>

</div>