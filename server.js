'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var val = 42

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function(socket){
    
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
    
    
  socket.on('incrementor', function(msg){
      if (val != msg) {
          console.log('Incrementor: ' + msg);
          val = msg;
      }
  });
    
});

setInterval(() => io.emit('time', val), 100);