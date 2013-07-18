#!/bin/bash

# source /etc/profile
# cd /opt/borat

export HUBOT_XMPP_USERNAME=borat@wiredcraft.teamchat.io
export HUBOT_XMPP_PASSWORD=fghdfiw0*hf
export HUBOT_XMPP_ROOMS=all@conference.wiredcraft.teamchat.io,dashboard@conference.wiredcraft.teamchat.io
export HUBOT_NAME=Borat
export HUBOT_ALIAS=/
export HUBOT_AUTH_ADMIN=hunvreus,zbal,quentinberder,Makara,1

export HUBOT_GITHUB_TOKEN="c2ea629f0a4619abd039df7e07ecc5bcb7e57917"
export REDISTOGO_URL="redis://redistogo:a879e80cf4b4ffaba008f4a39892dbf2@beardfish.redistogo.com:9594/"

# RUNNING=$(ps aux | grep -i hubot | grep -v grep | wc -l)
# if [ $RUNNING -lt 1 ]; then
#   git pull
#   npm install 
#   ./bin/hubot --adapter xmpp > /dev/null 2>&1 &
# fi

./bin/hubot