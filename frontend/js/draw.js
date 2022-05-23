function updateLoop(){

	canvas.fillStyle = "white";
	canvas.fillRect(0,0,500,600);

	//info bar setup
	canvas.fillStyle = "#5f98f4";
	canvas.fillRect(0,0,500,100);

	canvas.fillStyle = "white";
	canvas.font = "55px Aldrich";
	canvas.fillText("Tic Tac Toe", 30,50)

	canvas.font = "20px Aldrich";
	canvas.fillText("X: " + handle.value + "  " + turnIndicator1, 30, 85);

	canvas.fillText("O: " + player2 + "  " + turnIndicator2, 200, 85);

	canvas.save();
	canvas.globalAlpha = resetButt[5];
	canvas.fillStyle = "red";
	canvas.fillRect(resetButt[0],resetButt[1],resetButt[2],resetButt[3]);

	canvas.font = "30px Aldrich";
	canvas.fillStyle = "white";
	canvas.fillText(resetButt[4],resetButt[0] + 5,resetButt[1] + 30);
	canvas.restore();

	//tic tac toe bar grid
	var rect = [25,500];

	//letter squares
	for (var i = 0; i <= 8; i++){//increment row
		canvas.save();
		canvas.fillStyle = markLoc[i][4];
		canvas.globalAlpha = markLoc[i][6];
		canvas.fillRect(markLoc[i][0],markLoc[i][1],markLoc[i][2],markLoc[i][3]);
		canvas.restore();
		canvas.font = "100px Aldrich";
		canvas.fillStyle = "black";
		canvas.fillText(markLoc[i][7],markLoc[i][0] + 39, markLoc[i][1] + 110);
	}

	for (var i = 0; i <= 3; i++){
		canvas.fillStyle = crossFrame[i][4];
		canvas.fillRect(crossFrame[i][0],crossFrame[i][1],crossFrame[i][2],crossFrame[i][3]);
	}
}