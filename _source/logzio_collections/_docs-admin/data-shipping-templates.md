---
layout: article
title: Data shipping templates
show-date: false
---

###### On this page
{:.no_toc}

* item
{:toc}

{% assign tabs = site.data.shipper-tabs.tabs | where:"templated",true -%}

{% comment -%} Build the array of shipping {%- endcomment -%}
{%- assign shippingCollections = "" | split: "" -%}
{%- for tab in tabs -%}
  {%- assign thisCollection = site.collections |  where: "label", tab.collection | first -%}
  {%- assign thisCollectionDocs = thisCollection.docs | sort_natural: "data-source" -%}
  {%- assign shippingCollections = shippingCollections | concat: thisCollectionDocs -%}
{%- endfor -%}

{% comment -%} Build the array of template tags {%- endcomment -%}
{%- assign templates = "" | split: "" -%}
{%- for doc in shippingCollections -%}
  {%- for template in doc.templates -%}
    {%- assign thisTemplate = template | split: "|" -%}
    {%- assign templates = templates | concat: thisTemplate -%}
  {%- endfor -%}
{%- endfor -%}
{%- assign templates = templates | uniq | sort_natural -%}

## Overview of shipping sources

{% comment -%} Generate the table of all shipping sources {%- endcomment -%}
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
{%- endfor %}

## Shipping templates

This covers only data sources
(**not** shippers or community shippers).

These are the tags used in the shipping docs.
When we say "template",
we mean these docs should follow roughly the same flow.

{% for template in templates -%}
`{{template}}`
{%- unless forloop.last -%} , {% endunless -%}
{% endfor %}

{% for template in templates %}
  {%- assign docsWithThisTemplate = shippingCollections | where_exp: "doc", "doc.templates contains template" -%}

  ### Template: {{template}}

  Used in:

  {%- for doc in docsWithThisTemplate %}
    [{{doc.data-source}}]({{doc.url |  prepend: site.baseurl}})
    {%- unless forloop.last -%} , {% endunless -%}
  {% endfor %}

{% endfor -%}
