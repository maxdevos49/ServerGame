//project ledLight
//Max DeVos
//October 3, 2017

function init(){
	console.log("Im Alive!");
	//get the canvas frame for use
	canvasFrame = document.getElementById("canvasFrame");
	canvas = canvasFrame.getContext("2d");
	
	Hostcode = "http://localhost:8000";
	//connect to the server
	var socket = io.connect(Hostcode);


	//add some elements
	button = document.getElementById("sendButt");
	message = document.getElementById("chatInput");
	output = document.getElementById("chat");
	handle = document.getElementById("handle");

	player2 = "player2";
	
	turnIndicator1 = "<<<";
	turnIndicator2 = "";
	// playerTurn = "O";

	// validTurn = "false";

	resetButt = [375,10,100,40,"Reset"];

	//initilize a bunch of varibles
	markLoc = [];

	var markNum = 0;
	//use a variable to place boxes correctly
	var gapy = 0;
	for (var i = 0; i <= 2; i++){//increment row
		var gapx = 0;
		for (var ii = 0; ii <= 2; ii++){//print row

			markLoc[markNum] = [(ii * 150) + gapx,(i * 150) + gapy + 100,150,150,"#f2f1ed","False",0,""];
			gapx += 25;
			console.log(markLoc[markNum][6]);
			markNum += 1;

		}
		gapy += 25;
	}

	crossFrame = [];
	crossFrame[0] = [150,100,25,500,"#f9d08e"];
	crossFrame[1] = [325,100,25,500,"#f9d08e"];
	crossFrame[2] = [0,250,500,25,"#f9d08e"];
	crossFrame[3] = [0,425,500,25,"#f9d08e"];

	canvasFrame.addEventListener('mousemove', function(e){
		x = e.clientX;
		y = e.clientY;
			//(x0,y1,w2,h3)
		for (var i = 0; i <= 8; i++){//increment row
			if(x > markLoc[i][0] && x < (markLoc[i][0] + markLoc[i][2]) && y > markLoc[i][1] && y < (markLoc[i][1] + markLoc[i][3])){
				markLoc[i][6] = 0.9;
			}else{
				markLoc[i][6] = 0;
			}

			if (x > resetButt[0] && x < (resetButt[0] + resetButt[2]) && y > resetButt[1] && y < (resetButt[1] + resetButt[3])){
				resetButt[5] = 0.5;
			}else{
				resetButt[5] = 1;
			}
		}
	});

	canvasFrame.addEventListener('mouseleave', function(){

		for (var i = 0; i <= 8; i++){//increment row
			markLoc[i][6] = 0;
		}		

	})

	canvasFrame.addEventListener('mousedown', function(e){
		x = e.clientX;
		y = e.clientY;

		for (var i = 0; i <= 8; i++){//increment row
			if(x > markLoc[i][0] && x < (markLoc[i][0] + markLoc[i][2]) && y > markLoc[i][1] && y < (markLoc[i][1] + markLoc[i][3])){

				socket.emit("click",{
					markLocation: i
				});

			}
		}

		if (x > resetButt[0] && x < (resetButt[0] + resetButt[2]) && y > resetButt[1] && y < (resetButt[1] + resetButt[3])){
			resetGame();
		}

	});



	socket.on("clickReply", function(data){
		console.log("reply made it");
		markLoc[data.markLocation][7] = data.markType;
	});

	button.addEventListener('click', function(){

		if (message.value != ""){
			socket.emit("chatMessage",{
				message: message.value,
				sender: handle.value
			});
		}

		message.value = "";

	});

	socket.on("chatMessage", function(data){

		if (data.sender == handle.value){
			output.innerHTML += "<div class='message' id='player1'><h3>"+data.sender+"</h3><p>"+data.message+"</p></div>"
		}else{
			output.innerHTML += "<div class='message' id='player2'><h3>"+data.sender+"</h3><p>"+data.message+"</p></div>"
		}


		output.scrollTop = output.scrollHeight;
	});

	setInterval(updateLoop, 1000/60);

}

function resetGame(){
	
}


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

