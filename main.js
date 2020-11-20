const {app, BrowserWindow} = require('electron')
path = require('path')
url = require('url')
const { sessionExist, tokenHandler, closeSessionHandler } = require('./main/services/session-auth');

const { createWinAuth } = require('./main/authentication');
const { createAppWindow } = require('./main/app-main');

// closeSessionHandler();

function showWindow() {
    if(sessionExist()) {
        return createAppWindow();
    }

    return createWinAuth();
}


app.on('ready', showWindow)

console.log("Hola Mundo!!!!");
