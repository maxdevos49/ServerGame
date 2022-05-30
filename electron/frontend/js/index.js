"use strict";
/**
 * Project codename ledLight
 * @author Max DeVos
 * @since October 3, 2017
 */

import { setupSocketConnection } from "./socket.js";
import { connectionController } from "./connectionController.js";
import { clientChatController } from "./clientChatController.js";

function main() {

	listenForConnect((url, handle) => {

		setupSocketConnection(url, [
			connectionController,
			clientChatController(handle),
		]);
	});
}
document.addEventListener("DOMContentLoaded", main);


function listenForConnect(callback) {
	const $form = document.querySelector("#server-form");
	if (!$form) {
		return;
	}

	$form.addEventListener("submit", (e) => {
		e.preventDefault()

		const $handle = document.querySelector("#handle");
		const $server = document.querySelector("#server");

		if (!$handle || !$server) {
			return;
		}

		const handle = $handle.value;
		const serverURL = $server.value;

		callback(serverURL, handle);
	});
}


	// const canvas = document.getElementById("canvasFrame");
	// const context = canvas.getContext("2d");


	// //link some elements for use
	// const button = document.getElementById("sendButt");
	// const message = document.getElementById("chatInput");
	// const output = document.getElementById("chat");
	// const handle = document.getElementById("handle");


	// //connect to the server
	// const hostcode = "http://localhost:8000";
	// const socket = io.connect(hostcode);

	// // //logic varibles
	// // const player2 = "player2";

	// // const turnIndicator1 = "<<<";
	// // const turnIndicator2 = "";


	// //button varibles
	// const resetButt = [375, 10, 100, 40, "Reset"];

	// //initilize 9 boxe that will hold the marks
	// const markLoc = [];
	// let markNum = 0;
	// let gapy = 0;//use this to properly place squares on y access

	// for (var i = 0; i <= 2; i++) {//increment row
	// 	let gapx = 0;//use this to properly place squares on x access
	// 	for (var ii = 0; ii <= 2; ii++) {//print row
	// 		//fill mark array with values
	// 		markLoc[markNum] = [(ii * 150) + gapx, (i * 150) + gapy + 100, 150, 150, "#f2f1ed", "False", 0, ""];
	// 		gapx += 25;
	// 		console.log(markLoc[markNum][6]);
	// 		markNum += 1;
	// 	}
	// 	gapy += 25;
	// }

	// const crossFrame = [];
	// crossFrame[0] = [150, 100, 25, 500, "#f9d08e"];
	// crossFrame[1] = [325, 100, 25, 500, "#f9d08e"];
	// crossFrame[2] = [0, 250, 500, 25, "#f9d08e"];
	// crossFrame[3] = [0, 425, 500, 25, "#f9d08e"];



	// //handle the mouse moving to
	// canvasFrame.addEventListener('mousemove', function (e) {
	// 	let x = e.clientX;
	// 	let y = e.clientY;

	// 	for (var i = 0; i <= 8; i++) {//increment mark location to be checked
	// 		//handle the 9 marc locations
	// 		if (x > markLoc[i][0] && x < (markLoc[i][0] + markLoc[i][2]) && y > markLoc[i][1] && y < (markLoc[i][1] + markLoc[i][3])) {
	// 			markLoc[i][6] = 0.9;
	// 		} else {
	// 			markLoc[i][6] = 0;
	// 		}
	// 	}

	// 	//handle highlighting reset button
	// 	if (x > resetButt[0] && x < (resetButt[0] + resetButt[2]) && y > resetButt[1] && y < (resetButt[1] + resetButt[3])) {
	// 		resetButt[5] = 0.5;
	// 	} else {
	// 		resetButt[5] = 1;
	// 	}

	// });

	// //handle the mouse leaving the canvas to properly unhiglight the squares
	// canvasFrame.addEventListener('mouseleave', function () {

	// 	for (var i = 0; i <= 8; i++) {//increment row
	// 		markLoc[i][6] = 0;
	// 	}

	// })

	// //handle outgoing game play request
	// canvasFrame.addEventListener('mousedown', function (e) {
	// 	x = e.clientX;
	// 	y = e.clientY;

	// 	if (myclient.currentTurn == "True") {
	// 		for (var i = 0; i <= 8; i++) {//icrement mark location being checked for a click
	// 			if (x > markLoc[i][0] && x < (markLoc[i][0] + markLoc[i][2]) && y > markLoc[i][1] && y < (markLoc[i][1] + markLoc[i][3])) {

	// 				//tell server that the client clicked
	// 				socket.emit("click", {
	// 					markLocation: i
	// 				});

	// 			}
	// 		}
	// 	}

	// 	//handle reset button getting clicked
	// 	if (x > resetButt[0] && x < (resetButt[0] + resetButt[2]) && y > resetButt[1] && y < (resetButt[1] + resetButt[3])) {
	// 		resetGame();
	// 	}

	// });

	// //handle outgoing chat messages
	// button.addEventListener('click', function () {

	// 	if (message.value != "") {
	// 		socket.emit("chatMessage", {
	// 			message: message.value,
	// 			sender: handle.value
	// 		});
	// 	}

	// 	message.value = "";

	// });

	// //////////////////////process all server replys\\\\\\\\\\\\\\\\\\\\\\\\


	// socket.on("clientID", function (data) {
	// 	myclient = {
	// 		id: data.id,
	// 		socketID: data.socketID,
	// 		game: data.game,
	// 		markType: data.markType,
	// 		defaultHandle: data.defaultHandle,
	// 		currentTurn: data.currentTurn
	// 	}

	// 	handle.value = myclient.defaultHandle;
	// 	console.log(myclient.defaultHandle);
	// })


	// //handle incomming chat messages
	// socket.on("chatMessage", function (data) {

	// 	if (data.sender == handle.value) {
	// 		output.innerHTML += "<div class='message' id='player1'><h3>" + data.sender + "</h3><p>" + data.message + "</p></div>"
	// 	} else {
	// 		output.innerHTML += "<div class='message' id='player2'><h3>" + data.sender + "</h3><p>" + data.message + "</p></div>"
	// 	}


	// 	output.scrollTop = output.scrollHeight;
	// });

	// //handle changing the mark
	// socket.on("clickReply", function (data) {
	// 	console.log("checkpoint 2");
	// 	if (myclient.currentTurn == "False") {
	// 		myclient.currentTurn = "True";
	// 	} else {
	// 		myclient.currentTurn = "False";
	// 	}

	// 	markLoc[data.markLocation][7] = data.markType;
	// });

	// setInterval(updateLoop, 1000 / 60);

// }