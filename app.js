/*

「ウェブサイト制作のこれからを、奏でに行こうよ！」
------------------------
ウェブ撃 -WEBGEKI-

Beta 1
(c)2019,2020 Sora Arakawa all rights reserved.
Licensed under the MIT License
------------------------

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
app.on("ready", () => {
	mainWindow = new BrowserWindow({width: 1024, height: 600, minWidth: 1024, minHeight: 600, icon: __dirname + "/img/icon_128px.png"});
	mainWindow.setMenu(null);
	mainWindow.maximize();
	mainWindow.loadURL("file://" + __dirname + "/index.html");
	mainWindow.on("closed", function() {
		mainWindow = null;
	});
	//mainWindow.webContents.openDevTools();		// デバッグ用
});