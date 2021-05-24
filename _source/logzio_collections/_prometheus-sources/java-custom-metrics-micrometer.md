---
title: Send custom metrics from your Java code with Micrometer
logo:
  logofile: micrometer.svg
  orientation: vertical
open-source:
  - title: Micrometer custom metrics
    github-repo: micrometer-registry-logzio
    maven: test
data-source: Micrometer for custom metrics
flags:
  logzio-plan:  
  beta: false
templates: ["docker"]
contributors:
  - yotamloe
  - yberlinger
shipping-tags:  
  - prometheus
  - custom-metrics
order: 850
---


[Micrometer](https://micrometer.io/) provides a simple facade over the instrumentation clients for the most popular monitoring systems, allowing you to instrument your JVM-based application code without vendor lock-in.
Logz.io's Micrometer metrics registry sends your custom metrics to your Logz.io account.


## Usage:

#### Via Maven:

```
<dependency>
    <groupId>io.logz.micrometer</groupId>
    <artifactId>micrometer-registry-logzio</artifactId>
    <version>1.0</version>
</dependency>
```

#### Via Gradle:
```j
implementation 'io.logz.micrometer:micrometer-registry-logzio:1.0'
```

#### Import in your package:
```java
import io.micrometer.logzio.LogzioConfig;
import io.micrometer.logzio.LogzioMeterRegistry;
```

## Quick start:
   
Replace the placeholders in the code (indicated by the double angle brackets `<< >>`) to match your specifics.

| Environment variable | Description |Required/Default|
|---|---|---|
|listener-url|  The Logz.io Listener URL for for your region, configured to use port **8052** for http traffic, or port **8053** for https traffic. For more details, see the [Regions page](https://docs.logz.io/user-guide/accounts/account-region.html) | Required|
|metrics-token | The Logz.io Prometheus Metrics account token. Find it under **Settings > Manage accounts**. [Look up your Metrics account token.](https://docs.logz.io/user-guide/accounts/finding-your-metrics-account-token/)  | Required|
|interval | The interval in seconds, to push metrics to Logz.io  | Required|

#### In your package:
```java
package your_package;
import io.micrometer.core.instrument.*;
import io.micrometer.core.instrument.Timer;
import io.micrometer.logzio.LogzioConfig;
import io.micrometer.logzio.LogzioMeterRegistry;

class MicrometerLogzio {

   public static void main(String[] args) {
       // initilize config
      LogzioConfig logzioConfig = new LogzioConfig() {
         @Override
         public String get(String key) {
            return null;
         }
         @Override
         public String uri() {
            return "<<listener-url>>";
         }

         @Override
         public String token() {
            return "<<metrics-token>>";
         }

         @Override
         public Duration step() {
            return Duration.ofSeconds(<<interval>>);
         }
      };
      // Initialize registry
      LogzioMeterRegistry registry = new LogzioMeterRegistry(logzioConfig, Clock.SYSTEM);
      // Define tags (labels)
      ArrayList<Tag> tags = new ArrayList<>();
      tags.add(Tag.of("env","dev"));

      // Create counter
      Counter counter = Counter
              .builder("counter_example")
              .description("a description of what this counter does") // optional
              .tags(tags) // optional
              .register(registry);
      // Increment your counter
      counter.increment(); 
      counter.increment(2); 
   }
}
```
## Types of metrics 

Refer to the Micrometer [documentation](https://micrometer.io/docs/concepts) for more details.


| Name | Behavior | 
| ---- | ---------- | 
| Counter           | Metric value can only go up or be reset to 0, calculated per `counter.increment(value); ` call. |
| Gauge             | Metric value can arbitrarily increment or decrement, values can set automaticaly by tracking `Collection` size or set manually by `gauge.set(value)`  | 
| DistributionSummary | Metric values captured by the `summary.record(value)` function, the output is a distribution of `count`,`sum` and `max` for the recorded values during the push interval. |
| Timer       | Mesures timing, metric values can be recorded by `timer.record()` call. |

### [Counter](https://micrometer.io/docs/concepts#_counters)
```java
Counter counter = Counter
        .builder("counter_example")
        .description("a description of what this counter does") // optional
        .tags(tags) // optional
        .register(registry);
// Increment your counter
counter.increment(); 
counter.increment(2); 
// The following metric will be created and sent to Logz.io: counter_example_total{env="dev"} 3
```

### [Gauge](https://micrometer.io/docs/concepts#_gauges)
```java
// Create Gauge
List<String> cache = new ArrayList<>(4);
// Track list size
Gauge gauge = Gauge
        .builder("cache_size_gauge_example", cache, List::size)
        .tags(tags)
        .register(registry);
cache.add("1");
// The following metric will be created and sent to Logz.io: cache_size_gauge_example{env="dev"} 1
        
// Track map size
Map<String, Integer> map_gauge = registry.gaugeMapSize("map_gauge_example", tags, new HashMap<>());
map_gauge.put("key",1);
// The following metric will be created and sent to Logz.io: map_gauge_example{env="dev"} 1
        
// set value manually
AtomicInteger manual_gauge = registry.gauge("manual_gauge_example", new AtomicInteger(0));
manual_gauge.set(83);
// The following metric will be created and sent to Logz.io:: manual_gauge_example{env="dev"} 83

```

### [DistributionSummary](https://micrometer.io/docs/concepts#_distribution_summaries)
```java
// Create DistributionSummary
DistributionSummary summary = DistributionSummary
        .builder("summary_example")
        .description("a description of what this summary does") // optional
        .tags(tags) // optional
        .register(registry);
// Record values to distributionSummary
summary.record(10);
summary.record(20);
summary.record(30);
// // The following metrics will be created and sent to Logz.io: 
// summary_example_count{env="dev"} 3
// summary_example_max{env="dev"} 30
// summary_example_sum{env="dev"} 60
```

### [Timer](https://micrometer.io/docs/concepts#_timers)
```java
// Create Timer
Timer timer = Timer
        .builder("timer_example")
        .description("a description of what this timer does") // optional
        .tags(tags) // optional
        .register(registry);
// You can set a value manually
timer.record(1500,TimeUnit.MILLISECONDS);
// You can record the timing of a function
timer.record(()-> {
    try {
        Thread.sleep(1500);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
});
// The following metrics will be created and sent to Logz.io: 
// timer_example_duration_seconds_count{env="dev"} 2
// timer_example_duration_seconds_max{env="dev"} 1501
// timer_example_duration_seconds_sum{env="dev"} 3000

```

