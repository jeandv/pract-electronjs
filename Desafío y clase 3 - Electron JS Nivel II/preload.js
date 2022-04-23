
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');

ipcRenderer.on('nombre-logueado', (e, nombre) => {
    document.getElementById('saludo').innerHTML = `Bienvenido! ${nombre}`;
});

// obj-3
ipcRenderer.on('img-logueado', (e, img) => {
    document.getElementById('fotoPerfilUser').src = img;
});

contextBridge.exposeInMainWorld('api', {
    abrirVenPrincipal: () => ipcRenderer.send('open-win-principal'),
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
        // obj-3
        ipcRenderer.invoke('buscar-img')
            .then((resp) => {
                console.log(resp);

                if (!resp.canceled) {
                    let ruta = document.getElementById('archivoRuta');
                    ruta.value = resp.filePaths[0];

                    let btnImg = document.getElementById("btnBuscarImg");
                    btnImg.innerText = '✔ Foto seleccionada';
                }
            });
    }
});