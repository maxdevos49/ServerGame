//project ledLight
//Max DeVos
//October 3, 2017

//require http module
var http = require('http');
//require socket.io module
var socket = require('socket.io');
//require chalk module
//var chalk = require('chalk');

console.log('Server Started!!')


// Socket setup & pass server
http = require('http').createServer().listen(8000);
io = require('socket.io').listen(http);

var client = [];
var clientCount = 0;

io.on('connection', (socket) => {

	client[clientCount] = ["Client"+clientCount, socket.id]
    console.log("New Socket Connection: "+client[clientCount][0]+" ID: "+socket.id);
    clientCount += 1;

    // Handle chat event
    socket.on('draw', function(data){
        // console.log(data);
        io.sockets.emit('draw', data);
    });

});