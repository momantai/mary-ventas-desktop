const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win = null;

createWinAuth = () => {
    // destroyWinAuth();

    win = new BrowserWindow({
        width: 390,
        height: 400,
        resizable: false,
        title: 'Inicio de Sesión Mari Ventas Desktop',
        icon: path.join(__dirname, '../icon/Mary.png')
    });

    win.setMenuBarVisibility(false);

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../dist/auth.html'),
        protocol: 'file',
        slashes: true
    }));

}

// destroyWinAuth = () => {
//     if(!win) return;

//     win.close();
//     win = null;
// }

module.exports = {
    createWinAuth
};