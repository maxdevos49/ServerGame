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

	// //add event listeners
	// canvasFrame.addEventListener('mousemove', function(e){
	// 	var x = e.clientX;
	// 	var y = e.clientY;

	// 	socket.emit('draw',{
	// 		xPos: x,
 //    		yPos: y,
 //    		colorChoice: color[activeColor]
	// 	});
	// });

	// socket.on('draw', function(data){
	// 	canvas.fillStyle = data.colorChoice;
	// 	canvas.fillRect(data.xPos,data.yPos,10,10);
	// });

	setInterval(1000/60, updateLoop);

}

function updateLoop{
	
}

