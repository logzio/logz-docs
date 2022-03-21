---
title: Ship MongoDB logs
logo:
  logofile: mongo-logo.png
  orientation: vertical
data-source: MongoDB
data-for-product-source: Logs
templates: [beats-logs]
contributors:
  - nshishkin
shipping-tags:
  - database
order: 120
---
MongoDB is a source-available cross-platform document-oriented database program. Fluentd is an open source data collector and a great option because of its flexibility. This integration lets you send logs from your MongoDB instances to your Logz.io account using Fluentd.


#### Step by step

**Before you begin, you'll need**:

* MongoDB installed on your host
* Fluentd installed on your host
<div class="tasklist">


##### Configure MongoDB to write logs to a file

In the configuration file of your MongoDB instance, set the database to write logs to a file. You can skip this step if this has already been configured on your MongoDB host.

To do this, add the following to your MongoDB configuration file:


```yaml
systemLog:
   destination: file
   path: "<<MONGODB-FILE-PATH>>"
   logAppend: true
```

* Replace `<<MONGODB-FILE-PATH>>` with the path to the log file, for example, `/var/log/mongodb/mongod.log`.

##### Create a log.pos file

In your preffered directory, create an empty file named `fluentd-mongodb.log.pos`. This file ensures that with the start of each log shipping session, new logs are sent from the point in time when the last log shipping session has finished.

##### Create a Gemfile for Fluentd

In your preffered directory, create a Gemfile with the following content:

```ruby
source "https://rubygems.org"
# You can use fixed version of Fluentd and its plugins
# Add plugins you want to use
gem "fluent-plugin-logzio", "0.0.21"
gem "fluent-plugin-record-modifier"
```


##### Install Fluentd and the Logz.io plugin


```shell
gem install fluentd fluent-plugin-logzio
```

##### Set up Fluentd

```shell
fluentd --setup ./fluent
```

##### Configure Fluentd with Logz.io output

Add this code block to your Fluent configuration file (`fluent.conf` by default).

See the configuration parameters below the code block.👇

```conf
# To ignore fluentd logs
<label @FLUENT_LOG>
  <match fluent.*>
    @type null
  </match>
</label>
# Tailing mongodb logs
<source>
  @type tail
  @id mongodb_logs
  path <<MONGODB-FILE-PATH>>
  # If you're running on windows, change the pos_file to a Windows path
  pos_file /var/log/fluentd-mongodb.log.pos
  tag logzio.mongodb.*
  read_from_head true
  <parse>
    @type json
  </parse>
</source>
# Parsing the logs
<filter logzio.mongodb.**>
  @type record_modifier
  <record>
    type  mongodb-fluentd
    message ${record["msg"]}
    mongodb_timestamp ${record["t"]["$date"]}
    log_id ${record["id"].to_s}
  </record>
  remove_keys msg,t,id
</filter>
# Sending logs to Logz.io
<match logzio.mongodb.**>
  @type logzio_buffered
  endpoint_url https://listener.logz.io:8071?token=<<LOGZIO-SHIPPING-TOKEN>>
  output_include_time true
  output_include_tags true
  http_idle_timeout 10
  <buffer>
      @type memory
      flush_thread_count 4
      flush_interval 3s
      chunk_limit_size 16m      # Logz.io bulk limit is decoupled from chunk_limit_size. Set whatever you want.
      queue_limit_length 4096
  </buffer>
</match>
```

###### Parameters

| Parameter | Description |
|---|---|
| `<<MONGODB-FILE-PATH>>` | Path to the log file of your MongoDB. |
| endpoint_url | A url composed of your Logz.io region's listener URL, account token, and log type. {% include log-shipping/listener-var.html %} {% include log-shipping/log-shipping-token.html %} |
| output_include_time | To add a timestamp to your logs when they're processed, `true` (recommended). Otherwise, `false`. |
| output_include_tags | To add the `fluentd` tag to logs, `true`. Otherwise, `false`. If `true`, use in combination with `output_tags_fieldname`. |
| output_tags_fieldname | If `output_include_tags` is `true`, sets output tag's field name. The default is `fluentd_tag` |
| http_idle_timeout | Time, in seconds, that the HTTP connection will stay open without traffic before timing out. |



##### Allow Fluentd to read from the MongoDB log file

Allow Fluend to read from the MongoDB log file by setting the read access as follows:

###### On macOS and Linux

```shell
sudo chmod 604 <<PATH-TO-LOG-FILE>>
```

* Replace `<<PATH-TO-LOG-FILE>>` with the path to the MongoDB log file.


###### On Windows

Enable the read access in the file properties.



##### Run Fluentd

```shell
fluentd -c ./fluent.conf --gemfile <<PATH-TO-GEMFILE>>/Gemfile
```

* Replace `<<PATH-TO-GEMFILE>>` with the path to the Gemfile you created previously.



##### Check Logz.io for your logs

Give your logs some time to get from your system to ours, and then open [Kibana](https://app.logz.io/#/dashboard/kibana). You can search for `type:mongodb-fluentd` to filter for your MongoDB logs. Your logs should be already parsed thanks to the Logz.io preconfigured parsing pipeline.

If you still don't see your logs, see [log shipping troubleshooting]({{site.baseurl}}/user-guide/log-shipping/log-shipping-troubleshooting.html).

</div>
