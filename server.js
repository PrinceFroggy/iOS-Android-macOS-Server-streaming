const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });
app.use(express.static("public"));
io.on("connection", socket => {
  socket.on("message", data => {
    socket.broadcast.emit("message", data);
  });
});
server.listen(3000, "0.0.0.0", () => {
  console.log("Signaling server running at http://0.0.0.0:3000");
});
