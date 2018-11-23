---
layout: article
title: Tags
permalink: /tags.html
community-info: false
---

<script>
$.getJSON( "{{site.baseurl}}/data/tags.json", function( data ) {
  var items = [];
  $.each( data, function( i, item ) {
    $('#tags-table tbody')
      .append('<tr><td>' + i + '</td><td></td></tr>');

    $.each(item, function(i, item) {
      $('#tags-table tbody td:last')
        .append( '<a href="' + item.url + '">' + item.title + '</a><br />' );
    });
  });

});
</script>

<div class="branching-container">

{: .branching-tabs }
  * [By tag](#by-tag-tab)
  * [By page](#by-page-tab)

<div id="by-tag-tab">

<!--  Contains the list of tags. js script (above, in this file) appends an
      <h2> and then a <ul> for each tag, then populates the <ul> with <li> for
      each page that has that tag. -->
<div id="tags-container">

<table id="tags-table">
  <thead> <tr> <th>Tag</th> <th>Pages</th> </tr> </thead>
  <tbody> </tbody>
</table>
</div>

</div>

<div id="by-page-tab">
{%- assign htmlPages = site.html_pages -%}
{%- assign shippingDataSources = "" | split: "" -%}
{%- assign shippingDataSources = site.data-sources | default: shippingDataSources -%}
{%- assign htmlPages = htmlPages | concat: shippingDataSources | sort: "title" -%}

| Page | Tags |
|---|---|
{%- for p in htmlPages -%}
{%- unless p.tags == false or p.tags == nil %}
| [{{p.title}}]({{p.url}}) | {{ p.tags | sort | join: "<br />" }} |
{%- endunless -%}
{% endfor %}

</div>

</div>