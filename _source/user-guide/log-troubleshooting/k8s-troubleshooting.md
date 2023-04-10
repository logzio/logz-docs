---
layout: article
title: Troubleshooting Fluentd for Kubernetes logs
permalink: /user-guide/kubernetes-troubleshooting/
description: Learn about most common errors and remedies when running Fluentd for Kubernetes logs
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
flags:
  logzio-plan: community
contributors:
  - nshishkin
---

This section contains some guidelines for handling errors that you may encounter when trying to run Fluentd to collect Kubernetes logs.

* toc list
{:toc}

## Problem: /file/path.log unreadable

The following error appears when running Fluentd:

```shell
/file/path.log unreadable. it is excluded and would be examined next time
```

### Possible cause
{:.no_toc}

You may need to add more volume and volume mount to your Daemonset.

### Suggested remedy
{:.no_toc}

<div class="tasklist">


##### Check on which node your pod is running

Find out on which node your Fluentd pod with the errors is running. To do so, use this command:

```shell
kubectl -n <<NAMESPACE>> get pod <<FLUENTD-POD-NAME>> -owide
```
  
##### Connect to the node

Connect to the node you found in the previous step (ssh, etc...).

##### Find the log's path

1. Run the following command, to go to the logs directory:

```shell
cd /var/log/containers
```

2. Run the following command to display the log files symlinks:

```shell
ls -ltr
```

This command should present you a list of your log files and their symlinks, for example:

```shell
some-log-file.log -> /var/log/pods/file_name.log
```

3. Choose one of those logs, copy the symlink, and run the following command:

```shell
ls -ltr /var/log/pods/file_name.log
```

Again, this command will output the file and its symlink, or example:

```shell
/var/log/pods/file_name.log -> /some/other/path/file.log
```

This directory (`/some/other/path`) is the directory where your log files are mounted at the host. You'll need to add that path to your Daemonset.

##### Add the mount path to your Daemonset

1. Open your Daemonset in your preffered text editor.
2. In the `volumeMounts` section, add the following:

```yaml
- name: logextramount
  mountPath: <<MOUNT-PATH>>
  readOnly: true
```

Replace `<<MOUNT-PATH>>` with the directory path you found in step 3.

3. In the `volumes` section, add the following:

```yaml
- name: logextramount
  hostPath:
    path: <<MOUNT-PATH>>
```

Replace `<<MOUNT-PATH>>` with the directory path you found in step 3.

4. Save the changes.

##### Deploy your new Daemonset.

Remove your previous Daemonset from the cluster, and apply the new one.

<!-- info-box-start:info -->
Applying the new Daemonset without removing the old one will not apply the changes.
{:.info-box.note}
<!-- info-box-end -->



##### Check your Fluentd pods to ensure that the error is gone

```shell
kubectl -n <<NAMESPACE>> logs <<POD-NAME>>
```
  
##  Problem: You have reached your pull rate limit

vIn some cases (i.e. spot clusters) where the pods or nodes are replaced frequently, they might reach the pull rate limit for images pulled from dockerhub with the following error:

```yaml
You have reached your pull rate limit. You may increase the limit by authenticating and upgrading: 
https://www.docker.com/increase-rate-limits
```

#### Suggested remedy
{:.no_toc}

You can use the following `--set` commands to use an alternative image repository:

For the monitoring chart and the Telemetry Collector Kubernetes installation:

`--set logzio-fluentd.image.repository=public.ecr.aws/c3d4d8b6/logzio-fluentd`

For the fluentd chart:

`--set image.repository=public.ecr.aws/c3d4d8b6/logzio-fluentd`
