const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    openDevTools: () => ipcRenderer.send('dev-tools'),
    print: () => ipcRenderer.send('print'),
    minimize: () => ipcRenderer.send('minimize'),
    openFile: () => ipcRenderer.send('open-file'),
    showDefPrint: () => ipcRenderer.send('def-print')
}
);