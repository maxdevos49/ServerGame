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

	//delete later
	player1 = "player1";
	player2 = "player2";
	//probably keep this
	p1Wins = 0;
	p2Wins = 0;

	//initilize a bunch of varibles
	markLoc = [];

	var markNum = 0;
	//use a variable to place boxes correctly
	var gapy = 0;
	for (var i = 0; i <= 2; i++){//increment row
		var gapx = 0;
		for (var ii = 0; ii <= 2; ii++){//print row

			markLoc[markNum] = [(ii * 150) + gapx,(i * 150) + gapy + 100,150,150,"grey","False",0,""];
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
				markLoc[i][6] = 0.5;
			}else{
				markLoc[i][6] = 0;
			}
		}
	});

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

	});

	socket.on("clickReply", function(data){
		console.log("reply made it");
		markLoc[data.markLocation][7] = data.markType;
	});

	button.addEventListener('click', function(){

		socket.emit("chatMessage",{
			message: message.value,
			sender: "player1"
		});

		message.value = "";

	});

	socket.on("chatMessage", function(data){

		output.innerHTML += "<div><h3>"+data.sender+"</h3><p>"+data.message+"</p></div>"
		output.scrollTop = output.scrollHeight;
	});

	setInterval(updateLoop, 1000/60);

}


function updateLoop(){

	canvas.fillStyle = "white";
	canvas.fillRect(0,0,500,600);

	//info bar setup
	canvas.fillStyle = "#5f98f4";
	canvas.fillRect(0,0,500,100);

	canvas.fillStyle = "white";
	canvas.font = "30px Arial";
	canvas.fillText("Tic Tac Toe", 175,30)

	canvas.font = "20px Arial";
	canvas.fillText("X: " + player1 + " Wins: " + p1Wins + "   <<<<", 10, 60);

	canvas.fillText("O: " + player2 + " Wins: " + p2Wins, 10, 85);

	canvas.font = "15px Arial";
	canvas.fillText("Hostcode: " + Hostcode, 275, 85);

	canvas.fillStyle = "red";
	canvas.fillRect(375,10,100,40);

	canvas.font = "30px Arial";
	canvas.fillStyle = "white";
	canvas.fillText("Reset",385,40);

	//tic tac toe bar grid
	var rect = [25,500];

	//150,025,150,025,150
	//025,025,025,025,025
	//150,025,150,025,150
	//025,025,025,025,025
	//150,025,150,025,150

	//letter squares
	for (var i = 0; i <= 8; i++){//increment row
		canvas.save();
		canvas.fillStyle = markLoc[i][4];
		canvas.globalAlpha = markLoc[i][6];
		canvas.fillRect(markLoc[i][0],markLoc[i][1],markLoc[i][2],markLoc[i][3]);
		canvas.restore();
		canvas.font = "100px Arial";
		canvas.fillStyle = "black";
		canvas.fillText(markLoc[i][7],markLoc[i][0] + 50, markLoc[i][1] + 100);
	}

	for (var i = 0; i <= 3; i++){
		canvas.fillStyle = crossFrame[i][4];
		canvas.fillRect(crossFrame[i][0],crossFrame[i][1],crossFrame[i][2],crossFrame[i][3]);
	}


}




