const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

createCashier = () => {
    win = new BrowserWindow({
        width: 500,
        height: 400,
        resizable: false,
        title: 'Resumen | Ticket',
        icon: path.join(__dirname, '../icon/Mary.png')
    });

    win.setMenuBarVisibility(false);

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../dist/cashier.html'),
        protocol: 'file',
        slashes: true
    }));
}

module.exports = {
    createCashier
};