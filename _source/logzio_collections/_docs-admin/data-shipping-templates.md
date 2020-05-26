---
layout: article
title: Data shipping templates
show-date: false
---

{%- assign tabs = site.data.shipper-tabs.tabs | where:"templated",true -%}

{%- comment -%} Create empty arrays {%- endcomment -%}
{%- assign shippingCollections = "" | split: "" -%}
{%- assign templates = "" | split: "" -%}

{%- comment -%} Now add shipping docs to the array {%- endcomment -%}
{%- for tab in tabs -%}
  {%- assign thisCollection = site.collections |  where: "label", tab.collection | first -%}
  {%- assign thisCollectionDocs = thisCollection.docs | sort_natural: "data-source" -%}
  {%- assign shippingCollections = shippingCollections | concat: thisCollectionDocs -%}
{%- endfor -%}

{%- comment -%} Generate the table of all shipping sources {%- endcomment -%}
| Source | Data | Templates | Open source projects |
|---|---|---|
{%- for doc in shippingCollections %}
| {{ doc.data-source -}}
  | {{ doc.collection | split: "-" | first -}}
  | {{ doc.templates | inspect -}}
  | {%- if doc.open-source -%}
      {%- for project in doc.open-source -%}
        [ {{- project.title -}} ]( {{- project.github-repo -}} )
        {%- unless forloop.last -%} , <br> {%- endunless -%}
      {%- endfor -%}
    {%- endif -%}
  |
{%- endfor -%}
