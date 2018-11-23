---
layout: article
title: Contributing to docs
permalink: /contributing-to-docs.html
flags:
  admin: true
  beta: true
  logzio-plan: pro
---

### Page flags

Page flags appear at the top of the page.
They come in two groups.

You can set page flags in the YAML front matter on each page under the `flags` object.
Flags are only shown if they're included in the front matter.

On the left, you'll see the labels of "Beta feature" and "Account admin only".
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

### Info boxes

Info boxes comprise a `<div class="info-box">` container.

Info boxes come in 4 CSS classes: `note`, `warning`, `important`, `tip`, `read`.
CSS handles icon and heading styling, so contributors need to worry about only the class name and box content.

#### Notes

```html
<div class="info-box note">
  Content
</div>
```
<p> </p>
<div class="info-box note">
  Notes are non-actionable.
  They're more important than the surrounding text but less important than warnings.
  Could something bad happen if the user ignores this note?
  If no, then it's a note. Otherwise, it's a warning.
</div>

#### Warnings
```html
<div class="info-box warning">
  Content
</div>
```
<p> </p>
<div class="info-box warning">
  Use warnings when the user could cause damage that's difficult or impossible to recover from.
  If you need something less severe than a warning, consider a note or important note.
</div>

#### Important notes
````html
<div class="info-box important">
  Content
</div>
````
<p> </p>
<div class="info-box important">
  Important notes help the user work through common trip-up points.
  If the user could cause damage by ignoring this, consider a warning instead.
</div>

#### Pro tips
````html
<div class="info-box tip">
  Content
</div>
````
<p> </p>
<div class="info-box tip">
  Pro tips convey best practices and good actions to ensure success.
  Think of these as more proactive than important notes.
</div>


#### Read more
```html
<div class="info-box read">
  Content
</div>
```

<p> </p>
<div class="info-box read">
  "Read more" boxes point the user to additional reading material.
  This is useful when we're touching on a topic that's too complex to convey on this page.
</div>