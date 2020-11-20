const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

createTicket = () => {
    win = new BrowserWindow({
        width: 300,
        height: 450,
        resizable: false,
        title: 'Resumen | Ticket',
        icon: path.join(__dirname, '../icon/Mary.png')
    });

    win.setMenuBarVisibility(false);

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../dist/modal.html'),
        protocol: 'file',
        slashes: true
    }));
}

sendToTicket = (data) => {
    win.webContents.send('ticket', data);
}

module.exports = {
    createTicket,
    sendToTicket
};