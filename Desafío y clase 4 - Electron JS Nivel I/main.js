const { Menu, BrowserWindow, app } = require('electron');

let { templateMainMenu } = require('./templatemenu.js');
let mainMenu = Menu.buildFromTemplate(templateMainMenu);

app.on('ready', () => {
    //objetivo 2
    Menu.setApplicationMenu(null);

    //objetivo 3
    let win = new BrowserWindow({
        title: 'Electron JS | Desafio 4',
        center: true,
        height: 600,
        width: 800,
        show: false
    });

    win.loadURL('http://cadif1.com');
    win.setMenu(mainMenu);

    win.on('ready-to-show', () => {
        win.show();
    });
});