---
title: Ship Falco logs
logo:
  logofile: falco.png
  orientation: vertical
data-source: Falco
contributors:
  - shalper
shipping-tags:
  - security
---

#### Configuration

**Before you begin, you'll need**:
Falco installed on the host,
[Filebeat 7](https://www.elastic.co/guide/en/beats/filebeat/current/filebeat-installation.html),
root access

<div class="tasklist">

##### Configure Falco rules to enrich observability

Open Falco’s configuration file with your preferred text editor. 

```
$nano /etc/falco/falco_rules.yaml
```

Falco's configuration filename is `falco_rules.yaml`.
Its filepath changes
depending on your version of Falco.
See your installation's [documentation](https://falco.org/docs/)
if you need help finding the file.

In the configuration file,
find the line that begins `- macro: network_tool_procs`. 
Copy the following directly below it: 

```
- list: network_tool_binaries
  append: true
  items: [fierce, dnsenum, amass, dnsrecon, sublist3r, theharvester, recon-ng, netdiscover, amap, enum4linux, onesixtyone]
```

In the configuration file, find the line that begins `Netcat Remote Code Execution in Container`. 
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

Trigger:
Trigger starting a command with the followings and ending with /etc/ssh/sshd_config
I.e. nano /etc/ssh/sshd_config
nano, vim, gedit, kwrite, vi, pico, micro, jed, emacs
```

In the configuration file, find the line that begins `Delete or rename shell history`. 
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

In the configuration file, find the line that begins `Delete Bash History`. 
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

- rule: Set Setuid or Setgid bit
  desc: >
    When the setuid or setgid bits are set for an application,
    this means that the application will run with the privileges of the owning user or group respectively.
    Detect setuid or setgid bits set via chmod
  condition: >
    consider_all_chmods and chmod and (evt.arg.mode contains "S_ISUID" or evt.arg.mode contains "S_ISGID")
    and not proc.name in (user_known_chmod_applications)
    and not exe_running_docker_save
  output: >
    Setuid or setgid bit is set via chmod (fd=%evt.arg.fd filename=%evt.arg.filename mode=%evt.arg.mode user=%user.name process=%proc.name
    command=%proc.cmdline container_id=%container.id container_name=%container.name image=%container.image.repository:%container.image.tag)
  priority:
    NOTICE
  tags: [process, mitre_persistence]
```

In the configuration file, find the line that begins `Clear Log Activities`. 
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

##### Download the Logz.io certificate

```shell
wget https://raw.githubusercontent.com/logzio/public-certificates/master/COMODORSADomainValidationSecureServerCA.crt
```

Copy the certificate to the proper location

```
sudo mkdir -p /etc/pki/tls/certs
sudo cp COMODORSADomainValidationSecureServerCA.crt /etc/pki/tls/certs/
```

##### Configure Falco to output JSON logs

Open Falco’s configuration file with your preferred text editor. The default location is `/etc/falco/falco.yaml` but it depends on your installation. 

```
$nano /etc/falco/falco.yaml
```
In the configuration file,
find the line that begins `json_output:`.
Set the value to `true`:

```
json_output: true

# When using json output, whether or not to include the "output" property
# itself (e.g. "File below a known binary directory opened for writing
# (user=root ....") in the json output.
json_include_output_property: true
```

Next, look up the filepath to Falco's logs. 

In the same configuration file, find the line that begins `filename:`. Its value points to Falco's event logs and will be needed in the next step to replace the placeholder `<<filepath-to-falco-events.txt>>`. 
Copy the filepath and save it for the next step. You'll need it to configure Filebeat. 

```
file_output:
  enabled: true
  keep_alive: false
  filename: ./events.txt
```
Save and Exit the falco.yaml file.

##### Add Falco as an input

In the Filebeat configuration file (/etc/filebeat/filebeat.yml), add Falco to the filebeat.inputs section.

{% include log-shipping/replace-vars.html token=true %}

Replace the placeholder `<<filepath-to-falco-events.txt>>` with the filepath from the previous step. 

```yaml
############################# Input #####################################
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
  
#For version 6.x and lower uncomment the line below and remove the line after it 
#filebeat.registry_file: /var/lib/filebeat/registry 
 
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
    
############################# Output ##########################################
output.logstash:
  hosts: ["<<LISTENER-HOST>>:5015"]
  ssl:
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
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
    certificate_authorities: ['/etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt']
```

##### Start Filebeat

Start or restart Filebeat for the changes to take effect.

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana).

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>