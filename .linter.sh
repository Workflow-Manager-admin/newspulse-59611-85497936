#!/bin/bash
cd /home/kavia/workspace/code-generation/newspulse-59611-85497936/news_pulse
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

