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
    $('<h2 id="' + i + '">').text(i).appendTo('div#tags-container');
    $('div#tags-container').append('<ul></ul>')
    $('<li><a href="#' + i + '">' + i + '</a></li>').appendTo('div#tag-cloud ul');

    $.each(item, function(i, item) {
      $('div#tags-container ul:last').append('<li><a href="' + item.url + '">' + item.title + '</a></li>');
    });
  });

});
</script>

<div id="tag-cloud">
  <ul class="horizontal-list">
  </ul>
</div>

<div id="tags-container">
</div>