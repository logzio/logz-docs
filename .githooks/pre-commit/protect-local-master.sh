#!/bin/sh
# prevent commit to local master branch

branch=`git symbolic-ref HEAD`
if [ "$branch" = "refs/heads/master" ]; then
    echo "pre-commit hook: master branch is protected. Make your changes on a new branch and merge to master through a pull request."
    exit 1
fi

exit 0
