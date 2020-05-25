# Brief notes on Jekyll includes

Includes are a way to reuse code and snippets in Jekyll. They're structured like liquid tags, in between `{%` and `%}` markers.

Read more on includes at https://jekyllrb.com/docs/includes/

Here's the structure of the _includes directory, along with some basic descriptions of the files there:

```yaml
_includes
├── api-cookbook
│   ├── read-more-api-doc.html # Documented in comments
│   └── replace-vars.html # Documented in comments
├── log-shipping
│   ├── in-app-configuration.html # Documented in comments
│   └── replace-vars.html # Documented in comments
├── page-info # These are items that are used in the top of the page at the time of writing
│   ├── community.html # Container for some of the other items on the page
│   ├── contributor-list.html # Contributors for current page
│   ├── logzio-plan.html # The plan indicator (Community, Pro, Enterprise)
│   ├── open-source.html # List of open source projects in use on the page
│   ├── page-date.html # Documented in the comments
│   ├── page-flags.html # Beta & admin flags
│   └── rss-subscribe.html # RSS button
├── prevent-orphan-words.html # Really just used for the home page.
├── tags
│   └── capture-site-pages.html
├── templates # These files are used in the templates
│   ├── footer.html # Site footer
│   ├── github-buttons.html # Edit and 'open issue' buttons
│   ├── google # Related to Google Analytics & Google Tags
│   │   ├── google-analytics.html
│   │   ├── tag-manager-body.html
│   │   └── tag-manager-head.html
│   ├── head.html # The entire <head></head> section
│   ├── header.html # Site header
│   ├── intercom.html # Code from Intercom
│   ├── left-toc.html # Site-wide left nav
│   └── lunr # Lunr search
│       ├── lunr-header.html
│       └── lunr-results.html
└── third-party-homepage.html # Top-of-page notice for integrations we don't maintain

7 directories, 25 files
```