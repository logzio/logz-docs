---
layout: article
title: Contributing to docs
permalink: /contributing-to-docs.html
flags:
  admin: true
  beta: true
  logzio-plan: pro
sitemap: false
---

## Page flags

Page flags appear at the top of the page.
They come in two groups.

You can set page flags in the YAML front matter on each page under the `flags` object.
Flags are only shown if they're included in the front matter.

On the left, you'll see the labels of "Beta feature" and "For account admins".
These are set using the `beta` and `admin` properties:

```yaml
flags:
  admin: true
  beta: true
```

On the right, you'll see the plans a feature is included in.
To use the feature box, set the `logzio-plan` property to `community`, `enterprise`, or `pro`:

```yaml
flags:
  logzio-plan: pro
```

## Info boxes

Info boxes come in these CSS classes: `note`, `warning`, `important`, `tip`, `read`
CSS handles heading styling, so contributors need to worry about only the class name and box content.

### Notes

```
Content \\
Maybe even with a line break. \\
\\
Or two line breaks to simulate a new paragraph, but without breaking the text block.
{:.info-box.note}
```

Notes are non-actionable.
They're more important than the surrounding text but less important than warnings.
Could something bad happen if the user ignores this note?
If no, then it's a note. Otherwise, it's a warning.
{:.info-box.note}

### Warnings

```
Content
{:.info-box.warning}
```

Use warnings when the user could cause damage that's difficult or impossible to recover from.
If you need something less severe than a warning, consider a note or important note.
{:.info-box.warning}

### Important notes

````
Content
{:.info-box.important}
````

Important notes help the user work through common trip-up points.
If the user could cause damage by ignoring this, consider a warning instead.
{:.info-box.important}

### Pro tips

````
Content
{:.info-box.tip}
````

Pro tips convey best practices and good actions to ensure success.
Think of these as more proactive than important notes.
{:.info-box.tip}

### Read more

```
Content
{:.info-box.read}
```

"Read more" boxes point the user to additional reading material.
This is useful when we're touching on a topic that's too complex to convey on this page.
Also good if you want to refer the reader to information that's well-documented elsewhere,
but out of scope for this page. \\
\\
It's perfectly fine to link to third-party docs if they're authoritative, such as AWS or Azure.
{:.info-box.read}

## Headings

<table>
  <tr>
    <td> Heading 1 (page titles only) </td>
    <td> <h1>Sample text</h1> </td>
  </tr>
  <tr>
    <td> Heading 2 </td>
    <td> <h2>Sample text</h2> </td>
  </tr>
  <tr>
    <td> Heading 3 </td>
    <td> <h3>Sample text</h3> </td>
  </tr>
  <tr>
    <td> Heading 4 (tasklist intro) </td>
    <td> <h4>Sample text</h4> </td>
  </tr>
  <tr>
    <td> Heading 5 (task) </td>
    <td> <h5>Sample text</h5> </td>
  </tr>
  <tr>
    <td> Heading 6 (in-task heading) </td>
    <td> <h6>Sample text</h6> </td>
  </tr>
  <tr>
    <td> Inline header </td>
    <td> <div class="inline-header">Sample text</div> </td>
  </tr>
</table>