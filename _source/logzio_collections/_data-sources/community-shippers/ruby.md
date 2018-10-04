---
layout: article
title: Ship Ruby data
tags:
  - community-integrations
  - community-shippers
community-project: true
logo:
  logofile: ruby.svg
  orientation: vertical
shipping-summary:
  data-source: Ruby code
  appenders:
    - LogstashLogger
third-party-homepage: https://github.com/dwbutler/logstash-logger
contributors:
  - imnotashrimp
---

## Ruby LogstashLogger setup

LogstashLogger sends JSON logs to Logstash using the Ruby `Logger` class.

### Add the dependency to your project

{: .tasklist}
1. Add LogstashLogger to your Gemfile.

    ```ruby
    gem 'logstash-logger'
    ```

2. In the command line, run Bundler.

    ```shell
    bundle
    ```

### Configure your project

{% include log-shipping/your-account-token.html %}

{% include log-shipping/your-listener-url.html %}

```ruby
require 'logstash-logger'
config = LogStashLogger.configure do |config|
  config.customize_event do |event|
  event["token"] = "{account-token}"
  end
end
logger = LogStashLogger.new(type: :tcp, host:'{listener-url}', port:5050)
logger.info 'test'
```

