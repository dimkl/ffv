#!/usr/bin/env bash
_package=`node -e "console.log(require('./package.json').name)"`
_version=`npm version ${1:-patch}`

git commit -am "Version bump $_version"
# git tag "$_version"