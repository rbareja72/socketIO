const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket)=>{
  console.log("New Connection!");

  socket.emit('newMessage',  generateMessage('admin', 'welcome to chat app')  );
  socket.broadcast.emit('newMessage', generateMessage('admin', 'welcome the new user'));

  socket.on('createMessage', function(data, callback){
    console.log(data);
    io.emit('newMessage',generateMessage(data.from, data.text));
    callback('from server');
    // socket.broadcast.emit('newMessage',{
    //   from:data.from,
    //   to: data.text,
    //   createdAt: new Date().getTime()
    // });
  });
  socket.on('disconnect', ()=>{
    console.log("Lost a client");
  });
});


server.listen(port,()=>{
  console.log(`server is up on ${port}`);
});
