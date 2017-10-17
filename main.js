//project ledLight
//Max DeVos
//October 3, 2017


//require the electron components
const electron = require('electron');

//make it easier to access certain components of electron
const {app, BrowserWindow} = electron;

//do something when the program is finally compiled/ready
app.on('ready', function() {

	//init a window
	let win = new BrowserWindow({width: 800, height: 626});
	//fill it with content
	win.loadURL(`http://localhost:8000`);
	win.loadURL(`file://${__dirname}/index.html`);
	//win.webContents.openDevTols();

});

