---
layout: article
title: Staleness report
---


{%- comment -%}
*   Comma-separated list of collections to exclude from the stale list.
*   Anything that isn't a doc (like contributors) should be added to this list.
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
  *   If this page doesn't have a .md extension, skip to next forloop iteration
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


This is a list of all pages in the docs and when they were last updated.
Reverse sort by the **committed** column to see which docs are the most stale.

{% if site.data.stale-list == false or site.data.stale-list == nil -%}
## \*\*\*\*\* NO LIST GENERATED \*\*\*\*\*

For now, this list needs to be manually generated offline.
To get the staleness report, clone the logz-docs repo, run `./make-stale-list.sh`, and visit this page ({{page.url}}).

Future plan is to auto-generate this file at build time so it will be available online.

{% else %}
## The list

**Generated: {{site.data.stale-list.generated}}**

| committed | author | link |
|---|---|---|
{{tableRows}}

{% endif -%}