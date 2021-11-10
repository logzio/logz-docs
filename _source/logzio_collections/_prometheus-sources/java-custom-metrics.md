---
title: Send custom metrics from your Java code
logo:
  logofile: java.svg
  orientation: vertical
open-source:
  - title: Java custom metrics
    github-repo: micrometer-registry-logzio
    maven: test
data-source: Java custom metrics
data-for-product-source: Metrics
flags:
  logzio-plan:  
  beta: false
templates: ["docker"]
contributors:
  - yotamloe
  - yberlinger
  - nshishkin
shipping-tags:  
  - prometheus
  - custom-metrics
order: 720
---

Deploy this integration to send custom metrics from your Java application to Logz.io, using [Micrometer](https://micrometer.io/). The dedicated Logz.io Micrometer metrics registry sends custom metrics from your Java application to your Logz.io account.

**Before you begin, you'll need**:
Java 11 or higher 

<!-- info-box-start:info -->
This integration currently works with Java 11 or higher. Support for earlier versions is in development and is expected later this year.
{:.info-box.important}
<!-- info-box-end -->


## Send Custom metrics from your JAVA application to Logz.io

### Usage:

#### Via maven:

```xml
<dependency>
    <groupId>io.logz.micrometer</groupId>
    <artifactId>micrometer-registry-logzio</artifactId>
    <version>1.0.1</version>
</dependency>
```

#### Via gradle groovy:
```groovy
implementation 'io.logz.micrometer:micrometer-registry-logzio:1.0.1'
```

#### Via gradle Kotlin:
```kotlin
implementation("io.logz.micrometer:micrometer-registry-logzio:1.0.1")
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
|LISTENER-HOST|  The full Logz.io Listener URL for for your region, configured to use port **8052** for http traffic, or port **8053** for https traffic (example: https://listener.logz.io:8053). For more details, see the [regions page](https://docs.logz.io/user-guide/accounts/account-region.html) in logz.io docs | Required|
|PROMETHEUS-METRICS-SHIPPING-TOKEN | The Logz.io Prometheus Metrics account token. Find it under **Settings > Manage accounts**. [Look up your Metrics account token.](https://docs.logz.io/user-guide/accounts/finding-your-metrics-account-token/)  | Required|
|interval | The interval in seconds, to push metrics to Logz.io **Note that your program will need to run for at least one interval for the metrics to be sent**  | Required|

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
            return ""https://<<LISTENER-HOST>>:8053";
            // example:
            // return "https://listener.logz.io:5053"; 
         }

         @Override
         public String token() {
            return "<<PROMETHEUS-METRICS-SHIPPING-TOKEN>>";
         }

         @Override
         public Duration step() {
            return Duration.ofSeconds(<<interval>>);
            // example:
            // return Duration.ofSeconds(30);                    
         }
      };
      // Initialize registry
       LogzioMeterRegistry registry = new LogzioMeterRegistry(logzioConfig, Clock.SYSTEM);
       // Define tags (labels)
       ArrayList<Tag> tags = new ArrayList<>();
       tags.add(Tag.of("env","dev-micrometer"));

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

## Common tags
You can attach common tags to your registry that will be added to all metrics reported, for example:

```java
// Initialize registry
LogzioMeterRegistry registry = new LogzioMeterRegistry(logzioConfig, Clock.SYSTEM);
// Define tags (labels)
registry.config().commonTags("key", "value");
```

## Meter binders
Micrometer provides a set of binders for monitoring JVM metrics out of the box, for example:

```java
// Initialize registry
LogzioMeterRegistry registry = new LogzioMeterRegistry(logzioConfig, Clock.SYSTEM);

// Gauges buffer and memory pool utilization
new JvmMemoryMetrics().bindTo(registry);
// Gauges max and live data size, promotion and allocation rates, and times GC pauses
new JvmGcMetrics().bindTo(registry);
// Gauges current CPU total and load average.
new ProcessorMetrics().bindTo(registry);
// Gauges thread peak, number of daemon threads, and live threads
new JvmThreadMetrics().bindTo(registry);
// Gauges loaded and unloaded classes
new ClassLoaderMetrics().bindTo(registry);

// File descriptor metrics gathered by the JVM
new FileDescriptorMetrics(tags).bindTo(registry);
// Gauges The uptime and start time of the Java virtual machine
new UptimeMetrics(tags).bindTo(registry);

// Counter of logging events
new LogbackMetrics().bindTo(registry);
new Log4j2Metrics().bindTo(registry);
```

For more information about other binders, visit the [Micrometer-core](https://github.com/micrometer-metrics/micrometer/tree/main/micrometer-core/src/main/java/io/micrometer/core/instrument/binder) GitHub repo.

## Meter types 

Refer to the Micrometer [documentation](https://micrometer.io/docs/concepts) for more details.


| Name | Behavior | 
| ---- | ---------- | 
| Counter           | Metric value can only go up or be reset to 0: Calculated per `counter.increment(value); ` call |
| Gauge             | Metric value can arbitrarily increment or decrement: Values can be set automatically by tracking `Collection` size, or can be set manually by `gauge.set(value)`  | 
| DistributionSummary | Metric values captured by the `summary.record(value)` function: The output is a distribution of `count`,`sum`, and `max` for the recorded values during the push interval |
| Timer       | Measures timing: Metric values can be recorded by `timer.record()` call |

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




##### Run your application

Run your application to start sending metrics to Logz.io.


##### Check Logz.io for your metrics

Give your metrics some time to get from your system to ours, and then open [Metrics dashboard](https://app.logz.io/#/dashboard/metrics/discover?).

