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

			markLoc[markNum] = [(ii * 150) + gapx,(i * 150) + gapy + 100,150,150,"white","False",0,""];
			gapx += 25;
			console.log(markLoc[markNum][6]);
			markNum += 1;

		}
		gapy += 25;
	}

	crossFrame = [];
	crossFrame[0] = [150,100,25,500,"black"];
	crossFrame[1] = [325,100,25,500,"black"];
	crossFrame[2] = [0,250,500,25,"black"];
	crossFrame[3] = [0,425,500,25,"black"];

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

	socket.on("click", function(data){
		markLoc[data.markLocation][7] = "x";
	});

	setInterval(updateLoop, 1000/60);

}

function updateLoop(){

	canvas.fillStyle = "grey";
	canvas.fillRect(0,0,500,600);

	//info bar setup
	canvas.fillStyle = "tan";
	canvas.fillRect(0,0,500,100);

	canvas.fillStyle = "brown";
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
	canvas.fillStyle = "black";
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




