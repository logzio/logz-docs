# Redirects

You should rarely change URLs for individual pages once they're merged to master.
Sometimes, however, it's unavoidable.

If you _do_ need to redirect, you'll find all the redirect rules in the netlify config file
in the root of this project, at netlify.toml.

Just really important to note: Be extra aware of the redirects you're using.
If one redirect leads to another too many times, the HTTP request will fail,
and the user will get an ugly gray warning from their browser.