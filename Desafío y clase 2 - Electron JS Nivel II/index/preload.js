
const { contextBridge, ipcRenderer } = require('electron');

ipcRenderer.on('nombre-logueado', (e, nombre) => {
    document.getElementById('saludo').innerHTML = `Bienvenido! ${nombre}`;
})

contextBridge.exposeInMainWorld('api', {
    abrirVenPrincipal: () => ipcRenderer.send('open-win-principal'),
    mostrarDatosUser: (user, pass) => ipcRenderer.send('msg-datos-user', user, pass),
    cerrarVenPrincipal: () => ipcRenderer.send('close-win-principal'),
});