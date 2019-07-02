---
layout: article
title: Pulling log shipping docs into the app
---

{::options toc_levels="2..3" /}

On this page
{:.inline-header}

* toc
{:toc}

## Manifest

[Manifest file for this deploy]({{site.baseurl}}/data/shipping-manifest.json)

---

## Regex patterns

{%raw%}
| Regex | Description |
|---|---|
| `---[\s\S\n]*?---{1,}` | Remove only the first occurence (frontmatter) |
| `{:\.(info-box)\.(.+)}` | Render the text block as an info box, respecting the second class. Groups capture so that `$1` = `info-box` and `$2` is the second class. |
| `{:.override.btn-img}` | Left-align the image |
| `{{site.baseurl}}` | Replace with `https://docs.logz.io` (no trailing slash) |
| `<<SHIPPING-TOKEN>>` | Replace with token of the logged-in account (Replaces `{{API_TOKEN}}` in legacy shipping docs) |
| `<<LISTENER-HOST>>` | Replace with listener host (Replaces `{{LISTENER_URL}}` in legacy shipping docs) |
| `{:\.inline-header}` | Render the text block as an inline header |
| `\\\\` | `<br>` |
| `{:.tasklist.firstline-headline}` | Remove |
| `{%.+?%}( \\\\)?\n?` | Remove (Liquid tags, newline slashes, and newline if they follow) |

### Accordions

| Regex | Description |
|---|---|
| `<details>[\s\S\n]*?</details>` | Render as `<details>` element |
| `<summary>[\s\S\n]*?</summary>` | Render as `<summary>` element |


### Definition lists/parameter lists

Markdown-It has a definition list extension, so it's probably easiest to use that.

| Regex | Description |
|---|---|
| `<span class="required-param"><\/span>` | Replace with `Required` |
| `<span class="default-param">(.+)<\/span>` | Prepend with `Default: `. Value is captured in `$1`. |

<!-- | `(.+\n:(.+\n){1,}(\n)){1,}` | Captures the entire definition list, to be rendered in `<dl>` container. |
| `.+\n(?=:(.+\n){1,}\n)` | Capture definition term (first line), to be rendered as `<dt>` |
| `(?<=.+\n):(.+\n){1,}(?=\n)` | Capture definition (all lines), to be rendered as `<dd>` | -->

### Tabs

| Regex | Description |
|---|---|
| `(?<=<!-- tabContainer:start -->\n)[\s\S\n]*?(?=<!-- tabContainer:end -->)` | Grabs the entire tab container |
| `{:.branching-tabs}` | Render the text block as `<ul>`. Each `li` is formatted as `[Tab name](#tab-href-id)` |
| `(?<=<!-- tab:start -->\n)[\s\S\n]*?(?=<!-- tab:end -->)` | Grabs the tab content |

{%endraw%}

---

## Info boxes

An info box is a text block followed by `{:.info-box.<<class>>}`.

`<<class>>` uses CSS `::before` to insert a title for the info box.

| Class | `::before` content |
|---|---|
| `.info-box.warning` | `content: "Warning"` |
| `.info-box.note` | `content: "Note"` |
| `.info-box.important` | `content: "Important"` |
| `.info-box.tip` | `content: "Pro tip"` |
| `.info-box.read` | `content: "Read more"` |

### Examples

```
Note content
{:.info-box.note}

Important note content
{:.info-box.important}

Warning content
{:.info-box.warning}

Tip content
{:.info-box.tip}

Read more content
{:.info-box.read}
```

Note content
{:.info-box.note}

Important note content
{:.info-box.important}

Warning content
{:.info-box.warning}

Tip content
{:.info-box.tip}

Read more content
{:.info-box.read}
