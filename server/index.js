const express = require("express");
const app = express();
const http = require("http");
var cors = require("cors");
const { Server } = require("socket.io");
app.use(express.json());
app.use(cors());
app.options("*", cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", //link to our frontend server(where the data will come from/frontend conncecting to this backend)
    methods: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  //Creating an event in the backend
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room ${data}`);
  });

  socket.on("send_message",(data)=>{
    console.log(data);
    socket.to(data.room).emit("recieve_message",data)
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
