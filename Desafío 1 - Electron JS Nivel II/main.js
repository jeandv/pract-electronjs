const { app, BrowserWindow, ipcMain, dialog } = require('electron');

app.on('ready', main);

let mainWindow;

function main() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: __dirname + "\\index\\index-preload.js"
        },
        center: true,
        width: 1000,
        height: 600,
        show: false
    });

    mainWindow.loadFile('index/index.html');

    let c = mainWindow.webContents;

    c.on('dom-ready', () => {
        mainWindow.show();

        //obj 1
        ipcMain.on('dev-tools', () => {
            c.openDevTools();
        });

        //obj 2
        ipcMain.on('print', () => {
            c.print({ silent: true });
        });

        //obj 3
        ipcMain.on('minimize', () => {
            mainWindow.minimize();
        });

        //obj 4
        ipcMain.on('open-file', () => {
            let files = dialog.showOpenDialogSync(null, { properties: ['multiSelections'] });

            if (files != undefined)
                console.log(`archivos: ${files}`);
        });

        //obj 5
        ipcMain.on('def-print', () => {
            c.getPrintersAsync()
                .then((printers) => {
                    if (printers.length == 0)
                        console.log('No hay impresoras instaladas.')
                    else
                        dialog.showMessageBox({ type: info, title: 'Información', message: `Impresoras instaladas: ${printers}` });
                })
                .catch(() => {
                    console.log('Error al buscar las impresoras.');
                })
        });
    });
}