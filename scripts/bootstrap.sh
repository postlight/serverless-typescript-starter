#!/bin/sh

rename_cwd() {
  cd . || return
  new_dir=${PWD%/*}/$1
  mv -- "$PWD" "$new_dir" &&
    cd -- "$new_dir"
}

if [ -z "$1" ]; then
  echo ""
  echo "Please specify the name of your project. For example:"
  echo ""
  echo "  yarn bootstrap my-project-name"
  echo ""
else
  echo Setting up project as $1

  sed -i "" "s/serverless-starter/$1/" package.json
  sed -i "" "s/service-name/$1/" serverless.yml

  rename_cwd $1

  if test -d .git; then
    echo ""
  else
    echo Setting up git...
    git init
    git add .
    git commit -m "Initial commit"
  fi
fi

