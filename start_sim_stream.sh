#!/bin/bash
SIM_UDID=$1
SIGNALING_SERVER_URL=$2
xcrun simctl boot "$SIM_UDID"
open -a Simulator --args -CurrentDeviceUDID "$SIM_UDID"
gst-launch-1.0 avfvideosrc device-index=0 ! videoconvert ! x264enc tune=zerolatency bitrate=500 speed-preset=ultrafast ! rtph264pay config-interval=1 pt=96 ! webrtcbin name=sendrecv stun-server=stun://stun.l.google.com:19302 bundle-policy=max-bundle
