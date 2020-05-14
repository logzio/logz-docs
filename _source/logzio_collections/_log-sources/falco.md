---
title: Ship Falco logs
logo:
  logofile: falco-logo.png
  orientation: vertical
data-source: Falco
contributors:
  - shalper
shipping-tags:
  - security
---

Falco is a [CNCF-approved](https://www.cncf.io/blog/2020/01/08/toc-votes-to-move-falco-into-cncf-incubator/) container security and Kubernetes threat detection engine that logs illegal container activity at runtime.

We've got a great [blog post](https://logz.io/blog/k8s-security-with-falco-and-cloud-siem/) about how shipping your Falco logs to Logz.io Cloud SIEM can help you monitor your Kubernetes workloads for potentially malicious behavior, such as attempts to remove logging data from a container, to run recon tools inside a container, or add potentially malicious repositories to a container.

You can review the Falco resources in your Logz.io Cloud SIEM account, under the pre-configured [Falco security rules](https://app.logz.io/#/dashboard/security/rules/rule-definitions?from=0&sortBy=updatedAt&sortOrder=DESC&search=falco) and search for the provided Falco [dashboards](https://app.logz.io/#/dashboard/security/research/dashboards?) to get you started.

###### On this page
{:.no_toc}

1. toc list
{:toc}

#### Step by step
{:.no_toc}

**Before you begin, you'll need**:
Falco installed on the host,
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html),
root access

<div class="tasklist">

##### Configure Falco rules to enrich observability

Open Falco’s configuration file with your preferred text editor. See Falco's [documentation](https://falco.org/docs/)
if you need help finding the file.

```
$nano /etc/falco/falco_rules.yaml
```

In the configuration file,
find the line that begins `- macro: network_tool_procs`.
Copy the following directly below it:

```
- list: network_tool_binaries
  append: true
  items: [fierce, dnsenum, amass, dnsrecon, sublist3r, theharvester, recon-ng, netdiscover, amap, enum4linux, onesixtyone]
```

In the configuration file, find the line that begins `- rule: Netcat Remote Code Execution in Container`.
Replace the entire contents of the rule with the following:

```
- rule: Netcat Remote Code Execution in Container
  desc: Netcat Program runs inside container that allows remote code execution
  condition: >
    spawned_process and container and
    ((proc.name = "nc" and (proc.args contains "-e" or proc.args contains "-c")) or
     (((proc.name = netcat) or ( proc.name = "ncat")) and (proc.args contains "--sh-exec" or proc.args contains "--exec" or proc.args contains "-e "
                              or proc.args contains "-c " or proc.args contains "--lua-exec"))
    )
  output: >
    Netcat runs inside container that allows remote code execution (user=%user.name
    command=%proc.cmdline container_id=%container.id container_name=%container.name image=%container.image.repository:%container.image.tag)
  priority: WARNING
  tags: [network, process, mitre_execution]
```

In the configuration file, find the line that begins `- rule: Delete or rename shell history`.
Replace the entire contents of the rule with the following:

```
- rule: Delete or rename shell history
  desc: Detect shell history deletion
  condition: >
    (modify and (
      evt.arg.name contains "bash_history" or
      evt.arg.name contains "zsh_history" or
      evt.arg.name contains "fish_read_history" or
      evt.arg.name endswith "fish_history" or
      evt.arg.oldpath contains "bash_history" or
      evt.arg.oldpath contains "zsh_history" or
      evt.arg.oldpath contains "fish_read_history" or
      evt.arg.oldpath endswith "fish_history" or
      evt.arg.path contains "bash_history" or
      evt.arg.path contains "zsh_history" or
      evt.arg.path contains "fish_read_history" or
      evt.arg.path endswith "fish_history")) or
    (open_write and (
      fd.name contains "bash_history" or
      fd.name contains "zsh_history" or
      fd.name contains "fish_read_history" or
      fd.name endswith "fish_history") and evt.arg.flags contains "O_TRUNC")
  output: >
    Shell history had been deleted or renamed (user=%user.name type=%evt.type command=%proc.cmdline fd.name=%fd.name name=%evt.arg.name path=%evt.arg.path oldpath=%evt.arg.oldpath %container.info image=%container.image.repository)
  priority:
    WARNING
  tags: [process, mitre_defense_evation]
```

In the configuration file, find the line that begins `- rule: Delete Bash History`.
Replace the entire contents of the rule with the following:

```
- rule: Delete Bash History
  desc: Detect bash history deletion
  condition: >
    ((spawned_process and proc.name in (shred, rm, mv) and proc.args contains "bash_history") or
     (open_write and fd.name contains "bash_history" and evt.arg.flags contains "O_TRUNC"))
  output: >
    Shell history had been deleted or renamed (user=%user.name type=%evt.type command=%proc.cmdline fd.name=%fd.name name=%evt.arg.name path=%evt.arg.path oldpath>
  priority:
    WARNING
  tags: [process, mitre_defense_evation]

- macro: consider_all_chmods
  condition: (always_true)

- list: user_known_chmod_applications
  items: [hyperkube, kubelet]
```

In the configuration file, find the line that begins `- rule: Clear Log Activities`.
Replace the entire contents of the rule with the following:

```
- rule: Clear Log Activities
  desc: Detect clearing of critical log files
  condition: >
    open_write and
    access_log_files and
    evt.arg.flags contains "O_TRUNC" and
    not trusted_logging_images and
    not allowed_clear_log_files
  output: >
    Log files were tampered (user=%user.name command=%proc.cmdline file=%fd.name container_id=%container.id image=%container.image.repository:%container.image.tag)
  priority:
    WARNING
  tags: [file, mitre_defense_evasion]
```

##### Configure Falco to output JSON logs

Open Falco’s configuration file with your preferred text editor. The default location is `/etc/falco/falco.yaml` but it depends on your installation.

```
$nano /etc/falco/falco.yaml
```
In the configuration file, set the output format to JSON.
Find the line `json_output: true`.

```
# Whether to output events in json or text
json_output: true

# When using json output, whether or not to include the "output" property
# itself (e.g. "File below a known binary directory opened for writing
# (user=root ....") in the json output.
json_include_output_property: true
```

Next, look up the filepath to Falco's logs.

In the same configuration file, find the line that begins `filename:`. Its value points to Falco's event logs and will be needed in a future step to replace the placeholder `<<filepath-to-falco-events.txt>>`.
Copy the filepath and save it for the next step. You'll need it to configure Filebeat.

```
file_output:
  enabled: true
  keep_alive: false
  filename: ./events.txt
```
Save and exit the falco.yaml file.

##### Download the Logz.io public certificate to your Filebeat server

{% include trust-chain-warning.html %}

For HTTPS shipping, download the Logz.io public certificate to your certificate authority folder.

```shell
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/SectigoRSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
sudo wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt -P /etc/pki/tls/certs/
```

##### Configure Filebeat

Open the Filebeat configuration file (/etc/filebeat/filebeat.yml) with your preferred text editor.
Copy and paste the code block below, overwriting the previous contents. (You want to replace the file's contents with this code block.)

This code block adds Falco as an input and sets Logz.io as the output.

```yaml
# ...
filebeat.inputs:
- type: log
  paths:
  -  <<filepath-to-falco-events.txt>>
  fields:
    logzio_codec: json
    token: <<SHIPPING-TOKEN>>
    type: falco
  fields_under_root: true
  encoding: utf-8
  ignore_older: 3h

filebeat.registry.path: /var/lib/filebeat

#The following processors are to ensure compatibility with version 7
processors:
- rename:
    fields:
     - from: "agent"
       to: "beat_agent"
    ignore_missing: true
- rename:
    fields:
     - from: "log.file.path"
       to: "source"
    ignore_missing: true

# ...
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities:
      - '/etc/pki/tls/certs/SectigoRSADomainValidationSecureServerCA.crt'
      - '/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt'
```

##### Replace the placeholders in the Filebeat configuration

Still in the same configuration file, replace the placeholders to match your specifics.

* {% include log-shipping/replace-vars.html token=true %}

* Replace the placeholder `<<filepath-to-falco-events.txt>>` with the filepath from the previous step.

* {% include log-shipping/replace-vars.html listener=true %}

One last validation - make sure Logz.io is the only output and appears only once.
If the file has other outputs, remove them.

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
