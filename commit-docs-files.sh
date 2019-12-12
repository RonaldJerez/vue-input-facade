#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_files() {
  git add docs
  git commit --message "chore: build docs page"
}

setup_git
commit_files
