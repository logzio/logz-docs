---
layout: none
---

{%- include tags/capture-site-pages.html -%}

{%- assign counter = 0 %}
var documents = [
  {%- for p in allPages -%}
  {%- unless p.search == false -%}
  {
    "id": {{ counter }},
    "url": "{{ site.url }}{{ p.url }}",
    "title": "{{ p.title | replace: '"', ' ' }}",
    "body": "{{ p.content
      | replace: '.', '. '
      | replace: '</h2>', ': '
      | replace: '</h3>', ': '
      | replace: '</h4>', ': '
      | replace: '</p>', ' '
      | strip_html
      | strip_newlines
      | replace: '  ', ' '
      | replace: '"', ' ' }}"
      {%- assign counter = counter | plus: 1 -%}
    },
    {%- endunless %}{% endfor -%}
  ];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span></a><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}
