const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendData", (data) => {
    console.log("Message received from", socket.id, ":", data);

    // 5 second delay before broadcasting
    setTimeout(() => {
      console.log("Sending message after delay:", data);
      io.emit("receiveData", data);
    }, 5000);
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});


server.listen(3000, () => console.log("Server running on port 3000"));
