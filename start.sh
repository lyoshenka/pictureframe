#!/bin/bash

rand=`shuf -i 10000-99999 -n 1`
index='localhost:8000'
google-chrome --kiosk --start-maximized --incognito --new-window --no-first-run --disable-extensions --apps-no-throb "--user-data-dir=/tmp/pictureframe${rand}" "${index}"
wmctrl -r "New Tab - Google Chrome" -T "pictureframe"
#wmctrl -l
wmctrl -r "pictureframe" -b 'add,fullscreen'
wmctrl -a 'pictureframe'
#xdotool key F11
