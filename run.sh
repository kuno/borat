#!/bin/bash

source /etc/profile
cd /opt/borat

# Use config file
source config/sample.cfg

export HUBOT_XMPP_USERNAME="$username"
export HUBOT_XMPP_PASSWORD="$password"
export HUBOT_XMPP_ROOMS="$rooms"
export HUBOT_NAME="$name"
export HUBOT_ALIAS="$alias"

export HUBOT_GITHUB_TOKEN="$gh_token"
export REDISTOGO_URL="$redis_url"

RUNNING=$(ps aux | grep -i hubot | grep -v grep | wc -l)
if [ $RUNNING -lt 1 ]; then
  git pull
  npm install
  if [ !$use_xmpp ]; then
  	./bin/hubot 
  else
  	./bin/hubot --adapter xmpp > /dev/null 2>&1 &
  fi
fi
