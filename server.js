var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var val = "-1"

app.get('/', function(req, res){
  res.sendFile('index.html' , { root : __dirname});
});

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

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// http://[2620:101:f000:700:c9b8:4484:a65d:df7f]:3000/