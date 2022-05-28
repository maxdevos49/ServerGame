/**
 * Project  codename ledLight
 * @author Max DeVos
 * @since October 3, 2017
 */

const { app, BrowserWindow } = require('electron');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1000,
		height: 600
	});

	win.loadFile("./frontend/index.html");
	// win.webContents.openDevTools();
};

app.whenReady().then(() => {
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})