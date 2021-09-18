const electron = require('electron');
const path = require('path');
const url = require('url');
const dotenv = require('dotenv');

const {app} = electron;
const {BrowserWindow} = electron;

let mainWindow;

dotenv.config();

function createWindow(){
    console.log(process.env.DEV)
    const startUrl = process.env.DEV
        ? 'http://localhost:3000'
        : url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true,
        });
    mainWindow = new BrowserWindow();

    mainWindow.loadURL(startUrl);
    mainWindow.maximize();
    process.env.DEV && mainWindow.webContents.openDevTools();

    mainWindow.on('closed',function(){
        mainWindow = null;
    });
}

app.on('ready',createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });