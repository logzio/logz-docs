# Working with the data shipping docs

We organize shippers using Jekyll collections. At the time of this writing, those collections are:

- **log-sources**: Any data source that generates logs. Stored at `_source/logzio_collections/_log-sources/`.
- **metrics-sources**: Any data source that generates metrics. Stored at `_source/logzio_collections/_metrics-sources/`.
- **shippers**: Anything that's not a data source, but a way to get logs or metrics to us. Stored at `_source/logzio_collections/_shippers/`.
- **community-shippers**: Anything that's a third party project that ships to Logz.io, but we don't own, maintain, or test it. Stored at `_source/logzio_collections/_community-shippers/`.
- **tracing-sources**: Any data source that generates traces and spans. Stored at `_source/logzio_collections/_tracing-sources`
- **security-sources**: Any data source that generates Cloud SIEM content. Stored at `_source/logzio_collections/_security-sources`
- **p8s-sources**: Any data source that generates Prometheus As A Service (PAAS) metrics. Stored at `_source/logzio_collections/_p8s-sources/`.

Shipper collections & templating are handled through these files:

* **_config.yml**: Jekyll config file, which is where all collections are declared. If you want to add another shipping category (for example, traces), it needs to be here first.
* **_source/_data/shipper-tabs.yml**: Feeds the shipping landing page - including the tabs and the cards. Usage is explained in file comments.
* **_source/shipping/index.html**: The index page for the shipping docs. Loops over the array and tags, and generates the page.
* **_source/_includes/log-shipping/in-app-configuration.html**: If a page has a configuration component in-app, use this include. This is currently used for Filebeat (which has the cofiguration button) and the S3 pages (which has the S3 credentials component).
* **_source/_includes/log-shipping/replace-vars.html**: For the reusable for replacing shipping token and listener host.

## Community shippers

While these are actual markdown files in our repo, the template doesn't generate html files for these pages. Rather, it uses the page frontmatter to create a card on the shipping page, and links out to the project's home page.

### Community shippers file naming convention

Community shippers are organized alphabetically by their filename (ending in `.md`).

To keep all similar projects together, we follow this naming convention:

`<category>--<project-repo-name>.md`

For instance, here's what's in the folder at time of writing. On the shipping page, these are organized alphabetically by filename, so all the .NET projects are together (starting with `dotnet--`), PHP projects are together (starting with `php--`, etc.):

```
_source/logzio_collections/_community-shippers
├── angular--angular1-logzio-logging.md
├── ansible--jmcvetta-logzio.md
├── dotnet--logzio-nlog.md
├── dotnet--serilog-sinks-logzio--asperheim.md
├── dotnet--serilog-sinks-logzio--mantasaudickas.md
├── fluentd--fluentd-logzio.md
├── go--logruzio.md
├── go--logzio-client-library.md
├── ios--justlog.md
├── kubernetes--fluentd-logzio-kubernetes.md
├── laravel--laravel-logzio.md
├── node--logzio-node-debug.md
├── office-365--o365beat.md
├── php--elastica-logzio.md
├── php--php-logger.md
├── puppet--puppet-logzio_shipper.md
├── ruby--logstashlogger.md
├── terraform--logzio-terraform-provider.md
└── tyk--tyk-pump.md
```

## Frontmatter

### Community shipper frontmatter

#### Structure

| Key | Description |
|---|---|
| title | Project name. To find this, check the readme and the project description for a human-readable title. If you don't find one, use the repo name. |
| project-url | Full URL of the project. |
| logo.logofile | Filename only. Template prepends the path `https://dytvr9ot2sszz.cloudfront.net/logz-docs/shipper-logos` |
| logo.orientation | `horizontal` or `vertical` (most often, it's vertical). Controls logo resizing on the shipping page. |
| data-source | Title for the shipper card on the log shipping page. |
| shipping-tags | Array of tags. See _source/_data/shipper-tabs.yml for tag options. |

#### Sample

```yaml
---
title: laravel-logzio
project-url: "https://github.com/oanhnn/laravel-logzio"
logo:
  logofile: laravel.svg
  orientation: vertical
data-source: Laravel code
shipping-tags:
  - from-your-code
---
```

### Other shipping docs frontmatter

#### Structure

| Key | Description |
|---|---|
| title | Project name. To find this, check the readme and the project description for a human-readable title. If you don't find one, use the repo name. |
| logo.logofile | Filename only. Template prepends the path `https://dytvr9ot2sszz.cloudfront.net/logz-docs/shipper-logos` |
| logo.orientation | `horizontal` or `vertical` (most often, it's vertical). Controls logo resizing on the shipping page. |
| open-source | **Optional**, included when we're documenting one of our open source projects. (See _open-source array_, below) |
| data-source | Title for the shipper card on the log shipping page. |
| contributors | Array of contributors. Each item must match filename stub (no extension) found in `_source/logzio_collections/_contributors/`. |
| shipping-tags | Array of tags. See _source/_data/shipper-tabs.yml for tag options. |

#### open-source array

`open-source` is an array of objects. Each object has this structure:

| Key | Description |
|---|---|
| title | Human-readable name for the project. If it doesn't have one, give it one and make sure it's included in a PR for the project's readme. |
| github-repo | GitHub repo name only. The template will prepend our GitHub details to create a proper link. |

#### Sample

```yaml
---
title: Ship EC2 Auto Scaling metrics
logo:
  logofile: aws-ec2-auto-scaling.svg
  orientation: vertical
data-source: EC2 Auto Scaling
open-source:
  - title: Docker Metrics Collector
    github-repo: docker-collector-metrics
contributors:
  - imnotashrimp
shipping-tags:
  - aws
---
```
