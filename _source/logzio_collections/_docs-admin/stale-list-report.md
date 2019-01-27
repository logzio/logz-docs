---
layout: article
title: Stale list report
---


{%- comment -%}
*   Comma-separated list of collections to exclude from the stale list.
*   Anything that isn't a doc (like contributors) should be added to this list.
*         {%- endcomment -%}
{%- assign excludedCollections = "_contributors,_docs-admin,_knowledge-base,_tags" | split: "," -%}

This is a list of all pages in the docs and when they were last updated. Reverse sort by the **committed** column to see which docs are the most stale.

For now, this list needs to be manually generated. So if you feel like updating it, clone the logz-docs repo, run `./make-stale-list.sh`, and commit the changed stale-list.yml.

Future plan is to auto-generate this file at build time so commits aren't necessary.

{% if site.data.stale-list == false or site.data.stale-list == nil -%}
## \*\*\*\*\* NO LIST GENERATED \*\*\*\*\*
{% else %}
## The list

**Generated: {{site.data.stale-list.generated}}**

| committed | author | doc |
|---|---|---|

{%- for i in site.data.stale-list.contents -%}
  {%- assign fileExt = i.filepath | split: "." | last -%}
  {%- assign filepathArray = i.filepath | split: "/" -%}
  {%- if filepathArray[1] == "logzio_collections" -%}
    {%- for ec in excludedCollections -%}
      {%- if ec == filepathArray[2] -%}
        {%- assign skipToNext = true -%}
      {%- endif -%}
    {%- endfor -%}
  {%- endif -%}
  {%- if skipToNext == true %}
    {%- assign skipToNext = false -%}
    {%- continue -%}
  {%- endif -%}
  {%- if fileExt != "md" -%}
    {%- continue -%}
  {%- endif %}
| {{i.committed}} | {{i.author}} | {{i.filepath | remove_first: "_source/"}} |
{%- endfor -%}
{%- endif -%}