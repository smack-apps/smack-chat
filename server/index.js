const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);

const { Server } = require("socket.io");

const cors = require("cors");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET, POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`connection: ${socket.id}`);
  socket.on("join_room", (room) => {
    console.log(`join_room: ${room}`);
    socket.join(room);
  });

  socket.on("send_message", (message) => {
    console.log(`send_message: ${message.text}`);
    socket.to(message.room).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log(`disconnection: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
