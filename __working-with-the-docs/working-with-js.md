# Working with javascript libraries

There are two ways to customize behavior in the docs:

* Use a js library, or
* Write custom code

For a js library, you'll pay attention to these files (covered in the procedure below):

* move the minified file using **scripts/move-js-files.sh**
* import it using **_source/_includes/templates/imports.html**
* and, usually, declare the library in **_source/js/logz-docs.js**

For custom code, you'll use this file:

* **_source/js/logz-docs.js**

Given the choice between an npm library and using a CDN,
choose npm.
npm packages and their dependencies
are always noted in `package.json` and `package-lock.json`.
This allows services to report on security vulnerabilities
in your js libraries and their dependencies.

## To add a new js library

1. Find a library that's hosted on npm.
  It's best if the library doesn't need any dependencies installed in the docs.
  Install the library using its `npm install` command.
2. Find the minified file in the `node_modules` directory, and copy its path.
  The minified file usually ends with `.min.js`.
  For example, clipboard.js is at `node_modules/clipboard/dist/clipboard.min.js`.
3. In the `move-js-files.sh` script,
  make a new line and start it with `mvJs`.
  Insert a space, and give the file a shortname (e.g., `clipboardjs`).
  Insert another space, and paste the `node_modules` path from step 2.
  So for clipboard.js, it reads
  `mvJs clipboardjs node_modules/clipboard/dist/clipboard.min.js`.
4. Add the new file to the `_source/_includes/templates/imports.html` file.
  Note that you'll use the **filename only** (not the full node_modules path).
  So for clipboard.js, the line should look like this:
  `<script type="text/javascript" src="{{nodeDir}}/clipboard.min.js"></script>`

## Fixing security issues

For npm packages, you can run a quick check for security issues:

```shell
npm audit
```

Make a note of the packages that have the reported vulnerabilities.
You'll need to preview the site and check that it still works as intended
after you fix the vulnerabilities.

To run an automated fix:

```shell
npm audit fix
```

If you can't fix it automatically, you'll need to do a little digging.
Usually this means you need to confirm the vulnerability was fixed,
and if it was, an `npm update <package-name>` should do the trick.
