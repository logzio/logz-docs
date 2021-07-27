---
title: Ship Linux logs
short-description: Send logs directly from your Linux machine with a single command.
logo:
  logofile: linux.svg
  orientation: vertical
data-source: Linux
templates: ["no-template"]
contributors:
  - imnotashrimp
shipping-tags:
  - os
  - popular
order: 80
---
#### Configuration

**Before you begin, you'll need**:

* Root access
* Port 5000 open

<div class="tasklist">

##### Run the rsyslog configuration script

{% include log-shipping/log-shipping-token.html %}

{% include log-shipping/listener-var.html %} 

```shell
curl -sLO https://github.com/logzio/logzio-shipper/raw/master/dist/logzio-rsyslog.tar.gz \
  && tar xzf logzio-rsyslog.tar.gz \
  && sudo rsyslog/install.sh -t linux -a "<<LOG-SHIPPING-TOKEN>>" -l "<<LISTENER-HOST>>"
```


The above assumes the following defaults:

* Log location - `/var/log/`
* Log type - `syslog`

##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then [open Kibana](https://app.logz.io/#/dashboard/kibana). You can search for `type:syslog` to filter for your logs. Your logs should be already parsed thanks to the Logz.io preconfigured parsing pipeline.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>