---
layout: article
title: Data shipping templates
show-date: false
sitemap: false 
noindex: true
---

{% assign tabs = site.data.shipper-tabs.tabs | where:"templated",true -%}

{% comment -%} Build the array of shipping docs {%- endcomment -%}
{%- assign shippingCollections = "" | split: "" -%}
{%- for tab in tabs -%}
  {%- assign thisCollection = site.collections |  where: "label", tab.collection | first -%}
  {%- assign thisCollectionDocs = thisCollection.docs | sort_natural: "data-source" -%}
  {%- assign shippingCollections = shippingCollections | concat: thisCollectionDocs -%}
{%- endfor -%}

{% comment -%} Build the array of template tags {%- endcomment -%}
{%- assign templates = shippingCollections | map: 'templates' | uniq | sort_natural -%}

{%- comment -%} Build the array of open source projects {%- endcomment -%}
{%- assign projects = shippingCollections | map: 'open-source' | uniq | sort_natural -%}

<details>

<summary>
Overview of shipping sources
</summary>

{% comment -%} Generate the table of all shipping sources {%- endcomment -%}
| Source | Data | Templates | Open source projects |
|---|---|---|
{%- for doc in shippingCollections %}
| [{{ doc.data-source }}]({{doc.url | prepend: site.baseurl }}) | {{ doc.collection | split: "-" | first -}}
  | {{ doc.templates | inspect -}}
  | {%- for project in doc.open-source -%}
      [ {{- project.title -}} ]( {{- project.github-repo -}} )
      {%- unless forloop.last -%} , <br> {%- endunless -%}
    {%- endfor -%}
  |
{%- endfor %}

</details>

<details>

<summary>
Shipping templates
</summary>

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

  {% assign thisTemplateFramework = site.data.shipper-tabs.templates | where: 'slug', template | first %}
  {% if thisTemplateFramework.outline %}

{{thisTemplateFramework.outline | markdownify }}

  {% endif %}

{% endfor -%}

</details>

<details>

<summary>
Shipping docs per open source project
</summary>

{% comment -%} Generate the table of open source projects {%- endcomment -%}
| Project | Used in |
|---|---|---|
{%- for project in projects %}
| {{ project.title }} <br> [logzio/{{ project.github-repo -}}]({{site.github.org_url}}/{{project.github-repo}}) {{ "" -}}
| {%- capture docsWithThisProject -%}
    {%- assign docsWithOpenSource = shippingCollections | where_exp: "doc", "doc.open-source" -%}
    {%- for doc in docsWithOpenSource -%}
      {%- assign openSourceStringified = doc.open-source | join: "," -%}
      {%- if openSourceStringified contains project.github-repo -%}
        [{{doc.data-source}}]({{doc.url}})$$
      {%- endif -%}
    {%- endfor -%}
  {%- endcapture -%}
  {{docsWithThisProject | split: "$$" | join: "<br>"}} |
{%- endfor %}

</details>
