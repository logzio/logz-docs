---
layout: article
title: Staleness report
show-date: false
sitemap: false
noindex: true
---

This is a list of all pages in the docs and when they were last updated.
This list is sorted by **date-time** to see which docs are the most stale.

{% if site.data.stale-list == false or site.data.stale-list == nil -%}
## \*\*\*\*\* NO LIST GENERATED \*\*\*\*\*

You're seeing this message because the staleness report didn't run. Make sure your build process runs `build.sh`.

To get the staleness report offline, clone the logz-docs repo, run `preview.sh`, and visit this page ({{page.url}}).

{% else %}

{%- comment -%}
*   Comma-separated list of collections to exclude from the stale list.
*   Anything that isn't a doc (like contributors) should be added to this list.
*   Use collection name only, not the folder name.
*         {%- endcomment -%}
{%- assign excludedCollections = "contributors,docs-admin,knowledge-base,tags" | split: "," -%}

{%- comment -%}
*   Create empty array of table rows
*         {%- endcomment -%}
{%- assign tableRows = "" | split: "" -%}

{%- comment -%}
*   Loop through pages
*         {%- endcomment -%}
{% for p in site.pages -%}

  {%- comment -%}
  *   If this page doesn't have a .md or .html extension, skip to next forloop
  *   iteration
  *         {%- endcomment -%}
  {%- assign fileExt = p.path | split: "." | last -%}
  {%- unless fileExt == "md" or fileExt == "html" -%}
    {%- continue -%}
  {%- endunless -%}


  {%- comment -%}
  *   Prepend this page's filepath so it can match format in stale-list.yml
  *         {%- endcomment -%}
  {%- assign thisPath = p.path | prepend: "_source/" -%}

  {%- comment -%}
  *   Find record in stale-list.yml that matches the filepath of this page
  *         {%- endcomment -%}
  {%- assign thisRecord = site.data.stale-list.contents | where: "filepath", thisPath | first %}
  {%- capture thisRow -%}
    | {{thisRecord.committed}} | {{thisRecord.author}} | [{{p.title | default: p.path }}]({{p.url}}) |
  {% endcapture -%}

  {%- comment -%} Convert thisRow to array {%- endcomment -%}
  {%- assign thisRow = thisRow | split: "%" -%}

  {%- comment -%} Add thisRow to end tableRows {%- endcomment -%}
  {%- assign tableRows = tableRows | concat: thisRow -%}
{% endfor %}

{%- comment -%}
*   Now loop through collection documents
*         {%- endcomment -%}
{% for d in site.documents -%}

  {%- comment -%}
  *   If this collection is in the excludedCollections list, skip to next
  *   forloop iteration
  *         {%- endcomment -%}
  {%- assign isExcluded = excludedCollections | map: d.collection | join: "" -%}
  {%- unless isExcluded == "" -%}
    {%- continue -%}
  {%- endunless -%}

  {%- comment -%}
  *   Prepend this document's filepath so it can match format in stale-list.yml
  *         {%- endcomment -%}
  {%- assign thisPath = d.path | prepend: "_source/logzio_collections/" -%}

  {%- comment -%}
  *   Find record in stale-list.yml that matches the filepath of this document
  *         {%- endcomment -%}
  {%- assign thisRecord = site.data.stale-list.contents | where: "filepath", thisPath | first %}
  {%- capture thisRow -%}
    | {{thisRecord.committed}} | {{thisRecord.author}} | [{{d.title}}]({{d.url}}) |
  {% endcapture -%}

  {%- comment -%} Convert thisRow to array {%- endcomment -%}
  {%- assign thisRow = thisRow | split: "%" -%}

  {%- comment -%} Add thisRow to end tableRows {%- endcomment -%}
  {%- assign tableRows = tableRows | concat: thisRow -%}
{% endfor %}

## The list

**Generated: {{site.data.stale-list.generated}}**

| date-time | committed by | link |
|---|---|---|
{{tableRows | sort}}

{% endif -%}