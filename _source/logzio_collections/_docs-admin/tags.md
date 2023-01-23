---
layout: article
title: Tags
permalink: /tags.html
community-info: false
sitemap: false 
noindex: true
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

* [By tag](#by-tag-tab)
* [By page](#by-page-tab)
{:.branching-tabs}

<div id="by-tag-tab">

{%- comment -%}
*   Contains the list of tags. js script (above, in this file) appends an <h2>
*   and then a <ul> for each tag, then populates the <ul> with <li> for each
*   page that has that tag.
*         {%- endcomment -%}
<div id="tags-container">

<table id="tags-table">
  <thead> <tr> <th>Tag</th> <th>Pages</th> </tr> </thead>
  <tbody> </tbody>
</table>
</div>

</div>

<div id="by-page-tab">

{%- include tags/capture-site-pages.html -%}

{%- assign allPages = htmlPages | concat: shippingDataSources | sort: "title" -%}

| Page | Tags |
|---|---|
{%- for p in allPages -%}
{%- unless p.tags == false or p.tags == nil %}
| [{{p.title}}]({{p.url}}) | {{ p.tags | sort | join: "<br />" }} |
{%- endunless -%}
{% endfor %}

</div>

</div>