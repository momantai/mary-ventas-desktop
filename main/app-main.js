const { BrowserWindow } = require('electron');
path = require('path');
url = require('url');

let win

createAppWindow = () => {
    win = new BrowserWindow({
        minHeight: 670,
        minWidth: 1080,
        resizable: true,
        frame: true,
        icon: path.join(__dirname, '../icon/Mary.png')
    })

    win.setMenuBarVisibility(false);

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../dist/app.html'),
        protocol: 'file',
        slashes: true
    }));
}

module.exports = {
    createAppWindow
};