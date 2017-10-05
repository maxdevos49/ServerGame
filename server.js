//project ledLight
//Max DeVos
//October 3, 2017

//require http module
var http = require('http');
//require filesystem module
//var fs = require('fs');
//require url parser module
//var url = require('url');
//require socket.io module
var socket = require('socket.io');
//require chalk module
//var chalk = require('chalk');

console.log('Server Started!!')


// Socket setup & pass server
http = require('http').createServer().listen(8000);
io = require('socket.io').listen(http);


io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('click', function(data){
        // console.log(data);
        io.sockets.emit('click', data);
        console.log("click");
    });

});