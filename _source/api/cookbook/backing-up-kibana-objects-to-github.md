---
layout: article
title: Backing up Kibana objects to GitHub
permalink: /api/cookbook/backing-up-kibana-objects-to-github.html
flags:
  logzio-plan: enterprise
tags:
  - api
  - api-cookbook
contributors:
  - imnotashrimp
---

You probably already knew that you can download Kibana objects—dashboards, visualizations, and saved searches—as JSON files.
JSON files are plain text, making them ideal to store in a version control tool like Git.

Using only the command line and the Logz.io API, you can make an automated, recurring backup of your Kibana objects to GitHub.
Using GitHub Gist, you'll have a complete history of your backups.

If you ever need to migrate content to a new Logz.io account or self-hosted Kibana, your objects will be accessible from anywhere.

Just a quick note: Even though this tutorial covers backing up to a gist, you can use these methods to back up to a normal GitHub repo.
These methods also work with other Git hosting providers, like GitLab, BitBucket, or your own self-hosted Git.

{% include api-cookbook/replace-vars.html multiCodeBlocks=true %}

##### In this tutorial

* [Making sure you have everything you need](#making-sure-you-have-everything-you-need)
* [Downloading Kibana objects](#downloading-kibana-objects)
* [Committing and pushing to GitHub](#committing-and-pushing-to-github)

## Making sure you have everything you need {#making-sure-you-have-everything-you-need}

Let's set up the prerequisites now so that we can use the command line for the rest of the tutorial.

{: .tasklist .firstline-headline }
1. Create a gist

    Make sure you're signed in to GitHub, and create a new gist at [https://gist.github.com/](https://gist.github.com/).

    Make a new file "README.md", and type something into the file.
    Click either **Create secret gist** or **Create public gist**, depending on whether you want this gist to be secret or public.

    <div class="info-box important">
      Secret gists aren't private—anyone with the URL can access the contents of a secret gist.
      If you're looking for finer control, use a private repo instead.
    </div>

    Your new gist is created and you're taken to the gist's main page.

2. Clone the gist to your local machine

    If Git isn't already installed on your local machine, see [Install Git](https://www.atlassian.com/git/tutorials/install-git) from Atlassian.

    ![Clone Github gist]({{site.baseurl}}/images/api-cookbook/clone-github-gist.png)

    Click the **Embed** button (just above your readme file, on the right).
    Select either **Clone via HTTPS** or **Clone via SSH**, and then copy the URL.

    <div class="info-box read">
      If you're not sure whether to use HTTPS or SSH to clone your gist, see [Which remote URL should I use?](https://help.github.com/articles/which-remote-url-should-i-use/) from GitHub.
    </div>

    In the command line, clone the gist into a new folder named "kibana_backup" and `cd` into the kibana_backup folder:

    ```shell
    git clone <REPO-URL> kibana_backup
    cd kibana_backup
    ```

## Downloading Kibana objects {#downloading-kibana-objects}

You can use the Logz.io API to download all Kibana objects of each type (dashboards, visualizations, and saved searches), one at a time.
This means that you'll need to make three API requests to Logz.io.

#### Sample request 1: Write saved searches to a file

```shell
curl -X POST \
  https://<API-URL>/kibana/export \
  -H 'Content-Type: application/json' \
  -H 'X-API-TOKEN: <API-TOKEN>' \
  -d '{"type": "search"}'
  -o kibana-search.json
```

{% include api-cookbook/read-more-api-doc.html title="Export Kibana objects" id="exportSavedObjects" %}

##### ...and the response

The `-o` flag in the request tells cURL to output the response to a file (in this case, kibana-search.json).
Because of this, you won't see a response in the command line.

To check that the request worked, run `ls`.
The contents of the folder should match this:

* README.md
* kibana-search.json

You can also check the contents of kibana-search.json.
If you have no saved searches in the account, you should see something like this:

```json
{"kibanaVersion":"6.3.2","hits":[]}
```

If you _do_ have saved searches, they're stored as objects in the `hits` array.

#### Sample request 2: Write visualizations to a file

```shell
curl -X POST \
  https://<API-URL>/kibana/export \
  -H 'Content-Type: application/json' \
  -H 'X-API-TOKEN: <API-TOKEN>' \
  -d '{"type": "visualization"}'
  -o kibana-visualization.json
```

##### ...and the response

This time, you used `-o` to output the response to kibana-visualization.json.

To check that the request worked, run `ls`.
The contents of the folder should match this:

* README.md
* kibana-search.json
* kibana-visualization.json

#### Sample request 3: Write dashboards to a file

```shell
curl -X POST \
  https://<API-URL>/kibana/export \
  -H 'Content-Type: application/json' \
  -H 'X-API-TOKEN: <API-TOKEN>' \
  -d '{"type": "dashboard"}'
  -o kibana-dashboard.json
```

##### ...and the response

This time, you used `-o` to output the response to kibana-dashboard.json.

To check that the request worked, run `ls`.
The contents of the folder should match this code block:

* README.md
* kibana-dashboard.json
* kibana-search.json
* kibana-visualization.json

## Committing and pushing to GitHub {#committing-and-pushing-to-github}

Once you've run all three requests and retrieved saved searches, visualizations, and dashboards, you're ready to send everything to GitHub.

#### Code sample

```shell
git add .
git commit -m 'API cookbook initial commit'
git push
```

Navigate to the gist in your browser to confirm that everything worked as expected.

Boom! 💥 You did it.

Now you can automate the whole process and create a script to back up your Kibana objects at regular intervals.
Or if you're feeling really fancy, you can commit and push to GitHub only when there are changes to your saved objects.

Have at it!