# How to use technical notes

**IMPORTANT**: This readme file is not published with the rest of the site. Don't change the filename.


## Adding a new technical note
1. In https://github.com/logzio/logz-docs/tree/develop/_source/logzio_collections/_technical-notes, click **Create new file**.

2. Give the file a name (and `.md` extension) and add frontmatter.
   Start on line 1, and leave a blank line after the frontmatter.

   ```yaml
   ---
   title: Your fancy title
   ---
   ```

3. Add your content using markdown. Notes on our flavor of markdown:

    * A single line break converts to a single HTML space (`&nbsp;`). To start a new paragraph, use two line breaks.
    * Basic styling:
      ```md
      ## Heading 2
      ### Heading 3
      #### Heading 4
      **bold**
      _italic_
      [link text](https://some-website.com)
      ![image alt text](https://image-url.com)
      * bulleted list
      1. numbered list
      ```
    * Use H2 (`##`) through H5 (`#####`) only. H1 is reserved for page title; H6 reserved for task lists.
      Leave a blank line before and after headings.

4. When you're done, find the **Commit new file** section below the edit box. Add a commit message.
    Good practice is to write in present tense. (For example: 'write new technical note on kibana upgrade')

5. Click **Create a new branch...**, and then click **Commit new file**. This starts a pull request that the docs manager will review.

**IMPORTANT**: Your file will not go live immediately.
Generally, docs are deployed at the end of the week.
If you need to deploy sooner, tell the docs manager and leave a message in the #docs channel in Slack.
