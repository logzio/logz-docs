---
title: Replacing your Logz.io public certificate
---

To support encrypted shipping of your logs and metrics,
shipping methods over SSL/TLS use a public certificate
that’s authenticated by a trust chain, issued by a certificate authority.
Lower protocols like TCP need guidance on “who to trust”,
and that guidance includes a certificate that you install in your environment.
All this is so your data can be read by Logz.io,
only after you can be sure we are who we claim to be.

At the end of May 2020, this chain of trust expires,
and we need to rotate certificates
so you can keep sending your data without any issues.

To make sure there’s a smooth transition,
we’ll rotate certificates and establish a new chain of trust
a few days early.

This means you’ll need to update any of your data shipping
configurations that make use of our certificate chain.
Configurations need to be updated before May 28
to avoid disruptions in sending your data to Logz.io.

## What this affects

This affects any shipping method where you send your data over SSL/TLS.
It does not affect data that you’re sending unencrypted or with higher protocols.

This page gives guidance
only for working with the shipping methods covered in the docs.
If you're working with a custom or third party shipping method,
you'll need to check your configurations to see if they're affected.

### What this **does** affect

This could affect you if any of these are true:

* You’re sending data using any Beats shippers
  (such as Filebeat, Metricbeat, or Winlogbeat)
* You’re sending data with Logstash over SSL
* You’ve deployed our Docker images or Kubernetes configmaps

### What this **does not** affect

This does not affect data sent over HTTP or HTTPS, including bulk shipping.
This also does not affect any of the code libraries covered in the docs.

## How to replace your certificate

The actions you need to take depend on how you’re shipping your data.
For shipping methods covered in the docs, these fall into two main categories:

* **If you're managing a shipping app** (such as Filebeat or Metricbeat):
  See _[To replace the certificate file](#replace-the-cert-file)_ (below)
* **If you're shipping with rsyslog**:
  See
  _[To check your rsyslog configuration](#check-rsyslog-config)_
  (below)
* **If you deployed a Docker container managed by Logz.io**:
  See _[To update a Docker container](#update-container)_ (below)
* **If you deployed the Kubernetes Metricbeat configmap**:
  Re-deploy using the instructions in
  _[Ship Kubernetes metrics]({{site.baseurl}}/shipping/metrics-sources/kubernetes.html)_

#### To replace the certificate file {#replace-the-cert-file}

This covers instructions for any of the Beats shippers
(such as Filebeat, Metricbeat, Winlogbeat, or Auditbeat)
and Logstash over SSL.

If you're managing your shipping app
on a VM or another server,
follow the steps below
to overwrite the expiring certificate file
with a new certificate file.

The new certificate file contains both the old and the new certificates,
allowing you to ship data without interruption when we update our listeners.

<div class="tasklist">

##### Download the Logz.io public certificates

The new certificate file contains both the old and the new certificate,
allowing you to ship data without interruption when we update our listeners.

The commands below save the new certificate file
to the location that we recommend in our docs and sample configurations.
Double-check the file paths,
just in case your team uses a different file location.
{:.info-box.important}

###### For Filebeat or Metricbeat (macOS or Linux)

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /etc/pki/tls/certs/COMODORSADomainValidationSecureServerCA.crt
```

###### For Winlogbeat or Filebeat (Windows)

Download the
[Logz.io public certificate](https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt)

* For **Winlogbeat**: Copy to `C:\ProgramData\Winlogbeat\COMODORSADomainValidationSecureServerCA.crt`
* For **Filebeat**: Copy to `C:\ProgramData\Filebeat\Logzio.crt`

###### For Logstash over SSL

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /usr/share/logstash/keys/TrustExternalCARoot.crt
```

##### Check your configuration

Double-check your shipper's configuration file
to make sure it's using the certificate at the location you downloaded it to.

If the certificate location in the configuration doesn't match
where you downloaded the file to,
update the configuration or move the certificate.

###### For a Beats family shipper

The certificate is included
in the `ssl.certificate_authorities` array
in your configuration file.

###### For Logstash over SSL

The certificate is included
in `output` > `lumberjack` > `ssl_certificate` setting
in your configuration file.

##### Restart your shipper and test

Restart your shipper to load the new certificate.

See _[Testing your new configuration](#testing)_ (below)
for information on our testing listeners.

</div>

#### To update a Docker container {#update-container}

This covers instructions for any of the
Docker images or Kubernetes configmaps
managed by Logz.io.

Follow the steps below
to replace your current container
with the latest image.
That image contains both the old and the new certificates,
allowing you to ship data without interruption when we update our listeners.

<div class="tasklist">

##### Pull the latest image

```shell
docker pull logzio/<container-name>:latest
```

##### Stop the old container

```shell
docker stop <container-id>
```

##### Deploy the new image

Run the `docker run` command for the container with the `:latest` tag,
making sure you:

* declare all environment variables,
* mount necessary filepaths, and
* include any other required runtime arguments.

##### Confirm you're getting data

If you launched the container with the `:latest` tag
and you're getting data in your account,
everything's working as expected.

##### Delete the old container

After you've confirmed you received data from the new container,
you can safely delete the old container and image.

</div>

#### To check your rsyslog configuration {#check-rsyslog-config}

These instructions are for an rsyslog setup
that you customized.
The Logz.io rsyslog setup script
does not configure rsyslog to use SSL.
{:.info-box.note}

<div class="tasklist">

##### Check the configuration file

Your rsyslog implementation may or may not be using SSL/TLS over TCP.
To find out, you'll need to check your rsyslog configuration,
typically at `/etc/rsyslog.conf`.

###### If you are using TLS/SSL

Configurations using TLS/SSL over TCP
have two main indicators:

* A line that starts with
  `@@<<LISTENER-HOST>>:5001`
  (specifying TCP output to Logz.io port 5001),
  where `<<LISTENER-HOST>>` is your region's listener address
  (for example, `listener.logz.io` or `listener-eu.logz.io`).
  followed by port **5001**.
* Your file specifies a certificate to be used,
  often starting with `$DefaultNetstreamDriverCAFile`.

If you see these things in your conf file,
you'll need to overwrite the existing certificate
with the new file that contains
both the old and the new certificates:

```shell
sudo curl https://raw.githubusercontent.com/logzio/public-certificates/master/TrustExternalCARoot_and_USERTrustRSAAAACA.crt --create-dirs -o /path/to/your/certificate/file.crt
```

###### If you're not using TLS/SSL

On the other hand, if you see something like
`@@<<LISTENER-HOST>>:5000;moreDirectives;TLS:NO`
and no certificate specified in the conf file,
you don't need to do anything.
Your data will continue to ship
both before and after the cutover time.

You can end here.

##### _(If needed)_ Test the new certificate

If you're using TLS/SSL over TCP,
See _[Testing your new configuration](#testing)_ (below)
for information on our testing listeners.

</div>

## Testing your new configuration {#testing}
<!-- THIS WILL BE LINKED FROM AN EMAIL. DO NOT CHANGE THIS LINK. -->

{% include trust-chain-testing.html %}
