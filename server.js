const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve file trong thư mục /public
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Khi admin phát Morse
  socket.on("adminPlayMorse", (data) => {
    io.emit("playMorseForUsers", data);  // Gửi tới tất cả user
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});
