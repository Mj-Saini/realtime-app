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
      socket.broadcast.emit("receiveData", data);
    }, 1000);
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
