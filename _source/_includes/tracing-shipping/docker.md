##### Pull the Docker image for the OpenTelemetry collector

```shell
docker pull logzio/otel-collector-traces
```

<!-- info-box-start:info -->
This integration only works with an otel-contrib image. The logzio/otel-collector-traces image is based on otel-contrib.
{:.info-box.important}
<!-- info-box-end -->


##### Run the container

<!-- info-box-start:info -->
Make sure that all docker containers that send spans to the collector are sharing the same network and can access the relevant collector ports.
{:.info-box.important}
<!-- info-box-end -->
 
When running on a Linux host, use the `--network host` flag to publish the collector ports:

```
docker run \
-e LOGZIO_REGION=<<LOGZIO_ACCOUNT_REGION_CODE>> \
-e LOGZIO_TRACES_TOKEN=<<TRACING-SHIPPING-TOKEN>> \
--network host \
logzio/otel-collector-traces
```

When running on MacOS or Windows hosts, publish the ports using the `-p` flag:

```
docker run \
-e LOGZIO_REGION=<<LOGZIO_ACCOUNT_REGION_CODE>> \
-e LOGZIO_TRACES_TOKEN=<<TRACING-SHIPPING-TOKEN>> \
-p 55678-55680:55678-55680 \
-p 1777:1777 \
-p 9411:9411 \
-p 9943:9943 \
-p 6831:6831 \
-p 6832:6832 \
-p 14250:14250 \
-p 14268:14268 \
-p 4317:4317 \
-p 55681:55681 \
logzio/otel-collector-traces
```