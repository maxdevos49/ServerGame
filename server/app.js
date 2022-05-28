/**
 * Project codename ledlight
 * @author Maxwell DeVos
 * @since October 3, 2017
 */

console.log('Server Started!!');

const socket = require('socket.io');
const http = require('http').createServer().listen(8000);
const io = require('socket.io').listen(http);

const gameState = {
	round: 0,//game = 0

	// playerTurn = "X";
	// ;
	// clientID = 0;
	// markTypeInit = "X";
	// currentTurn = "True"
}

//start socket operations
io.on('connection', function (socket) {

	if (clientID <= 1) {
		socket.emit("clientID", {
			id: clientID,
			socketID: socket.id,
			game: game,
			markType: markTypeInit,
			defaultHandle: "User" + clientID,
			currentTurn: currentTurn
		});

		console.log("New Client Connected!\nID: " + clientID + "\nsocketID: " + socket.id + "\nDefault Handle: User" + clientID);

		clientID += 1;
		if (markTypeInit == "X") {
			markTypeInit = "O";
			currentTurn = "False";
		} else {
			markTypeInit = "X";
			currentTurn = "True";
		}
	} else {

	}




	// Handle play event
	socket.on('click', function (data) {

		if (playerTurn == "X") {
			io.sockets.emit("clickReply", {
				markType: "X",
				markLocation: data.markLocation
			});
			playerTurn = "O";
		} else if (playerTurn == "O") {
			io.sockets.emit("clickReply", {
				markType: "O",
				markLocation: data.markLocation
			});
			playerTurn = "X";
		}

	});

	//handle chat messages
	socket.on("chatMessage", function (data) {
		io.sockets.emit("chatMessage", {
			message: data.message,
			sender: data.sender
		});
	});

});

