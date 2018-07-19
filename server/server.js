const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket)=>{
  console.log("New Connection!");
});
io.on('disconnect', (socket)=>{
  console.log('Lost Connection');
});

server.listen(port,()=>{
  console.log(`server is up on ${port}`);
});
