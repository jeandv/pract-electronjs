
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

ipcRenderer.on('nombre-logueado', (e, nombre) => {
    document.getElementById('saludo').innerHTML = `Bienvenido! ${nombre}`;
});

contextBridge.exposeInMainWorld('api', {
    abrirVenPrincipal: () => ipcRenderer.send('open-win-principal'),
    minimizarVen: () => ipcRenderer.send('minimize'),
    maximizarVen: () => ipcRenderer.send('maximize'),
    esconderVen: () => ipcRenderer.send('hide'),
    //obj-3
    mostrarNotiLogin: () => ipcRenderer.send('noti-login'),
    mostrarMsgError: () => ipcRenderer.send('msg-incorrecto'),
    mostrarDatosUser: (user, pass) => ipcRenderer.send('msg-datos-user', user, pass),
    cerrarVenPrincipal: () => ipcRenderer.send('close-win-principal'),
    guardarUserJSON: (nuevo) => {
        let obj = new Object();
        obj.usuarios = nuevo;
        fs.writeFileSync(__dirname + '\\usuarios.json',
            JSON.stringify(obj));
    },
    leerUsuariosJSON: () => {
        try {
            datosUsuarios = fs.readFileSync(__dirname + '\\usuarios.json');
            datosJSON = JSON.parse(datosUsuarios);
            return datosJSON.usuarios;
        } catch (e) {
            console.log('no se pudo abrir el archivo usuarios.json');
            return [];
        }
    },
    subirFotoPerfil: () => {
        ipcRenderer.invoke('buscar-img')
            .then((resp) => {
                console.log(resp);

                if (!resp.canceled) {

                    fs.copyFile(resp.filePaths[0], './index/images-perfil', {
                        done: function (err) {
                            console.log('done');
                        }
                    });

                    let btnImg = document.getElementById("btnBuscarImg");
                    btnImg.innerText = '✔ Foto seleccionada';
                }
            });
    }
});