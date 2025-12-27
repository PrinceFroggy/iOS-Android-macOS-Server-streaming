#!/bin/bash
IFS=',' read -ra UDIDS <<< "$1"
SIGNALING_URL="$2"
for UDID in "${UDIDS[@]}"; do
  xcrun simctl boot "$UDID"
  open -a Simulator --args -CurrentDeviceUDID "$UDID"
  gst-launch-1.0 avfvideosrc device-index=0 ! videoconvert ! x264enc tune=zerolatency bitrate=500 speed-preset=ultrafast ! rtph264pay config-interval=1 pt=96 ! webrtcbin name=sendrecv stun-server=stun://stun.l.google.com:19302 bundle-policy=max-bundle &
done
