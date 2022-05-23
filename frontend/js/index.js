/**
 * Project codename ledLight
 * @author Max DeVos
 * @since October 3, 2017
 */


function init() {

	//link some elements for use
	canvasFrame = document.getElementById("canvasFrame");
	button = document.getElementById("sendButt");
	message = document.getElementById("chatInput");
	output = document.getElementById("chat");
	handle = document.getElementById("handle");

	canvas = canvasFrame.getContext("2d");

	//connect to the server	
	Hostcode = "http://localhost:8000";
	socket = io.connect(Hostcode);

	//logic varibles
	player2 = "player2";

	turnIndicator1 = "<<<";
	turnIndicator2 = "";


	//button varibles
	resetButt = [375, 10, 100, 40, "Reset"];

	//initilize 9 boxe that will hold the marks
	markLoc = [];
	markNum = 0;
	gapy = 0;//use this to properly place squares on y access

	for (var i = 0; i <= 2; i++) {//increment row
		gapx = 0;//use this to properly place squares on x access
		for (var ii = 0; ii <= 2; ii++) {//print row
			//fill mark array with values
			markLoc[markNum] = [(ii * 150) + gapx, (i * 150) + gapy + 100, 150, 150, "#f2f1ed", "False", 0, ""];
			gapx += 25;
			console.log(markLoc[markNum][6]);
			markNum += 1;
		}
		gapy += 25;
	}

	crossFrame = [];
	crossFrame[0] = [150, 100, 25, 500, "#f9d08e"];
	crossFrame[1] = [325, 100, 25, 500, "#f9d08e"];
	crossFrame[2] = [0, 250, 500, 25, "#f9d08e"];
	crossFrame[3] = [0, 425, 500, 25, "#f9d08e"];



	//handle the mouse moving to 
	canvasFrame.addEventListener('mousemove', function (e) {
		x = e.clientX;
		y = e.clientY;

		for (var i = 0; i <= 8; i++) {//increment mark location to be checked
			//handle the 9 marc locations
			if (x > markLoc[i][0] && x < (markLoc[i][0] + markLoc[i][2]) && y > markLoc[i][1] && y < (markLoc[i][1] + markLoc[i][3])) {
				markLoc[i][6] = 0.9;
			} else {
				markLoc[i][6] = 0;
			}
		}

		//handle highlighting reset button
		if (x > resetButt[0] && x < (resetButt[0] + resetButt[2]) && y > resetButt[1] && y < (resetButt[1] + resetButt[3])) {
			resetButt[5] = 0.5;
		} else {
			resetButt[5] = 1;
		}

	});

	//handle the mouse leaving the canvas to properly unhiglight the squares
	canvasFrame.addEventListener('mouseleave', function () {

		for (var i = 0; i <= 8; i++) {//increment row
			markLoc[i][6] = 0;
		}

	})

	//handle outgoing game play request
	canvasFrame.addEventListener('mousedown', function (e) {
		x = e.clientX;
		y = e.clientY;

		if (myclient.currentTurn == "True") {
			for (var i = 0; i <= 8; i++) {//icrement mark location being checked for a click
				if (x > markLoc[i][0] && x < (markLoc[i][0] + markLoc[i][2]) && y > markLoc[i][1] && y < (markLoc[i][1] + markLoc[i][3])) {

					//tell server that the client clicked
					socket.emit("click", {
						markLocation: i
					});

				}
			}
		}

		//handle reset button getting clicked
		if (x > resetButt[0] && x < (resetButt[0] + resetButt[2]) && y > resetButt[1] && y < (resetButt[1] + resetButt[3])) {
			resetGame();
		}

	});

	//handle outgoing chat messages
	button.addEventListener('click', function () {

		if (message.value != "") {
			socket.emit("chatMessage", {
				message: message.value,
				sender: handle.value
			});
		}

		message.value = "";

	});

	//////////////////////process all server replys\\\\\\\\\\\\\\\\\\\\\\\\


	socket.on("clientID", function (data) {
		myclient = {
			id: data.id,
			socketID: data.socketID,
			game: data.game,
			markType: data.markType,
			defaultHandle: data.defaultHandle,
			currentTurn: data.currentTurn
		}

		handle.value = myclient.defaultHandle;
		console.log(myclient.defaultHandle);
	})


	//handle incomming chat messages
	socket.on("chatMessage", function (data) {

		if (data.sender == handle.value) {
			output.innerHTML += "<div class='message' id='player1'><h3>" + data.sender + "</h3><p>" + data.message + "</p></div>"
		} else {
			output.innerHTML += "<div class='message' id='player2'><h3>" + data.sender + "</h3><p>" + data.message + "</p></div>"
		}


		output.scrollTop = output.scrollHeight;
	});

	//handle changing the mark
	socket.on("clickReply", function (data) {
		console.log("checkpoint 2");
		if (myclient.currentTurn == "False") {
			myclient.currentTurn = "True";
		} else {
			myclient.currentTurn = "False";
		}

		markLoc[data.markLocation][7] = data.markType;
	});

	setInterval(updateLoop, 1000 / 60);

}






