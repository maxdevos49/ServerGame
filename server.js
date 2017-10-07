//project ledLight
//Max DeVos
//October 3, 2017

console.log('Server Started!!');

socket = require('socket.io');

// Socket setup & pass server
http = require('http').createServer().listen(8000);
io = require('socket.io').listen(http);

//set up some varibles for identifying different clients
var client = [];
var clientCount = 0;

//set up some game logic varibles
player1 = "X";
player2 = "O";

playerTurn = "X";

io.on('connection', (socket) => {

	client[clientCount] = ["Client"+clientCount, socket.id]
    console.log("New Socket Connection: "+client[clientCount][0]+" ID: "+socket.id);
    clientCount += 1;

  	// Handle play event
    socket.on('click', function(data){
        
    	if (playerTurn == "X"){
    		io.sockets.emit("clickReply",{
    			markType: "X",
    			markLocation: data.markLocation
       		});
       		playerTurn = "O";
    	}else if(playerTurn == "O"){
    		io.sockets.emit("clickReply",{
    			markType: "O",
    			markLocation: data.markLocation
    		});
    		playerTurn = "X";
    	}

    });

    socket.on("chatMessage", function(data){
    	io.sockets.emit("chatMessage",{
    		message: data.message,
    		sender: data.sender
    	})
    });

});

