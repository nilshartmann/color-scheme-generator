#! /bin/bash

NAME=color-scheme-generator

# This deploys the *local* version of this project to the 'gh-pages' branch in the remote github repository
# git status eval from: http://stackoverflow.com/a/2658301
if  [[ $(git diff --shortstat 2> /dev/null | tail -n1) != "" ]]; then
	echo "Uncommitted changes. Please commit before deploying to gh-pages";
	# exit 1;
fi;
if [ `git status --porcelain 2>/dev/null| grep "^??" | wc -l` != "0" ]; then
	echo "Untracked files. Please commit before deploying to gh-pages";
	exit 1;
fi;

COMMIT=`git rev-parse HEAD`
SHORTCOMMIT=`echo $COMMIT|cut -b-5`

# Create fresh distribution files
npm run build:prod

# checkout remote repository to
rm -rf $TMPDIR/${NAME}
git clone -b gh-pages https://github.com/nilshartmann/${NAME} $TMPDIR/${NAME}

rm -rf $TMPDIR/${NAME}/dist
cp -r ./public/* $TMPDIR/${NAME}

git --git-dir=$TMPDIR/${NAME}/.git --work-tree=$TMPDIR/${NAME} add -A
git --git-dir=$TMPDIR/${NAME}/.git --work-tree=$TMPDIR/${NAME} commit -m "Deployed to gh-pages from commit $COMMIT"
git --git-dir=$TMPDIR/${NAME}/.git --work-tree=$TMPDIR/${NAME} push
