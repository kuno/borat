#!/bin/bash

source /etc/profile
cd /opt/borat

export HUBOT_XMPP_USERNAME=borat@wiredcraft.teamchat.io
export HUBOT_XMPP_PASSWORD=fghdfiw0*hf
export HUBOT_XMPP_ROOMS=all@conference.wiredcraft.teamchat.io
export HUBOT_NAME=Borat
export HUBOT_ALIAS=_Borat

export HUBOT_GITHUB_TOKEN="c2ea629f0a4619abd039df7e07ecc5bcb7e57917"

./bin/hubot --adapter xmpp

