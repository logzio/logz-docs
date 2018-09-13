---
layout: article
title: Ruby data
permalink: /user-guide/integrations/community-integrations/code-library--ruby.html
shipping-summary:
  data-source: Ruby code
  appenders:
    - LogstashLogger
third-party-homepage: https://github.com/dwbutler/logstash-logger
contributors:
  - imnotashrimp
---

## Ruby LogstashLogger

LogstashLogger sends JSON logs to Logstash using the Ruby `Logger` class.

### Installation in your code

#### Dependency

{: .tasklist}
1. Add LogstashLogger to your Gemfile.

    ```ruby
    gem 'logstash-logger'
    ```

2. In the command line, run Bundler.

    ```shell
    bundle
    ```

### Configuration

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

