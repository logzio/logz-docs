<!-- info-box-start:info -->
Normally, when you run the OTEL collector in a Docker container, your application will run in separate containers on the same host. In this case, you need to make sure that all your application containers share the same network as the OTEL collector container. One way to achieve this, is to run all containers, including the OTEL collector, with a Docker-compose configuration. Docker-compose automatically makes sure that all containers with the same configuration are sharing the same network.
{:.info-box.note}
<!-- info-box-end -->