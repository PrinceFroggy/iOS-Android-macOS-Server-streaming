#!/bin/bash
AVD_NAME=$1
$HOME/Library/Android/sdk/emulator/emulator -avd "$AVD_NAME" -netdelay none -netspeed full -no-snapshot-load -gpu auto -no-boot-anim &
