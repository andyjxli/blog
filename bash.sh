#!/bin/bash
# 网站的根目录
WEB_PATH='/www/blog'

echo "start deployment"
cd WEB_PATH

echo "pull from remote..."
git pull

echo "build start"
yarn && yarn build
echo "build done"