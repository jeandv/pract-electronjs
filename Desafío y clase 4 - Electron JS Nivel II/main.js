const { app, BrowserWindow, ipcMain, dialog, Tray, Menu, Notification, nativeImage, globalShortcut } = require('electron');
const Store = require('electron-store');
const fs = require('fs');

app.on('ready', main);

let mainWindowLogin;
let mainWindowAut;

let trayLogin;
let trayAut;
let trayMenuLogin;
let trayMenuAut;

let lista = [];
let nombreLogueado;

function main() {
    mainWindowLogin = new BrowserWindow({
        icon: 'index/icons/icono.ico',
        center: true,
        width: 950,
        height: 700,
        frame: false,
        show: false,
        webPreferences: {
            preload: __dirname + "\\preload.js",
        }
    });

    mainWindowLogin.loadFile('index/index-login.html');
    let contentLogin = mainWindowLogin.webContents;

    contentLogin.on('dom-ready', () => {
        mostrarTrayLogin();
        mainWindowLogin.show();

        barBtn(mainWindowLogin);

        ipcMain.on('open-win-principal', () => {
            mainWindowAut = new BrowserWindow({
                icon: 'index/icons/icono.ico',
                center: true,
                width: 950,
                height: 700,
                frame: false,
                show: false,
                webPreferences: {
                    preload: __dirname + "\\preload.js"
                }
            });

            mainWindowAut.loadFile('index/index-aut.html');
            let contentAut = mainWindowAut.webContents;

            contentAut.on('dom-ready', () => {
                trayLogin.destroy();
                mostrarTrayAut();

                mainWindowLogin.hide();
                mainWindowAut.show();

                barBtn(mainWindowAut);

                mainWindowAut.send('nombre-logueado', nombreLogueado);
            });
        });

        //obj-3
        ipcMain.on('noti-login', () => {
            let t = new Date()
            let horaActual = `${t.getHours()}:${t.getMinutes()}`

            let tiempoTranscurrido = Date.now();
            let hoy = new Date(tiempoTranscurrido);

            app.setAppUserModelId('Jeapp');

            if (Notification.isSupported()) {
                let n = new Notification({
                    timeoutType: 'never',
                    silent: true,
                    icon: nativeImage.createFromPath('index/icons/icono.ico'),
                    title: 'Haz iniciado sesión!',
                    body: `Hora: ${horaActual}
Fecha: ${hoy.toLocaleDateString()}`
                });
                n.show();

                n.on('close', () => {
                    console.log('Se ha cerrado la notificación');
                });

                n.on('failed', () => {
                    console.log('Fallo al generar la notificación');
                });
            }

            //guardo hora usando el paquete electron-store
            const store = new Store();
            store.set('hora', horaActual);
            console.log(store.get('hora'));
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
                }
            }
        });

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
            trayAut.destroy();
            mostrarTrayLogin();

            mainWindowAut.hide();
            mainWindowLogin.show();
        });
    });

    //obj-1 cierro las ventanas con alt+f4
    globalShortcut.unregister('Alt+F4')
    const ret = globalShortcut.register('Alt+F4', () => {
        mainWindowLogin.close();
        mainWindowAut.close();

        console.log('Alt+F4 se presionó.')
    });

    if (!ret) {
        console.log('registration failed')
    }
}

//obj-1
function barBtn(w) {
    ipcMain.on('minimize', () => {
        w.minimize();
    });
    ipcMain.on('maximize', () => {
        if (w.isMaximized())
            w.restore()
        else
            w.maximize();
    });
    ipcMain.on('hide', () => {
        w.hide();
    });
}

//obj-2
function mostrarTrayLogin() {
    mainWindowLogin.on('ready-to-show', () => {
        if (app.isPackaged)
            trayLogin = new Tray("resources\\icono.ico");
        else
            trayLogin = new Tray('index/icons/icono.ico');

        trayLogin.setToolTip('Jeapp');

        trayLogin.on('click', () => {
            if (!mainWindowLogin.isVisible())
                mainWindowLogin.show();
            else
                mainWindowLogin.hide();
        });

        trayMenuLogin = Menu.buildFromTemplate([
            { label: 'Ir a iniciar sesión', click: () => mainWindowLogin.show() },
            { type: 'separator' },
            { label: 'Cerrar', click: () => app.exit() },
        ]);
        trayLogin.setContextMenu(trayMenuLogin);
    });
}

//obj-2
function mostrarTrayAut() {
    if (mainWindowAut) {
        mainWindowAut.on('ready-to-show', () => {
            if (app.isPackaged)
                trayAut = new Tray("resources\\icono.ico");
            else
                trayAut = new Tray('index/icons/icono.ico');

            trayAut.setToolTip('Autenticado');

            trayAut.on('click', () => {
                if (!mainWindowAut.isVisible())
                    mainWindowAut.show();
                else
                    mainWindowAut.hide();
            });

            trayMenuAut = Menu.buildFromTemplate([
                {
                    label: 'Cambiar foto perfil', click: () => {
                        return dialog.showOpenDialog(null, {
                            title: 'Seleccione su nueva foto de perfil',
                            buttonLabel: 'Seleccionar',
                            filters: [
                                {
                                    name: 'Imagenes',
                                    extensions: ['jpg', 'png', 'jpeg', 'gif']
                                }
                            ]
                        })
                    }
                },
                { type: 'separator' },
                {
                    label: 'Cerrar sesión', click: () => {
                        mainWindowAut.hide();
                        mainWindowLogin.show();

                        mostrarTrayLogin();
                        trayAut.destroy();
                    }
                },
            ]);
            trayAut.setContextMenu(trayMenuAut);
        });
    }
}

function buscar() {
    datosUsuarios = fs.readFileSync(__dirname + '\\usuarios.json');
    datosJSON = JSON.parse(datosUsuarios);
    return datosJSON;
}