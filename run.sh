#!/bin/bash

#ps aux | grep "node server.js" | tr -s " " | cut -d" " -f2 | xargs kill
cat PID | xargs kill
git pull
npm install || true
NODE_ENV=production nohup node server.js 2>&1 &