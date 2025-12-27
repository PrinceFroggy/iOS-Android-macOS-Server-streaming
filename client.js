// client.js

const socket = io();
const overlay = document.getElementById('inputOverlay');

function sendInput(type,x,y){
  socket.emit('input-event',{type,x,y,ts:Date.now()});
}
function getNorm(t){
  const r = overlay.getBoundingClientRect();
  const x = (t.clientX-r.left)/r.width;
  const y = (t.clientY-r.top)/r.height;
  return {x:Math.min(Math.max(x,0),1),y:Math.min(Math.max(y,0),1)};
}

overlay.addEventListener('touchstart',e=>{
  e.preventDefault();
  const t=e.touches[0]; if(!t)return;
  const {x,y}=getNorm(t);
  sendInput('down',x,y);
},{passive:false});

overlay.addEventListener('touchmove',e=>{
  e.preventDefault();
  const t=e.touches[0]; if(!t)return;
  const {x,y}=getNorm(t);
  sendInput('move',x,y);
},{passive:false});

overlay.addEventListener('touchend',e=>{
  e.preventDefault();
  const t=e.changedTouches[0]; if(!t)return;
  const {x,y}=getNorm(t);
  sendInput('up',x,y);
},{passive:false});

window.addEventListener('keydown',e=>{
  socket.emit('key-event',{key:e.key,code:e.code,ts:Date.now()});
});
