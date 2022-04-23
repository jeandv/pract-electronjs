const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');

app.on('ready', main);

let mainWindowLogin;
let mainWindowAut;

let lista = [];
let nombreLogueado;
let imgLogueado;

function main() {
    mainWindowLogin = new BrowserWindow({
        webPreferences: {
            preload: __dirname + "\\preload.js"
        },
        center: true,
        width: 950,
        height: 700,
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
                    preload: __dirname + "\\preload.js"
                },
                center: true,
                width: 950,
                height: 700,
                show: false
            });

            mainWindowAut.loadFile('index/index-aut.html');
            let contentAut = mainWindowAut.webContents;

            contentAut.on('dom-ready', () => {
                mainWindowAut.show();
                //obj-5
                mainWindowAut.send('nombre-logueado', nombreLogueado);
                mainWindowAut.send('img-logueado', imgLogueado);
            });
        });

        ipcMain.on('msg-incorrecto', () => {
            dialog.showMessageBox({
                title: 'Error',
                message: 'Usuario y/o contraseña incorrectos o no existen.'
            });
        });

        ipcMain.on('msg-datos-user', (e, user, pass) => {
            dialog.showMessageBox({
                title: 'Información del inicio sesion',
                message: `Usuario usado: ${user} 
Password usado: ${pass}`
            });

            lista = buscar();

            for (let logueados of lista.usuarios) {
                if (user == logueados.usuario && pass == logueados.password) {
                    nombreLogueado = logueados.nombre;
                    imgLogueado = logueados.foto;
                }
            }
        });

        // obj-3
        ipcMain.handle('buscar-img', () => {
            return dialog.showOpenDialog(null, {
                title: 'Seleccione su foto de perfil',
                buttonLabel: 'Seleccionar',
                filters: [
                    {
                        name: 'Imagenes',
                        extensions: ['jpg', 'png', 'jpeg', 'gif']
                    }
                ]
            })
        })

        ipcMain.on('close-win-principal', () => {
            mainWindowAut.hide();
            mainWindowLogin.show();
        });
    });
}

function buscar() {
    datosUsuarios = fs.readFileSync(__dirname + '\\usuarios.json');
    datosJSON = JSON.parse(datosUsuarios);
    return datosJSON;
}