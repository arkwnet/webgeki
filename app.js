/*

「ウェブサイト制作のこれからを、奏でに行こうよ！」
------------------------
ウェブ撃 -WEBGEKI-

Beta 2
(c)2019,2020 Sora Arakawa all rights reserved.
Licensed under the MIT License
------------------------

*/

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
app.on("ready", () => {
	mainWindow = new BrowserWindow({width: 1024, height: 600, minWidth: 1024, minHeight: 600, icon: __dirname + "/img/icon_128px.png"});
	mainWindow.maximize();
	mainWindow.loadURL("file://" + __dirname + "/index.html");
	mainWindow.on("closed", function() {
		mainWindow = null;
	});
	//mainWindow.webContents.openDevTools();		// Open Development Tools (for Debug)
});

app.on("browser-window-created",function(e,window) {
	window.setMenu(null);
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit();
	}
});