#!/bin/bash
gst-launch-1.0 avfvideosrc ! videoconvert ! x264enc tune=zerolatency bitrate=500 speed-preset=ultrafast ! rtph264pay config-interval=1 pt=96 ! webrtcbin name=sendrecv stun-server=stun://stun.l.google.com:19302 bundle-policy=max-bundle
