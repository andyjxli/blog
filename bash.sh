#!/bin/bash
WEB_PATH='/www/blog'

echo "start deployment"
cd $WEB_PATH

pwd

echo "yarn start"
yarn

echo "build start"
yarn build
echo "build done"