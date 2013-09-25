#!/bin/bash

source /etc/profile
cd /opt/borat

source /config/config.cfg

export HUBOT_XMPP_USERNAME=$xmppUsername
export HUBOT_XMPP_PASSWORD=$xmppPassword
export HUBOT_XMPP_ROOMS=$xmppRooms
export HUBOT_NAME=$name
export HUBOT_ALIAS=$alias
export HUBOT_AUTH_ADMIN=$admins

export HUBOT_GITHUB_TOKEN="$github"
export REDISTOGO_URL="$redis"

# @wiredcraft Twitter #
# export WCL_CONSUMER_KEY=""
# export WCL_CONSUMER_SECRET=""
# export WCL_ACCESS_TOKEN=""
# export WCL_ACCESS_TOKEN_SECRET=""

# @devo_ps Twitter #
# export DEVOPS_CONSUMER_KEY=""
# export DEVOPS_CONSUMER_SECRET=""
# export DEVOPS_ACCESS_TOKEN=""
# export DEVOPS_ACCESS_TOKEN_SECRET=""

RUNNING=$(ps aux | grep -i hubot | grep -v grep | wc -l)
if [ $RUNNING -lt 1 ]; then
  git pull
  npm install 
  ./bin/hubot --adapter xmpp > /dev/null 2>&1 &
fi