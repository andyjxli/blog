#!/bin/bash
# 网站的根目录
WEB_PATH='/www/blog'

echo "start deployment"
cd WEB_PATH

echo "pull from remote..."
git pull

echo "yarn start"
yarn

echo "build start"
yarn build
echo "build done"