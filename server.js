// server.js

const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const { exec } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ---- CONFIG ----

// Choose which target you control: "ios" or "android"
const TARGET = process.env.TARGET || 'ios';

// Approximate simulator/emulator resolution.
const SIM_WIDTH  = parseInt(process.env.SIM_WIDTH  || '1179', 10);
const SIM_HEIGHT = parseInt(process.env.SIM_HEIGHT || '2556', 10);

// ---- Static files ----

app.use(express.static(path.join(__dirname, 'public')));

// ---- WebRTC signaling placeholder ----
// integrate your own signaling here

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('input-event', (evt) => {
    try { handleTouchEvent(evt); } catch (err) { console.error(err); }
  });

  socket.on('key-event', (evt) => {
    try { handleKeyEvent(evt); } catch (err) { console.error(err); }
  });

  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

function handleTouchEvent(evt) {
  if (!evt || typeof evt.x !== 'number' || typeof evt.y !== 'number') return;

  const x = clampInt(Math.round(evt.x * SIM_WIDTH), 0, SIM_WIDTH);
  const y = clampInt(Math.round(evt.y * SIM_HEIGHT), 0, SIM_HEIGHT);

  console.log(`Touch(${evt.type}) @ (${x},${y}) target=${TARGET}`);

  if (TARGET === 'ios') simulateTapIOS(x, y);
  else simulateTapAndroid(x, y);
}

function handleKeyEvent(evt) {
  if (!evt) return;
  console.log('Key event:', evt.key, evt.code);

  if (TARGET === 'android') {
    const map = { ArrowLeft:21, ArrowRight:22, ArrowUp:19, ArrowDown:20, Enter:66 };
    if (map[evt.key]) adbKeyEvent(map[evt.key]);
  }
}

// ---- iOS ----
function simulateTapIOS(x, y) {
  const cmd = `xcrun simctl io booted tap ${x} ${y}`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) console.error('simctl tap failed:', err.message || err, stderr || '');
    else if (stdout) console.log(stdout.trim());
  });
}

// ---- Android ----
function simulateTapAndroid(x, y) {
  const cmd = `adb shell input tap ${x} ${y}`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) console.error('adb tap failed:', err.message || err, stderr || '');
    else if (stdout) console.log(stdout.trim());
  });
}

function adbKeyEvent(code) {
  const cmd = `adb shell input keyevent ${code}`;
  exec(cmd, ()=>{});
}

function clampInt(v, min, max) {
  v = Number.isFinite(v) ? v : min;
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server http://0.0.0.0:${PORT}`));
