//project ledLight
//Max DeVos
//October 3, 2017

function init(){
	console.log("Im Alive!");
	//get the canvas frame for use
	canvasFrame = document.getElementById("canvasFrame");
	canvas = canvasFrame.getContext("2d");
	//const io = require('socket.io');
	var socket = io.connect('http://localhost:8000');

	color = ["red","orange","yellow","green","blue","purple"];
	activeColor = 1;

	canvas.fillStyle = color[1];

	document.addEventListener('keypress',function(){
		if (activeColor >= 5){
			activeColor = 0;
		}else{
			activeColor +=1;
		}
	});

	//add event listeners
	canvasFrame.addEventListener('click', function(e){
		var x = e.clientX;
		var y = e.clientY;

		socket.emit('click',{
			xPos: x,
    		yPos: y,
    		colorChoice: color[activeColor]
		});
	});

	socket.on('click', function(data){
		canvas.fillStyle = data.colorChoice;
		canvas.fillRect(data.xPos,data.yPos,10,10);
	});

}

