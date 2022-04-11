const { app, BrowserWindow, ipcMain, dialog } = require('electron');

app.on('ready', main);

let mainWindowLogin;
let mainWindowAut;

let usuariosLogin = {
    "usuarios": [
        {
            "nombre": "Jean A. Rondon B.",
            "usuario": "jeanr",
            "password": "12345"
        },
        {
            "nombre": "Luis Rodriguez",
            "usuario": "luisrod",
            "password": "0909"
        },
        {
            "nombre": "Marco Perez",
            "usuario": "marcopz",
            "password": "2233"
        },
        {
            "nombre": "Pablo Marquez",
            "usuario": "marquez21",
            "password": "1122"
        },
        {
            "nombre": "Juan Pereira",
            "usuario": "juanpr",
            "password": "54321"
        }
    ]
};

let saludoUsuario;

function main() {
    mainWindowLogin = new BrowserWindow({
        webPreferences: {
            preload: __dirname + "\\index\\preload.js"
        },
        center: true,
        width: 600,
        height: 500,
        show: false
    });

    mainWindowLogin.loadFile('index/index-login.html');
    let contentLogin = mainWindowLogin.webContents;

    contentLogin.on('dom-ready', () => {
        mainWindowLogin.show();

        ipcMain.on('open-win-principal', () => {
            mainWindowLogin.hide();

            mainWindowAut = new BrowserWindow({
                webPreferences: {
                    preload: __dirname + "\\index\\preload.js"
                },
                center: true,
                width: 600,
                height: 500,
                show: false
            });

            mainWindowAut.loadFile('index/index-aut.html');
            let contentAut = mainWindowAut.webContents;

            contentAut.on('dom-ready', () => {
                mainWindowAut.show();
                mainWindowAut.send('nombre-logueado', saludoUsuario);
            });
        });

        ipcMain.on('msg-datos-user', (e, user, pass) => {
            dialog.showMessageBox({
                title: 'Información del inicio sesion',
                message: `Usuario usado: ${user} 
Password usado: ${pass}`
            });

            for (let logueados of usuariosLogin.usuarios) {
                if (user == logueados.usuario && pass == logueados.password) {
                    saludoUsuario = logueados.nombre;
                }
            }
        });

        ipcMain.on('close-win-principal', (nombre) => {
            mainWindowAut.hide();
            mainWindowLogin.show();
        });
    });
}