'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

var phoneSequence = "[2, 0, 3, 1]"
var piSequence = "[2, 0, 3, 1]"

var arduinoTurn = false

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function(socket){
    
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    /*
    var resendCheck = setInterval(function(){
        io.emit('sequencePhone', piSequence)
        io.emit('sequencePi', "phoneSequence")
    }, 1000);
    */
    
  socket.on('sequencePhone', function(msg){
      if (msg != phoneSequence && !arduinoTurn) {
          console.log('Phone sequence: ' + msg);
          phoneSequence = msg;
      }
  });
    
  socket.on('sequencePi', function(msg){
      if (msg != piSequence && arduinoTurn) {
          console.log('Pi sequence: ' + msg);
          piSequence = msg;
      }
  });
    
});

setInterval(() => io.emit('sequencePi', "phoneSequence"), 1000);