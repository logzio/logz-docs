---
layout: article
title: Search syntax
permalink: /kibana/search/
flags:
  logzio-plan: community
tags:
contributors:
  - shalper
---

Search is one of Kibana's best-known strengths. It is fast and powerful,
but it is also an art and it takes practice. 

Here are a few basic fundamentals of Kibana search to help you get started.

##### Syntax conventions

Kibana search is based on 2 languages:

  * **Apache Lucene** as the primary syntax. Lucene is flexible enough to make (almost) any search possible.
  * **KQL** is good for simpler queries. KQL (short for Kibana Query Language) offers helpful auto-complete shortcuts, but can't be used for alerts.
  
  Some features only support queries written in Lucene syntax. These include: alerts, optimizers, and drop filters.

  For everything else, particularly, reports, visualizations, dashboards, and saved searches, you can use either Lucene or KQL. Whichever you prefer.

##### Field-specific vs. free text

The fastest option, is always to search specific fields. 

To search for an exact match, type the field name, followed by a colon, and then the string in quotation marks or the value without quotes.

For example, `ip:  term within a specific field:value match, direct your search to a field, you  contains certain terms. You specify the field, type a colon, then a space, then the string in quotation marks or the value without quotes. Here are some Lucene field examples:


message:WebApp NOT return_message:*Approved

##### Operators
    
When you use the operators `AND`, `OR`, and `NOT`, make sure they are in ALL-CAPS. Otherwise you won't get the expected results.

To exclude a particular field:value pair by prefacing it with `NOT`. For example, `NOT type:MyFirewall`. This can also be acheived by hovering over a document with the exact match and clicking the the <i class="fas fa-search-minus"></i> search icon. Doing it this way will apply the search as a filter.

To broaden a search, add the AND operator between the strings. For example, `type:MyFirewall AND s





<i class="fas fa-search-plus"></i> .





##### Free Text

On the message field


Field specify the field, type a colon, then a space, then the string in quotation marks or the value without quotes

You’ll need to enclose it in double quotes to ensure that the whole value is searched.

When you run a free search in Logz.io, the following special characters and whitespace will be used as a separator ~ ` ! @ # $ % ^ & * ( ) + = { } [ ] | \ / : ; ” ‘ < > , ?.


##### Case-insensitive searches

All searches in the message field are case insensitive. This is because the values in the message field are automatically converted to lower-case in the database.



##### Wildcards

Expand your search with wildcards when you want to surface more results. Wildcards are helpful when you suspect typos, or need everything that starts with a certain clause.

`?` is a single character wildcard. It's like a Joker in a card game. For example, `ip:11?` 

`*` is a multi-character wildcard. For example, `ip:*114*` will search the field `ip` for any value that contains the string `114`.

If your search string starts with a wildcard, this is called a **leading wildcard**. It is particularly memory intensive and can take longer. Just think of all the combinations that need to be scanned to come up with the results.


##### Logz.io Kibana Advisor

Whenever you plug a query in the Kibana search bar, you can rely on a little help from Logz.io.
Kibana will surface little tips and suggestions to optimize your search and help you uncover what you are after.

##### What to avoid

* If you're searching a `UUID`, for example `kube-apiserver-d8678c584-r4z9p`, without using "" quotation marks, the hyphen acts as a separator. So you'll get results for each section.
* 

##### Cheat sheet 

| Query | What to keep in mind |
|---|---|
| UUID:"kube-apiserver-d8678c584-r4z9p" | The hyphen acts as a separator unless enclosed in quotation marks. |
|  | Query is case insensitive because the data is stored in lowercase in the database. |

We've got some great blog posts to help get you started searching like a pro. This [blog post](https://logz.io/blog/kibana-advisor-lucene-pitfalls/) will walk you through your very first steps. Then you can benchpress the heavier stuff with [this one](https://logz.io/blog/elasticsearch-queries/).
{:.info-box.read}

##### Non-specific values

If you are looking for a specific field, but not a particular value, you can search for `_exists_:field_title`. You'll get back logs that have the field regardless of the value it contains, just as long as it is not null (but it can be empty `""`).

For example, search for `_exists_:error_code` to return logs with any error code.


To filter for a host name that contains a value, select the field to filter by, and begin typing out the contents you're looking for. 