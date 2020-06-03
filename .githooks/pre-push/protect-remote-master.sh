#!/bin/sh
# Prevent push to remote master branch

while read local_ref local_sha remote_ref remote_sha
do
	if [ "$remote_ref" = "refs/heads/master" ]; then
    echo "pre-push hook: master branch is protected. Make your changes on a new branch and merge to master through a pull request."
		exit 1
	fi
done

exit 0
