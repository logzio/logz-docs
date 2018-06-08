---
layout: article
title: Contributing to docs
collection: about
contributors:
- sboroda
---

## Logz.io feature graphics
To make a feature create, create an empty `<div class="feature-box">` container.

Like so: `<div class="feature-box"></div>`

<div class="feature-box"></div>

See that gray line? That's the feature box. This box has no content, so we'll add one of three classes (`enterprise`, `pro`, or `community`). A linked javascript file takes care of all the content. The samples below show how it's done.

#### Enterprise plan

```html
<div class="feature-box enterprise"></div>
```
<p> </p>
<div class="feature-box enterprise"></div>

#### Pro plan

```html
<div class="feature-box pro"></div>
```
<p> </p>
<div class="feature-box pro"></div>

#### Community plan

```html
<div class="feature-box community"></div>
```
<p> </p>
<div class="feature-box community"></div>

### Info boxes

Info boxes comprise a `<div class="info-box">` container.

Info boxes come in 3 CSS classes: `note`, `warning`, `gotcha`, `tip`. CSS handles icon and heading styling, so contributors need to worry about only the class name and box content.

#### Notes

```html
<div class="info-box note">
  Content
</div>
```
<p> </p>
<div class="info-box note">
  Notes are non-actionable. They're more important than the surrounding text but less important than warnings. Could something bad happen if the user ignores this note? If no, then it's a note. Otherwise, it's a warning.
</div>

#### Warnings
```html
<div class="info-box warning">
  Content
</div>
```
<p> </p>
<div class="info-box warning">
  Use warnings when the user could cause damage that's difficult or impossible to recover from. If you need something less severe than a warning, consider a gotcha or a note.
</div>

#### Gotchas
````html
<div class="info-box gotcha">
  Content
</div>
````
<p> </p>
<div class="info-box gotcha">
  Gotchas help the user work through common trip-up points. If the user could cause damage by ignoring the gotcha, consider a warning instead.
</div>

#### Pro tips
````html
<div class="info-box tip">
  Content
</div>
````
<p> </p>
<div class="info-box tip">
  Pro tips convey best practices and good actions to ensure success. Think of these as a little more proactive than gotchas.
</div>
