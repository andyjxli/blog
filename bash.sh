#!/bin/bash
WEB_PATH='/www/blog'

echo "start deployment"
cd $WEB_PATH

echo "start pull"
git pull

echo "yarn start"
yarn

echo "build start"
yarn build
echo "build done"